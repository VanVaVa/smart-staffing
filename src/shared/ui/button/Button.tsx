import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowIcon } from "../arrow-icon";

import styles from "./Button.module.css";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "dark"
  | "light"
  | "outline"
  | "ghost"
  | "plain";
type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
  withArrow?: boolean;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function buildClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean | undefined,
  withArrow: boolean | undefined,
  className?: string,
) {
  const resolvedVariant = variant === "secondary" ? "dark" : variant;

  return [
    styles.button,
    styles[`button--${resolvedVariant}`],
    styles[`button--${size}`],
    withArrow ? styles["button--with-arrow"] : "",
    fullWidth ? styles["button--full-width"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function ArrowGlyph() {
  return (
    <span className={styles["button__arrow-glyph"]} aria-hidden>
      <ArrowIcon name="cta" />
    </span>
  );
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    fullWidth,
    icon,
    withArrow,
    className,
  } = props;
  const rootClass = buildClassName(variant, size, fullWidth, withArrow, className);

  const content = (
    <>
      {icon ? <span className={styles.button__icon}>{icon}</span> : null}
      <span className={styles.button__label}>{children}</span>
      {withArrow ? (
        <span className={styles["button__arrow-slot"]}>
          <ArrowGlyph />
        </span>
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={rootClass}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;

  return (
    <button
      type={buttonProps.type ?? "button"}
      className={rootClass}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
    >
      {content}
    </button>
  );
}
