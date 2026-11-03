import { FeedbackForm } from "@/shared/ui/feedback-form";
import type { FeedbackFormChannel } from "@/shared/ui/feedback-form-channel-toggle";
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
  submissionType: FormSubmissionType;
  sourcePath: string;
  sourceLabel?: string;
  channels?: FeedbackFormChannel[];
};

function FeedbackFormPanelSubtitle({
  subtitle,
  subtitleAccent,
}: Pick<FeedbackFormPanelContent, "subtitle" | "subtitleAccent">) {
  if (!subtitleAccent) {
    return (
      <p className={styles["feedback-form-panel__subtitle"]}>
        {subtitle}
      </p>
    );
  }

  const accentIndex = subtitle.indexOf(subtitleAccent);

  if (accentIndex === -1) {
    return (
      <p className={styles["feedback-form-panel__subtitle"]}>
        {subtitle}
      </p>
    );
  }

  const before = subtitle.slice(0, accentIndex);
  const after = subtitle.slice(accentIndex + subtitleAccent.length);

  return (
    <p className={styles["feedback-form-panel__subtitle"]}>
      {before}
      <span>
        <span className={styles["feedback-form-panel__subtitle-accent"]}>
          {subtitleAccent}
        </span>
      </span>
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
  submissionType,
  sourcePath,
  sourceLabel,
  channels,
}: FeedbackFormPanelProps) {
  const rootClassName = [styles["feedback-form-panel"], className].filter(Boolean).join(" ");

  return (
    <div className={rootClassName}>
      <div className={styles["feedback-form-panel__decor"]} aria-hidden>
        <div className={styles["feedback-form-panel__orb--purple"]} />
        {/* <div className={styles["feedback-form-panel__orb--orange-small"]} /> */}
        <div className={styles["feedback-form-panel__orb--orange"]} />
      </div>
      <div className={styles["feedback-form-panel__panel"]}>
        <div className={styles["feedback-form-panel__intro"]}>
          <h2 className={styles["feedback-form-panel__title"]}>
            {title}
          </h2>
          <FeedbackFormPanelSubtitle
            subtitle={subtitle}
            subtitleAccent={subtitleAccent}
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
            channels={channels}
          />
        </div>
      </div>
    </div>
  );
}
