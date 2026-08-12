import { ArrowIcon } from "@/shared/ui/arrow-icon";
import {
  EditableCollectionAdd,
  EditableCollectionItem,
  EditableText,
} from "@/shared/ui/editable-field";
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
};

function StepCard({
  title,
  text,
  stepIndex,
}: Step & { stepIndex: number }) {
  return (
    <article className={styles["platform-onboarding-steps__card"]}>
      <EditableText
        path={`steps.steps.${stepIndex}.title`}
        label="Шаг — заголовок"
        as="h3"
        className={styles["platform-onboarding-steps__card-title"]}
      >
        {title}
      </EditableText>
      <EditableText
        path={`steps.steps.${stepIndex}.text`}
        label="Шаг — текст"
        as="p"
        className={styles["platform-onboarding-steps__card-text"]}
        multiline
      >
        {text}
      </EditableText>
    </article>
  );
}

export function PlatformOnboardingSteps({
  title,
  cta,
  steps,
  interactive = true,
}: PlatformOnboardingStepsProps) {
  return (
    <div className={styles["platform-onboarding-steps"]}>
      <div className={styles["platform-onboarding-steps__glow"]} aria-hidden />
      <div className={styles["platform-onboarding-steps__glow--accent"]} aria-hidden />
      <div className={styles["platform-onboarding-steps__glow--bottom"]} aria-hidden />
      <div className={styles["platform-onboarding-steps__inner"]}>
        <EditableText
          path="steps.title"
          label="Steps — заголовок"
          as="h2"
          className={styles["platform-onboarding-steps__title"]}
        >
          {title}
        </EditableText>
        <div className={styles["platform-onboarding-steps__flow"]}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={styles["platform-onboarding-steps__step"]}
              data-step={index}
            >
              <EditableCollectionItem
                arrayPath="steps.steps"
                index={index}
                variant={index === 0 ? "step-inline" : "step"}
              >
                <StepCard {...step} stepIndex={index} />
              </EditableCollectionItem>
              {index < steps.length - 1 ? (
                <div className={styles["platform-onboarding-steps__arrow"]} aria-hidden>
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
            <EditableText path="steps.cta" label="Steps — CTA">
              {cta}
            </EditableText>
          </CompanyConnectionButton>
        </div>
        <EditableCollectionAdd
          arrayPath="steps.steps"
          collectionKey="steps.steps"
          addLabel="Шаг"
        />
      </div>
    </div>
  );
}
