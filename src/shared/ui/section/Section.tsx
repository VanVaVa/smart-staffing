import type { ReactNode } from "react";

import { Container } from "@/shared/ui/container";

import styles from "./Section.module.css";

type SectionTone = "light" | "muted" | "dark";

type SectionProps = {
  children: ReactNode;
  id?: string;
  tone?: SectionTone;
  wide?: boolean;
  className?: string;
};

export function Section({
  children,
  id,
  tone = "light",
  wide,
  className,
}: SectionProps) {
  const sectionClass = [
    styles.section,
    styles[`section--${tone}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={sectionClass}>
      <Container wide={wide}>
        <div className={styles.section__inner}>{children}</div>
      </Container>
    </section>
  );
}
