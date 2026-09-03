import NextLink from "next/link";

import {
  MEDIA_ARTICLE_TAG_LABELS,
  MEDIA_ARTICLE_TAGS,
  type MediaArticleTag,
} from "@/entities/landing";

import styles from "./MediaTagFilter.module.css";

type MediaTagFilterProps = {
  activeTag: MediaArticleTag | null;
  pathname?: string;
};

function getTagHref(pathname: string, tag: MediaArticleTag | null) {
  if (tag === null) {
    return pathname;
  }

  const params = new URLSearchParams({ tag });
  return `${pathname}?${params.toString()}`;
}

export function MediaTagFilter({
  activeTag,
  pathname = "/media",
}: MediaTagFilterProps) {
  return (
    <div
      className={styles["media-tag-filter"]}
      role="tablist"
      aria-label="Фильтр по тегу"
    >
      <NextLink
        href={getTagHref(pathname, null)}
        scroll
        role="tab"
        aria-selected={activeTag === null}
        className={[
          styles["media-tag-filter__chip"],
          activeTag === null ? styles["media-tag-filter__chip--active"] : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        Все
      </NextLink>
      {MEDIA_ARTICLE_TAGS.map((tag) => {
        const isActive = activeTag === tag;

        return (
          <NextLink
            key={tag}
            href={getTagHref(pathname, tag)}
            scroll
            role="tab"
            aria-selected={isActive}
            className={[
              styles["media-tag-filter__chip"],
              isActive ? styles["media-tag-filter__chip--active"] : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {MEDIA_ARTICLE_TAG_LABELS[tag]}
          </NextLink>
        );
      })}
    </div>
  );
}
