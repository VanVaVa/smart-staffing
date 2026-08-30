"use client";

import { useId } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { useModalLock } from "@/shared/ui/modal-shell";

import styles from "./AboutPartnerAwardModal.module.css";

type AboutPartnerAwardModalProps = {
  open: boolean;
  onClose: () => void;
  documentSrc: string;
  documentAlt: string;
  documentWidth: number;
  documentHeight: number;
};

export function AboutPartnerAwardModal({
  open,
  onClose,
  documentSrc,
  documentAlt,
  documentWidth,
  documentHeight,
}: AboutPartnerAwardModalProps) {
  const titleId = useId();

  useModalLock(open, onClose);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className={styles["about-partner-award-modal"]}>
      <button
        type="button"
        className={styles["about-partner-award-modal__overlay"]}
        aria-label="Закрыть просмотр документа"
        onClick={onClose}
      />
      <div
        className={styles["about-partner-award-modal__panel"]}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          type="button"
          className={styles["about-partner-award-modal__back"]}
          onClick={onClose}
        >
          <ArrowIcon
            name="2Left"
            className={styles["about-partner-award-modal__back-icon"]}
          />
          <span id={titleId}>Награды</span>
        </button>
        <div className={styles["about-partner-award-modal__scroll"]}>
          <div>
            <div className={styles["about-partner-award-modal__document-wrap"]}>
              <Image
                className={styles["about-partner-award-modal__document"]}
                src={documentSrc}
                alt={documentAlt}
                width={documentWidth}
                height={documentHeight}
                sizes="(max-width: 768px) 100vw, min(684px, 36vw)"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
