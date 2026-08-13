"use client";

import type { ReactNode } from "react";

import type { DocumentViewBlock } from "@/entities/landing/model/document-view-blocks";
import { getLandingPageSchema } from "@/entities/landing/lib/landing-page-registry";
import { documentPageSlug } from "@/entities/landing/model/landing-page-slugs";
import { AdminInlineEditLayer } from "@/features/admin-landing-editor";

import { DocumentViewBlockRenderer } from "./DocumentViewBlockRenderer";
import styles from "./DocumentViewPage.module.css";

export type DocumentViewPageMode = "view" | "edit";

type DocumentViewPageProps = {
  documentSlug: string;
  blocks: DocumentViewBlock[];
  mode?: DocumentViewPageMode;
  onBlockUpdate?: (block: DocumentViewBlock) => void;
  renderBlock?: (
    block: DocumentViewBlock,
    index: number,
    node: ReactNode,
  ) => ReactNode;
};

export function DocumentViewPage({
  documentSlug,
  blocks,
  mode = "view",
  onBlockUpdate,
  renderBlock,
}: DocumentViewPageProps) {
  const inlineEdit = mode === "edit" && Boolean(onBlockUpdate) && !renderBlock;
  const documentViewSchema = getLandingPageSchema(documentPageSlug(documentSlug));
  const block = blocks[0];

  if (!block || block.type !== "documentView") {
    return null;
  }

  let node = <DocumentViewBlockRenderer block={block} />;

  if (inlineEdit && onBlockUpdate) {
    node = (
      <AdminInlineEditLayer
        block={block}
        onUpdateBlock={onBlockUpdate}
        defaultCollectionItem={documentViewSchema.defaultCollectionItem}
      >
        {node}
      </AdminInlineEditLayer>
    );
  }

  if (renderBlock) {
    return <div key={block.id}>{renderBlock(block, 0, node)}</div>;
  }

  return <div className={styles["document-view-page"]}>{node}</div>;
}
