import type { ReactNode } from "react";

import { Badge } from "@/shared/ui/badge";
import { EditableTagList, EditableText } from "@/shared/ui/editable-field";

import styles from "./FeatureRow.module.css";
import { FeatureRowMedia } from "./ui/FeatureRowMedia";

type FeatureRowProps = {
  rowIndex?: number;
  title: string;
  description: string;
  tags?: string[];
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  reversed?: boolean;
  action?: ReactNode;
};

export function FeatureRow({
  rowIndex,
  title,
  description,
  tags,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  reversed,
  action,
}: FeatureRowProps) {
  const rootClass = [
    styles["feature-row"],
    reversed ? styles["feature-row--reversed"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const pathPrefix = rowIndex !== undefined ? `rows.${rowIndex}.` : null;

  const titleNode = pathPrefix ? (
    <EditableText
      path={`${pathPrefix}title`}
      label="Решение — заголовок"
      as="h3"
      className={styles["feature-row__heading"]}
    >
      {title}
    </EditableText>
  ) : (
    <h3 className={styles["feature-row__heading"]}>{title}</h3>
  );

  const descriptionNode = pathPrefix ? (
    <EditableText
      path={`${pathPrefix}description`}
      label="Решение — описание"
      as="p"
      className={styles["feature-row__lead"]}
      multiline
    >
      {description}
    </EditableText>
  ) : (
    <p className={styles["feature-row__lead"]}>{description}</p>
  );

  const tagsNode =
    tags && tags.length > 0 ? (
      pathPrefix ? (
        <EditableTagList
          path={`${pathPrefix}tags`}
          tags={tags}
          className={styles["feature-row__tags"]}
          itemClassName={styles["feature-row__tags-item"]}
        />
      ) : (
        <ul className={styles["feature-row__tags"]}>
          {tags.map((tag) => (
            <li key={tag} className={styles["feature-row__tags-item"]}>
              <Badge variant="tag">{tag}</Badge>
            </li>
          ))}
        </ul>
      )
    ) : pathPrefix ? (
      <EditableTagList
        path={`${pathPrefix}tags`}
        tags={[]}
        className={styles["feature-row__tags"]}
        itemClassName={styles["feature-row__tags-item"]}
      />
    ) : null;

  return (
    <article className={rootClass}>
      <div className={styles["feature-row__content"]}>
        <div className={styles["feature-row__intro"]}>
          {titleNode}
          {descriptionNode}
        </div>
        {tagsNode}
        {action}
      </div>
      {rowIndex !== undefined ? (
        <FeatureRowMedia
          rowIndex={rowIndex}
          mediaSrc={imageSrc}
          mediaAlt={imageAlt}
          mediaWidth={imageWidth}
          mediaHeight={imageHeight}
          mediaPath={`${pathPrefix}imageSrc`}
        />
      ) : (
        <FeatureRowMedia
          rowIndex={0}
          mediaSrc={imageSrc}
          mediaAlt={imageAlt}
          mediaWidth={imageWidth}
          mediaHeight={imageHeight}
        />
      )}
    </article>
  );
}
