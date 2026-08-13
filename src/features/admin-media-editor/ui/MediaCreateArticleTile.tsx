"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./MediaCreateArticleTile.module.css";

export function MediaCreateArticleTile() {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    setCreating(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/media/articles", {
        method: "POST",
      });
      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Failed to create article");
      }
      const data = (await response.json()) as { adminPath: string };
      router.push(data.adminPath);
      router.refresh();
    } catch (createError) {
      setError(
        createError instanceof Error ? createError.message : "Failed to create article",
      );
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className={styles.tile}>
      <button
        type="button"
        className={styles.button}
        disabled={creating}
        onClick={handleCreate}
      >
        <span className={styles.icon} aria-hidden>
          +
        </span>
        <span className={styles.label}>
          {creating ? "Создание…" : "Создать статью"}
        </span>
      </button>
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
