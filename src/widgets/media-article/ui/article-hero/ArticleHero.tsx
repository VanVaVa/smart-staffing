"use client";

import Image from "next/image";

import type { MediaArticleBlockProps } from "@/entities/landing/model/media-article-blocks";
import {
  EditableMedia,
  EditableText,
  useAdminBlockEditOptional,
} from "@/shared/ui/editable-field";

import styles from "./ArticleHero.module.css";

type ArticleHeroProps = {
  content: MediaArticleBlockProps;
};

function ArticleHeroImage({
  src,
  alt,
  path,
  label,
  placeholder,
  className,
  imageClassName,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  path: string;
  label: string;
  placeholder: string;
  className?: string;
  imageClassName?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <EditableMedia path={path} label={label} className={className}>
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
    </EditableMedia>
  );
}

export function ArticleHero({ content }: ArticleHeroProps) {
  const blockEdit = useAdminBlockEditOptional();

  return (
    <header className={styles["article-hero"]}>
      <div className={styles["article-hero__content"]}>
        <time
          dateTime={content.publishedAt}
          className={styles["article-hero__date"]}
        >
          <EditableText path="publishedLabel" label="Дата публикации">
            {content.publishedLabel}
          </EditableText>
        </time>
        <EditableText
          path="title"
          label="Заголовок статьи"
          as="h1"
          className={styles["article-hero__title"]}
        >
          {content.title}
        </EditableText>
        {blockEdit ? (
          <div className={styles["article-hero__listing-preview"]}>
            <span className={styles["article-hero__listing-preview-label"]}>
              Превью в списке /media
            </span>
            <div className={styles["article-hero__listing-preview-card"]}>
              <div className={styles["article-hero__listing-preview-visual"]}>
                <ArticleHeroImage
                  src={content.imageSrc}
                  alt={content.imageAlt}
                  path="imageSrc"
                  label="Превью для списка"
                  placeholder="Добавить превью"
                  className={styles["article-hero__listing-preview-media"]}
                  imageClassName={styles["article-hero__listing-preview-image"]}
                  sizes="120px"
                />
              </div>
              <p className={styles["article-hero__listing-preview-title"]}>
                {content.title || "Заголовок статьи"}
              </p>
            </div>
          </div>
        ) : null}
      </div>
      <div className={styles["article-hero__visual"]}>
        <ArticleHeroImage
          src={content.heroImageSrc}
          alt={content.heroImageAlt}
          path="heroImageSrc"
          label="Заглавное изображение"
          placeholder="Добавить заглавное изображение"
          className={styles["article-hero__hero-media"]}
          imageClassName={styles["article-hero__image"]}
          sizes="(max-width: 360px) 328px, (max-width: 576px) 164px, (max-width: 992px) 304px, (max-width: 1440px) 445px, 601px"
          priority
        />
        <span className={styles["article-hero__tag"]}>
          <EditableText path="tagLabel" label="Тег статьи">
            {content.tagLabel}
          </EditableText>
        </span>
        {blockEdit ? (
          <span className={styles["article-hero__visual-label"]}>Заглавное изображение</span>
        ) : null}
      </div>
    </header>
  );
}
