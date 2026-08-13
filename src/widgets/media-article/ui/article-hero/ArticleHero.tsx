import Image from "next/image";

import type { MediaArticleDetail } from "@/entities/landing";

import styles from "./ArticleHero.module.css";

type ArticleHeroProps = {
  article: MediaArticleDetail;
};

export function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <header className={styles["article-hero"]}>
      <div className={styles["article-hero__content"]}>
        <time
          dateTime={article.publishedAt}
          className={styles["article-hero__date"]}
        >
          {article.publishedLabel}
        </time>
        <h1 className={styles["article-hero__title"]}>{article.title}</h1>
      </div>
      <div className={styles["article-hero__visual"]}>
        <Image
          src={article.imageSrc}
          alt={article.imageAlt}
          fill
          priority
          sizes="(max-width: 360px) 328px, (max-width: 576px) 164px, (max-width: 992px) 304px, (max-width: 1440px) 445px, 601px"
          className={styles["article-hero__image"]}
        />
        <span className={styles["article-hero__tag"]}>{article.tagLabel}</span>
      </div>
    </header>
  );
}
