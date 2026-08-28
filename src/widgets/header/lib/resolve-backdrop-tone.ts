type Rgba = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export const HEADER_PROBE_YS = [24, 40, 56, 72];

const HEADER_PROBE_RATIOS = [0.25, 0.5, 0.75];

const LUMINANCE_DARK_THRESHOLD = 0.35;
const CHROMA_SPREAD_DARK_THRESHOLD = 35;
const MIN_ALPHA = 0.5;

const SKIP_TAGS = new Set(["VIDEO", "SVG", "PICTURE", "IFRAME", "CANVAS"]);
let pixelContext: CanvasRenderingContext2D | null = null;

function getPixelContext(): CanvasRenderingContext2D | null {
  if (pixelContext || typeof document === "undefined") {
    return pixelContext;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  pixelContext = canvas.getContext("2d", { willReadFrequently: true });

  return pixelContext;
}

function parseHexColor(value: string): Rgba | null {
  const normalized = value.replace("#", "");

  if (normalized.length === 3) {
    return {
      r: parseInt(normalized[0] + normalized[0], 16),
      g: parseInt(normalized[1] + normalized[1], 16),
      b: parseInt(normalized[2] + normalized[2], 16),
      a: 1,
    };
  }

  if (normalized.length === 6) {
    return {
      r: parseInt(normalized.slice(0, 2), 16),
      g: parseInt(normalized.slice(2, 4), 16),
      b: parseInt(normalized.slice(4, 6), 16),
      a: 1,
    };
  }

  if (normalized.length === 8) {
    return {
      r: parseInt(normalized.slice(0, 2), 16),
      g: parseInt(normalized.slice(2, 4), 16),
      b: parseInt(normalized.slice(4, 6), 16),
      a: parseInt(normalized.slice(6, 8), 16) / 255,
    };
  }

  return null;
}

function parseCssColor(value: string): Rgba | null {
  const trimmed = value.trim();

  if (!trimmed || trimmed === "transparent") {
    return null;
  }

  if (trimmed.startsWith("#")) {
    return parseHexColor(trimmed);
  }

  const rgbMatch = trimmed.match(
    /^rgba?\(\s*([\d.]+)[\s,/]+([\d.]+)[\s,/]+([\d.]+)(?:[\s,/]+([\d.]+%?))?\s*\)$/,
  );

  if (!rgbMatch) {
    return null;
  }

  const alphaValue = rgbMatch[4];

  return {
    r: Number(rgbMatch[1]),
    g: Number(rgbMatch[2]),
    b: Number(rgbMatch[3]),
    a:
      alphaValue === undefined
        ? 1
        : alphaValue.endsWith("%")
          ? Number(alphaValue.slice(0, -1)) / 100
          : Number(alphaValue),
  };
}

function relativeLuminance({ r, g, b }: Rgba): number {
  const channels = [r, g, b].map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function extractColorFromBackgroundImage(backgroundImage: string): Rgba | null {
  const rgb = backgroundImage.match(/rgba?\([^)]+\)/)?.[0];
  if (rgb) {
    return parseCssColor(rgb);
  }

  const hex = backgroundImage.match(/#(?:[0-9a-f]{3,8})/i)?.[0];
  if (hex) {
    return parseCssColor(hex);
  }

  return null;
}

function resolveBackgroundColor(style: CSSStyleDeclaration): Rgba | null {
  const backgroundColor = parseCssColor(style.backgroundColor);
  if (backgroundColor && backgroundColor.a >= MIN_ALPHA) {
    return backgroundColor;
  }

  if (!style.backgroundImage || style.backgroundImage === "none") {
    return null;
  }

  return extractColorFromBackgroundImage(style.backgroundImage);
}

function resolveImagePixel(
  image: HTMLImageElement,
  x: number,
  y: number,
): Rgba | null {
  const context = getPixelContext();
  if (!context || !image.complete || image.naturalWidth === 0) {
    return null;
  }

  const rect = image.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) {
    return null;
  }

  const style = getComputedStyle(image);
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const boxRatio = rect.width / rect.height;
  const objectFit = style.objectFit;
  let renderedWidth = rect.width;
  let renderedHeight = rect.height;

  if (objectFit === "contain" || objectFit === "scale-down") {
    if (imageRatio > boxRatio) {
      renderedHeight = rect.width / imageRatio;
    } else {
      renderedWidth = rect.height * imageRatio;
    }
  } else if (objectFit === "cover") {
    if (imageRatio > boxRatio) {
      renderedWidth = rect.height * imageRatio;
    } else {
      renderedHeight = rect.width / imageRatio;
    }
  }

  const renderedLeft = rect.left + (rect.width - renderedWidth) / 2;
  const renderedTop = rect.top + (rect.height - renderedHeight) / 2;
  const relativeX = (x - renderedLeft) / renderedWidth;
  const relativeY = (y - renderedTop) / renderedHeight;

  if (
    relativeX < 0 ||
    relativeX > 1 ||
    relativeY < 0 ||
    relativeY > 1
  ) {
    return null;
  }

  try {
    context.clearRect(0, 0, 1, 1);
    context.drawImage(
      image,
      Math.min(image.naturalWidth - 1, relativeX * image.naturalWidth),
      Math.min(image.naturalHeight - 1, relativeY * image.naturalHeight),
      1,
      1,
      0,
      0,
      1,
      1,
    );

    const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
    return { r, g, b, a: a / 255 };
  } catch {
    return null;
  }
}

function colorChromaSpread({ r, g, b }: Rgba): number {
  return Math.max(r, g, b) - Math.min(r, g, b);
}

function isTrulyDarkColor(rgba: Rgba): boolean {
  return (
    relativeLuminance(rgba) < LUMINANCE_DARK_THRESHOLD &&
    colorChromaSpread(rgba) <= CHROMA_SPREAD_DARK_THRESHOLD
  );
}

function resolveToneFromColor(rgba: Rgba): "light" | "dark" {
  return isTrulyDarkColor(rgba) ? "dark" : "light";
}

function resolveToneFromImagePixel(pixel: Rgba): "light" | "dark" {
  return relativeLuminance(pixel) < LUMINANCE_DARK_THRESHOLD ? "dark" : "light";
}

function resolveToneFromElement(
  element: Element,
  x: number,
  y: number,
): "light" | "dark" | null {
  if (element instanceof HTMLImageElement) {
    if (!element.hasAttribute("data-header-backdrop-source")) {
      return null;
    }

    const pixel = resolveImagePixel(element, x, y);
    if (!pixel || pixel.a < MIN_ALPHA) {
      return null;
    }

    return resolveToneFromImagePixel(pixel);
  }

  if (SKIP_TAGS.has(element.tagName)) {
    return null;
  }

  const rgba = resolveBackgroundColor(getComputedStyle(element));
  if (!rgba) {
    return null;
  }

  return resolveToneFromColor(rgba);
}

function getElementsFromPointBelowHeader(x: number, y: number): Element[] {
  const header = document.querySelector("header");
  const previousPointerEvents =
    header instanceof HTMLElement ? header.style.pointerEvents : null;

  if (header instanceof HTMLElement) {
    header.style.pointerEvents = "none";
  }

  const stack = document.elementsFromPoint(x, y);

  if (header instanceof HTMLElement) {
    header.style.pointerEvents = previousPointerEvents ?? "";
  }

  return stack;
}

function resolveMarkedBackdrop(
  marker: HTMLElement,
): boolean | null {
  const value = marker.dataset.headerBackdrop;

  if (value === "dark") {
    return true;
  }

  if (value === "light") {
    return false;
  }

  return null;
}

function getHeaderRect(): DOMRect | null {
  const header = document.querySelector("header");
  if (!(header instanceof HTMLElement)) {
    return null;
  }

  const rect = header.getBoundingClientRect();
  if (rect.height === 0) {
    return null;
  }

  return rect;
}

export function isHeaderFullyOverRect(rect: DOMRect): boolean {
  const headerRect = getHeaderRect();
  if (!headerRect) {
    return false;
  }

  return (
    headerRect.top >= rect.top && headerRect.bottom <= rect.bottom
  );
}

function resolveFullOverlapMarkedBackdrop(): boolean | null {
  const markers = document.querySelectorAll<HTMLElement>(
    '[data-header-backdrop][data-header-overlap="full"]',
  );

  let bestMarker: HTMLElement | null = null;
  let bestTop = -Infinity;

  for (const marker of markers) {
    const rect = marker.getBoundingClientRect();
    if (!isHeaderFullyOverRect(rect)) {
      continue;
    }

    if (rect.top > bestTop) {
      bestTop = rect.top;
      bestMarker = marker;
    }
  }

  if (!bestMarker) {
    return null;
  }

  return resolveMarkedBackdrop(bestMarker);
}

function getPartialOverlapFullMarker(x: number, y: number): HTMLElement | null {
  const markers = document.querySelectorAll<HTMLElement>(
    '[data-header-backdrop][data-header-overlap="full"]',
  );

  for (const marker of markers) {
    const rect = marker.getBoundingClientRect();
    if (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom &&
      !isHeaderFullyOverRect(rect)
    ) {
      return marker;
    }
  }

  return null;
}

export function getHeaderProbeCenterY(): number {
  const rect = getHeaderRect();
  if (!rect) {
    return HEADER_PROBE_YS[1];
  }

  return rect.top + rect.height * 0.5;
}

export function getHeaderProbeYs(): number[] {
  const rect = getHeaderRect();
  if (!rect) {
    return HEADER_PROBE_YS;
  }

  return HEADER_PROBE_RATIOS.map((ratio) => rect.top + rect.height * ratio);
}

export function isDarkBackdropAt(x: number, y: number): boolean {
  const stack = getElementsFromPointBelowHeader(x, y);
  const partialOverlapMarker = getPartialOverlapFullMarker(x, y);

  for (const element of stack) {
    if (!(element instanceof Element)) {
      continue;
    }

    if (element.closest("header")) {
      continue;
    }

    if (
      partialOverlapMarker &&
      element.closest("[data-header-backdrop][data-header-overlap=\"full\"]") ===
        partialOverlapMarker
    ) {
      continue;
    }

    const tone = resolveToneFromElement(element, x, y);
    if (tone !== null) {
      return tone === "dark";
    }
  }

  for (const element of stack) {
    if (!(element instanceof Element)) {
      continue;
    }

    if (element.closest("header")) {
      continue;
    }

    const backdropMarker = element.closest<HTMLElement>(
      "[data-header-backdrop]",
    );
    if (backdropMarker) {
      if (backdropMarker.dataset.headerOverlap === "full") {
        continue;
      }

      const marked = resolveMarkedBackdrop(backdropMarker);
      if (marked !== null) {
        return marked;
      }
    }
  }

  return false;
}

export function isDarkBackdropAtColumn(x: number): boolean {
  const fullOverlap = resolveFullOverlapMarkedBackdrop();
  if (fullOverlap !== null) {
    return fullOverlap;
  }

  return getHeaderProbeYs().some((y) => isDarkBackdropAt(x, y));
}
