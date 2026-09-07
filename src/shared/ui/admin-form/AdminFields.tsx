"use client";

import { useState } from "react";

import { uploadAdminMedia } from "@/shared/lib/upload-admin-media";
import { AdminRichTextEditor } from "@/shared/ui/admin-rich-text";

import { AdminDatePicker } from "./AdminDatePicker";
import { AdminSelect } from "./AdminSelect";
import styles from "./AdminFields.module.css";
import {
  emptyValues,
  isFieldVisible,
  type AdminField,
  type AdminValues,
} from "./types";

type AdminFieldsProps = {
  fields: readonly AdminField[];
  values: AdminValues;
  onChange: (values: AdminValues) => void;
  disabled?: boolean;
};

export function AdminFields({ fields, values, onChange, disabled }: AdminFieldsProps) {
  return (
    <div className={styles.fields}>
      {fields.filter((field) => isFieldVisible(field, values)).map((field) => (
        <AdminFieldControl
          key={field.name}
          field={field}
          value={values[field.name]}
          onChange={(next) => onChange({ ...values, [field.name]: next })}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

type AdminFieldControlProps = {
  field: AdminField;
  value: unknown;
  onChange: (value: unknown) => void;
  disabled?: boolean;
};

function AdminFieldControl({ field, value, onChange, disabled }: AdminFieldControlProps) {
  if (field.kind === "group") {
    return (
      <fieldset className={styles.group} disabled={disabled}>
        <legend className={styles.groupLegend}>{field.label}</legend>
        {field.hint ? <p className={styles.hint}>{field.hint}</p> : null}
        <AdminFields
          fields={field.fields}
          values={asValues(value)}
          onChange={onChange}
          disabled={disabled}
        />
      </fieldset>
    );
  }

  if (field.kind === "list") {
    return (
      <ListField field={field} value={value} onChange={onChange} disabled={disabled} />
    );
  }

  if (field.kind === "stringList") {
    return (
      <StringListField
        field={field}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    );
  }

  return (
    <label className={styles.field}>
      <span className={styles.label}>{field.label}</span>
      {field.hint ? <span className={styles.hint}>{field.hint}</span> : null}
      <ScalarControl
        field={field}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </label>
  );
}

type ScalarField = Exclude<AdminField, { kind: "group" } | { kind: "list" } | { kind: "stringList" }>;

function ScalarControl({
  field,
  value,
  onChange,
  disabled,
}: {
  field: ScalarField;
  value: unknown;
  onChange: (value: unknown) => void;
  disabled?: boolean;
}) {
  if (field.kind === "richtext") {
    return (
      <AdminRichTextEditor
        value={asString(value)}
        minHeight={field.minHeight}
        disabled={disabled}
        onChange={onChange}
      />
    );
  }

  if (field.kind === "textarea") {
    return (
      <textarea
        className={styles.textarea}
        rows={field.rows ?? 4}
        value={asString(value)}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  if (field.kind === "number") {
    return (
      <input
        className={styles.input}
        type="number"
        value={asString(value)}
        disabled={disabled}
        onChange={(event) => onChange(event.target.valueAsNumber || 0)}
      />
    );
  }

  if (field.kind === "checkbox") {
    return (
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={value === true}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
    );
  }

  if (field.kind === "select") {
    return (
      <AdminSelect
        value={asString(value)}
        options={field.options}
        disabled={disabled}
        onChange={onChange}
      />
    );
  }

  if (field.kind === "date") {
    return (
      <AdminDatePicker
        value={asString(value)}
        disabled={disabled}
        onChange={onChange}
      />
    );
  }

  if (field.kind === "image" || field.kind === "file") {
    return (
      <MediaControl
        accept={field.kind === "image" ? (field.accept ?? "image/*,.svg") : field.accept}
        preview={field.kind === "image"}
        value={asString(value)}
        onChange={onChange}
        disabled={disabled}
      />
    );
  }

  return (
    <input
      className={styles.input}
      type="text"
      value={asString(value)}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function MediaControl({
  accept,
  preview,
  value,
  onChange,
  disabled,
}: {
  accept: string;
  preview: boolean;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setUploading(true);
    setError(null);
    try {
      onChange(await uploadAdminMedia(file));
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Не удалось загрузить файл",
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <span className={styles.media}>
      <span className={styles.mediaRow}>
        <input
          className={styles.input}
          type="text"
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
        />
        <span className={styles.upload}>
          <input
            className={styles.uploadInput}
            type="file"
            accept={accept}
            disabled={disabled || uploading}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void upload(file);
              }
              event.target.value = "";
            }}
          />
          {uploading ? "Загрузка…" : "Загрузить"}
        </span>
      </span>
      {error ? <span className={styles.error}>{error}</span> : null}
      {preview && value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.preview} src={value} alt="" />
      ) : null}
    </span>
  );
}

function StringListField({
  field,
  value,
  onChange,
  disabled,
}: {
  field: Extract<AdminField, { kind: "stringList" }>;
  value: unknown;
  onChange: (value: unknown) => void;
  disabled?: boolean;
}) {
  const items = asStringArray(value);

  function replace(index: number, next: string) {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? next : item)));
  }

  return (
    <div className={styles.list}>
      <span className={styles.label}>{field.label}</span>
      {field.hint ? <span className={styles.hint}>{field.hint}</span> : null}
      {items.map((item, index) => (
        <div key={index} className={styles.stringRow}>
          {field.multiline ? (
            <textarea
              className={styles.textarea}
              rows={3}
              value={item}
              disabled={disabled}
              onChange={(event) => replace(index, event.target.value)}
            />
          ) : (
            <input
              className={styles.input}
              type="text"
              value={item}
              disabled={disabled}
              onChange={(event) => replace(index, event.target.value)}
            />
          )}
          <ItemActions
            index={index}
            total={items.length}
            disabled={disabled}
            onMove={(to) => onChange(moveItem(items, index, to))}
            onRemove={() => onChange(items.filter((_, i) => i !== index))}
          />
        </div>
      ))}
      <button
        type="button"
        className={styles.add}
        disabled={disabled}
        onClick={() => onChange([...items, ""])}
      >
        + {field.addLabel}
      </button>
    </div>
  );
}

function ListField({
  field,
  value,
  onChange,
  disabled,
}: {
  field: Extract<AdminField, { kind: "list" }>;
  value: unknown;
  onChange: (value: unknown) => void;
  disabled?: boolean;
}) {
  const items = asValuesArray(value);

  return (
    <div className={styles.list}>
      <span className={styles.label}>{field.label}</span>
      {field.hint ? <span className={styles.hint}>{field.hint}</span> : null}
      {items.map((item, index) => (
        <div key={index} className={styles.listItem}>
          <div className={styles.listItemHeader}>
            <span className={styles.listItemTitle}>
              {field.itemTitle?.(item, index) ?? `${field.addLabel} ${index + 1}`}
            </span>
            <ItemActions
              index={index}
              total={items.length}
              disabled={disabled}
              onMove={(to) => onChange(moveItem(items, index, to))}
              onRemove={() => onChange(items.filter((_, i) => i !== index))}
            />
          </div>
          <AdminFields
            fields={field.fields}
            values={item}
            onChange={(next) =>
              onChange(items.map((current, i) => (i === index ? next : current)))
            }
            disabled={disabled}
          />
        </div>
      ))}
      <button
        type="button"
        className={styles.add}
        disabled={disabled}
        onClick={() =>
          onChange([...items, { ...emptyValues(field.fields), ...field.createItem() }])
        }
      >
        + {field.addLabel}
      </button>
    </div>
  );
}

function ItemActions({
  index,
  total,
  disabled,
  onMove,
  onRemove,
}: {
  index: number;
  total: number;
  disabled?: boolean;
  onMove: (to: number) => void;
  onRemove: () => void;
}) {
  return (
    <span className={styles.itemActions}>
      <button
        type="button"
        className={styles.itemAction}
        aria-label="Выше"
        disabled={disabled || index === 0}
        onClick={() => onMove(index - 1)}
      >
        ↑
      </button>
      <button
        type="button"
        className={styles.itemAction}
        aria-label="Ниже"
        disabled={disabled || index === total - 1}
        onClick={() => onMove(index + 1)}
      >
        ↓
      </button>
      <button
        type="button"
        className={styles.itemRemove}
        aria-label="Удалить"
        disabled={disabled}
        onClick={onRemove}
      >
        ✕
      </button>
    </span>
  );
}

function moveItem<T>(items: T[], from: number, to: number): T[] {
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

function asString(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}

function asValues(value: unknown): AdminValues {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as AdminValues)
    : {};
}

function asValuesArray(value: unknown): AdminValues[] {
  return Array.isArray(value) ? value.map(asValues) : [];
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map(asString) : [];
}
