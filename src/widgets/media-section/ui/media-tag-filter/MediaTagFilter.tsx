import NextLink from "next/link";

import type { MediaArticleTag, MediaTagDefinition } from "@/entities/landing";

import styles from "./MediaTagFilter.module.css";

type MediaTagFilterProps = {
  tags: readonly MediaTagDefinition[];
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
  tags,
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
      {tags.map((tag) => {
        const isActive = activeTag === tag.slug;

        return (
          <NextLink
            key={tag.slug}
            href={getTagHref(pathname, tag.slug)}
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
            {tag.label}
          </NextLink>
        );
      })}
    </div>
  );
}
