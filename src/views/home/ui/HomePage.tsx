"use client";

import type { ReactNode } from "react";

import type { HomeBlock } from "@/entities/landing/model/home-blocks";
import { AdminInlineEditLayer } from "@/features/admin-home-editor";

import { HomeBlockRenderer } from "./HomeBlockRenderer";

export type HomePageMode = "view" | "edit";

type HomePageProps = {
  blocks: HomeBlock[];
  mode?: HomePageMode;
  onBlockUpdate?: (block: HomeBlock) => void;
  renderBlock?: (block: HomeBlock, index: number, node: ReactNode) => ReactNode;
};

export function HomePage({
  blocks,
  mode = "view",
  onBlockUpdate,
  renderBlock,
}: HomePageProps) {
  const interactive = mode === "view";
  const inlineEdit = mode === "edit" && Boolean(onBlockUpdate);

  return (
    <>
      {blocks.map((block, index) => {
        let node = (
          <HomeBlockRenderer block={block} interactive={interactive} />
        );
        if (inlineEdit && onBlockUpdate) {
          node = (
            <AdminInlineEditLayer block={block} onUpdateBlock={onBlockUpdate}>
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
