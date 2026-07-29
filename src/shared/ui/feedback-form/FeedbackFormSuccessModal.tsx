"use client";

import Image from "next/image";
import { useEffect, useId, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { routes } from "@/shared/config";
import { Button } from "@/shared/ui/button";

import styles from "./FeedbackFormSuccessModal.module.css";

const PAGE_BLUR_CLASS = "feedback-form-success-modal-open";

type FeedbackFormSuccessModalProps = {
  open: boolean;
  onClose: () => void;
};

export function FeedbackFormSuccessModal({
  open,
  onClose,
}: FeedbackFormSuccessModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    const root = document.documentElement;
    const { style: bodyStyle } = document.body;

    scrollYRef.current = window.scrollY;

    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollYRef.current}px`;
    bodyStyle.width = "100%";
    bodyStyle.overflow = "hidden";
    root.classList.add(PAGE_BLUR_CLASS);
    panelRef.current?.focus();

    return () => {
      bodyStyle.position = "";
      bodyStyle.top = "";
      bodyStyle.width = "";
      bodyStyle.overflow = "";
      root.classList.remove(PAGE_BLUR_CLASS);
      window.scrollTo({
        top: scrollYRef.current,
        left: 0,
        behavior: "instant",
      });
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className={styles["feedback-form-success-modal"]}>
      <button
        type="button"
        className={styles["feedback-form-success-modal__overlay"]}
        aria-label="Закрыть окно"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={styles["feedback-form-success-modal__panel"]}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <Image
          className={styles["feedback-form-success-modal__illustration"]}
          src="/landing/vacancies/application-success-illustration.png"
          alt=""
          width={490}
          height={344}
          sizes="(max-width: 768px) min(245px, 100vw), min(245px, 12.8vw)"
          priority
        />
        <div className={styles["feedback-form-success-modal__copy"]}>
          <h2 id={titleId} className={styles["feedback-form-success-modal__title"]}>
            Заявка принята
          </h2>
          <p
            id={descriptionId}
            className={styles["feedback-form-success-modal__description"]}
          >
            {
              "Спасибо за интерес к нашему продукту!\nМенеджер свяжется с вами в ближайшее время,\nи поможет подключиться к платформе."
            }
          </p>
        </div>
        <Button
          href={routes.home}
          variant="dark"
          size="lg"
          fullWidth
          className={styles["feedback-form-success-modal__action"]}
          onClick={onClose}
        >
          На главную
        </Button>
      </div>
    </div>,
    document.body,
  );
}
