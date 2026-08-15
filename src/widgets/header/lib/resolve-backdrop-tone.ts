type Rgba = {
  r: number;
  g: number;
  b: number;
  a: number;
};

const LUMINANCE_DARK_THRESHOLD = 0.45;
const MIN_ALPHA = 0.5;

const SKIP_TAGS = new Set(["IMG", "VIDEO", "SVG", "PICTURE", "IFRAME", "CANVAS"]);

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

function resolveToneFromElement(element: Element): "light" | "dark" | null {
  if (SKIP_TAGS.has(element.tagName)) {
    return null;
  }

  const rgba = resolveBackgroundColor(getComputedStyle(element));
  if (!rgba) {
    return null;
  }

  return relativeLuminance(rgba) < LUMINANCE_DARK_THRESHOLD ? "dark" : "light";
}

export function isDarkBackdropAt(x: number, y: number): boolean {
  const stack = document.elementsFromPoint(x, y);

  for (const element of stack) {
    if (!(element instanceof Element)) {
      continue;
    }

    if (element.closest("header")) {
      continue;
    }

    if (element.closest("[data-header-backdrop='dark']")) {
      return true;
    }

    if (resolveToneFromElement(element) === "dark") {
      return true;
    }
  }

  return false;
}
