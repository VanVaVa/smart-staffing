import Image from "next/image";

import type { AboutCareerBookBlockProps } from "@/entities/landing/model/about-blocks";
import { EditableMedia, EditableText } from "@/shared/ui/editable-field";
import { Container } from "@/shared/ui/container";

import { AboutBookForm } from "./about-book-form";
import { AboutCareerCta } from "./about-career-cta";

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
              <EditableText
                path="career.title"
                label="Карьера — заголовок"
                as="h2"
                className={styles["about-career-book-section__career-title"]}
              >
                {career.title}
              </EditableText>
              <p className={styles["about-career-book-section__career-subtitle"]}>
                <EditableText path="career.subtitle.lead" label="Карьера — подзаголовок (lead)">
                  {career.subtitle.lead}
                </EditableText>
                <EditableText
                  path="career.subtitle.accent"
                  label="Карьера — подзаголовок (акцент)"
                  className={styles["about-career-book-section__accent"]}
                >
                  {career.subtitle.accent}
                </EditableText>
                <EditableText path="career.subtitle.tail" label="Карьера — подзаголовок (tail)">
                  {career.subtitle.tail}
                </EditableText>
              </p>
            </header>
            <div className={styles["about-career-book-section__career-cta-wrap"]}>
              <div className={styles["about-career-book-section__career-orb"]} aria-hidden />
              <AboutCareerCta
                text={career.cta.text}
                buttonLabel={career.cta.buttonLabel}
                buttonHref={career.cta.buttonHref}
                photoSrc={career.cta.photoSrc}
                photoAlt={career.cta.photoAlt}
              />
            </div>
          </div>
          <div className={styles["about-career-book-section__book"]}>
            <div className={styles["about-career-book-section__book-head"]}>
              <figure className={styles["about-career-book-section__book-spread"]}>
                <EditableMedia path="book.spreadSrc" label="Книга — разворот">
                  <Image
                    className={styles["about-career-book-section__book-spread-image"]}
                    src={book.spreadSrc}
                    alt={book.spreadAlt}
                    width={752}
                    height={682}
                    sizes="(max-width: 576px) 260px, (max-width: 768px) 400px, (max-width: 992px) 481px, (max-width: 1200px) 560px, 752px"
                  />
                </EditableMedia>
              </figure>
              <div className={styles["about-career-book-section__book-copy"]}>
                <EditableText
                  path="book.title"
                  label="Книга — заголовок"
                  as="h2"
                  className={styles["about-career-book-section__book-title"]}
                >
                  {book.title}
                </EditableText>
                <p className={styles["about-career-book-section__book-description"]}>
                  <EditableText
                    path="book.description.accent"
                    label="Книга — описание (акцент)"
                    className={styles["about-career-book-section__accent"]}
                  >
                    {book.description.accent}
                  </EditableText>
                  <EditableText path="book.description.rest" label="Книга — описание">
                    {book.description.rest}
                  </EditableText>
                </p>
              </div>
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
