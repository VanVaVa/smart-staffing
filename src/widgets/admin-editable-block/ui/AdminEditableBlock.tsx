"use client";

import type { ReactNode } from "react";

import { HOME_BLOCK_TYPE_LABELS, type HomeBlock } from "@/entities/landing";
import { Button } from "@/shared/ui/button";

import styles from "./AdminEditableBlock.module.css";

type AdminEditableBlockProps = {
  block: HomeBlock;
  index: number;
  total: number;
  onEdit: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  children: ReactNode;
};

export function AdminEditableBlock({
  block,
  index,
  total,
  onEdit,
  onMoveUp,
  onMoveDown,
  onDelete,
  children,
}: AdminEditableBlockProps) {
  function handleDelete() {
    if (window.confirm(`Удалить блок «${HOME_BLOCK_TYPE_LABELS[block.type]}»?`)) {
      onDelete();
    }
  }

  return (
    <div className={styles["admin-editable-block"]}>
      <div className={styles["admin-editable-block__toolbar"]}>
        <span className={styles["admin-editable-block__label"]}>
          {HOME_BLOCK_TYPE_LABELS[block.type]}
        </span>
        <div className={styles["admin-editable-block__actions"]}>
          <Button variant="ghost" size="sm" type="button" onClick={onEdit}>
            Изменить
          </Button>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            disabled={index === 0}
            onClick={onMoveUp}
          >
            Вверх
          </Button>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            disabled={index >= total - 1}
            onClick={onMoveDown}
          >
            Вниз
          </Button>
          <Button variant="ghost" size="sm" type="button" onClick={handleDelete}>
            Удалить
          </Button>
        </div>
      </div>
      <div className={styles["admin-editable-block__content"]}>{children}</div>
    </div>
  );
}
