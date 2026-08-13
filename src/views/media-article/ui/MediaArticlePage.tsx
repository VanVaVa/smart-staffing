"use client";

import type { ReactNode } from "react";

import type { MediaArticleRelated } from "@/entities/landing";
import type { MediaArticleBlock } from "@/entities/landing/model/media-article-blocks";
import { getLandingPageSchema } from "@/entities/landing/lib/landing-page-registry";
import { mediaArticlePageSlug } from "@/entities/landing/model/landing-page-slugs";
import { AdminInlineEditLayer } from "@/features/admin-landing-editor";
import { MediaArticle } from "@/widgets/media-article";

import styles from "./MediaArticlePage.module.css";

export type MediaArticlePageMode = "view" | "edit";

type MediaArticlePageProps = {
  blocks: MediaArticleBlock[];
  relatedArticles: MediaArticleRelated[];
  mode?: MediaArticlePageMode;
  onBlockUpdate?: (block: MediaArticleBlock) => void;
  renderBlock?: (
    block: MediaArticleBlock,
    index: number,
    node: ReactNode,
  ) => ReactNode;
};

export function MediaArticlePage({
  blocks,
  relatedArticles,
  mode = "view",
  onBlockUpdate,
  renderBlock,
}: MediaArticlePageProps) {
  const inlineEdit = mode === "edit" && Boolean(onBlockUpdate) && !renderBlock;
  const block = blocks.find((item) => item.type === "mediaArticle");

  if (!block) {
    return null;
  }

  const articleSchema = getLandingPageSchema(mediaArticlePageSlug(block.props.slug));

  let node = (
    <MediaArticle content={block.props} relatedArticles={relatedArticles} />
  );

  if (inlineEdit && onBlockUpdate) {
    node = (
      <AdminInlineEditLayer
        block={block}
        onUpdateBlock={onBlockUpdate}
        defaultCollectionItem={articleSchema.defaultCollectionItem}
      >
        {node}
      </AdminInlineEditLayer>
    );
  }

  if (renderBlock) {
    return <div key={block.id}>{renderBlock(block, 0, node)}</div>;
  }

  return <div className={styles["media-article-page"]}>{node}</div>;
}
