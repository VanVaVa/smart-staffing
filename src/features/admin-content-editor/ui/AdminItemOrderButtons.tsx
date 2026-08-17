"use client";

import { useTransition } from "react";

import { moveItemAction } from "../model/actions";

import styles from "./AdminItemOrderButtons.module.css";

type AdminItemOrderButtonsProps = {
  sectionKey: string;
  itemId: string;
  isFirst: boolean;
  isLast: boolean;
};

export function AdminItemOrderButtons({
  sectionKey,
  itemId,
  isFirst,
  isLast,
}: AdminItemOrderButtonsProps) {
  const [pending, startTransition] = useTransition();

  function move(direction: "up" | "down") {
    startTransition(async () => {
      await moveItemAction(sectionKey, itemId, direction);
    });
  }

  return (
    <span className={styles.buttons}>
      <button
        type="button"
        className={styles.button}
        aria-label="Выше"
        disabled={pending || isFirst}
        onClick={() => move("up")}
      >
        ↑
      </button>
      <button
        type="button"
        className={styles.button}
        aria-label="Ниже"
        disabled={pending || isLast}
        onClick={() => move("down")}
      >
        ↓
      </button>
    </span>
  );
}
