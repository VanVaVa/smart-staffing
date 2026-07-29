import Image from "next/image";

import { aboutCareerBook } from "@/entities/landing";
import { Container } from "@/shared/ui/container";

import { AboutBookForm } from "./about-book-form";
import { AboutCareerCta } from "./about-career-cta";

import styles from "./AboutCareerBookSection.module.css";

export function AboutCareerBookSection() {
  const { career, book } = aboutCareerBook;

  return (
    <section className={styles["about-career-book-section"]}>
      <div className={styles["about-career-book-section__decor"]} aria-hidden>
        <div className={styles["about-career-book-section__orb"]} />
      </div>
      <Container wide>
        <div className={styles["about-career-book-section__inner"]}>
          <div className={styles["about-career-book-section__career"]}>
            <header className={styles["about-career-book-section__career-header"]}>
              <h2 className={styles["about-career-book-section__career-title"]}>{career.title}</h2>
              <p className={styles["about-career-book-section__career-subtitle"]}>
                {career.subtitle.lead}
                <span className={styles["about-career-book-section__accent"]}>
                  {career.subtitle.accent}
                </span>
                {career.subtitle.tail}
              </p>
            </header>
            <AboutCareerCta
              text={career.cta.text}
              buttonLabel={career.cta.buttonLabel}
              buttonHref={career.cta.buttonHref}
              photoSrc={career.cta.photoSrc}
              photoAlt={career.cta.photoAlt}
            />
          </div>
          <div className={styles["about-career-book-section__book"]}>
            <figure className={styles["about-career-book-section__book-spread"]}>
              <Image
                className={styles["about-career-book-section__book-spread-image"]}
                src={book.spreadSrc}
                alt={book.spreadAlt}
                width={752}
                height={682}
                sizes="(max-width: 1200px) 60vw, 752px"
              />
            </figure>
            <div className={styles["about-career-book-section__book-copy"]}>
              <h2 className={styles["about-career-book-section__book-title"]}>{book.title}</h2>
              <p className={styles["about-career-book-section__book-description"]}>
                <span className={styles["about-career-book-section__accent"]}>
                  {book.description.accent}
                </span>
                {book.description.rest}
              </p>
            </div>
            <div className={styles["about-career-book-section__book-form"]}>
              <AboutBookForm
                inputPlaceholder={book.form.inputPlaceholder}
                buttonLabel={book.form.buttonLabel}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
