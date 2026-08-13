import type { MediaArticleRelated } from "@/entities/landing";
import type { MediaArticleBlockProps } from "@/entities/landing/model/media-article-blocks";

import { ArticleBody } from "./article-body";
import { ArticleHero } from "./article-hero";
import { RelatedArticles } from "./related-articles";
import styles from "./MediaArticle.module.css";

type MediaArticleProps = {
  content: MediaArticleBlockProps;
  relatedArticles: MediaArticleRelated[];
};

export function MediaArticle({ content, relatedArticles }: MediaArticleProps) {
  return (
    <article className={styles["media-article"]}>
      <ArticleHero content={content} />
      <div className={styles["media-article__content"]}>
        <ArticleBody content={content} />
        <RelatedArticles articles={relatedArticles} />
      </div>
    </article>
  );
}
