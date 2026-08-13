"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { MediaArticle } from "@/entities/landing";

import { MediaCard } from "@/widgets/media-section/ui/media-card";

import styles from "./MediaAdminArticleCard.module.css";

type MediaAdminArticleCardProps = {
  article: MediaArticle;
};

export function MediaAdminArticleCard({ article }: MediaAdminArticleCardProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (!window.confirm(`Удалить статью «${article.title}»?`)) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/media/articles/${article.slug}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Failed to delete article");
      }
      router.refresh();
    } catch (deleteError) {
      window.alert(
        deleteError instanceof Error ? deleteError.message : "Failed to delete article",
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <MediaCard article={article} href={`/admin/media/${article.slug}`} />
      <button
        type="button"
        className={styles.delete}
        disabled={deleting}
        aria-label={`Удалить статью «${article.title}»`}
        onClick={handleDelete}
      >
        {deleting ? "…" : "✕"}
      </button>
    </div>
  );
}
