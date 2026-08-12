import Image from "next/image";

import { vacanciesPage } from "@/entities/landing";
import { FeedbackForm } from "@/shared/ui/feedback-form";
import { Container } from "@/shared/ui/container";

import { VacanciesList } from "./vacancies-list";

import styles from "./VacanciesSection.module.css";

export function VacanciesSection() {
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
  } = vacanciesPage;

  return (
    <section className={styles["vacancies-section"]}>
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
      <Container className={styles["vacancies-section__container"]}>
        <header className={styles["vacancies-section__intro"]}>
          <h1 className={styles["vacancies-section__title"]}>{title}</h1>
          <p className={styles["vacancies-section__subtitle"]}>
            {subtitle.lead}
            <span className={styles["vacancies-section__subtitle-accent"]}>{subtitle.accent}</span>
          </p>
        </header>
        <div className={styles["vacancies-section__body"]}>
          <div className={styles["vacancies-section__list-row"]}>
            <VacanciesList vacancies={vacancies} />
            <Image
              className={[
                styles["vacancies-section__hero"],
                styles["vacancies-section__hero--mobile"],
              ].join(" ")}
              src={heroImageMobileSrc}
              alt={heroImageAlt}
              width={heroImageMobileWidth}
              height={heroImageMobileHeight}
              priority
              sizes="(max-width: 360px) 328px, (max-width: 576px) 416px, 478px"
            />
          </div>
          <div className={styles["vacancies-section__form-panel"]}>
            <div className={styles["vacancies-section__form-decor"]} aria-hidden>
              <div className={styles["vacancies-section__form-orb--purple"]} />
              <div className={styles["vacancies-section__form-orb--accent"]} />
            </div>
            <div className={styles["vacancies-section__form-content"]}>
              <FeedbackForm
                tone="light"
                submitLabel={form.submitLabel}
                fullNamePlaceholder={form.fullNamePlaceholder}
                resumeAttach={{
                  label: form.attachLabel,
                  loadingLabel: form.attachLoadingLabel,
                }}
                successContent={applicationSuccessModal}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
