import { FeedbackForm } from "@/shared/ui/feedback-form";
import { EditableText } from "@/shared/ui/editable-field";
import type { FormSubmissionType } from "@/entities/form-submission";

import styles from "./FeedbackFormPanel.module.css";

export type FeedbackFormPanelContent = {
  title: string;
  subtitle: string;
  subtitleAccent?: string;
  submitLabel?: string;
};

type FeedbackFormPanelProps = FeedbackFormPanelContent & {
  className?: string;
  interactive?: boolean;
  editPrefix?: string;
  submissionType: FormSubmissionType;
  sourcePath: string;
  sourceLabel?: string;
};

function FeedbackFormPanelSubtitle({
  subtitle,
  subtitleAccent,
  editPrefix,
}: Pick<FeedbackFormPanelContent, "subtitle" | "subtitleAccent"> & {
  editPrefix?: string;
}) {
  const pathBase = editPrefix ?? "";

  if (!subtitleAccent) {
    return (
      <EditableText
        path={`${pathBase}subtitle`}
        label="Подзаголовок формы"
        as="p"
        className={styles["feedback-form-panel__subtitle"]}
        multiline
      >
        {subtitle}
      </EditableText>
    );
  }

  const accentIndex = subtitle.indexOf(subtitleAccent);

  if (accentIndex === -1) {
    return (
      <EditableText
        path={`${pathBase}subtitle`}
        label="Подзаголовок формы"
        as="p"
        className={styles["feedback-form-panel__subtitle"]}
        multiline
      >
        {subtitle}
      </EditableText>
    );
  }

  const before = subtitle.slice(0, accentIndex);
  const after = subtitle.slice(accentIndex + subtitleAccent.length);

  return (
    <p className={styles["feedback-form-panel__subtitle"]}>
      {before}
      <EditableText path={`${pathBase}subtitleAccent`} label="Акцент подзаголовка">
        <span className={styles["feedback-form-panel__subtitle-accent"]}>
          {subtitleAccent}
        </span>
      </EditableText>
      {after}
    </p>
  );
}

export function FeedbackFormPanel({
  title,
  subtitle,
  subtitleAccent,
  submitLabel,
  className,
  interactive = true,
  editPrefix = "",
  submissionType,
  sourcePath,
  sourceLabel,
}: FeedbackFormPanelProps) {
  const rootClassName = [styles["feedback-form-panel"], className].filter(Boolean).join(" ");

  return (
    <div className={rootClassName}>
      <div className={styles["feedback-form-panel__decor"]} aria-hidden>
        <div className={styles["feedback-form-panel__orb--purple"]} />
        <div className={styles["feedback-form-panel__orb--orange-small"]} />
        <div className={styles["feedback-form-panel__orb--orange"]} />
      </div>
      <div className={styles["feedback-form-panel__panel"]}>
        <div className={styles["feedback-form-panel__intro"]}>
          <EditableText
            path={`${editPrefix}title`}
            label="Заголовок формы"
            as="h2"
            className={styles["feedback-form-panel__title"]}
          >
            {title}
          </EditableText>
          <FeedbackFormPanelSubtitle
            subtitle={subtitle}
            subtitleAccent={subtitleAccent}
            editPrefix={editPrefix}
          />
        </div>
        <div
          className={[
            styles["feedback-form-panel__form-slot"],
            interactive
              ? ""
              : styles["feedback-form-panel__form-slot--inactive"],
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <FeedbackForm
            submitLabel={submitLabel}
            submissionType={submissionType}
            sourcePath={sourcePath}
            sourceLabel={sourceLabel}
            disabled={!interactive}
          />
        </div>
      </div>
    </div>
  );
}
