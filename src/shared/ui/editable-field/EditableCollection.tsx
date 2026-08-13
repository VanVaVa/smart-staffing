"use client";

import type { ReactNode } from "react";

import { useAdminBlockEditOptional } from "./context";
import styles from "./EditableCollection.module.css";

type EditableCollectionAddProps = {
  arrayPath: string;
  collectionKey: string;
  addLabel: string;
  className?: string;
  variant?: "inline" | "grid-span";
};

export function EditableCollectionAdd({
  arrayPath,
  collectionKey,
  addLabel,
  className,
  variant,
}: EditableCollectionAddProps) {
  const blockEdit = useAdminBlockEditOptional();

  if (!blockEdit) {
    return null;
  }

  const variantClass = variant ? styles[`editable-collection__add--${variant}`] : "";

  return (
    <button
      type="button"
      className={[styles["editable-collection__add"], variantClass, className]
        .filter(Boolean)
        .join(" ")}
      onClick={() => blockEdit.addArrayItem(arrayPath, collectionKey)}
    >
      + {addLabel}
    </button>
  );
}

type EditableCollectionItemProps = {
  arrayPath: string;
  index: number;
  children: ReactNode;
  className?: string;
  variant?: "segment" | "carousel-card" | "feature-row" | "case-study" | "benefit" | "step" | "step-inline" | "leadership" | "list-entry";
};

export function EditableCollectionItem({
  arrayPath,
  index,
  children,
  className,
  variant,
}: EditableCollectionItemProps) {
  const blockEdit = useAdminBlockEditOptional();

  if (!blockEdit) {
    return <>{children}</>;
  }

  const variantClass = variant ? styles[`editable-collection-item--${variant}`] : "";

  return (
    <div
      className={[className, styles["editable-collection-item"], variantClass]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles["editable-collection-item__content"]}>{children}</div>
      <button
        type="button"
        className={styles["editable-collection-item__remove"]}
        aria-label="Удалить элемент"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (window.confirm("Удалить этот элемент?")) {
            blockEdit.removeArrayItem(arrayPath, index);
          }
        }}
      >
        ✕
      </button>
    </div>
  );
}
