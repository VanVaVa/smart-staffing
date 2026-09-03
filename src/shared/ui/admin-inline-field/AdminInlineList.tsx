"use client";

import type { AdminValues } from "@/shared/ui/admin-form";

import { AdminInlineImage } from "./AdminInlineImage";
import { AdminInlineText } from "./AdminInlineText";

import styles from "./AdminInlineList.module.css";

type AdminInlineListProps = {
  items: AdminValues[];
  onChange: (items: AdminValues[]) => void;
  disabled?: boolean;
  addLabel?: string;
  createItem: () => AdminValues;
  itemTitle?: (item: AdminValues, index: number) => string;
};

function textValue(values: AdminValues, key: string): string {
  return typeof values[key] === "string" ? values[key] : "";
}

function numberField(values: AdminValues, key: string): number {
  return typeof values[key] === "number" ? values[key] : 0;
}

export function AdminInlineList({
  items,
  onChange,
  disabled,
  addLabel = "Добавить",
  createItem,
  itemTitle,
}: AdminInlineListProps) {
  function replace(index: number, patch: AdminValues) {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  }

  function remove(index: number) {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div className={styles["admin-inline-list"]}>
      {items.map((item, index) => (
        <div key={index} className={styles["admin-inline-list__item"]}>
          <div className={styles["admin-inline-list__header"]}>
            <p className={styles["admin-inline-list__title"]}>
              {itemTitle?.(item, index) ?? `Элемент ${index + 1}`}
            </p>
            <button
              type="button"
              className={styles["admin-inline-list__remove"]}
              disabled={disabled}
              onClick={() => remove(index)}
            >
              Удалить
            </button>
          </div>
          <div className={styles["admin-inline-list__fields"]}>
            <AdminInlineText
              value={textValue(item, "title")}
              disabled={disabled}
              placeholder="Заголовок"
              onChange={(title) => replace(index, { title })}
            />
            <AdminInlineImage
              imageSrc={textValue(item, "imageSrc")}
              imageWidth={numberField(item, "imageWidth")}
              imageHeight={numberField(item, "imageHeight")}
              disabled={disabled}
              onChange={(patch) => replace(index, { imageSrc: patch.imageSrc })}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        className={styles["admin-inline-list__add"]}
        disabled={disabled}
        onClick={() => onChange([...items, createItem()])}
      >
        + {addLabel}
      </button>
    </div>
  );
}
