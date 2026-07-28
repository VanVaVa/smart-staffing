import { heroContent } from "@/entities/landing";
import { Button } from "@/shared/ui/button";

import { HeroRegistryLink } from "./hero-registry-link";
import { HeroVisual } from "./hero-visual";
import styles from "./Hero.module.css";

export function Hero() {
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
              <h1 className={styles.hero__title}>{heroContent.title}</h1>
              <p className={styles.hero__subtitle}>
                <span className={styles["hero__subtitle-lead"]}>
                  50 000+ специалистов из{" "}
                  150+ компаний-партнёров
                </span>
                <span className={styles["hero__subtitle-tail"]}>
                  на единой СмартСтаффинг-платформе
                </span>
              </p>
            </div>
            <div className={styles.hero__actions}>
              <Button href="#contacts" variant="primary" size="md" withArrow className={styles["hero__primary-cta"]}>
                {heroContent.primaryCta}
              </Button>
              <HeroRegistryLink />
            </div>
          </div>
          <div className={styles["hero__visual-slot"]}>
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
