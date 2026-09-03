import { CoverImageFrame } from "@/shared/ui/cover-image-frame";
import { CompanyConnectionButton } from "@/shared/ui/feedback-form";

import type { ClientsHeroContent } from "@/entities/landing";

import styles from "./ClientsHeroSection.module.css";

type ClientsHeroSectionProps = {
  content: ClientsHeroContent;
  segment: string;
  interactive?: boolean;
};

export function ClientsHeroSection({
  content,
  segment,
  interactive = true,
}: ClientsHeroSectionProps) {
  return (
    <section
      className={styles["clients-hero-section"]}
      data-segment={segment}
    >
      <figure className={styles["clients-hero-section__media"]}>
        <div
          className={
            content.imageMobileSrc ? styles["clients-hero-section__slot--desktop"] : undefined
          }
        >
          <CoverImageFrame
            className={styles["clients-hero-section__image-frame"]}
            imageClassName={styles["clients-hero-section__image"]}
            src={content.imageSrc}
            alt={content.imageAlt}
            sizes="(max-width: 450px) 344px, (max-width: 768px) 744px, (max-width: 1050px) 960px, (max-width: 1620px) 716px, 956px"
            priority
          />
        </div>
        {content.imageMobileSrc ? (
          <div className={styles["clients-hero-section__slot--mobile"]}>
            <CoverImageFrame
              className={styles["clients-hero-section__image-frame"]}
              imageClassName={styles["clients-hero-section__image"]}
              src={content.imageMobileSrc}
              alt={content.imageAlt}
              sizes="(max-width: 450px) 344px, (max-width: 768px) 744px, 960px"
            />
          </div>
        ) : null}
      </figure>
      <div className={styles["clients-hero-section__inset"]}>
        <div className={styles["clients-hero-section__layout"]}>
          <div className={styles["clients-hero-section__content"]}>
            <div className={styles["clients-hero-section__copy"]}>
              <h1 className={styles["clients-hero-section__title"]}>
                {content.title}
              </h1>
              <p className={styles["clients-hero-section__subtitle"]}>
                <span>
                  {content.subtitle.before}
                </span>
                {content.subtitle.accent ? (
                  <span className={styles["clients-hero-section__subtitle-accent"]}>
                    {content.subtitle.accent}
                  </span>
                ) : null}
                {content.subtitle.after ? (
                  <span>
                    {content.subtitle.after}
                  </span>
                ) : null}
              </p>
            </div>
            <CompanyConnectionButton
              variant="primary"
              size="md"
              withArrow
              interactive={interactive}
              className={styles["clients-hero-section__cta"]}
            >
              <span>
                {content.cta}
              </span>
            </CompanyConnectionButton>
          </div>
        </div>
      </div>
    </section>
  );
}
