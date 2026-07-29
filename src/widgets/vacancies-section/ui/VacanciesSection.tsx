import Image from "next/image";

import { vacanciesPage } from "@/entities/landing";
import { Container } from "@/shared/ui/container";

import { VacanciesApplicationForm } from "./vacancies-application-form";
import { VacanciesList } from "./vacancies-list";

import styles from "./VacanciesSection.module.css";

export function VacanciesSection() {
  const { title, subtitle, heroImageSrc, heroImageWidth, heroImageHeight, heroImageAlt, vacancies, form, applicationSuccessModal } =
    vacanciesPage;

  return (
    <section className={styles["vacancies-section"]}>
      <Image
        className={styles["vacancies-section__hero"]}
        src={heroImageSrc}
        alt={heroImageAlt}
        width={heroImageWidth}
        height={heroImageHeight}
        priority
        sizes="(max-width: 1024px) 100vw, 1106px"
      />
      <Container className={styles["vacancies-section__container"]}>
        <header className={styles["vacancies-section__intro"]}>
          <h1 className={styles["vacancies-section__title"]}>{title}</h1>
          <p className={styles["vacancies-section__subtitle"]}>
            {subtitle.lead}
            <span className={styles["vacancies-section__subtitle-accent"]}>{subtitle.accent}</span>
          </p>
        </header>
        <div className={styles["vacancies-section__workspace"]}>
          <VacanciesList vacancies={vacancies} />
          <VacanciesApplicationForm
            fullNamePlaceholder={form.fullNamePlaceholder}
            attachLabel={form.attachLabel}
            submitLabel={form.submitLabel}
            successModal={applicationSuccessModal}
          />
        </div>
      </Container>
    </section>
  );
}
