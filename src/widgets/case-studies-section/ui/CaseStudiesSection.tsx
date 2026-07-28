import { caseStudies } from "@/entities/landing";
import { CaseStudyCard } from "@/shared/ui/case-study-card";
import { Section } from "@/shared/ui/section";
import { SectionTitle } from "@/shared/ui/section-title";

import styles from "./CaseStudiesSection.module.css";

export function CaseStudiesSection() {
  return (
    <Section tone="muted">
      <SectionTitle
        title={caseStudies.title}
        className={styles["case-studies-section__title"]}
      />
      <div className={styles["case-studies-section__list"]}>
        {caseStudies.items.map((item) => (
          <CaseStudyCard
            key={item.panelSrc}
            href={item.href}
            panelSrc={item.panelSrc}
            panelAlt={item.panelAlt}
            description={item.description}
            metric={item.metric}
            metricLabel={item.metricLabel}
          />
        ))}
      </div>
    </Section>
  );
}
