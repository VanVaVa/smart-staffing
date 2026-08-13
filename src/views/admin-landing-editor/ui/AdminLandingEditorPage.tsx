"use client";

import type { ReactNode } from "react";

import {
  AdminEditorToolbar,
  AdminInlineEditLayer,
  PageStructureMenu,
  useLandingPageDraft,
  type LandingPageDraftConfig,
} from "@/features/admin-landing-editor";
import type { LandingPageSchema } from "@/entities/landing/lib/landing-page-registry";
import { getAdminPageLabel, getPublicPagePath } from "@/entities/landing/lib/landing-page-registry";
import type { LandingBlockLike } from "@/shared/ui/editable-field";
import { PublicPageShell } from "@/widgets/public-page-shell";

import styles from "./AdminLandingEditorPage.module.css";

type AdminLandingEditorPageProps<
  TBlock extends LandingBlockLike,
  TBlockType extends string,
> = {
  slug: string;
  initialBlocks: TBlock[];
  draftConfig: LandingPageDraftConfig<TBlock, TBlockType>;
  pageSchema: Pick<
    LandingPageSchema,
    "blockTypes" | "blockTypeLabels" | "defaultCollectionItem"
  >;
  allowAddRemove?: boolean;
  prepareCollectionItem?: (
    block: TBlock,
    arrayPath: string,
    collectionKey: string,
    item: unknown,
  ) => unknown;
  toolbarExtra?: ReactNode;
  renderPage: (props: {
    blocks: TBlock[];
    mode: "edit";
    renderBlock: (
      block: TBlock,
      index: number,
      node: ReactNode,
    ) => ReactNode;
    onBlockUpdate: (block: TBlock) => void;
  }) => ReactNode;
};

export function AdminLandingEditorPage<
  TBlock extends LandingBlockLike,
  TBlockType extends string,
>({
  slug,
  initialBlocks,
  draftConfig,
  pageSchema,
  allowAddRemove = true,
  prepareCollectionItem,
  toolbarExtra,
  renderPage,
}: AdminLandingEditorPageProps<TBlock, TBlockType>) {
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
  } = useLandingPageDraft(initialBlocks, draftConfig);

  function handleAddBlock(type: TBlockType, afterIndex: number) {
    addBlock(type, afterIndex);
  }

  function renderBlock(
    block: TBlock,
    index: number,
    node: ReactNode,
  ): ReactNode {
    return (
      <AdminInlineEditLayer
        key={block.id}
        block={block}
        onUpdateBlock={(next) => updateBlock(block.id, next)}
        defaultCollectionItem={pageSchema.defaultCollectionItem}
        prepareCollectionItem={prepareCollectionItem}
      >
        {node}
      </AdminInlineEditLayer>
    );
  }

  return (
    <>
      <div className={styles["admin-landing-editor__content"]}>
        <PublicPageShell>
          {renderPage({
            blocks,
            mode: "edit",
            renderBlock,
            onBlockUpdate: (block) => updateBlock(block.id, block),
          })}
        </PublicPageShell>
      </div>
      <AdminEditorToolbar
        pageLabel={getAdminPageLabel(slug)}
        publicHref={getPublicPagePath(slug)}
        isDirty={isDirty}
        saving={saving}
        saveError={saveError}
        onSave={save}
        extraActions={toolbarExtra}
        structureMenu={
          <PageStructureMenu
            blocks={blocks}
            blockTypeLabels={pageSchema.blockTypeLabels as Record<TBlockType, string>}
            blockTypes={pageSchema.blockTypes as readonly TBlockType[]}
            allowAddRemove={allowAddRemove}
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
