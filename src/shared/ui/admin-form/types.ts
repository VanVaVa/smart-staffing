export type AdminValues = Record<string, unknown>;

export type AdminFieldOption = {
  value: string;
  label: string;
};

type AdminFieldCommon = {
  name: string;
  label: string;
  hint?: string;
  visibleWhen?: { field: string; equals: string };
};

export type AdminField =
  | (AdminFieldCommon & { kind: "text" })
  | (AdminFieldCommon & { kind: "textarea"; rows?: number })
  | (AdminFieldCommon & { kind: "number" })
  | (AdminFieldCommon & { kind: "checkbox" })
  | (AdminFieldCommon & { kind: "select"; options: AdminFieldOption[] })
  | (AdminFieldCommon & { kind: "date" })
  | (AdminFieldCommon & { kind: "image" })
  | (AdminFieldCommon & { kind: "file"; accept: string })
  | (AdminFieldCommon & { kind: "stringList"; addLabel: string; multiline?: boolean })
  | (AdminFieldCommon & { kind: "group"; fields: readonly AdminField[] })
  | (AdminFieldCommon & {
      kind: "list";
      addLabel: string;
      fields: readonly AdminField[];
      createItem: () => AdminValues;
      itemTitle?: (item: AdminValues, index: number) => string;
    });

export function isFieldVisible(field: AdminField, values: AdminValues): boolean {
  if (!field.visibleWhen) {
    return true;
  }
  return values[field.visibleWhen.field] === field.visibleWhen.equals;
}

export function emptyFieldValue(field: AdminField): unknown {
  switch (field.kind) {
    case "number":
      return 0;
    case "checkbox":
      return false;
    case "stringList":
    case "list":
      return [];
    case "group":
      return Object.fromEntries(
        field.fields.map((nested) => [nested.name, emptyFieldValue(nested)]),
      );
    default:
      return "";
  }
}

export function emptyValues(fields: readonly AdminField[]): AdminValues {
  return Object.fromEntries(fields.map((field) => [field.name, emptyFieldValue(field)]));
}
