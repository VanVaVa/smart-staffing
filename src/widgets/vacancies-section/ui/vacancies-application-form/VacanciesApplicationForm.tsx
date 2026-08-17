"use client";

import type { VacanciesBlockProps } from "@/entities/landing/model/vacancies-blocks";
import { FeedbackForm } from "@/shared/ui/feedback-form";

import styles from "./VacanciesApplicationForm.module.css";

type VacanciesApplicationFormProps = {
  form: VacanciesBlockProps["form"];
  applicationSuccessModal: VacanciesBlockProps["applicationSuccessModal"];
  selectedVacancyId: string;
  selectedVacancyTitle: string;
};

export function VacanciesApplicationForm({
  form,
  applicationSuccessModal,
  selectedVacancyId,
  selectedVacancyTitle,
}: VacanciesApplicationFormProps) {
  return (
    <div className={styles["vacancies-application-form"]}>
      <FeedbackForm
        tone="light"
        submitLabel={
          <span>
            {form.submitLabel}
          </span>
        }
        fullNamePlaceholder={form.fullNamePlaceholder}
        resumeAttach={{
          label: (
            <span>
              {form.attachLabel}
            </span>
          ),
          loadingLabel: (
            <span>
              {form.attachLoadingLabel}
            </span>
          ),
        }}
        successContent={applicationSuccessModal}
        submissionType="vacancy"
        sourcePath="/vacancies"
        sourceLabel={selectedVacancyTitle || undefined}
        vacancyId={selectedVacancyId || undefined}
      />
    </div>
  );
}
