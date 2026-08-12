import Image from "next/image";
import NextLink from "next/link";

import type { MediaArticle } from "@/entities/landing";

import styles from "./MediaCard.module.css";

type MediaCardProps = {
  article: MediaArticle;
};

export function MediaCard({ article }: MediaCardProps) {
  return (
    <NextLink
      id={`publication-${article.id}`}
      href={article.href}
      className={styles["media-card"]}
    >
      <div className={styles["media-card__visual"]}>
        <Image
          src={article.imageSrc}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 360px) 328px, (max-width: 640px) calc(100vw - 32px), (max-width: 1100px) 50vw, 33vw"
          className={styles["media-card__image"]}
        />
        <span
          className={[
            styles["media-card__tag"],
            styles[`media-card__tag--${article.tag}`],
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
