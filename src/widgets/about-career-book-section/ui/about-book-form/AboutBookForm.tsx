"use client";

import { useState } from "react";

import {
  sanitizeTelegramInput,
  validateTelegram,
} from "@/entities/form-submission/lib/contact-field-validation";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { FormConsentLabel } from "@/shared/ui/form-consent-label";
import { Input } from "@/shared/ui/input";

import styles from "./AboutBookForm.module.css";

const DEFAULT_TELEGRAM_HREF = "https://t.me/b2bcloud_platform/6";

type AboutBookFormProps = {
  inputPlaceholder?: string;
  buttonHref?: string;
  buttonLabel: string;
};

export function AboutBookForm({
  inputPlaceholder = "@telegram_id",
  buttonHref = DEFAULT_TELEGRAM_HREF,
  buttonLabel,
}: AboutBookFormProps) {
  const [telegramId, setTelegramId] = useState("");
  const [touchedTelegram, setTouchedTelegram] = useState(false);
  const [consented, setConsented] = useState(false);
  const resolvedHref = buttonHref.trim() || DEFAULT_TELEGRAM_HREF;

  const telegramValidationError = validateTelegram(telegramId);
  const telegramError =
    touchedTelegram && telegramValidationError ? telegramValidationError : undefined;
  const canSubmit = consented && telegramValidationError === null;

  const handleGetBook = () => {
    if (!canSubmit) {
      return;
    }
    window.open(resolvedHref, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={styles["about-book-form"]}
      data-header-backdrop="dark"
      data-header-overlap="full"
      data-header-veil-bg="#0e0d18"
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
            value={telegramId}
            error={telegramError}
            onChange={(event) => setTelegramId(sanitizeTelegramInput(event.target.value))}
            onBlur={() => setTouchedTelegram(true)}
            className={styles["about-book-form__input"]}
          />
          <Button
            type="button"
            variant="primary"
            size="lg"
            withArrow
            disabled={!canSubmit}
            className={styles["about-book-form__submit"]}
            onClick={handleGetBook}
          >
            {buttonLabel}
          </Button>
        </div>
        <Checkbox
          name="consent"
          checked={consented}
          onChange={(event) => setConsented(event.target.checked)}
          className={styles["about-book-form__consent"]}
          label={
            <FormConsentLabel linkClassName={styles["about-book-form__consent-link"]} />
          }
        />
      </div>
    </div>
  );
}
