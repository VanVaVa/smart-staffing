import type { ButtonHTMLAttributes } from "react";

import { ArrowIcon } from "../arrow-icon";
import { IconButton } from "../icon-button";

import styles from "./ArrowButton.module.css";

type ArrowButtonShape = "default" | "round";
type ArrowButtonDirection = "left" | "right";

type ArrowButtonVariant = "outline" | "ghost" | "soft" | "softAccent";
type ArrowButtonSize = "md" | "lg";

type ArrowButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  direction: ArrowButtonDirection;
  shape?: ArrowButtonShape;
  variant?: ArrowButtonVariant;
  size?: ArrowButtonSize;
};

export function ArrowButton({
  direction,
  shape = "default",
  variant = "soft",
  size = "lg",
  label,
  className,
  type = "button",
  ...rest
}: ArrowButtonProps) {
  const iconName =
    shape === "round" ? "round" : direction === "left" ? "1Left" : "1Right";
  const iconClassName =
    shape === "round" && direction === "left"
      ? styles["arrow-button--round-left"]
      : undefined;

  return (
    <IconButton
      type={type}
      label={label}
      variant={variant}
      size={size}
      className={className}
      {...rest}
    >
      <ArrowIcon name={iconName} className={iconClassName} />
    </IconButton>
  );
}
