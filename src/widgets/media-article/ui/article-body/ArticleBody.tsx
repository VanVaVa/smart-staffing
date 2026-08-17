import Image from "next/image";

import type { MediaArticleBlockProps } from "@/entities/landing/model/media-article-blocks";
import { Link } from "@/shared/ui";

import styles from "./ArticleBody.module.css";

type ArticleBodyProps = {
  content: MediaArticleBlockProps;
};

export function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <div className={styles["article-body"]}>
      <p className={styles["article-body__lead"]}>
        {content.lead}
      </p>
      <div className={styles["article-body__blocks"]}>
        {content.bodyBlocks.map((block, index) => {
          if (block.type === "paragraph") {
            return (
              <p key={`block-${index}`} className={styles["article-body__paragraph"]}>
                {block.text}
              </p>
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
      <p className={styles["article-body__source"]}>
        Источник:{" "}
        <Link href={content.sourceHref}>
          <span>
            {content.sourceLabel}
          </span>
        </Link>
      </p>
    </div>
  );
}
