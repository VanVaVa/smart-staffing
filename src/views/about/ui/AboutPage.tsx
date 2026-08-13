"use client";

import type { ReactNode } from "react";

import type { AboutBlock } from "@/entities/landing/model/about-blocks";
import {
  AdminInlineEditLayer,
} from "@/features/admin-landing-editor";
import { getLandingPageSchema } from "@/entities/landing/lib/landing-page-registry";
import { LANDING_PAGE_SLUGS } from "@/entities/landing/model/landing-page-slugs";

import { AboutBlockRenderer } from "./AboutBlockRenderer";
import styles from "./AboutPage.module.css";

export type AboutPageMode = "view" | "edit";

type AboutPageProps = {
  blocks: AboutBlock[];
  mode?: AboutPageMode;
  onBlockUpdate?: (block: AboutBlock) => void;
  renderBlock?: (block: AboutBlock, index: number, node: ReactNode) => ReactNode;
};

const aboutSchema = getLandingPageSchema(LANDING_PAGE_SLUGS.about);

export function AboutPage({
  blocks,
  mode = "view",
  onBlockUpdate,
  renderBlock,
}: AboutPageProps) {
  const inlineEdit = mode === "edit" && Boolean(onBlockUpdate) && !renderBlock;

  return (
    <div className={styles["about-page"]}>
      {blocks.map((block, index) => {
        let node = <AboutBlockRenderer block={block} />;
        if (inlineEdit && onBlockUpdate) {
          node = (
            <AdminInlineEditLayer
              block={block}
              onUpdateBlock={onBlockUpdate}
              defaultCollectionItem={aboutSchema.defaultCollectionItem}
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
