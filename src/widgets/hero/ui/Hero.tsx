"use client";

import type { HeroBlockProps } from "@/entities/landing/model/home-blocks";
import { routes } from "@/shared/config";
import { Button } from "@/shared/ui/button";

import { HeroRegistryLink } from "./hero-registry-link";
import { HeroVisual } from "./hero-visual";
import styles from "./Hero.module.css";

type HeroProps = {
  content: HeroBlockProps;
  interactive?: boolean;
};

export function Hero({ content, interactive = true }: HeroProps) {
  return (
    <section className={styles.hero} data-header-veil-bg="#f9f9fb">
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
              <h1 className={styles.hero__title}>
                {content.title}
              </h1>
              <p className={styles.hero__subtitle}>
                <span className={styles["hero__subtitle-lead"]}>
                  {content.subtitleLead}
                </span>{" "}
                <span className={styles["hero__subtitle-tail"]}>
                  {content.subtitleTail}
                </span>
              </p>
            </div>
            <div className={styles.hero__actions}>
              {interactive ? (
                <Button
                  variant="primary"
                  size="md"
                  withArrow
                  className={styles["hero__primary-cta"]}
                  href={routes.signUp}
                >
                  <span>
                    {content.primaryCta}
                  </span>
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  withArrow
                  className={styles["hero__primary-cta"]}
                >
                  <span>
                    {content.primaryCta}
                  </span>
                </Button>
              )}
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
