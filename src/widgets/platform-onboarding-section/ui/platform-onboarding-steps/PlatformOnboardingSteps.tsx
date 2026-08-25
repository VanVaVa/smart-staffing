import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { CompanyConnectionButton } from "@/shared/ui/feedback-form";

import styles from "./PlatformOnboardingSteps.module.css";

type Step = {
  title: string;
  text: string;
};

type PlatformOnboardingStepsProps = {
  title: string;
  cta: string;
  steps: Step[];
  interactive?: boolean;
  flushTop?: boolean;
};

function StepCard({ title, text }: Step) {
  return (
    <article className={styles["platform-onboarding-steps__card"]}>
      <h3 className={styles["platform-onboarding-steps__card-title"]}>
        {title}
      </h3>
      <p className={styles["platform-onboarding-steps__card-text"]}>
        {text}
      </p>
    </article>
  );
}

export function PlatformOnboardingSteps({
  title,
  cta,
  steps,
  interactive = true,
  flushTop = false,
}: PlatformOnboardingStepsProps) {
  const rootClass = [
    styles["platform-onboarding-steps"],
    flushTop ? styles["platform-onboarding-steps--flush-top"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={rootClass}
      data-header-backdrop="dark"
      data-header-veil-bg="#000000"
    >
      <div className={styles["platform-onboarding-steps__glow"]} aria-hidden />
      <div className={styles["platform-onboarding-steps__glow--accent"]} aria-hidden />
      <div className={styles["platform-onboarding-steps__glow--bottom"]} aria-hidden />
      <div className={styles["platform-onboarding-steps__inner"]}>
        <h2 className={styles["platform-onboarding-steps__title"]}>
          {title}
        </h2>
        <div className={styles["platform-onboarding-steps__flow"]}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={styles["platform-onboarding-steps__step"]}
              data-step={index}
            >
              <StepCard {...step} />
              {index === 0 ? (
                <div
                  className={`${styles["platform-onboarding-steps__arrow"]} ${styles["platform-onboarding-steps__arrow--trailing"]}`}
                  aria-hidden
                >
                  <ArrowIcon
                    name="round"
                    className={styles["platform-onboarding-steps__arrow-icon"]}
                  />
                </div>
              ) : null}
              {index === 1 ? (
                <>
                  <div
                    className={`${styles["platform-onboarding-steps__arrow"]} ${styles["platform-onboarding-steps__arrow--leading"]}`}
                    aria-hidden
                  >
                    <ArrowIcon
                      name="round"
                      className={styles["platform-onboarding-steps__arrow-icon"]}
                    />
                  </div>
                  <div
                    className={`${styles["platform-onboarding-steps__arrow"]} ${styles["platform-onboarding-steps__arrow--trailing"]}`}
                    aria-hidden
                  >
                    <ArrowIcon
                      name="round"
                      className={styles["platform-onboarding-steps__arrow-icon"]}
                    />
                  </div>
                </>
              ) : null}
              {index === 2 ? (
                <div
                  className={`${styles["platform-onboarding-steps__arrow"]} ${styles["platform-onboarding-steps__arrow--leading"]}`}
                  aria-hidden
                >
                  <ArrowIcon
                    name="round"
                    className={styles["platform-onboarding-steps__arrow-icon"]}
                  />
                </div>
              ) : null}
            </div>
          ))}
          <CompanyConnectionButton
            withArrow
            className={styles["platform-onboarding-steps__cta"]}
            interactive={interactive}
          >
            <span>
              {cta}
            </span>
          </CompanyConnectionButton>
        </div>
      </div>
    </div>
  );
}
