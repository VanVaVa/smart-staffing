"use client";

import type { AdminValues } from "@/shared/ui/admin-form";
import { FeedbackForm } from "@/shared/ui/feedback-form";
import { Container } from "@/shared/ui/container";
import { AdminInlineText } from "@/shared/ui/admin-inline-field";
import { clientsPageSlug } from "@/entities/landing/model/landing-page-slugs";
import {
  getAdminPageLabel,
  getPublicPagePath,
} from "@/entities/landing/lib/landing-page-registry";

import { getPartnershipCtaContent, patchPartnershipCta } from "../../lib/patch-form-values";

import panelStyles from "@/shared/ui/feedback-form-panel/FeedbackFormPanel.module.css";
import styles from "@/widgets/clients-partnership-cta-section/ui/ClientsPartnershipCtaSection.module.css";

type EditableClientsPartnershipCtaSectionProps = {
  values: AdminValues;
  segment: string;
  onChange: (values: AdminValues) => void;
  disabled?: boolean;
};

export function EditableClientsPartnershipCtaSection({
  values,
  segment,
  onChange,
  disabled,
}: EditableClientsPartnershipCtaSectionProps) {
  const content = getPartnershipCtaContent(values);
  const pageSlug = clientsPageSlug(segment);

  return (
    <section id="contacts" className={styles["clients-partnership-cta-section"]}>
      <Container wide className={styles["clients-partnership-cta-section__container"]}>
        <div className={panelStyles["feedback-form-panel"]}>
          <div className={panelStyles["feedback-form-panel__decor"]} aria-hidden>
            <div className={panelStyles["feedback-form-panel__orb--purple"]} />
            <div className={panelStyles["feedback-form-panel__orb--orange"]} />
          </div>
          <div className={panelStyles["feedback-form-panel__panel"]}>
            <div className={panelStyles["feedback-form-panel__intro"]}>
              <AdminInlineText
                variant="heading"
                className={panelStyles["feedback-form-panel__title"]}
                value={content.title}
                disabled={disabled}
                onChange={(title) => onChange(patchPartnershipCta(values, { title }))}
              />
              <AdminInlineText
                className={panelStyles["feedback-form-panel__subtitle"]}
                value={content.subtitle}
                disabled={disabled}
                multiline
                onChange={(subtitle) => onChange(patchPartnershipCta(values, { subtitle }))}
              />
            </div>
            <div
              className={[
                panelStyles["feedback-form-panel__form-slot"],
                panelStyles["feedback-form-panel__form-slot--inactive"],
              ].join(" ")}
            >
              <FeedbackForm
                submitLabel={content.submitLabel}
                submissionType="partnership"
                sourcePath={getPublicPagePath(pageSlug)}
                sourceLabel={getAdminPageLabel(pageSlug)}
                disabled
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
