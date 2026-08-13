"use client";

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
    placeholder: "+7 (___) ___-__-__",
    autoComplete: "tel",
  },
  email: {
    name: "email",
    type: "email",
    placeholder: "name@company.ru",
    autoComplete: "email",
  },
};

const UPLOAD_DELAY_MS = 1200;

type AttachState = "idle" | "loading" | "uploaded";

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
}: FeedbackFormProps) {
  const [channel, setChannel] = useState<FeedbackFormChannel>("telegram");
  const [consented, setConsented] = useState(false);
  const [contactValue, setContactValue] = useState("");
  const [fullName, setFullName] = useState("");
  const [attachState, setAttachState] = useState<AttachState>("idle");
  const [resumeDisplayName, setResumeDisplayName] = useState("");
  const resumeFileRef = useRef<File | null>(null);
  const uploadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { openSuccessModal } = useFeedbackFormSuccessModal();

  const field = useMemo(() => CHANNEL_FIELDS[channel], [channel]);

  const requiresFullName = fullNamePlaceholder !== undefined;
  const hasResumeAttach = resumeAttach !== undefined;

  const canSubmit =
    consented &&
    contactValue.trim().length > 0 &&
    (!requiresFullName || fullName.trim().length > 0);

  useEffect(() => {
    return () => {
      if (uploadTimerRef.current) {
        clearTimeout(uploadTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (attachState !== "uploaded" || !resumeFileRef.current) {
      return;
    }

    setResumeDisplayName(formatResumeLabel(resumeFileRef.current, fullName));
  }, [attachState, fullName]);

  const formClassName = [
    styles["feedback-form"],
    tone === "light" ? styles["feedback-form--light"] : "",
    hasResumeAttach ? styles["feedback-form--with-resume"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    resumeFileRef.current = file;
    setAttachState("loading");
    setResumeDisplayName("");

    if (uploadTimerRef.current) {
      clearTimeout(uploadTimerRef.current);
    }

    uploadTimerRef.current = setTimeout(() => {
      setResumeDisplayName(formatResumeLabel(file, fullName));
      setAttachState("uploaded");
    }, UPLOAD_DELAY_MS);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }
    openSuccessModal(successContent);
  };

  const attachClassName = [
    styles["feedback-form__attach"],
    attachState === "loading" ? styles["feedback-form__attach--loading"] : "",
    attachState === "uploaded" ? styles["feedback-form__attach--uploaded"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const attachText =
    attachState === "loading"
      ? resumeAttach?.loadingLabel
      : attachState === "uploaded"
        ? resumeDisplayName
        : resumeAttach?.label;

  const submitButton = (
    <Button
      type="submit"
      variant="primary"
      withArrow
      disabled={!canSubmit}
      className={hasResumeAttach ? styles["feedback-form__submit"] : undefined}
    >
      {submitLabel}
    </Button>
  );

  return (
    <form className={formClassName} action="#" method="post" onSubmit={handleSubmit}>
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
          />
        ) : null}
      </div>
      <Checkbox
        name="consent"
        checked={consented}
        onChange={(event) => setConsented(event.target.checked)}
        className={styles["feedback-form__consent"]}
        label={
          <>
            Я даю согласие на обработку персональных данных в соответствии с{" "}
            <Link href="#" variant="inline" className={styles["feedback-form__consent-link"]}>
              политикой конфиденциальности
            </Link>
          </>
        }
      />
      {hasResumeAttach ? (
        <div className={styles["feedback-form__actions"]}>
          <label className={attachClassName}>
            {attachState === "loading" ? (
              <span className={styles["feedback-form__attach-progress"]} aria-hidden />
            ) : null}
            <span className={styles["feedback-form__attach-label"]}>{attachText}</span>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              disabled={attachState === "loading"}
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
