"use client";

import type { FormSubmissionType } from "@/entities/form-submission";
import {
  sanitizeContactValue,
  sanitizeFullNameInput,
  validateContactValue,
  validateFullName,
} from "@/entities/form-submission/lib/contact-field-validation";
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
import { FormConsentLabel } from "@/shared/ui/form-consent-label";
import { Input } from "@/shared/ui/input";
import { submitForm } from "@/shared/lib/submit-form";
import { validateResumeFile } from "@/shared/lib/validate-form-resume";

import {
  type FeedbackFormSuccessContent,
  useFeedbackFormSuccessModal,
} from "./FeedbackFormSuccessModalProvider";

import styles from "./FeedbackForm.module.css";

const CHANNEL_FIELDS: Record<
  FeedbackFormChannel,
  {
    name: string;
    type: string;
    placeholder: string;
    autoComplete?: string;
    inputMode?: "text" | "tel" | "email";
    maxLength: number;
  }
> = {
  telegram: {
    name: "telegram",
    type: "text",
    placeholder: "@ivan_ivanov",
    autoComplete: "username",
    maxLength: 33,
  },
  phone: {
    name: "phone",
    type: "tel",
    placeholder: "+7 000 00 00",
    autoComplete: "tel",
    inputMode: "tel",
    maxLength: 20,
  },
  email: {
    name: "email",
    type: "email",
    placeholder: "name@company.ru",
    autoComplete: "email",
    inputMode: "email",
    maxLength: 254,
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
  const [touchedContact, setTouchedContact] = useState(false);
  const [touchedFullName, setTouchedFullName] = useState(false);
  const [attachState, setAttachState] = useState<AttachState>("idle");
  const [resumeDisplayName, setResumeDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const resumeFileRef = useRef<File | null>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const { openSuccessModal } = useFeedbackFormSuccessModal();

  const field = useMemo(() => CHANNEL_FIELDS[channel], [channel]);

  const requiresFullName = fullNamePlaceholder !== undefined;
  const hasResumeAttach = resumeAttach !== undefined;

  const contactValidationError = validateContactValue(channel, contactValue);
  const fullNameValidationError = requiresFullName ? validateFullName(fullName) : null;

  const contactError =
    touchedContact && contactValidationError ? contactValidationError : undefined;
  const fullNameError =
    touchedFullName && fullNameValidationError ? fullNameValidationError : undefined;

  const canSubmit =
    !disabled &&
    !submitting &&
    consented &&
    contactValidationError === null &&
    (!requiresFullName || fullNameValidationError === null);

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
    setTouchedContact(false);
    setTouchedFullName(false);
    setAttachState("idle");
    setResumeDisplayName("");
    resumeFileRef.current = null;
    if (resumeInputRef.current) {
      resumeInputRef.current.value = "";
    }
    setSubmitError(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const validationError = validateResumeFile(file);
    if (validationError) {
      setSubmitError(validationError);
      resumeFileRef.current = null;
      setAttachState("idle");
      setResumeDisplayName("");
      event.target.value = "";
      return;
    }

    setSubmitError(null);
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
            setTouchedContact(false);
          }}
        />
        <Input
          key={channel}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          inputMode={field.inputMode}
          maxLength={field.maxLength}
          spellCheck={false}
          required
          value={contactValue}
          error={contactError}
          onChange={(event) =>
            setContactValue(sanitizeContactValue(channel, event.target.value))
          }
          onBlur={() => setTouchedContact(true)}
          className={styles["feedback-form__input"]}
          disabled={disabled || submitting}
        />
        {requiresFullName ? (
          <Input
            name="fullName"
            type="text"
            placeholder={fullNamePlaceholder}
            autoComplete="name"
            maxLength={100}
            spellCheck={false}
            required
            value={fullName}
            error={fullNameError}
            onChange={(event) => setFullName(sanitizeFullNameInput(event.target.value))}
            onBlur={() => setTouchedFullName(true)}
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
          <FormConsentLabel linkClassName={styles["feedback-form__consent-link"]} />
        }
      />
      {submitError ? <p className={styles["feedback-form__error"]}>{submitError}</p> : null}
      {hasResumeAttach ? (
        <div className={styles["feedback-form__actions"]}>
          <label className={attachClassName}>
            <span className={styles["feedback-form__attach-label"]}>{attachText}</span>
            <input
              ref={resumeInputRef}
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
