import type { AboutPartnerBlockProps } from "@/entities/landing/model/about-blocks";
import { Container } from "@/shared/ui/container";

import { AboutPartnerCarousel } from "./about-partner-carousel";

import styles from "./AboutPartnerSection.module.css";

type AboutPartnerSectionProps = {
  content: AboutPartnerBlockProps;
};

export function AboutPartnerSection({ content }: AboutPartnerSectionProps) {
  const { title, awards } = content;

  return (
    <section className={styles["about-partner-section"]}>
      <Container wide>
        <div className={styles["about-partner-section__inner"]}>
          <header className={styles["about-partner-section__header"]}>
            <h2 className={styles["about-partner-section__title"]}>
              {title}
            </h2>
          </header>
          <AboutPartnerCarousel awards={awards} />
        </div>
      </Container>
    </section>
  );
}
