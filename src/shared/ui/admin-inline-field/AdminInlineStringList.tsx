"use client";

import { AdminInlineText } from "./AdminInlineText";

import styles from "./AdminInlineStringList.module.css";

type AdminInlineStringListProps = {
  items: string[];
  onChange: (items: string[]) => void;
  disabled?: boolean;
  addLabel?: string;
  itemClassName?: string;
};

export function AdminInlineStringList({
  items,
  onChange,
  disabled,
  addLabel = "Добавить",
  itemClassName,
}: AdminInlineStringListProps) {
  const safeItems = items.length > 0 ? items : [""];

  function replace(index: number, value: string) {
    onChange(safeItems.map((item, itemIndex) => (itemIndex === index ? value : item)));
  }

  function remove(index: number) {
    const next = safeItems.filter((_, itemIndex) => itemIndex !== index);
    onChange(next.length > 0 ? next : [""]);
  }

  return (
    <>
      <ul className={styles["admin-inline-string-list"]}>
        {safeItems.map((item, index) => (
          <li key={index} className={styles["admin-inline-string-list__item"]}>
            <AdminInlineText
              className={[
                styles["admin-inline-string-list__input"],
                itemClassName,
              ]
                .filter(Boolean)
                .join(" ")}
              value={item}
              disabled={disabled}
              onChange={(value) => replace(index, value)}
            />
            <button
              type="button"
              className={styles["admin-inline-string-list__remove"]}
              disabled={disabled || safeItems.length <= 1}
              onClick={() => remove(index)}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={styles["admin-inline-string-list__add"]}
        disabled={disabled}
        onClick={() => onChange([...safeItems, ""])}
      >
        + {addLabel}
      </button>
    </>
  );
}
