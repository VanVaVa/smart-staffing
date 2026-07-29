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
};

function StepCard({
  title,
  text,
  placement,
}: Step & { placement: "first" | "second" | "third" }) {
  return (
    <article
      className={[
        styles["platform-onboarding-steps__card"],
        styles[`platform-onboarding-steps__card--${placement}`],
      ].join(" ")}
    >
      <h3 className={styles["platform-onboarding-steps__card-title"]}>{title}</h3>
      <p className={styles["platform-onboarding-steps__card-text"]}>{text}</p>
    </article>
  );
}

function StepArrow({ className }: { className: string }) {
  return (
    <div className={className} aria-hidden>
      <ArrowIcon name="round" className={styles["platform-onboarding-steps__arrow-icon"]} />
    </div>
  );
}

export function PlatformOnboardingSteps({ title, cta, steps }: PlatformOnboardingStepsProps) {
  const [first, second, third] = steps;

  return (
    <div className={styles["platform-onboarding-steps"]}>
      <div className={styles["platform-onboarding-steps__glow"]} aria-hidden />
      <div className={styles["platform-onboarding-steps__glow--accent"]} aria-hidden />
      <div className={styles["platform-onboarding-steps__glow--bottom"]} aria-hidden />
      <div className={styles["platform-onboarding-steps__inner"]}>
        <h2 className={styles["platform-onboarding-steps__title"]}>{title}</h2>
        <div className={styles["platform-onboarding-steps__grid"]}>
          <div className={styles["platform-onboarding-steps__first-row"]}>
            {first ? <StepCard {...first} placement="first" /> : null}
            <StepArrow className={styles["platform-onboarding-steps__arrow--1"]} />
          </div>
          {second ? <StepCard {...second} placement="second" /> : null}
          <CompanyConnectionButton
            withArrow
            className={styles["platform-onboarding-steps__cta"]}
          >
            {cta}
          </CompanyConnectionButton>
          <StepArrow className={styles["platform-onboarding-steps__arrow--2"]} />
          {third ? <StepCard {...third} placement="third" /> : null}
        </div>
      </div>
    </div>
  );
}
