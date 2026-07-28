import { aboutIntro } from "@/entities/landing";
import { Container } from "@/shared/ui/container";

import styles from "./AboutIntroSection.module.css";

export function AboutIntroSection() {
  return (
    <section className={styles["about-intro-section"]}>
      <Container>
        <div className={styles["about-intro-section__inner"]}>
          <h1 className={styles["about-intro-section__title"]}>{aboutIntro.title}</h1>
          <p className={styles["about-intro-section__subtitle"]}>
            {aboutIntro.subtitle.lead}
            <span className={styles["about-intro-section__subtitle-accent"]}>
              {aboutIntro.subtitle.teamsAccent}
            </span>
            {aboutIntro.subtitle.middle}
            <span className={styles["about-intro-section__subtitle-accent"]}>
              {aboutIntro.subtitle.resourcesAccent}
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}
