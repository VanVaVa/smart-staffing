"use client";

import Image from "next/image";
import { useId, useRef } from "react";
import { createPortal } from "react-dom";

import { routes } from "@/shared/config";
import { useModalLock } from "@/shared/ui/modal-shell";
import { Button } from "@/shared/ui/button";

import type { FeedbackFormSuccessContent } from "./FeedbackFormSuccessModalProvider";

import shellStyles from "@/shared/ui/modal-shell/modal-shell.module.css";
import styles from "./FeedbackFormSuccessModal.module.css";

const DEFAULT_SUCCESS_CONTENT: FeedbackFormSuccessContent = {
  title: "Заявка принята",
  description:
    "Спасибо за интерес к нашему продукту!\nМенеджер свяжется с вами в ближайшее время,\nи поможет подключиться к платформе.",
  homeLabel: "На главную",
  illustrationSrc: "/landing/about/book-cover.png",
  illustrationWidth: 490,
  illustrationHeight: 344,
};

type FeedbackFormSuccessModalProps = {
  open: boolean;
  onClose: () => void;
  content?: FeedbackFormSuccessContent | null;
};

export function FeedbackFormSuccessModal({
  open,
  onClose,
  content,
}: FeedbackFormSuccessModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const modalContent = content ?? DEFAULT_SUCCESS_CONTENT;

  useModalLock(open, onClose, panelRef);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className={shellStyles["modal-shell"]}>
      <button
        type="button"
        className={shellStyles["modal-shell__overlay"]}
        aria-label="Закрыть окно"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={[
          shellStyles["modal-shell__panel"],
          shellStyles["modal-shell__panel--stack"],
          styles["feedback-form-success-modal__panel"],
        ]
          .filter(Boolean)
          .join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <Image
          className={styles["feedback-form-success-modal__illustration"]}
          src={modalContent.illustrationSrc}
          alt=""
          width={modalContent.illustrationWidth}
          height={modalContent.illustrationHeight}
          sizes="(max-width: 576px) 138px, (max-width: 1050px) 185px, (max-width: 1620px) 220px, 245px"
          priority
        />
        <div className={styles["feedback-form-success-modal__copy"]}>
          <h2 id={titleId} className={styles["feedback-form-success-modal__title"]}>
            {modalContent.title}
          </h2>
          <p
            id={descriptionId}
            className={styles["feedback-form-success-modal__description"]}
          >
            {modalContent.description}
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
          {modalContent.homeLabel}
        </Button>
      </div>
    </div>,
    document.body,
  );
}
