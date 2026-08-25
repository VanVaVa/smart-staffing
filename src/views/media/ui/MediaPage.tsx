import type { MediaArticle } from "@/entities/landing";
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
};

export function MediaPage({ blocks, articles, currentPage = 1 }: MediaPageProps) {
  const block = blocks.find((item) => item.type === "mediaListing");

  if (!block) {
    return null;
  }

  return (
    <div className={styles["media-page"]} data-header-veil-bg="#f9f9fb">
      <MediaSection
        display={buildMediaPageContent(articles, block.props.title, currentPage)}
        showPagination
      />
    </div>
  );
}
