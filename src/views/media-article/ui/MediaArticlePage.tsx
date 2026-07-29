import type { MediaArticleDetail } from "@/entities/landing";
import { MediaArticle } from "@/widgets/media-article";

import styles from "./MediaArticlePage.module.css";

type MediaArticlePageProps = {
  article: MediaArticleDetail;
};

export function MediaArticlePage({ article }: MediaArticlePageProps) {
  return (
    <div className={styles["media-article-page"]}>
      <MediaArticle article={article} />
    </div>
  );
}
