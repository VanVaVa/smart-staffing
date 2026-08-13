import type { AboutTrustedBlockProps } from "@/entities/landing/model/about-blocks";
import {
  EditableCollectionAdd,
  EditableCollectionItem,
  EditableText,
} from "@/shared/ui/editable-field";
import { Container } from "@/shared/ui/container";

import { AboutTrustedMarquee } from "./about-trusted-marquee";

import styles from "./AboutTrustedSection.module.css";

type AboutTrustedSectionProps = {
  content: AboutTrustedBlockProps;
};

export function AboutTrustedSection({ content }: AboutTrustedSectionProps) {
  const { title, rows } = content;

  return (
    <section className={styles["about-trusted-section"]}>
      <div className={styles["about-trusted-section__decor"]} aria-hidden>
        <div className={styles["about-trusted-section__orb--orange"]} />
        <div className={styles["about-trusted-section__orb--purple"]} />
      </div>
      <Container wide>
        <div className={styles["about-trusted-section__inner"]}>
          <EditableText
            path="title"
            label="Заголовок «Нам доверяют»"
            as="h2"
            className={styles["about-trusted-section__title"]}
          >
            {title}
          </EditableText>
          <div className={styles["about-trusted-section__rows"]}>
            {rows.map((row, rowIndex) => (
              <EditableCollectionItem
                key={row.id}
                arrayPath="rows"
                index={rowIndex}
              >
                <AboutTrustedMarquee rowIndex={rowIndex} items={row.items} />
              </EditableCollectionItem>
            ))}
            <EditableCollectionAdd
              arrayPath="rows"
              collectionKey="trusted.rows"
              addLabel="Ряд логотипов"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
