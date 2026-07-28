import type { ReactNode } from "react";

import styles from "./Heading.module.css";

type HeadingLevel = 1 | 2 | 3 | 4;
type HeadingTone = "default" | "inverse";

type HeadingProps = {
  level: HeadingLevel;
  children: ReactNode;
  tone?: HeadingTone;
  className?: string;
};

const tagByLevel = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
} as const;

export function Heading({
  level,
  children,
  tone = "default",
  className,
}: HeadingProps) {
  const Tag = tagByLevel[level];
  const rootClass = [
    styles.heading,
    styles[`heading--level-${level}`],
    tone === "inverse" ? styles["heading--inverse"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Tag className={rootClass}>{children}</Tag>;
}
