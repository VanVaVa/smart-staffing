export type TrustedMarqueeItem = {
  id: string;
  cellWidth: number;
  src: string;
  logoWidth: number;
  logoHeight: number;
};

const MARQUEE_TAIL = 1;
const MIN_MARQUEE_TILE_COUNT = 10;

function isTrustedMarqueeItem(value: unknown): value is TrustedMarqueeItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const item = value as TrustedMarqueeItem;
  return (
    typeof item.id === "string" &&
    typeof item.cellWidth === "number" &&
    typeof item.src === "string" &&
    typeof item.logoWidth === "number" &&
    typeof item.logoHeight === "number"
  );
}

export function unwrapStoredMarqueeItems(
  items: readonly unknown[],
): TrustedMarqueeItem[] {
  const parsed = items.filter(isTrustedMarqueeItem);
  const unique = (parsed.length - MARQUEE_TAIL) / 2;
  if (!Number.isInteger(unique) || unique < 1) {
    return parsed;
  }
  const looped = parsed.every(
    (item, index) => item.src === parsed[index % unique].src,
  );
  return looped ? parsed.slice(0, unique) : parsed;
}

export function expandMarqueeItems(
  unique: readonly TrustedMarqueeItem[],
  minTileCount = MIN_MARQUEE_TILE_COUNT,
): TrustedMarqueeItem[] {
  if (unique.length === 0) {
    return [];
  }

  let expanded: TrustedMarqueeItem[] = [...unique];
  while (expanded.length < minTileCount) {
    expanded = [
      ...expanded,
      ...unique.map((item, index) => ({
        ...item,
        id: `${item.id}-dup-${expanded.length + index}`,
      })),
    ];
  }

  return expanded;
}

export function normalizeMarqueeItems(
  items: readonly unknown[],
  minTileCount = MIN_MARQUEE_TILE_COUNT,
): TrustedMarqueeItem[] {
  return expandMarqueeItems(unwrapStoredMarqueeItems(items), minTileCount);
}
