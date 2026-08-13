import type { LandingBlockLike } from "./types";

function cloneBlock<TBlock extends LandingBlockLike>(block: TBlock): TBlock {
  return structuredClone(block) as TBlock;
}

function setNestedValue(
  target: Record<string, unknown>,
  segments: string[],
  value: unknown,
): void {
  if (segments.length === 0) {
    return;
  }

  const [head, ...tail] = segments;
  if (tail.length === 0) {
    target[head] = value;
    return;
  }

  const index = Number(head);
  const current = target[head];
  if (Array.isArray(current) && !Number.isNaN(index)) {
    const next = [...current] as unknown[];
    const item = next[index];
    if (typeof item === "object" && item !== null && !Array.isArray(item)) {
      const copy = { ...(item as Record<string, unknown>) };
      setNestedValue(copy, tail, value);
      next[index] = copy;
      target[head] = next;
    }
    return;
  }

  if (typeof current === "object" && current !== null && !Array.isArray(current)) {
    const copy = { ...(current as Record<string, unknown>) };
    setNestedValue(copy, tail, value);
    target[head] = copy;
  }
}

export function updateBlockField<TBlock extends LandingBlockLike>(
  block: TBlock,
  path: string,
  value: unknown,
): TBlock {
  const next = cloneBlock(block);
  const props = next.props as Record<string, unknown>;
  setNestedValue(props, path.split("."), value);
  return next;
}

function readNestedValue(props: Record<string, unknown>, segments: string[]): unknown {
  let current: unknown = props;
  for (const segment of segments) {
    if (current === null || current === undefined) {
      return undefined;
    }
    if (Array.isArray(current)) {
      const index = Number(segment);
      current = current[index];
      continue;
    }
    if (typeof current === "object") {
      current = (current as Record<string, unknown>)[segment];
    } else {
      return undefined;
    }
  }
  return current;
}

export function addBlockArrayItem<TBlock extends LandingBlockLike>(
  block: TBlock,
  arrayPath: string,
  item: unknown,
): TBlock {
  const next = cloneBlock(block);
  const props = next.props as Record<string, unknown>;
  const segments = arrayPath.split(".");
  const current = readNestedValue(props, segments);
  const list = Array.isArray(current) ? [...current] : [];
  list.push(item);
  setNestedValue(props, segments, list);
  return next;
}

export function removeBlockArrayItem<TBlock extends LandingBlockLike>(
  block: TBlock,
  arrayPath: string,
  index: number,
): TBlock {
  const next = cloneBlock(block);
  const props = next.props as Record<string, unknown>;
  const segments = arrayPath.split(".");
  const current = readNestedValue(props, segments);
  if (!Array.isArray(current) || index < 0 || index >= current.length) {
    return next;
  }
  const list = current.filter((_, itemIndex) => itemIndex !== index);
  setNestedValue(props, segments, list);
  return next;
}

export function readBlockField<TBlock extends LandingBlockLike>(
  block: TBlock,
  path: string,
): string {
  const segments = path.split(".");
  let current: unknown = block.props;

  for (const segment of segments) {
    if (current === null || current === undefined) {
      return "";
    }
    if (Array.isArray(current)) {
      const index = Number(segment);
      current = current[index];
      continue;
    }
    if (typeof current === "object") {
      current = (current as Record<string, unknown>)[segment];
    } else {
      return "";
    }
  }

  return typeof current === "string" ? current : "";
}

export const updateHomeBlockField = updateBlockField;
export const addHomeBlockArrayItem = addBlockArrayItem;
export const removeHomeBlockArrayItem = removeBlockArrayItem;
export const readHomeBlockField = readBlockField;
