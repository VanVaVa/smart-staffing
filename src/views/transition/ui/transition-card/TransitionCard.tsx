import type { ReactNode } from "react";

import styles from "./TransitionCard.module.css";

type TransitionCardProps = {
  title: string;
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
};

export function TransitionCard({ title, tone = "light", className, children }: TransitionCardProps) {
  const rootClass = [
    styles["transition-card"],
    tone === "dark" ? styles["transition-card--dark"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={rootClass}>
      <h3 className={styles["transition-card__title"]}>{title}</h3>
      <div className={styles["transition-card__body"]}>{children}</div>
    </li>
  );
}
