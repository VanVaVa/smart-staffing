"use client";

import type { ReactNode } from "react";

import type { MediaArticle } from "@/entities/landing";
import {
  buildMediaPageContent,
  type MediaBlock,
} from "@/entities/landing/model/media-blocks";
import { getLandingPageSchema } from "@/entities/landing/lib/landing-page-registry";
import { LANDING_PAGE_SLUGS } from "@/entities/landing/model/landing-page-slugs";
import {
  MediaAdminArticleCard,
  MediaCreateArticleTile,
} from "@/features/admin-media-editor";
import { AdminInlineEditLayer } from "@/features/admin-landing-editor";
import { MediaSection } from "@/widgets/media-section";

import styles from "./MediaPage.module.css";

export type MediaPageMode = "view" | "edit";

type MediaPageProps = {
  blocks: MediaBlock[];
  articles: MediaArticle[];
  currentPage?: number;
  mode?: MediaPageMode;
  onBlockUpdate?: (block: MediaBlock) => void;
  renderBlock?: (block: MediaBlock, index: number, node: ReactNode) => ReactNode;
};

const mediaSchema = getLandingPageSchema(LANDING_PAGE_SLUGS.media);

export function MediaPage({
  blocks,
  articles,
  currentPage = 1,
  mode = "view",
  onBlockUpdate,
  renderBlock,
}: MediaPageProps) {
  const inlineEdit = mode === "edit" && Boolean(onBlockUpdate) && !renderBlock;
  const block = blocks.find((item) => item.type === "mediaListing");

  if (!block) {
    return null;
  }

  const paginate = mode === "view";
  const sectionContent = buildMediaPageContent(
    articles,
    block.props.title,
    paginate ? currentPage : 1,
  );

  let node = (
    <MediaSection
      display={sectionContent}
      showPagination={paginate}
      renderArticleCard={
        mode === "edit"
          ? (article: MediaArticle) => <MediaAdminArticleCard article={article} />
          : undefined
      }
      gridFooter={mode === "edit" ? <MediaCreateArticleTile /> : undefined}
    />
  );

  if (inlineEdit && onBlockUpdate) {
    node = (
      <AdminInlineEditLayer
        block={block}
        onUpdateBlock={onBlockUpdate}
        defaultCollectionItem={mediaSchema.defaultCollectionItem}
      >
        {node}
      </AdminInlineEditLayer>
    );
  }

  if (renderBlock) {
    return <div key={block.id}>{renderBlock(block, 0, node)}</div>;
  }

  return <div className={styles["media-page"]}>{node}</div>;
}
