import type { MediaArticle, MediaArticleTag } from "@/entities/landing";
import {
  buildMediaPageContent,
  type MediaBlock,
} from "@/entities/landing/model/media-blocks";
import { MediaSection } from "@/widgets/media-section";

import styles from "./MediaPage.module.css";

type MediaPageProps = {
  blocks: MediaBlock[];
  articles: MediaArticle[];
  currentPage?: number;
  activeTag?: MediaArticleTag | null;
};

export function MediaPage({
  blocks,
  articles,
  currentPage = 1,
  activeTag = null,
}: MediaPageProps) {
  const block = blocks.find((item) => item.type === "mediaListing");

  if (!block) {
    return null;
  }

  return (
    <div className={styles["media-page"]} data-header-veil-bg="#f9f9fb">
      <MediaSection
        display={buildMediaPageContent(
          articles,
          block.props.title,
          currentPage,
          activeTag,
        )}
        tags={block.props.tags}
        showPagination
      />
    </div>
  );
}
