"use client";

import { useRef } from "react";

import { routes } from "@/shared/config";
import { Button } from "@/shared/ui/button";

import { useElementOnDarkBackdrop } from "../../model/use-element-on-dark-backdrop";

import styles from "./HeaderActions.module.css";

export function HeaderActions() {
  const ghostRef = useRef<HTMLSpanElement>(null);
  const signUpRef = useRef<HTMLSpanElement>(null);
  const ghostOnDarkBackdrop = useElementOnDarkBackdrop(ghostRef);
  const signUpOnDarkBackdrop = useElementOnDarkBackdrop(signUpRef);

  return (
    <div className={styles["header-actions"]}>
      <span
        ref={ghostRef}
        className={[
          styles["header-actions__ghost-wrap"],
          ghostOnDarkBackdrop ? styles["header-actions__ghost-wrap--on-dark-backdrop"] : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Button href={routes.login} variant="ghost" className={styles["header-actions__ghost"]}>
          Вход
        </Button>
      </span>
      <span ref={signUpRef} className={styles["header-actions__sign-up-wrap"]}>
        <Button
          href={routes.signUp}
          size="md"
          variant={signUpOnDarkBackdrop ? "light" : "dark"}
          className={styles["header-actions__sign-up"]}
        >
          Регистрация
        </Button>
      </span>
    </div>
  );
}
