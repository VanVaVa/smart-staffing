import type { AboutPartnerBlockProps } from "@/entities/landing/model/about-blocks";
import { EditableText } from "@/shared/ui/editable-field";
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
            <EditableText
              path="title"
              label="Заголовок партнёрств"
              as="h2"
              className={styles["about-partner-section__title"]}
              multiline
            >
              {title}
            </EditableText>
          </header>
          <AboutPartnerCarousel awards={awards} />
        </div>
      </Container>
    </section>
  );
}
