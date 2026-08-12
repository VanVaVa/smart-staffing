"use client";

import {
  HOME_BLOCK_TYPES,
  HOME_BLOCK_TYPE_LABELS,
  type HomeBlockType,
} from "@/entities/landing";

import styles from "./AddBlockInsert.module.css";

type AddBlockInsertProps = {
  onAdd: (type: HomeBlockType) => void;
};

export function AddBlockInsert({ onAdd }: AddBlockInsertProps) {
  return (
    <div className={styles["add-block-insert"]}>
      <span className={styles["add-block-insert__label"]}>Добавить блок</span>
      <div className={styles["add-block-insert__types"]}>
        {HOME_BLOCK_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            className={styles["add-block-insert__type"]}
            onClick={() => onAdd(type)}
          >
            {HOME_BLOCK_TYPE_LABELS[type]}
          </button>
        ))}
      </div>
    </div>
  );
}
