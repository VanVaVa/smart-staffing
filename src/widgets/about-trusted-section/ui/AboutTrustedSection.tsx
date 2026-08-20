import type { AboutTrustedBlockProps } from "@/entities/landing/model/about-blocks";
import { Container } from "@/shared/ui/container";

import { AboutTrustedMarquee } from "./about-trusted-marquee";

import styles from "./AboutTrustedSection.module.css";

type AboutTrustedSectionProps = {
  content: AboutTrustedBlockProps;
};

export function AboutTrustedSection({ content }: AboutTrustedSectionProps) {
  const { title, rows } = content;
  const visibleRows = rows.filter((row) => row.items.length > 0);

  return (
    <section className={styles["about-trusted-section"]}>
      <div className={styles["about-trusted-section__decor"]} aria-hidden>
        <div className={styles["about-trusted-section__orb--orange"]} />
        <div className={styles["about-trusted-section__orb--purple"]} />
      </div>
      <Container wide>
        <div className={styles["about-trusted-section__inner"]}>
          <h2 className={styles["about-trusted-section__title"]}>
            {title}
          </h2>
          <div className={styles["about-trusted-section__rows"]}>
            {visibleRows.map((row) => (
              <AboutTrustedMarquee key={row.id} items={row.items} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
