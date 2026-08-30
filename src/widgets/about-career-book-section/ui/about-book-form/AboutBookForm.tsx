"use client";

import {
  sanitizeTelegramInput,
  validateTelegram,
} from "@/entities/form-submission/lib/contact-field-validation";
import { type FormEvent, useState } from "react";

import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { FormConsentLabel } from "@/shared/ui/form-consent-label";
import { Input } from "@/shared/ui/input";
import { submitForm } from "@/shared/lib/submit-form";
import { useFeedbackFormSuccessModal } from "@/shared/ui/feedback-form/FeedbackFormSuccessModalProvider";

import styles from "./AboutBookForm.module.css";

type AboutBookFormProps = {
  inputPlaceholder: string;
  buttonLabel: string;
};

export function AboutBookForm({ inputPlaceholder, buttonLabel }: AboutBookFormProps) {
  const { openSuccessModal } = useFeedbackFormSuccessModal();
  const [telegramId, setTelegramId] = useState("");
  const [touchedTelegram, setTouchedTelegram] = useState(false);
  const [consented, setConsented] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const telegramValidationError = validateTelegram(telegramId);
  const telegramError =
    touchedTelegram && telegramValidationError ? telegramValidationError : undefined;

  const canSubmit = !submitting && consented && telegramValidationError === null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const result = await submitForm({
      type: "book",
      channel: "telegram",
      contactValue: telegramId.trim(),
      consent: true,
      sourcePath: "/about",
    });

    setSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.error);
      return;
    }

    setTelegramId("");
    setTouchedTelegram(false);
    setConsented(false);
    openSuccessModal({
      title: "Заявка принята",
      description: "Мы свяжемся с вами в Telegram и отправим книгу.",
      homeLabel: "На главную",
      illustrationSrc: "/landing/vacancies/application-success-illustration.png",
      illustrationWidth: 490,
      illustrationHeight: 344,
    });
  };

  return (
    <form
      className={styles["about-book-form"]}
      action="#"
      method="post"
      data-header-backdrop="dark"
      data-header-overlap="full"
      data-header-veil-bg="#0e0d18"
      onSubmit={handleSubmit}
    >
      <div className={styles["about-book-form__decor"]} aria-hidden>
        <div className={styles["about-book-form__orb--purple"]} />
        <div className={styles["about-book-form__orb--orange"]} />
      </div>
      <div className={styles["about-book-form__fields"]}>
        <div className={styles["about-book-form__row"]}>
          <Input
            name="telegram"
            type="text"
            placeholder={inputPlaceholder}
            autoComplete="username"
            maxLength={33}
            spellCheck={false}
            required
            value={telegramId}
            error={telegramError}
            onChange={(event) => setTelegramId(sanitizeTelegramInput(event.target.value))}
            onBlur={() => setTouchedTelegram(true)}
            className={styles["about-book-form__input"]}
            disabled={submitting}
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            withArrow
            disabled={!canSubmit}
            className={styles["about-book-form__submit"]}
          >
            <span>
              {submitting ? "Отправка..." : buttonLabel}
            </span>
          </Button>
        </div>
        <Checkbox
          name="consent"
          checked={consented}
          onChange={(event) => setConsented(event.target.checked)}
          className={styles["about-book-form__consent"]}
          disabled={submitting}
          label={
            <FormConsentLabel linkClassName={styles["about-book-form__consent-link"]} />
          }
        />
        {submitError ? <p className={styles["about-book-form__error"]}>{submitError}</p> : null}
      </div>
    </form>
  );
}
