"use client";

import type { ReactNode } from "react";

import type { ClientsBlock } from "@/entities/landing/model/clients-blocks";
import { getLandingPageSchema } from "@/entities/landing/lib/landing-page-registry";
import { clientsPageSlug } from "@/entities/landing/model/landing-page-slugs";
import type { ClientSegmentSlug } from "@/entities/landing/model/clients-content";
import { AdminInlineEditLayer } from "@/features/admin-landing-editor";

import { ClientsBlockRenderer } from "./ClientsBlockRenderer";
import styles from "./ClientsPage.module.css";

export type ClientsPageMode = "view" | "edit";

type ClientsPageProps = {
  blocks: ClientsBlock[];
  segment: ClientSegmentSlug;
  mode?: ClientsPageMode;
  onBlockUpdate?: (block: ClientsBlock) => void;
  renderBlock?: (block: ClientsBlock, index: number, node: ReactNode) => ReactNode;
};

export function ClientsPage({
  blocks,
  segment,
  mode = "view",
  onBlockUpdate,
  renderBlock,
}: ClientsPageProps) {
  const clientsSchema = getLandingPageSchema(clientsPageSlug(segment));
  const inlineEdit = mode === "edit" && Boolean(onBlockUpdate) && !renderBlock;

  return (
    <div className={styles["clients-page"]}>
      {blocks.map((block, index) => {
        let node = <ClientsBlockRenderer block={block} segment={segment} />;
        if (inlineEdit && onBlockUpdate) {
          node = (
            <AdminInlineEditLayer
              block={block}
              onUpdateBlock={onBlockUpdate}
              defaultCollectionItem={clientsSchema.defaultCollectionItem}
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
