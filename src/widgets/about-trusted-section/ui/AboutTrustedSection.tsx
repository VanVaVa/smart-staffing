import { aboutTrusted } from "@/entities/landing";
import { Container } from "@/shared/ui/container";

import { AboutTrustedMarquee } from "./about-trusted-marquee";

import styles from "./AboutTrustedSection.module.css";

export function AboutTrustedSection() {
  const { title, rows } = aboutTrusted;

  return (
    <section className={styles["about-trusted-section"]}>
      <div className={styles["about-trusted-section__decor"]} aria-hidden>
        <div className={styles["about-trusted-section__orb--orange"]} />
        <div className={styles["about-trusted-section__orb--purple"]} />
      </div>
      <Container wide>
        <div className={styles["about-trusted-section__inner"]}>
          <h2 className={styles["about-trusted-section__title"]}>{title}</h2>
          <div className={styles["about-trusted-section__rows"]}>
            {rows.map((row) => (
              <AboutTrustedMarquee key={row.id} items={row.items} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
