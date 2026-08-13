"use client";

import type { ReactNode } from "react";

import type { DocumentsBlock } from "@/entities/landing/model/documents-blocks";
import { getLandingPageSchema } from "@/entities/landing/lib/landing-page-registry";
import { LANDING_PAGE_SLUGS } from "@/entities/landing/model/landing-page-slugs";
import { AdminInlineEditLayer } from "@/features/admin-landing-editor";

import { DocumentsBlockRenderer } from "./DocumentsBlockRenderer";
import styles from "./DocumentsPage.module.css";

export type DocumentsPageMode = "view" | "edit";

type DocumentsPageProps = {
  blocks: DocumentsBlock[];
  mode?: DocumentsPageMode;
  onBlockUpdate?: (block: DocumentsBlock) => void;
  renderBlock?: (
    block: DocumentsBlock,
    index: number,
    node: ReactNode,
  ) => ReactNode;
};

const documentsSchema = getLandingPageSchema(LANDING_PAGE_SLUGS.documents);

export function DocumentsPage({
  blocks,
  mode = "view",
  onBlockUpdate,
  renderBlock,
}: DocumentsPageProps) {
  const inlineEdit = mode === "edit" && Boolean(onBlockUpdate) && !renderBlock;

  return (
    <div className={styles["documents-page"]}>
      {blocks.map((block, index) => {
        let node = <DocumentsBlockRenderer block={block} />;
        if (inlineEdit && onBlockUpdate) {
          node = (
            <AdminInlineEditLayer
              block={block}
              onUpdateBlock={onBlockUpdate}
              defaultCollectionItem={documentsSchema.defaultCollectionItem}
            >
              {node}
            </AdminInlineEditLayer>
          );
        }
        if (renderBlock) {
          return <div key={block.id}>{renderBlock(block, index, node)}</div>;
        }
        return <div key={block.id}>{node}</div>;
      })}
    </div>
  );
}
