import type { MediaArticleDetail } from "@/entities/landing";

import { ArticleBody } from "./article-body";
import { ArticleHero } from "./article-hero";
import { RelatedArticles } from "./related-articles";
import styles from "./MediaArticle.module.css";

type MediaArticleProps = {
  article: MediaArticleDetail;
};

export function MediaArticle({ article }: MediaArticleProps) {
  return (
    <article className={styles["media-article"]}>
      <ArticleHero article={article} />
      <div className={styles["media-article__content"]}>
        <ArticleBody article={article} />
        <RelatedArticles articles={article.relatedArticles} />
      </div>
    </article>
  );
}
