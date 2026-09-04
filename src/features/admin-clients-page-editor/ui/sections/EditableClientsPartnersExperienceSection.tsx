"use client";

import type { AdminValues } from "@/shared/ui/admin-form";
import { Container } from "@/shared/ui/container";
import { AdminInlineText } from "@/shared/ui/admin-inline-field";
import { groupValues } from "@/entities/landing/model/clients-admin-form";

import { EditableCaseStudyCard } from "../EditableCaseStudyCard";
import {
  getPartnersExperienceContent,
  patchCaseStudy,
  patchPartnersExperience,
} from "../../lib/patch-form-values";

import styles from "@/widgets/clients-partners-experience-section/ui/ClientsPartnersExperienceSection.module.css";

type EditableClientsPartnersExperienceSectionProps = {
  values: AdminValues;
  onChange: (values: AdminValues) => void;
  disabled?: boolean;
};

export function EditableClientsPartnersExperienceSection({
  values,
  onChange,
  disabled,
}: EditableClientsPartnersExperienceSectionProps) {
  const content = getPartnersExperienceContent(values);
  const caseStudy = content.caseStudy;
  const formCaseStudy = groupValues(groupValues(values, "partnersExperience"), "caseStudy");

  return (
    <section className={styles["clients-partners-experience-section"]}>
      <Container wide className={styles["clients-partners-experience-section__container"]}>
        <AdminInlineText
          variant="heading"
          className={styles["clients-partners-experience-section__title"]}
          value={content.sectionTitle}
          disabled={disabled}
          onChange={(sectionTitle) =>
            onChange(patchPartnersExperience(values, { sectionTitle }))
          }
        />
        <div className={styles["clients-partners-experience-section__card"]}>
          <EditableCaseStudyCard
            panelSrc={String(formCaseStudy.panelSrc ?? caseStudy.panelSrc)}
            logoSrc={String(formCaseStudy.logoSrc ?? caseStudy.logoSrc ?? "")}
            logoWidth={Number(formCaseStudy.logoWidth ?? caseStudy.logoWidth)}
            logoHeight={Number(formCaseStudy.logoHeight ?? caseStudy.logoHeight)}
            tag={String(formCaseStudy.tag ?? caseStudy.tag)}
            description={String(formCaseStudy.description ?? caseStudy.description)}
            metric={String(formCaseStudy.metric ?? caseStudy.metric)}
            metricLabel={String(formCaseStudy.metricLabel ?? caseStudy.metricLabel)}
            href={String(formCaseStudy.href ?? caseStudy.href ?? "")}
            disabled={disabled}
            onTagChange={(tag) => onChange(patchCaseStudy(values, { tag }))}
            onHrefChange={(href) => onChange(patchCaseStudy(values, { href }))}
            onDescriptionChange={(description) =>
              onChange(patchCaseStudy(values, { description }))
            }
            onMetricChange={(metric) => onChange(patchCaseStudy(values, { metric }))}
            onMetricLabelChange={(metricLabel) =>
              onChange(patchCaseStudy(values, { metricLabel }))
            }
            onPanelSrcChange={(panelSrc) => onChange(patchCaseStudy(values, { panelSrc }))}
            onLogoSrcChange={(logoSrc) => onChange(patchCaseStudy(values, { logoSrc }))}
          />
        </div>
      </Container>
    </section>
  );
}
