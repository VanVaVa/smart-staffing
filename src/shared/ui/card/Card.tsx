import type { ReactNode } from "react";

import styles from "./Card.module.css";

type CardVariant = "default" | "elevated" | "muted";

type CardProps = {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
};

export function Card({ children, variant = "default", className }: CardProps) {
  const rootClass = [
    styles.card,
    styles[`card--${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={rootClass}>{children}</div>;
}
