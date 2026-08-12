import type { ClientsPartnersExperienceContent } from "@/entities/landing";
import { CaseStudyCard } from "@/shared/ui/case-study-card";
import { Container } from "@/shared/ui/container";

import styles from "./ClientsPartnersExperienceSection.module.css";

type ClientsPartnersExperienceSectionProps = {
  content: ClientsPartnersExperienceContent;
};

export function ClientsPartnersExperienceSection({
  content,
}: ClientsPartnersExperienceSectionProps) {
  const { caseStudy } = content;

  return (
    <section className={styles["clients-partners-experience-section"]}>
      <Container wide className={styles["clients-partners-experience-section__container"]}>
        <h2 className={styles["clients-partners-experience-section__title"]}>
          {content.sectionTitle}
        </h2>
        <div className={styles["clients-partners-experience-section__card"]}>
          <CaseStudyCard
            href={caseStudy.href}
            panelSrc={caseStudy.panelSrc}
            panelAlt={caseStudy.panelAlt}
            logoSrc={caseStudy.logoSrc}
            logoWidth={caseStudy.logoWidth}
            logoHeight={caseStudy.logoHeight}
            tag={caseStudy.tag}
            description={caseStudy.description}
            metric={caseStudy.metric}
            metricLabel={caseStudy.metricLabel}
            layout="compact-horizontal"
          />
        </div>
      </Container>
    </section>
  );
}
