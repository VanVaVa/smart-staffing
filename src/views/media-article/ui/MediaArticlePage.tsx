import type { MediaArticleRelated } from "@/entities/landing";
import type { MediaArticleBlock } from "@/entities/landing/model/media-article-blocks";
import { MediaArticle } from "@/widgets/media-article";

import styles from "./MediaArticlePage.module.css";

type MediaArticlePageProps = {
  blocks: MediaArticleBlock[];
  relatedArticles: MediaArticleRelated[];
};

export function MediaArticlePage({ blocks, relatedArticles }: MediaArticlePageProps) {
  const block = blocks.find((item) => item.type === "mediaArticle");

  if (!block) {
    return null;
  }

  return (
    <div className={styles["media-article-page"]} data-header-veil-bg="#f9f9fb">
      <MediaArticle content={block.props} relatedArticles={relatedArticles} />
    </div>
  );
}
