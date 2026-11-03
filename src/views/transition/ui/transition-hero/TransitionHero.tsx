import { Container } from "@/shared/ui/container";
import { CompanyConnectionButton } from "@/shared/ui/feedback-form";

import { transitionHero } from "../../model/content";

import styles from "./TransitionHero.module.css";

export function TransitionHero() {
  return (
    <section className={styles["transition-hero"]} aria-labelledby="transition-hero-title">
      <Container className={styles["transition-hero__content"]}>
        <h1 id="transition-hero-title" className={styles["transition-hero__title"]}>
          {transitionHero.title}
        </h1>
        <p className={styles["transition-hero__subtitle"]}>
          <span className={styles["transition-hero__accent"]}>{transitionHero.subtitle.accent}</span>
          {transitionHero.subtitle.after}
        </p>
        <CompanyConnectionButton variant="primary" size="md" withArrow className={styles["transition-hero__cta"]}>
          <span>{transitionHero.cta}</span>
        </CompanyConnectionButton>
      </Container>
    </section>
  );
}
