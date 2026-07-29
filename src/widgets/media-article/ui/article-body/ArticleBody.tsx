import Image from "next/image";

import type { MediaArticleDetail } from "@/entities/landing";
import { Link } from "@/shared/ui";

import styles from "./ArticleBody.module.css";

type ArticleBodyProps = {
  article: MediaArticleDetail;
};

export function ArticleBody({ article }: ArticleBodyProps) {
  return (
    <div className={styles["article-body"]}>
      <p className={styles["article-body__lead"]}>{article.lead}</p>
      <div
        className={[
          styles["article-body__copy"],
          styles["article-body__copy--before-image"],
        ].join(" ")}
      >
        {article.paragraphs.map((paragraph) => (
          <p key={`before-image-${paragraph}`}>{paragraph}</p>
        ))}
      </div>
      <div className={styles["article-body__visual"]}>
        <Image
          src={article.imageSrc}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 640px) calc(100vw - 64px), 1130px"
          className={styles["article-body__image"]}
        />
      </div>
      <div
        className={[
          styles["article-body__copy"],
          styles["article-body__copy--after-image"],
        ].join(" ")}
      >
        {article.paragraphs.map((paragraph) => (
          <p key={`after-image-${paragraph}`}>{paragraph}</p>
        ))}
      </div>
      <p className={styles["article-body__source"]}>
        Источник:{" "}
        <Link href={article.sourceHref}>{article.sourceLabel}</Link>
      </p>
    </div>
  );
}
