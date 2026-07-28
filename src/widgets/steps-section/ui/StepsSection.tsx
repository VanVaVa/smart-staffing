import { stepsSection } from "@/entities/landing";
import { Section } from "@/shared/ui/section";
import { SectionTitle } from "@/shared/ui/section-title";
import { StepItem } from "@/shared/ui/step-item";

import styles from "./StepsSection.module.css";

export function StepsSection() {
  return (
    <Section>
      <SectionTitle title={stepsSection.title} centered />
      <div className={styles["steps-section__steps"]}>
        {stepsSection.steps.map((item, index) => (
          <StepItem
            key={item.title}
            step={index + 1}
            title={item.title}
            text={item.text}
          />
        ))}
      </div>
    </Section>
  );
}
