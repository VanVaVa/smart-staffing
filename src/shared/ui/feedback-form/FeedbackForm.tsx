"use client";

import type { FormSubmissionType } from "@/entities/form-submission";
import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  FeedbackFormChannelToggle,
  type FeedbackFormChannel,
} from "@/shared/ui/feedback-form-channel-toggle";
import { Input } from "@/shared/ui/input";
import { Link } from "@/shared/ui/link";
import { submitForm } from "@/shared/lib/submit-form";

import {
  type FeedbackFormSuccessContent,
  useFeedbackFormSuccessModal,
} from "./FeedbackFormSuccessModalProvider";

import styles from "./FeedbackForm.module.css";

const CHANNEL_FIELDS: Record<
  FeedbackFormChannel,
  { name: string; type: string; placeholder: string; autoComplete?: string }
> = {
  telegram: {
    name: "telegram",
    type: "text",
    placeholder: "@ivan_ivanov",
    autoComplete: "username",
  },
  phone: {
    name: "phone",
    type: "tel",
    placeholder: "+7 000 00 00",
    autoComplete: "tel",
  },
  email: {
    name: "email",
    type: "email",
    placeholder: "name@company.ru",
    autoComplete: "email",
  },
};

type AttachState = "idle" | "uploaded";

export type FeedbackFormResumeAttach = {
  label: ReactNode;
  loadingLabel: ReactNode;
};

export type FeedbackFormProps = {
  className?: string;
  submitLabel?: ReactNode;
  tone?: "dark" | "light";
  fullNamePlaceholder?: string;
  resumeAttach?: FeedbackFormResumeAttach;
  successContent?: FeedbackFormSuccessContent;
  submissionType: FormSubmissionType;
  sourcePath: string;
  sourceLabel?: string;
  vacancyId?: string;
  disabled?: boolean;
};

function formatResumeLabel(file: File, fullName: string): string {
  const extension = file.name.includes(".")
    ? file.name.slice(file.name.lastIndexOf("."))
    : "";
  const baseName = fullName.trim() || file.name.replace(/\.[^.]+$/, "");

  return `Резюме ${baseName}${extension}`;
}

export function FeedbackForm({
  className,
  submitLabel = "Отправить",
  tone = "dark",
  fullNamePlaceholder,
  resumeAttach,
  successContent,
  submissionType,
  sourcePath,
  sourceLabel,
  vacancyId,
  disabled = false,
}: FeedbackFormProps) {
  const [channel, setChannel] = useState<FeedbackFormChannel>("telegram");
  const [consented, setConsented] = useState(false);
  const [contactValue, setContactValue] = useState("");
  const [fullName, setFullName] = useState("");
  const [attachState, setAttachState] = useState<AttachState>("idle");
  const [resumeDisplayName, setResumeDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const resumeFileRef = useRef<File | null>(null);
  const { openSuccessModal } = useFeedbackFormSuccessModal();

  const field = useMemo(() => CHANNEL_FIELDS[channel], [channel]);

  const requiresFullName = fullNamePlaceholder !== undefined;
  const hasResumeAttach = resumeAttach !== undefined;

  const canSubmit =
    !disabled &&
    !submitting &&
    consented &&
    contactValue.trim().length > 0 &&
    (!requiresFullName || fullName.trim().length > 0);

  useEffect(() => {
    if (attachState !== "uploaded" || !resumeFileRef.current) {
      return;
    }

    setResumeDisplayName(formatResumeLabel(resumeFileRef.current, fullName));
  }, [attachState, fullName]);

  const resetForm = () => {
    setChannel("telegram");
    setConsented(false);
    setContactValue("");
    setFullName("");
    setAttachState("idle");
    setResumeDisplayName("");
    resumeFileRef.current = null;
    setSubmitError(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    resumeFileRef.current = file;
    setResumeDisplayName(formatResumeLabel(file, fullName));
    setAttachState("uploaded");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const result = await submitForm({
      type: submissionType,
      channel,
      contactValue: contactValue.trim(),
      fullName: requiresFullName ? fullName.trim() : undefined,
      consent: true,
      sourcePath,
      sourceLabel,
      vacancyId,
      resume: resumeFileRef.current,
    });

    setSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.error);
      return;
    }

    resetForm();
    openSuccessModal(successContent);
  };

  const attachClassName = [
    styles["feedback-form__attach"],
    attachState === "uploaded" ? styles["feedback-form__attach--uploaded"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const attachText =
    attachState === "uploaded" ? resumeDisplayName : resumeAttach?.label;

  const submitButton = (
    <Button
      type="submit"
      variant="primary"
      withArrow
      disabled={!canSubmit}
      className={hasResumeAttach ? styles["feedback-form__submit"] : undefined}
    >
      {submitting ? "Отправка..." : submitLabel}
    </Button>
  );

  const rootClassName = [
    styles["feedback-form"],
    tone === "light" ? styles["feedback-form--light"] : "",
    hasResumeAttach ? styles["feedback-form--with-resume"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <form className={rootClassName} action="#" method="post" onSubmit={handleSubmit}>
      <input type="hidden" name="channel" value={channel} />
      <div className={styles["feedback-form__fields"]}>
        <FeedbackFormChannelToggle
          value={channel}
          onChange={(next) => {
            setChannel(next);
            setContactValue("");
          }}
        />
        <Input
          key={channel}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          required
          value={contactValue}
          onChange={(event) => setContactValue(event.target.value)}
          className={styles["feedback-form__input"]}
          disabled={disabled || submitting}
        />
        {requiresFullName ? (
          <Input
            name="fullName"
            type="text"
            placeholder={fullNamePlaceholder}
            autoComplete="name"
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className={styles["feedback-form__input"]}
            disabled={disabled || submitting}
          />
        ) : null}
      </div>
      <Checkbox
        name="consent"
        checked={consented}
        onChange={(event) => setConsented(event.target.checked)}
        className={styles["feedback-form__consent"]}
        disabled={disabled || submitting}
        label={
          <>
            Я даю{" "}
            <Link href="/documents/personal-data-consent" variant="inline" className={styles["feedback-form__consent-link"]}>
              согласие на обработку персональных данных
            </Link>
          </>
        }
      />
      {submitError ? <p className={styles["feedback-form__error"]}>{submitError}</p> : null}
      {hasResumeAttach ? (
        <div className={styles["feedback-form__actions"]}>
          <label className={attachClassName}>
            <span className={styles["feedback-form__attach-label"]}>{attachText}</span>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              disabled={disabled || submitting}
              className={styles["feedback-form__attach-input"]}
              onChange={handleFileChange}
            />
          </label>
          {submitButton}
        </div>
      ) : (
        submitButton
      )}
    </form>
  );
}
