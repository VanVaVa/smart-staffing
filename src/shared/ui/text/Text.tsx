import type { ReactNode } from "react";

import styles from "./Text.module.css";

type TextSize = "lead" | "xl" | "lg" | "md" | "sm" | "caption";
type TextTone = "default" | "muted" | "inverse" | "onDark" | "accent" | "accentLead";
type TextWeight = "regular" | "medium";

const toneClassMap: Record<TextTone, string> = {
  default: "text--default",
  muted: "text--muted",
  inverse: "text--inverse",
  onDark: "text--on-dark",
  accent: "text--accent",
  accentLead: "text--accent-lead",
};

type TextProps = {
  children: ReactNode;
  size?: TextSize;
  tone?: TextTone;
  weight?: TextWeight;
  as?: "p" | "span" | "div" | "a";
  href?: string;
  className?: string;
};

export function Text({
  children,
  size = "md",
  tone = "default",
  weight = "regular",
  as: Tag = "p",
  href,
  className,
}: TextProps) {
  const rootClass = [
    styles.text,
    styles[`text--${size}`],
    styles[toneClassMap[tone]],
    weight === "medium" ? styles["text--medium"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (Tag === "a") {
    return (
      <a className={rootClass} href={href}>
        {children}
      </a>
    );
  }

  return <Tag className={rootClass}>{children}</Tag>;
}
