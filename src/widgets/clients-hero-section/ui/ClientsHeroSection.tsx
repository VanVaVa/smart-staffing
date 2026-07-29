import Image from "next/image";

import type { ClientsHeroContent } from "@/entities/landing";
import { CompanyConnectionButton } from "@/shared/ui/feedback-form";

import styles from "./ClientsHeroSection.module.css";

type ClientsHeroSectionProps = {
  content: ClientsHeroContent;
};

export function ClientsHeroSection({ content }: ClientsHeroSectionProps) {
  return (
    <section className={styles["clients-hero-section"]}>
      <figure className={styles["clients-hero-section__media"]}>
        <Image
          className={styles["clients-hero-section__image"]}
          src={content.imageSrc}
          alt={content.imageAlt}
          width={content.imageWidth}
          height={content.imageHeight}
          sizes="(max-width: 1200px) 100vw, min(956px, 50vw)"
          priority
        />
      </figure>
      <div className={styles["clients-hero-section__inset"]}>
        <div className={styles["clients-hero-section__layout"]}>
          <div className={styles["clients-hero-section__content"]}>
            <div className={styles["clients-hero-section__copy"]}>
              <h1 className={styles["clients-hero-section__title"]}>
                {content.title}
              </h1>
              <p className={styles["clients-hero-section__subtitle"]}>
                {content.subtitle.before}
                {content.subtitle.accent ? (
                  <span className={styles["clients-hero-section__subtitle-accent"]}>
                    {content.subtitle.accent}
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
              {content.cta}
            </CompanyConnectionButton>
          </div>
        </div>
      </div>
    </section>
  );
}
