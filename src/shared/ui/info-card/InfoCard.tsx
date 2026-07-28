import type { ReactNode } from "react";

import styles from "./InfoCard.module.css";

type InfoCardProps = {
  title?: string;
  text: ReactNode;
  statValue?: string;
  imageSrc?: string;
  imageAlt?: string;
  variant?: "default" | "accent";
};

export function InfoCard({
  title,
  text,
  statValue,
  imageSrc,
  imageAlt,
  variant = "default",
}: InfoCardProps) {
  const rootClass = [
    styles["info-card"],
    variant === "accent" ? styles["info-card--accent"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={rootClass}>
      {statValue ? (
        <p className={styles["info-card__stat-value"]}>{statValue}</p>
      ) : null}
      {title ? <h3 className={styles["info-card__title"]}>{title}</h3> : null}
      <div className={styles["info-card__text"]}>{text}</div>
      {imageSrc ? (
        <div className={styles["info-card__image-wrap"]}>
          <img src={imageSrc} alt={imageAlt ?? ""} width={400} height={180} />
        </div>
      ) : null}
    </article>
  );
}
