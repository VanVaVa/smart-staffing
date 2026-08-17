import type { AboutIntroBlockProps } from "@/entities/landing/model/about-blocks";
import { Container } from "@/shared/ui/container";

import styles from "./AboutIntroSection.module.css";

type AboutIntroSectionProps = {
  content: AboutIntroBlockProps;
};

export function AboutIntroSection({ content }: AboutIntroSectionProps) {
  return (
    <section className={styles["about-intro-section"]}>
      <Container>
        <div className={styles["about-intro-section__inner"]}>
          <h1 className={styles["about-intro-section__title"]}>
            {content.title}
          </h1>
          <p className={styles["about-intro-section__subtitle"]}>
            <span>
              {content.subtitle.lead}
            </span>
            <span className={styles["about-intro-section__subtitle-accent"]}>
              {content.subtitle.teamsAccent}
            </span>
            <span>
              {content.subtitle.middle}
            </span>
            <span className={styles["about-intro-section__subtitle-accent"]}>
              {content.subtitle.resourcesAccent}
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}
