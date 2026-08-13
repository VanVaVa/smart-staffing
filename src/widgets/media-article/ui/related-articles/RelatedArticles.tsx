"use client";

import NextLink from "next/link";
import { useState } from "react";

import type { MediaArticleRelated } from "@/entities/landing";

import styles from "./RelatedArticles.module.css";

type RelatedArticlesProps = {
  articles: MediaArticleRelated[];
};

type RelatedArticleLinkProps = {
  article: MediaArticleRelated;
  tabIndex?: number;
};

function RelatedArticleLink({ article, tabIndex }: RelatedArticleLinkProps) {
  return (
    <NextLink
      href={article.href}
      tabIndex={tabIndex}
      className={styles["related-articles__link"]}
    >
      <time
        dateTime={article.publishedAt}
        className={styles["related-articles__date"]}
      >
        {article.publishedLabel}
      </time>
      <span className={styles["related-articles__title"]}>{article.title}</span>
    </NextLink>
  );
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleArticles = articles.slice(0, 5);
  const hiddenArticles = articles.slice(4);

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className={styles["related-articles"]}>
      <h2 className={styles["related-articles__heading"]}>Читать далее</h2>
      <div className={styles["related-articles__list"]}>
        {visibleArticles.map((article) => (
          <RelatedArticleLink key={article.id} article={article} />
        ))}
      </div>
      {hiddenArticles.length > 0 && (
        <div
          className={[
            styles["related-articles__more"],
            expanded ? styles["related-articles__more--expanded"] : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div
            className={[
              styles["related-articles__expandable"],
              expanded
                ? styles["related-articles__expandable--expanded"]
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden={!expanded}
          >
            <div className={styles["related-articles__list"]}>
              {hiddenArticles.map((article) => (
                <RelatedArticleLink
                  key={article.id}
                  article={article}
                  tabIndex={expanded ? undefined : -1}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            className={styles["related-articles__summary"]}
            aria-expanded={expanded}
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? "Свернуть" : "Развернуть"}
          </button>
        </div>
      )}
    </section>
  );
}
