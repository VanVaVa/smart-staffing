const QUOTE_STYLE_KEYS = [
  "fontFamily",
  "fontSize",
  "fontWeight",
  "fontStyle",
  "letterSpacing",
  "lineHeight",
  "wordSpacing",
  "textTransform",
  "overflowWrap",
  "hyphens",
] as const;

function createQuoteProbe(source: HTMLElement): HTMLElement {
  const probe = source.cloneNode(true) as HTMLElement;
  const sourceStyles = getComputedStyle(source);

  probe.style.position = "fixed";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  probe.style.left = "-9999px";
  probe.style.top = "0";
  probe.style.margin = "0";
  probe.style.boxSizing = "border-box";
  probe.style.display = "block";
  probe.style.whiteSpace = "normal";
  probe.style.maxHeight = "none";
  probe.style.overflow = "visible";
  probe.style.setProperty("-webkit-line-clamp", "unset");
  probe.style.setProperty("line-clamp", "unset");

  for (const key of QUOTE_STYLE_KEYS) {
    probe.style[key] = sourceStyles[key];
  }

  document.body.appendChild(probe);

  return probe;
}

function measureQuoteHeight(probe: HTMLElement, width: number): number {
  probe.style.width = `${width}px`;

  return probe.getBoundingClientRect().height;
}

export function measureTestimonialExpandedWidth(
  quote: HTMLElement,
  collapsedWidth: number,
  maxWidth: number,
): number {
  const minWidth = Math.min(collapsedWidth, maxWidth);
  const cappedMaxWidth = Math.max(minWidth, maxWidth);
  const probe = createQuoteProbe(quote);

  try {
    const fullHeight = measureQuoteHeight(probe, cappedMaxWidth);

    if (fullHeight === 0) {
      return minWidth;
    }

    let low = minWidth;
    let high = cappedMaxWidth;
    let best = cappedMaxWidth;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const height = measureQuoteHeight(probe, mid);

      if (height <= fullHeight + 0.5) {
        best = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    return Math.max(minWidth, best);
  } finally {
    probe.remove();
  }
}

function getCardContentWidth(card: HTMLElement): number {
  const cardStyles = getComputedStyle(card);
  const paddingLeft = parseFloat(cardStyles.paddingLeft) || 0;
  const paddingRight = parseFloat(cardStyles.paddingRight) || 0;

  return card.getBoundingClientRect().width - paddingLeft - paddingRight;
}

export function measureTestimonialQuoteHeight(
  quote: HTMLElement,
  contentWidth: number,
): number {
  const probe = createQuoteProbe(quote);

  try {
    return Math.ceil(measureQuoteHeight(probe, contentWidth));
  } finally {
    probe.remove();
  }
}

export function measureTestimonialExpandedHeight(
  card: HTMLElement,
  quote: HTMLElement,
): number {
  const cardStyles = getComputedStyle(card);
  const body = card.firstElementChild as HTMLElement | null;
  const header = body?.firstElementChild as HTMLElement | null;
  const bodyStyles = body ? getComputedStyle(body) : null;
  const paddingTop = parseFloat(cardStyles.paddingTop) || 0;
  const paddingBottom = parseFloat(cardStyles.paddingBottom) || 0;
  const gap = bodyStyles ? parseFloat(bodyStyles.rowGap) || parseFloat(bodyStyles.gap) || 0 : 0;
  const headerHeight = header?.getBoundingClientRect().height ?? 0;
  const contentWidth = getCardContentWidth(card);
  const quoteHeight = measureTestimonialQuoteHeight(quote, contentWidth);

  return Math.ceil(paddingTop + paddingBottom + headerHeight + gap + quoteHeight);
}

export function getTestimonialExpandedMaxWidth(): number {
  const containerPadding =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--container-padding")) || 0;

  return Math.min(909, window.innerWidth - containerPadding * 2);
}
