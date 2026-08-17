import type { ReactNode } from "react";

import { Badge } from "@/shared/ui/badge";

import styles from "./FeatureRow.module.css";
import { FeatureRowMedia } from "./ui/FeatureRowMedia";

type FeatureRowProps = {
  rowIndex: number;
  title: string;
  description: string;
  descriptionAccent?: string;
  tags?: string[];
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  reversed?: boolean;
  action?: ReactNode;
};

function FeatureRowDescription({
  description,
  descriptionAccent,
}: {
  description: string;
  descriptionAccent?: string;
}) {
  const accentIndex = descriptionAccent
    ? description.indexOf(descriptionAccent)
    : -1;

  if (!descriptionAccent || accentIndex === -1) {
    return <p className={styles["feature-row__lead"]}>{description}</p>;
  }

  return (
    <p className={styles["feature-row__lead"]}>
      {description.slice(0, accentIndex)}
      <span className={styles["feature-row__lead-accent"]}>{descriptionAccent}</span>
      {description.slice(accentIndex + descriptionAccent.length)}
    </p>
  );
}

export function FeatureRow({
  rowIndex,
  title,
  description,
  descriptionAccent,
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
          <FeatureRowDescription
            description={description}
            descriptionAccent={descriptionAccent}
          />
        </div>
        {tags ? (
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
      <FeatureRowMedia
        rowIndex={rowIndex}
        mediaSrc={imageSrc}
        mediaAlt={imageAlt}
        mediaWidth={imageWidth}
        mediaHeight={imageHeight}
        reversed={reversed}
      />
    </article>
  );
}
