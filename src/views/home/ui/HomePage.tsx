"use client";

import type { ReactNode } from "react";

import type { HomeBlock } from "@/entities/landing/model/home-blocks";
import {
  AdminInlineEditLayer,
} from "@/features/admin-landing-editor";
import { getLandingPageSchema } from "@/entities/landing/lib/landing-page-registry";
import { LANDING_PAGE_SLUGS } from "@/entities/landing/model/landing-page-slugs";

import { HomeBlockRenderer } from "./HomeBlockRenderer";

export type HomePageMode = "view" | "edit";

type HomePageProps = {
  blocks: HomeBlock[];
  mode?: HomePageMode;
  onBlockUpdate?: (block: HomeBlock) => void;
  renderBlock?: (block: HomeBlock, index: number, node: ReactNode) => ReactNode;
};

const homeSchema = getLandingPageSchema(LANDING_PAGE_SLUGS.home);

export function HomePage({
  blocks,
  mode = "view",
  onBlockUpdate,
  renderBlock,
}: HomePageProps) {
  const interactive = mode === "view";
  const inlineEdit = mode === "edit" && Boolean(onBlockUpdate) && !renderBlock;

  return (
    <>
      {blocks.map((block, index) => {
        let node = (
          <HomeBlockRenderer block={block} interactive={interactive} />
        );
        if (inlineEdit && onBlockUpdate) {
          node = (
            <AdminInlineEditLayer
              block={block}
              onUpdateBlock={onBlockUpdate}
              defaultCollectionItem={homeSchema.defaultCollectionItem}
              prepareCollectionItem={(current, _arrayPath, collectionKey, item) => {
                if (collectionKey === "rows" && current.type === "features") {
                  const nextIndex = current.props.rows.length;
                  return {
                    ...(item as Record<string, unknown>),
                    reversed: nextIndex % 2 === 1,
                  };
                }
                return item;
              }}
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
    </>
  );
}
