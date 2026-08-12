"use client";

import type { ReactNode } from "react";

import type { HomeBlock, HomeBlockType } from "@/entities/landing";
import {
  AdminEditorToolbar,
  useHomePageDraft,
  PageStructureMenu,
} from "@/features/admin-home-editor";
import { HomePage } from "@/views/home";
import { PublicPageShell } from "@/widgets/public-page-shell";

import styles from "./AdminHomeEditorPage.module.css";

type AdminHomeEditorPageProps = {
  initialBlocks: HomeBlock[];
};

export function AdminHomeEditorPage({ initialBlocks }: AdminHomeEditorPageProps) {
  const {
    blocks,
    isDirty,
    saving,
    saveError,
    updateBlock,
    moveBlock,
    removeBlock,
    addBlock,
    save,
  } = useHomePageDraft(initialBlocks);

  function handleAddBlock(type: HomeBlockType, afterIndex: number) {
    addBlock(type, afterIndex);
  }

  return (
    <>
      <div className={styles["admin-home-editor__content"]}>
        <PublicPageShell>
          <HomePage
            blocks={blocks}
            mode="edit"
            onBlockUpdate={(block) => updateBlock(block.id, block)}
          />
        </PublicPageShell>
      </div>
      <AdminEditorToolbar
        isDirty={isDirty}
        saving={saving}
        saveError={saveError}
        onSave={save}
        structureMenu={
          <PageStructureMenu
            blocks={blocks}
            onMoveUp={(id) => moveBlock(id, "up")}
            onMoveDown={(id) => moveBlock(id, "down")}
            onRemove={removeBlock}
            onAdd={handleAddBlock}
          />
        }
      />
    </>
  );
}
