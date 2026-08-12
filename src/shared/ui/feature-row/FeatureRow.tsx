import type { ReactNode } from "react";

import { Badge } from "@/shared/ui/badge";
import { EditableMedia, EditableTagList, EditableText } from "@/shared/ui/editable-field";

import styles from "./FeatureRow.module.css";

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

  const imageNode = (
    <img
      src={imageSrc}
      alt={imageAlt}
      width={imageWidth}
      height={imageHeight}
      className={styles["feature-row__image"]}
    />
  );

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
      <figure className={styles["feature-row__media"]}>
        {pathPrefix ? (
          <EditableMedia path={`${pathPrefix}imageSrc`} label="Решение — изображение">
            {imageNode}
          </EditableMedia>
        ) : (
          imageNode
        )}
      </figure>
    </article>
  );
}
