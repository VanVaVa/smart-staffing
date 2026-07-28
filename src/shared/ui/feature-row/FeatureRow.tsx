import type { ReactNode } from "react";

import { Badge } from "@/shared/ui/badge";

import styles from "./FeatureRow.module.css";

type FeatureRowProps = {
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

  return (
    <article className={rootClass}>
      <div className={styles["feature-row__content"]}>
        <div className={styles["feature-row__intro"]}>
          <h3 className={styles["feature-row__heading"]}>{title}</h3>
          <p className={styles["feature-row__lead"]}>{description}</p>
        </div>
        {tags && tags.length > 0 ? (
          <ul className={styles["feature-row__tags"]}>
            {tags.map((tag) => (
              <li key={tag} className={styles["feature-row__tags-item"]}>
                <Badge variant="tag">{tag}</Badge>
              </li>
            ))}
          </ul>
        ) : null}
        {action}
      </div>
      <figure className={styles["feature-row__media"]}>
        <img
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
        />
      </figure>
    </article>
  );
}
