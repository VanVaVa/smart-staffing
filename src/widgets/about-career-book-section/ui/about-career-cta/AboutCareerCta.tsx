"use client";

import Image from "next/image";

import { EditableMedia, EditableText, useAdminBlockEditOptional } from "@/shared/ui/editable-field";
import { Button } from "@/shared/ui/button";

import styles from "./AboutCareerCta.module.css";

type AboutCareerCtaProps = {
  text: string;
  buttonLabel: string;
  buttonHref: string;
  photoSrc: string;
  photoAlt: string;
};

export function AboutCareerCta({
  text,
  buttonLabel,
  buttonHref,
  photoSrc,
  photoAlt,
}: AboutCareerCtaProps) {
  const blockEdit = useAdminBlockEditOptional();
  const inAdminEdit = Boolean(blockEdit);

  return (
    <article className={styles["about-career-cta"]}>
      <div className={styles["about-career-cta__surface"]} aria-hidden />
      <div className={styles["about-career-cta__media"]}>
        <EditableMedia path="career.cta.photoSrc" label="Карьера — фото CTA">
          <Image
            className={styles["about-career-cta__photo"]}
            src={photoSrc}
            alt={photoAlt}
            width={152}
            height={203}
            sizes="(max-width: 360px) 52px, (max-width: 576px) 128px, (max-width: 768px) 171px, 190px"
          />
        </EditableMedia>
      </div>
      <EditableText
        path="career.cta.text"
        label="Карьера — текст CTA"
        as="p"
        className={styles["about-career-cta__text"]}
        multiline
      >
        {text}
      </EditableText>
      {inAdminEdit ? (
        <div className={styles["about-career-cta__button"]}>
          <Button variant="primary" size="lg" withArrow type="button">
            <EditableText path="career.cta.buttonLabel" label="Карьера — подпись кнопки">
              {buttonLabel}
            </EditableText>
          </Button>
          <EditableText
            path="career.cta.buttonHref"
            label="Карьера — ссылка кнопки"
            className={styles["about-career-cta__href-edit"]}
          >
            {buttonHref}
          </EditableText>
        </div>
      ) : (
        <Button
          href={buttonHref}
          variant="primary"
          size="lg"
          withArrow
          className={styles["about-career-cta__button"]}
        >
          {buttonLabel}
        </Button>
      )}
    </article>
  );
}
