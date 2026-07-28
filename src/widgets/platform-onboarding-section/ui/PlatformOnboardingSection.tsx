import { demoSection, partnerCta, stepsSection } from "@/entities/landing";
import { Section } from "@/shared/ui/section";

import { PlatformOnboardingDemo } from "./platform-onboarding-demo";
import { PlatformOnboardingPartner } from "./platform-onboarding-partner";
import { PlatformOnboardingSteps } from "./platform-onboarding-steps";

import styles from "./PlatformOnboardingSection.module.css";

export function PlatformOnboardingSection() {
  return (
    <Section id="demo" tone="muted" className={styles["platform-onboarding-section"]}>
      <PlatformOnboardingPartner {...partnerCta} />
      <div className={styles["platform-onboarding-section__bleed"]}>
        <PlatformOnboardingDemo {...demoSection} />
      </div>
      <div className={styles["platform-onboarding-section__bleed"]}>
        <PlatformOnboardingSteps
          title={stepsSection.title}
          cta={stepsSection.cta}
          steps={[...stepsSection.steps]}
        />
      </div>
    </Section>
  );
}
