import Image from "next/image";

import type { ClientsHeroContent } from "@/entities/landing";
import { EditableMedia, EditableText } from "@/shared/ui/editable-field";
import { CompanyConnectionButton } from "@/shared/ui/feedback-form";

import styles from "./ClientsHeroSection.module.css";

type ClientsHeroSectionProps = {
  content: ClientsHeroContent;
};

export function ClientsHeroSection({ content }: ClientsHeroSectionProps) {
  return (
    <section className={styles["clients-hero-section"]}>
      <figure className={styles["clients-hero-section__media"]}>
        <EditableMedia
          path="imageSrc"
          label="Hero — изображение"
          className={
            content.imageMobileSrc
              ? styles["clients-hero-section__slot--desktop"]
              : undefined
          }
        >
          <Image
            className={styles["clients-hero-section__image"]}
            src={content.imageSrc}
            alt={content.imageAlt}
            width={content.imageWidth}
            height={content.imageHeight}
            sizes="(max-width: 450px) 344px, (max-width: 768px) 744px, (max-width: 992px) 960px, (max-width: 1440px) 716px, 956px"
            priority
          />
        </EditableMedia>
        {content.imageMobileSrc ? (
          <EditableMedia
            path="imageMobileSrc"
            label="Hero — изображение для мобильных"
            className={styles["clients-hero-section__slot--mobile"]}
          >
            <Image
              className={styles["clients-hero-section__image"]}
              src={content.imageMobileSrc}
              alt={content.imageAlt}
              width={content.imageMobileWidth ?? content.imageWidth}
              height={content.imageMobileHeight ?? content.imageHeight}
              sizes="(max-width: 450px) 344px, (max-width: 768px) 744px, 960px"
            />
          </EditableMedia>
        ) : null}
      </figure>
      <div className={styles["clients-hero-section__inset"]}>
        <div className={styles["clients-hero-section__layout"]}>
          <div className={styles["clients-hero-section__content"]}>
            <div className={styles["clients-hero-section__copy"]}>
              <EditableText
                path="title"
                label="Hero — заголовок"
                as="h1"
                className={styles["clients-hero-section__title"]}
                multiline
              >
                {content.title}
              </EditableText>
              <p className={styles["clients-hero-section__subtitle"]}>
                <EditableText path="subtitle.before" label="Hero — подзаголовок">
                  {content.subtitle.before}
                </EditableText>
                {content.subtitle.accent ? (
                  <EditableText
                    path="subtitle.accent"
                    label="Hero — акцент подзаголовка"
                    className={styles["clients-hero-section__subtitle-accent"]}
                  >
                    {content.subtitle.accent}
                  </EditableText>
                ) : null}
                {content.subtitle.after ? (
                  <EditableText path="subtitle.after" label="Hero — подзаголовок (продолжение)">
                    {content.subtitle.after}
                  </EditableText>
                ) : null}
              </p>
            </div>
            <CompanyConnectionButton
              variant="primary"
              size="md"
              withArrow
              className={styles["clients-hero-section__cta"]}
            >
              <EditableText path="cta" label="Hero — CTA">
                {content.cta}
              </EditableText>
            </CompanyConnectionButton>
          </div>
        </div>
      </div>
    </section>
  );
}
