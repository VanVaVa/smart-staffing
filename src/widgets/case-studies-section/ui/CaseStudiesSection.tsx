import type { CaseStudiesBlockProps } from "@/entities/landing/model/home-blocks";
import { CaseStudyCard } from "@/shared/ui/case-study-card";
import { Section } from "@/shared/ui/section";
import { SectionTitle } from "@/shared/ui/section-title";

import styles from "./CaseStudiesSection.module.css";

type CaseStudiesSectionProps = {
  content: CaseStudiesBlockProps;
};

export function CaseStudiesSection({ content }: CaseStudiesSectionProps) {
  return (
    <Section tone="muted" className={styles["case-studies-section"]}>
      <SectionTitle
        className={styles["case-studies-section__title"]}
        title={
          <span>
            {content.title}
          </span>
        }
      />
      <div className={styles["case-studies-section__list"]}>
        {content.items.map((item, index) => (
          <CaseStudyCard key={`${item.panelSrc}-${index}`}
            href={item.href}
            panelSrc={item.panelSrc}
            logoSrc={item.logoSrc}
            logoWidth={item.logoWidth}
            logoHeight={item.logoHeight}
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
