"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/shared/ui/button";

import styles from "./AdminEditorToolbar.module.css";

type AdminEditorToolbarProps = {
  pageLabel: string;
  publicHref?: string;
  isDirty: boolean;
  saving: boolean;
  saveError: string | null;
  onSave: () => void;
  structureMenu?: ReactNode;
  extraActions?: ReactNode;
};

export function AdminEditorToolbar({
  pageLabel,
  publicHref = "/",
  isDirty,
  saving,
  saveError,
  onSave,
  structureMenu,
  extraActions,
}: AdminEditorToolbarProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className={styles["admin-editor-toolbar"]}>
      <div className={styles["admin-editor-toolbar__inner"]}>
        <span className={styles["admin-editor-toolbar__label"]}>
          Редактор: {pageLabel}
          {isDirty ? (
            <span className={styles["admin-editor-toolbar__dirty"]}>
              · есть несохранённые изменения
            </span>
          ) : null}
        </span>
        <div className={styles["admin-editor-toolbar__actions"]}>
          {extraActions}
          {structureMenu}
          {saveError ? (
            <span className={styles["admin-editor-toolbar__error"]} role="alert">
              {saveError}
            </span>
          ) : null}
          <Button variant="secondary" size="sm" href="/admin">
            Все страницы
          </Button>
          <Button variant="secondary" size="sm" href={publicHref}>
            Открыть сайт
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="button"
            disabled={!isDirty || saving}
            onClick={onSave}
          >
            {saving ? "Сохранение…" : "Сохранить"}
          </Button>
          <Button variant="secondary" size="sm" type="button" onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      </div>
    </div>
  );
}
