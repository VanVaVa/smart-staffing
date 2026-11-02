import type { ReactNode } from "react";

import styles from "./Badge.module.css";

type BadgeVariant =
  | "default"
  | "accent"
  | "purple"
  | "outline"
  | "tag"
  | "chip"
  | "chipAccent"
  | "new";

const variantClassMap: Record<BadgeVariant, string> = {
  default: "badge--default",
  accent: "badge--accent",
  purple: "badge--purple",
  outline: "badge--outline",
  tag: "badge--tag",
  chip: "badge--chip",
  chipAccent: "badge--chip-accent",
  new: "badge--new",
};

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const rootClass = [
    styles.badge,
    styles[variantClassMap[variant]],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={rootClass}>{children}</span>;
}
