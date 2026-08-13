import Image from "next/image";

import type { VacanciesBlockProps } from "@/entities/landing/model/vacancies-blocks";
import { EditableMedia, EditableText } from "@/shared/ui/editable-field";
import { Container } from "@/shared/ui/container";

import { VacanciesApplicationForm } from "./vacancies-application-form";
import { VacanciesList } from "./vacancies-list";

import styles from "./VacanciesSection.module.css";

type VacanciesSectionProps = {
  content: VacanciesBlockProps;
};

export function VacanciesSection({ content }: VacanciesSectionProps) {
  const {
    title,
    subtitle,
    heroImageSrc,
    heroImageWidth,
    heroImageHeight,
    heroImageMobileSrc,
    heroImageMobileWidth,
    heroImageMobileHeight,
    heroImageAlt,
    vacancies,
    form,
    applicationSuccessModal,
  } = content;

  const desktopHero = (
    <Image
      className={[
        styles["vacancies-section__hero"],
        styles["vacancies-section__hero--desktop"],
        styles["vacancies-section__hero--section"],
      ].join(" ")}
      src={heroImageSrc}
      alt={heroImageAlt}
      width={heroImageWidth}
      height={heroImageHeight}
      priority
      sizes="(max-width: 992px) 344px, (max-width: 1440px) 716px, 956px"
    />
  );

  const mobileHero = (
    <Image
      className={[styles["vacancies-section__hero"], styles["vacancies-section__hero--mobile"]].join(
        " ",
      )}
      src={heroImageMobileSrc}
      alt={heroImageAlt}
      width={heroImageMobileWidth}
      height={heroImageMobileHeight}
      priority
      sizes="(max-width: 360px) 328px, (max-width: 576px) 416px, 478px"
    />
  );

  return (
    <section className={styles["vacancies-section"]}>
      <EditableMedia path="heroImageSrc" label="Hero — desktop">
        {desktopHero}
      </EditableMedia>
      <Container className={styles["vacancies-section__container"]}>
        <header className={styles["vacancies-section__intro"]}>
          <EditableText
            path="title"
            label="Заголовок"
            as="h1"
            className={styles["vacancies-section__title"]}
          >
            {title}
          </EditableText>
          <p className={styles["vacancies-section__subtitle"]}>
            <EditableText path="subtitle.lead" label="Подзаголовок (lead)">
              {subtitle.lead}
            </EditableText>
            <EditableText
              path="subtitle.accent"
              label="Подзаголовок (accent)"
              className={styles["vacancies-section__subtitle-accent"]}
            >
              {subtitle.accent}
            </EditableText>
          </p>
        </header>
        <div className={styles["vacancies-section__body"]}>
          <div className={styles["vacancies-section__list-row"]}>
            <VacanciesList vacancies={vacancies} />
            <EditableMedia path="heroImageMobileSrc" label="Hero — mobile">
              {mobileHero}
            </EditableMedia>
          </div>
          <div className={styles["vacancies-section__form-panel"]}>
            <div className={styles["vacancies-section__form-decor"]} aria-hidden>
              <div className={styles["vacancies-section__form-orb--purple"]} />
              <div className={styles["vacancies-section__form-orb--accent"]} />
            </div>
            <div className={styles["vacancies-section__form-content"]}>
              <VacanciesApplicationForm form={form} applicationSuccessModal={applicationSuccessModal} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
