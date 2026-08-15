import type { PlatformOnboardingBlockProps } from "@/entities/landing/model/home-blocks";
import { Section } from "@/shared/ui/section";

import { PlatformOnboardingDemo } from "./platform-onboarding-demo";
import { PlatformOnboardingPartner } from "./platform-onboarding-partner";
import { PlatformOnboardingSteps } from "./platform-onboarding-steps";

import styles from "./PlatformOnboardingSection.module.css";

type PlatformOnboardingSectionProps = {
  content: PlatformOnboardingBlockProps;
  interactive?: boolean;
};

export function PlatformOnboardingSection({
  content,
  interactive = true,
}: PlatformOnboardingSectionProps) {
  return (
    <Section id="demo" tone="muted" className={styles["platform-onboarding-section"]}>
      <PlatformOnboardingPartner
        title={content.partner.title}
        subtitle={content.partner.subtitle}
        subtitleAccent={content.partner.subtitleAccent}
        cardText={content.partner.cardText}
        imageSrc={content.partner.imageSrc}
        cta={content.partner.cta}
        interactive={interactive}
      />
      <div
        className={`${styles["platform-onboarding-section__bleed"]} ${styles["platform-onboarding-section__bleed--demo"]}`}
      >
        <PlatformOnboardingDemo {...content.demo} interactive={interactive} />
      </div>
      <div
        className={`${styles["platform-onboarding-section__bleed"]} ${styles["platform-onboarding-section__bleed--steps"]}`}
      >
        <PlatformOnboardingSteps
          title={content.steps.title}
          cta={content.steps.cta}
          steps={[...content.steps.steps]}
          interactive={interactive}
          flushTop
        />
      </div>
    </Section>
  );
}
