"use client";

import { useState } from "react";

import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Link } from "@/shared/ui/link";

import styles from "./AboutBookForm.module.css";

type AboutBookFormProps = {
  inputPlaceholder: string;
  buttonLabel: string;
};

export function AboutBookForm({ inputPlaceholder, buttonLabel }: AboutBookFormProps) {
  const [telegramId, setTelegramId] = useState("");
  const [consented, setConsented] = useState(false);

  const canSubmit = consented && telegramId.trim().length > 0;

  return (
    <form className={styles["about-book-form"]} action="#" method="post">
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
            required
            value={telegramId}
            onChange={(event) => setTelegramId(event.target.value)}
            className={styles["about-book-form__input"]}
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            withArrow
            disabled={!canSubmit}
            className={styles["about-book-form__submit"]}
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
            <>
              Я даю согласие на обработку персональных данных в соответствии с{" "}
              <Link href="#" variant="inline" className={styles["about-book-form__consent-link"]}>
                политикой конфиденциальности
              </Link>
            </>
          }
        />
      </div>
    </form>
  );
}
