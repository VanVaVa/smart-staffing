import Image from "next/image";
import NextLink from "next/link";

import type { MediaArticle } from "@/entities/landing";

import styles from "./MediaCard.module.css";

type MediaCardProps = {
  article: MediaArticle;
  href?: string;
};

export function MediaCard({ article, href }: MediaCardProps) {
  return (
    <NextLink
      id={`publication-${article.id}`}
      href={href ?? article.href}
      className={styles["media-card"]}
    >
      <div className={styles["media-card__visual"]}>
        <Image
          src={article.imageSrc}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 450px) 328px, (max-width: 576px) 50vw, (max-width: 768px) calc(100vw - 48px), (max-width: 1050px) 50vw, 33vw"
          className={styles["media-card__image"]}
        />
        <span
          className={[
            styles["media-card__tag"],
            styles[`media-card__tag--${article.tagTone}`],
          ].join(" ")}
        >
          {article.tagLabel}
        </span>
      </div>
      <div className={styles["media-card__content"]}>
        <time
          dateTime={article.publishedAt}
          className={styles["media-card__date"]}
        >
          {article.publishedLabel}
        </time>
        <h2 className={styles["media-card__title"]}>{article.title}</h2>
      </div>
    </NextLink>
  );
}
