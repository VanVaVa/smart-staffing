import Image from "next/image";

import type { MediaArticleBlockProps } from "@/entities/landing/model/media-article-blocks";
import {
  EditableCollectionAdd,
  EditableCollectionItem,
  EditableMedia,
  EditableText,
} from "@/shared/ui/editable-field";
import { Link } from "@/shared/ui";

import styles from "./ArticleBody.module.css";

type ArticleBodyProps = {
  content: MediaArticleBlockProps;
};

export function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <div className={styles["article-body"]}>
      <EditableText
        path="lead"
        label="Лид"
        as="p"
        className={styles["article-body__lead"]}
        multiline
      >
        {content.lead}
      </EditableText>
      <div className={styles["article-body__blocks"]}>
        {content.bodyBlocks.map((block, index) => {
          if (block.type === "paragraph") {
            return (
              <EditableCollectionItem
                key={`block-${index}`}
                arrayPath="bodyBlocks"
                index={index}
              >
                <EditableText
                  path={`bodyBlocks.${index}.text`}
                  label="Абзац"
                  as="p"
                  className={styles["article-body__paragraph"]}
                  multiline
                >
                  {block.text}
                </EditableText>
              </EditableCollectionItem>
            );
          }

          return (
            <EditableCollectionItem
              key={`block-${index}`}
              arrayPath="bodyBlocks"
              index={index}
            >
              <div className={styles["article-body__visual"]}>
                <EditableMedia
                  path={`bodyBlocks.${index}.imageSrc`}
                  label="Изображение в тексте"
                >
                  <Image
                    src={block.imageSrc}
                    alt={block.imageAlt}
                    fill
                    sizes="(max-width: 640px) calc(100vw - 64px), 1130px"
                    className={styles["article-body__image"]}
                  />
                </EditableMedia>
              </div>
            </EditableCollectionItem>
          );
        })}
        <div className={styles["article-body__add-actions"]}>
          <EditableCollectionAdd
            arrayPath="bodyBlocks"
            collectionKey="bodyBlocks.paragraph"
            addLabel="Абзац"
          />
          <EditableCollectionAdd
            arrayPath="bodyBlocks"
            collectionKey="bodyBlocks.image"
            addLabel="Изображение"
          />
        </div>
      </div>
      <p className={styles["article-body__source"]}>
        Источник:{" "}
        <Link href={content.sourceHref}>
          <EditableText path="sourceLabel" label="Источник — подпись">
            {content.sourceLabel}
          </EditableText>
        </Link>
      </p>
    </div>
  );
}
