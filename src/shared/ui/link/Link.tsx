import NextLink from "next/link";
import type { ReactNode } from "react";

import styles from "./Link.module.css";

type LinkVariant = "nav" | "inline";

type LinkProps = {
  href: string;
  children: ReactNode;
  variant?: LinkVariant;
  className?: string;
  "aria-current"?: "page";
};

export function Link({
  href,
  children,
  variant = "inline",
  className,
  "aria-current": ariaCurrent,
}: LinkProps) {
  const rootClass = [
    styles.link,
    styles[`link--${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href.startsWith("#") || href.startsWith("http")) {
    return (
      <a href={href} className={rootClass} aria-current={ariaCurrent}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={rootClass} aria-current={ariaCurrent}>
      {children}
    </NextLink>
  );
}
