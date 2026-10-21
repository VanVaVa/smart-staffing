"use client";

import { Button } from "@/shared/ui/button";
import { Link } from "@/shared/ui/link";

import { acceptCookieConsent, useCookieConsentAccepted } from "./cookie-consent-store";
import styles from "./CookieConsent.module.css";

export function CookieConsent() {
  const accepted = useCookieConsentAccepted();

  if (accepted !== false) {
    return null;
  }

  return (
    <div className={styles["cookie-consent"]} role="dialog" aria-live="polite">
      <p className={styles["cookie-consent__text"]}>
        Мы используем файлы cookie и Яндекс.Метрику для аналитики. Нажимая «Принять», вы
        соглашаетесь с{" "}
        <Link
          href="/documents/privacy-policy"
          variant="inline"
          className={styles["cookie-consent__link"]}
        >
          Политикой конфиденциальности
        </Link>
        .
      </p>
      <Button
        type="button"
        variant="primary"
        size="md"
        onClick={acceptCookieConsent}
        className={styles["cookie-consent__accept"]}
      >
        Принять
      </Button>
    </div>
  );
}
