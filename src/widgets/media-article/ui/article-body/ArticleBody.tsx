import Image from "next/image";

import type { MediaArticleBlockProps } from "@/entities/landing/model/media-article-blocks";
import { sanitizeArticleHtml } from "@/shared/lib/sanitize-article-html";
import { Link } from "@/shared/ui";

import styles from "./ArticleBody.module.css";

type ArticleBodyProps = {
  content: MediaArticleBlockProps;
};

export function ArticleBody({ content }: ArticleBodyProps) {
  const hasSource = content.sourceHref !== "" || content.sourceLabel !== "";

  return (
    <div className={styles["article-body"]}>
      <div
        className={`${styles["article-body__lead"]} ${styles["article-body__rich-text"]}`}
        dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(content.lead) }}
      />
      <div className={styles["article-body__blocks"]}>
        {content.bodyBlocks.map((block, index) => {
          if (block.type === "paragraph") {
            return (
              <div
                key={`block-${index}`}
                className={`${styles["article-body__paragraph"]} ${styles["article-body__rich-text"]}`}
                dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(block.text) }}
              />
            );
          }

          return (
            <div key={`block-${index}`} className={styles["article-body__visual"]}>
              <div>
                <Image
                  src={block.imageSrc}
                  alt={block.imageAlt}
                  fill
                  sizes="(max-width: 640px) calc(100vw - 64px), 1130px"
                  className={styles["article-body__image"]}
                />
              </div>
            </div>
          );
        })}
        <div className={styles["article-body__add-actions"]}>
        </div>
      </div>
      {hasSource ? (
        <p className={styles["article-body__source"]}>
          Источник:{" "}
          <Link href={content.sourceHref}>
            <span>
              {content.sourceLabel}
            </span>
          </Link>
        </p>
      ) : null}
    </div>
  );
}
