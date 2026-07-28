import type { ReactNode } from "react";

import styles from "./SectionTitle.module.css";

type SectionTitleProps = {
  title: string;
  subtitle?: ReactNode;
  centered?: boolean;
  dark?: boolean;
  className?: string;
};

export function SectionTitle({
  title,
  subtitle,
  centered,
  dark,
  className,
}: SectionTitleProps) {
  const rootClass = [
    styles["section-title"],
    centered ? styles["section-title--centered"] : "",
    dark ? styles["section-title--dark"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={rootClass}>
      <h2 className={styles["section-title__title"]}>{title}</h2>
      {subtitle ? (
        <p className={styles["section-title__subtitle"]}>{subtitle}</p>
      ) : null}
    </header>
  );
}
