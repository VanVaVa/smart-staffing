"use client";

import type { VacanciesBlockProps } from "@/entities/landing/model/vacancies-blocks";
import { EditableText } from "@/shared/ui/editable-field";
import { useAdminBlockEditOptional } from "@/shared/ui/editable-field/context";
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
  const blockEdit = useAdminBlockEditOptional();

  return (
    <div className={styles["vacancies-application-form"]}>
      <FeedbackForm
        tone="light"
        submitLabel={
          <EditableText path="form.submitLabel" label="Форма — кнопка отправки">
            {form.submitLabel}
          </EditableText>
        }
        fullNamePlaceholder={form.fullNamePlaceholder}
        resumeAttach={{
          label: (
            <EditableText path="form.attachLabel" label="Форма — прикрепить резюме">
              {form.attachLabel}
            </EditableText>
          ),
          loadingLabel: (
            <EditableText path="form.attachLoadingLabel" label="Форма — загрузка резюме">
              {form.attachLoadingLabel}
            </EditableText>
          ),
        }}
        successContent={applicationSuccessModal}
        submissionType="vacancy"
        sourcePath="/vacancies"
        sourceLabel={selectedVacancyTitle || undefined}
        vacancyId={selectedVacancyId || undefined}
      />
      {blockEdit ? (
        <div className={styles["vacancies-application-form__edit-fields"]}>
          <EditableText path="form.fullNamePlaceholder" label="Форма — placeholder ФИО">
            {form.fullNamePlaceholder}
          </EditableText>
          <EditableText
            path="applicationSuccessModal.title"
            label="Модалка — заголовок"
            as="p"
          >
            {applicationSuccessModal.title}
          </EditableText>
          <EditableText
            path="applicationSuccessModal.description"
            label="Модалка — описание"
            as="p"
            multiline
          >
            {applicationSuccessModal.description}
          </EditableText>
          <EditableText path="applicationSuccessModal.homeLabel" label="Модалка — кнопка">
            {applicationSuccessModal.homeLabel}
          </EditableText>
        </div>
      ) : null}
    </div>
  );
}
