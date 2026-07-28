import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./IconButton.module.css";

type IconButtonVariant = "outline" | "ghost" | "soft" | "softAccent";
type IconButtonSize = "md" | "lg";

const variantClassMap: Record<IconButtonVariant, string> = {
  outline: "icon-button--outline",
  ghost: "icon-button--ghost",
  soft: "icon-button--soft",
  softAccent: "icon-button--soft-accent",
};

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
};

export function IconButton({
  children,
  label,
  variant = "soft",
  size = "lg",
  className,
  type = "button",
  ...rest
}: IconButtonProps) {
  const rootClass = [
    styles["icon-button"],
    styles[variantClassMap[variant]],
    styles[`icon-button--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={rootClass} aria-label={label} {...rest}>
      {children}
    </button>
  );
}
