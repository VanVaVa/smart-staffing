export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

export function parseRecordArray(value: unknown): Record<string, unknown>[] | null {
  if (!Array.isArray(value)) {
    return null;
  }
  if (!value.every(isRecord)) {
    return null;
  }
  return value;
}

export function cloneProps<T>(value: T): T {
  return structuredClone(value) as T;
}
