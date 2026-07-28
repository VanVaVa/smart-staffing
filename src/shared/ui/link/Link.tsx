import NextLink from "next/link";
import type { ReactNode } from "react";

import styles from "./Link.module.css";

type LinkVariant = "nav" | "inline";

type LinkProps = {
  href: string;
  children: ReactNode;
  variant?: LinkVariant;
  className?: string;
};

export function Link({ href, children, variant = "inline", className }: LinkProps) {
  const rootClass = [
    styles.link,
    styles[`link--${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href.startsWith("#") || href.startsWith("http")) {
    return (
      <a href={href} className={rootClass}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={rootClass}>
      {children}
    </NextLink>
  );
}
