"use client";

import { useState, useSyncExternalStore } from "react";

import { Button } from "@/shared/ui/button";
import { Link } from "@/shared/ui/link";

import styles from "./CookieConsent.module.css";

const STORAGE_KEY = "cookie-consent-accepted";

function subscribe() {
  return () => {};
}

function readAccepted(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function CookieConsent() {
  const accepted = useSyncExternalStore(subscribe, readAccepted, () => true);
  const [dismissed, setDismissed] = useState(false);

  const handleAccept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      setDismissed(true);
      return;
    }
    setDismissed(true);
  };

  if (accepted || dismissed) {
    return null;
  }

  return (
    <div className={styles["cookie-consent"]} role="dialog" aria-live="polite">
      <p className={styles["cookie-consent__text"]}>
        Сайт использует файлы cookie. Продолжая пользоваться сайтом, вы соглашаетесь
        с{" "}
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
        onClick={handleAccept}
        className={styles["cookie-consent__accept"]}
      >
        Принять
      </Button>
    </div>
  );
}
