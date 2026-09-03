import Image from "next/image";

import type { AboutCareerBookBlockProps } from "@/entities/landing/model/about-blocks";
import { Container } from "@/shared/ui/container";

import { PlatformOnboardingPartner } from "@/widgets/platform-onboarding-section/ui/platform-onboarding-partner";

import { AboutBookForm } from "./about-book-form";

import styles from "./AboutCareerBookSection.module.css";

type AboutCareerBookSectionProps = {
  content: AboutCareerBookBlockProps;
};

export function AboutCareerBookSection({ content }: AboutCareerBookSectionProps) {
  const { career, book } = content;

  return (
    <section className={styles["about-career-book-section"]}>
      <Container wide>
        <div className={styles["about-career-book-section__inner"]}>
          <div className={styles["about-career-book-section__career"]}>
            <header className={styles["about-career-book-section__career-header"]}>
              <h2 className={styles["about-career-book-section__career-title"]}>
                {career.title}
              </h2>
              <p className={styles["about-career-book-section__career-subtitle"]}>
                <span>
                  {career.subtitle.lead}
                </span>
                <span className={styles["about-career-book-section__accent"]}>
                  {career.subtitle.accent}
                </span>
                <span>
                  {career.subtitle.tail}
                </span>
              </p>
            </header>
            <PlatformOnboardingPartner
              showTitle={false}
              cardText={career.cta.text}
              imageSrc={career.cta.photoSrc}
              imageAlt={career.cta.photoAlt}
              cta={career.cta.buttonLabel}
              ctaHref={career.cta.buttonHref}
            />
          </div>
          <div className={styles["about-career-book-section__book"]}>
            <div className={styles["about-career-book-section__book-head"]}>
              <figure className={styles["about-career-book-section__book-spread"]}>
                <div>
                  <Image
                    className={styles["about-career-book-section__book-spread-image"]}
                    src={book.spreadSrc}
                    alt={book.spreadAlt}
                    width={752}
                    height={682}
                    sizes="(max-width: 576px) 260px, (max-width: 768px) 400px, (max-width: 1050px) 481px, (max-width: 1200px) 560px, 752px"
                  />
                </div>
              </figure>
              <div className={styles["about-career-book-section__book-copy"]}>
                <h2 className={styles["about-career-book-section__book-title"]}>
                  {book.title}
                </h2>
                <p className={styles["about-career-book-section__book-description"]}>
                  <span className={styles["about-career-book-section__accent"]}>
                    {book.description.accent}
                  </span>
                  <span>
                    {book.description.rest}
                  </span>
                </p>
              </div>
            </div>
            <div className={styles["about-career-book-section__book-form"]}>
              <AboutBookForm
                inputPlaceholder={book.form.inputPlaceholder}
                buttonHref={book.form.buttonHref}
                buttonLabel={book.form.buttonLabel}
              />
            </div>
          </div>
        </div>
      </Container>
      <div
        className={styles["about-career-book-section__header-bridge"]}
        aria-hidden
        data-header-backdrop="dark"
        data-header-veil-bg="#181818"
      />
    </section>
  );
}
