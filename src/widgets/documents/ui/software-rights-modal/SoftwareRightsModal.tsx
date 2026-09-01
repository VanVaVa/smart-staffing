"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

import type {
  DocumentItem,
  DocumentModalContent,
} from "@/entities/landing";
import { ArrowIcon } from "@/shared/ui";
import { useModalLock } from "@/shared/ui/modal-shell";
import { usePageFooter } from "@/shared/ui/page-chrome";

import shellStyles from "@/shared/ui/modal-shell/modal-shell.module.css";
import styles from "./SoftwareRightsModal.module.css";

const MODAL_OPEN_CLASS = "software-rights-modal-open";

type SoftwareRightsModalProps = {
  document: DocumentItem | null;
  content: DocumentModalContent | null;
  onClose: () => void;
};

export function SoftwareRightsModal({
  document: activeDocument,
  content,
  onClose,
}: SoftwareRightsModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const pageFooter = usePageFooter();
  const open = activeDocument !== null;

  useModalLock(open, onClose, closeRef);

  useEffect(() => {
    if (!open) {
      return;
    }

    document.documentElement.classList.add(MODAL_OPEN_CLASS);

    return () => {
      document.documentElement.classList.remove(MODAL_OPEN_CLASS);
    };
  }, [open]);

  if (!activeDocument || !content) {
    return null;
  }

  const registrations = content.registrations ?? [];

  return createPortal(
    <div
      className={[
        shellStyles["modal-shell"],
        styles["software-rights-modal"],
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        className={[
          shellStyles["modal-shell__overlay"],
          styles["software-rights-modal__overlay"],
        ].join(" ")}
        aria-label="Закрыть просмотр документа"
        onClick={onClose}
      />
      <section
        className={[
          shellStyles["modal-shell__panel"],
          shellStyles["modal-shell__panel--scroll"],
          shellStyles["modal-shell__panel--wide"],
          styles["software-rights-modal__panel"],
        ]
          .filter(Boolean)
          .join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className={styles["software-rights-modal__header"]}>
          <button
            ref={closeRef}
            type="button"
            className={styles["software-rights-modal__back"]}
            onClick={onClose}
          >
            <ArrowIcon
              name="2Left"
              className={styles["software-rights-modal__back-icon"]}
            />
            <span className={styles["software-rights-modal__back-label"]}>
              Документы
            </span>
            <span
              className={styles["software-rights-modal__close-icon"]}
              aria-hidden
            />
          </button>
          <h2 id={titleId} className={styles["software-rights-modal__title"]}>
            {activeDocument.title}
          </h2>
        </header>
        <div className={styles["software-rights-modal__scroll"]}>
          <div className={styles["software-rights-modal__content"]}>
            {registrations.length > 0 ? (
              <ul className={styles["software-rights-modal__registrations"]}>
                {registrations.map((registration, index) => (
                  <li key={`${registration}-${index}`}>
                    <span>
                      {registration}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
            {content.paragraphs.map((paragraph, index) => (
              <p key={`${paragraph}-${index}`}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className={styles["software-rights-modal__page-footer"]}>
            {pageFooter}
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}
