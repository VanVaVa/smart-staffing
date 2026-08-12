import type { HeroBlockProps } from "@/entities/landing/model/home-blocks";
import { EditableText } from "@/shared/ui/editable-field";
import { CompanyConnectionButton } from "@/shared/ui/feedback-form";

import { HeroRegistryLink } from "./hero-registry-link";
import { HeroVisual } from "./hero-visual";
import styles from "./Hero.module.css";

type HeroProps = {
  content: HeroBlockProps;
  interactive?: boolean;
};

export function Hero({ content, interactive = true }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__decor} aria-hidden>
        <div className={`${styles.hero__orb} ${styles["hero__orb--orange"]}`} />
        <div className={`${styles.hero__orb} ${styles["hero__orb--purple-large"]}`} />
        <div className={`${styles.hero__orb} ${styles["hero__orb--orange-small"]}`} />
        <div className={`${styles.hero__orb} ${styles["hero__orb--purple-small"]}`} />
      </div>
      <div className={styles.hero__inset}>
        <div className={styles.hero__layout}>
          <div className={styles.hero__content}>
            <div className={styles.hero__copy}>
              <EditableText
                path="title"
                label="Заголовок Hero"
                as="h1"
                className={styles.hero__title}
                multiline
              >
                {content.title}
              </EditableText>
              <p className={styles.hero__subtitle}>
                <EditableText
                  path="subtitleLead"
                  label="Подзаголовок (lead)"
                  className={styles["hero__subtitle-lead"]}
                >
                  {content.subtitleLead}
                </EditableText>{" "}
                <EditableText
                  path="subtitleTail"
                  label="Подзаголовок (tail)"
                  className={styles["hero__subtitle-tail"]}
                >
                  {content.subtitleTail}
                </EditableText>
              </p>
            </div>
            <div className={styles.hero__actions}>
              <CompanyConnectionButton
                variant="primary"
                size="md"
                withArrow
                className={styles["hero__primary-cta"]}
                interactive={interactive}
              >
                <EditableText path="primaryCta" label="Текст CTA">
                  {content.primaryCta}
                </EditableText>
              </CompanyConnectionButton>
              <HeroRegistryLink
                registryHref={content.registryHref}
                registryLabel={content.registryLabel}
              />
            </div>
          </div>
          <div className={styles["hero__visual-slot"]}>
            <HeroVisual segments={content.segments} />
          </div>
        </div>
      </div>
    </section>
  );
}
