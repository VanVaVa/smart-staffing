"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import type { VacanciesBlockProps } from "@/entities/landing/model/vacancies-blocks";
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

  const [selectedVacancyId, setSelectedVacancyId] = useState<string>(vacancies[0]?.id ?? "");

  useEffect(() => {
    if (!vacancies.some((vacancy) => vacancy.id === selectedVacancyId)) {
      setSelectedVacancyId(vacancies[0]?.id ?? "");
    }
  }, [selectedVacancyId, vacancies]);

  const selectedVacancyTitle = useMemo(
    () => vacancies.find((vacancy) => vacancy.id === selectedVacancyId)?.title ?? "",
    [selectedVacancyId, vacancies],
  );

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
      sizes="(max-width: 450px) 328px, (max-width: 576px) 416px, 478px"
    />
  );

  return (
    <section className={styles["vacancies-section"]}>
      <div>
        {desktopHero}
      </div>
      <Container className={styles["vacancies-section__container"]}>
        <header className={styles["vacancies-section__intro"]}>
          <h1 className={styles["vacancies-section__title"]}>
            {title}
          </h1>
          <p className={styles["vacancies-section__subtitle"]}>
            <span>
              {subtitle.lead}
            </span>
            <span className={styles["vacancies-section__subtitle-accent"]}>
              {subtitle.accent}
            </span>
          </p>
        </header>
        <div className={styles["vacancies-section__hero-media"]}>
          <div>
            {mobileHero}
          </div>
        </div>
        <div className={styles["vacancies-section__body"]}>
          <div className={styles["vacancies-section__list-row"]}>
            <VacanciesList
              vacancies={vacancies}
              selectedId={selectedVacancyId}
              onSelect={setSelectedVacancyId}
            />
          </div>
          <div className={styles["vacancies-section__form-panel"]}>
            <div className={styles["vacancies-section__form-decor"]} aria-hidden>
              <div className={styles["vacancies-section__form-orb--purple"]} />
              <div className={styles["vacancies-section__form-orb--accent"]} />
            </div>
            <div className={styles["vacancies-section__form-content"]}>
              <VacanciesApplicationForm
                form={form}
                applicationSuccessModal={applicationSuccessModal}
                selectedVacancyId={selectedVacancyId}
                selectedVacancyTitle={selectedVacancyTitle}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
