import type { ReactNode } from "react";

import { Container } from "@/shared/ui/container";

import styles from "./TransitionSection.module.css";

type TransitionSectionProps = {
  id?: string;
  labelledBy?: string;
  tone?: "plain" | "dark" | "raised";
  decor?: ReactNode;
  children: ReactNode;
};

export function TransitionSection({ id, labelledBy, tone = "plain", decor, children }: TransitionSectionProps) {
  const rootClass = [styles["transition-section"], tone === "plain" ? "" : styles[`transition-section--${tone}`]]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id={id}
      className={rootClass}
      aria-labelledby={labelledBy}
      data-header-backdrop={tone === "dark" ? "dark" : undefined}
      data-header-veil-bg={tone === "dark" ? "#090909" : undefined}
    >
      {decor}
      <Container className={styles["transition-section__content"]}>{children}</Container>
    </section>
  );
}
