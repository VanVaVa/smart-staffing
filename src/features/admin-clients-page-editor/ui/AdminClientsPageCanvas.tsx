"use client";

import type { AdminValues } from "@/shared/ui/admin-form";

import { EditableClientsHeroSection } from "./sections/EditableClientsHeroSection";
import { EditableClientsPartnersExperienceSection } from "./sections/EditableClientsPartnersExperienceSection";
import { EditableClientsPartnershipCtaSection } from "./sections/EditableClientsPartnershipCtaSection";
import { EditableClientsPlatformBenefitsSection } from "./sections/EditableClientsPlatformBenefitsSection";
import { EditableClientsPlatformSection } from "./sections/EditableClientsPlatformSection";

import styles from "./AdminClientsPageCanvas.module.css";

type AdminClientsPageCanvasProps = {
  values: AdminValues;
  onChange: (values: AdminValues) => void;
  disabled?: boolean;
};

export function AdminClientsPageCanvas({
  values,
  onChange,
  disabled,
}: AdminClientsPageCanvasProps) {
  const segment = typeof values.segment === "string" ? values.segment : "draft";

  return (
    <div className={styles.canvas} data-header-veil-bg="#f9f9fb">
      <EditableClientsHeroSection
        values={values}
        segment={segment}
        onChange={onChange}
        disabled={disabled}
      />
      <EditableClientsPlatformSection
        values={values}
        onChange={onChange}
        disabled={disabled}
      />
      <EditableClientsPlatformBenefitsSection
        values={values}
        segment={segment}
        onChange={onChange}
        disabled={disabled}
      />
      <EditableClientsPartnersExperienceSection
        values={values}
        onChange={onChange}
        disabled={disabled}
      />
      <EditableClientsPartnershipCtaSection
        values={values}
        segment={segment}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}
