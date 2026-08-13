import type { AboutIntroBlockProps } from "@/entities/landing/model/about-blocks";
import { EditableText } from "@/shared/ui/editable-field";
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
          <EditableText
            path="title"
            label="Заголовок"
            as="h1"
            className={styles["about-intro-section__title"]}
            multiline
          >
            {content.title}
          </EditableText>
          <p className={styles["about-intro-section__subtitle"]}>
            <EditableText path="subtitle.lead" label="Подзаголовок (lead)">
              {content.subtitle.lead}
            </EditableText>
            <EditableText
              path="subtitle.teamsAccent"
              label="Подзаголовок (акцент команды)"
              className={styles["about-intro-section__subtitle-accent"]}
            >
              {content.subtitle.teamsAccent}
            </EditableText>
            <EditableText path="subtitle.middle" label="Подзаголовок (середина)">
              {content.subtitle.middle}
            </EditableText>
            <EditableText
              path="subtitle.resourcesAccent"
              label="Подзаголовок (акцент ресурсов)"
              className={styles["about-intro-section__subtitle-accent"]}
            >
              {content.subtitle.resourcesAccent}
            </EditableText>
          </p>
        </div>
      </Container>
    </section>
  );
}
