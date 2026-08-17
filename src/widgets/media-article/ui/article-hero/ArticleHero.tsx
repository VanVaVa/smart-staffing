import Image from "next/image";

import type { MediaArticleBlockProps } from "@/entities/landing/model/media-article-blocks";

import styles from "./ArticleHero.module.css";

type ArticleHeroProps = {
  content: MediaArticleBlockProps;
};

function ArticleHeroImage({
  src,
  alt,
  placeholder,
  className,
  imageClassName,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  placeholder: string;
  className?: string;
  imageClassName?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className={className}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={imageClassName}
        />
      ) : (
        <div className={styles["article-hero__placeholder"]}>
          <span className={styles["article-hero__placeholder-icon"]} aria-hidden>
            +
          </span>
          <span className={styles["article-hero__placeholder-text"]}>{placeholder}</span>
        </div>
      )}
    </div>
  );
}

export function ArticleHero({ content }: ArticleHeroProps) {
  return (
    <header className={styles["article-hero"]}>
      <div className={styles["article-hero__content"]}>
        <time
          dateTime={content.publishedAt}
          className={styles["article-hero__date"]}
        >
          <span>
            {content.publishedLabel}
          </span>
        </time>
        <h1 className={styles["article-hero__title"]}>
          {content.title}
        </h1>
      </div>
      <div className={styles["article-hero__visual"]}>
        <ArticleHeroImage
          src={content.heroImageSrc}
          alt={content.heroImageAlt}
          placeholder="Добавить заглавное изображение"
          className={styles["article-hero__hero-media"]}
          imageClassName={styles["article-hero__image"]}
          sizes="(max-width: 450px) 328px, (max-width: 576px) 164px, (max-width: 992px) 304px, (max-width: 1440px) 445px, 601px"
          priority
        />
        <span className={styles["article-hero__tag"]}>
          <span>
            {content.tagLabel}
          </span>
        </span>
      </div>
    </header>
  );
}
