import { benefitsCards, benefitsSection } from "@/entities/landing";
import { InfoCard } from "@/shared/ui/info-card";
import { Section } from "@/shared/ui/section";
import { SectionTitle } from "@/shared/ui/section-title";

import styles from "./BenefitsSection.module.css";

export function BenefitsSection() {
  return (
    <Section id="pricing" tone="muted">
      <SectionTitle
        title={benefitsSection.title}
        subtitle={benefitsSection.subtitle}
        centered
      />
      <div className={styles["benefits-section__grid"]}>
        {benefitsCards.map((card) => (
          <InfoCard
            key={card.title ?? card.statValue ?? card.text.slice(0, 20)}
            title={card.title}
            text={card.text}
            statValue={card.statValue}
            imageSrc={card.imageSrc}
            imageAlt={card.imageAlt}
            variant={card.variant}
          />
        ))}
      </div>
    </Section>
  );
}
