import Image from "next/image";

import type {
  ClientSegmentSlug,
  ClientsHeroContent,
} from "@/entities/landing";
import { IMAGE_QUALITY } from "@/shared/config/image-quality";
import { CompanyConnectionButton } from "@/shared/ui/feedback-form";

import styles from "./ClientsHeroSection.module.css";

type ClientsHeroSectionProps = {
  content: ClientsHeroContent;
  segment: ClientSegmentSlug;
};

export function ClientsHeroSection({ content, segment }: ClientsHeroSectionProps) {
  return (
    <section
      className={styles["clients-hero-section"]}
      data-segment={segment}
    >
      <figure className={styles["clients-hero-section__media"]}>
        <div className={
            content.imageMobileSrc
              ? styles["clients-hero-section__slot--desktop"]
              : undefined
          }>
          <Image
            className={styles["clients-hero-section__image"]}
            src={content.imageSrc}
            alt={content.imageAlt}
            width={content.imageWidth}
            height={content.imageHeight}
            sizes="(max-width: 450px) 344px, (max-width: 768px) 744px, (max-width: 1050px) 960px, (max-width: 1620px) 716px, 956px"
            quality={IMAGE_QUALITY.ui}
            priority
          />
        </div>
        {content.imageMobileSrc ? (
          <div className={styles["clients-hero-section__slot--mobile"]}>
            <Image
              className={styles["clients-hero-section__image"]}
              src={content.imageMobileSrc}
              alt={content.imageAlt}
              width={content.imageMobileWidth ?? content.imageWidth}
              height={content.imageMobileHeight ?? content.imageHeight}
              sizes="(max-width: 450px) 344px, (max-width: 768px) 744px, 960px"
              quality={IMAGE_QUALITY.ui}
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
