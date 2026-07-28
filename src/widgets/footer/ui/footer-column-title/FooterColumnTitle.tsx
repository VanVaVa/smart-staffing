import type { ReactNode } from "react";

import { Text } from "@/shared/ui";

import styles from "./FooterColumnTitle.module.css";

type FooterColumnTitleProps = {
  children: ReactNode;
  size?: "sm" | "xl";
};

export function FooterColumnTitle({ children, size = "xl" }: FooterColumnTitleProps) {
  return (
    <Text
      as="p"
      size={size}
      weight="medium"
      tone="inverse"
      className={styles["footer-column-title"]}
    >
      {children}
    </Text>
  );
}
