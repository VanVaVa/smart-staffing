import Image from "next/image";

import type { MediaArticleBlockProps } from "@/entities/landing/model/media-article-blocks";
import { IMAGE_QUALITY } from "@/shared/config/image-quality";

import styles from "./ArticleHero.module.css";

type ArticleHeroProps = {
  content: MediaArticleBlockProps;
};

function ArticleHeroImage({
  src,
  alt,
  className,
  imageClassName,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
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
          quality={IMAGE_QUALITY.ui}
          className={imageClassName}
        />
      ) : (
        <div
          className={styles["article-hero__placeholder"]}
          role="img"
          aria-label={alt || "Изображение статьи"}
        >
          <svg
            className={styles["article-hero__placeholder-icon"]}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
            <path
              d="M3 16l5-5 4 4 3-3 6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
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
          className={styles["article-hero__hero-media"]}
          imageClassName={styles["article-hero__image"]}
          sizes="(max-width: 450px) 328px, (max-width: 576px) 164px, (max-width: 1050px) 304px, (max-width: 1620px) 445px, 601px"
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
