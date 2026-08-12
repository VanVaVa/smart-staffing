import type { CaseStudiesBlockProps } from "@/entities/landing/model/home-blocks";
import {
  EditableCollectionAdd,
  EditableCollectionItem,
  EditableText,
} from "@/shared/ui/editable-field";
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
          <EditableText path="title" label="Заголовок секции кейсов">
            {content.title}
          </EditableText>
        }
      />
      <div className={styles["case-studies-section__list"]}>
        {content.items.map((item, index) => (
          <EditableCollectionItem
            key={`${item.panelSrc}-${index}`}
            arrayPath="items"
            index={index}
            variant="case-study"
          >
            <CaseStudyCard
              itemIndex={index}
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
          </EditableCollectionItem>
        ))}
        <EditableCollectionAdd
          arrayPath="items"
          collectionKey="caseStudies.items"
          addLabel="Кейс"
        />
      </div>
    </Section>
  );
}
