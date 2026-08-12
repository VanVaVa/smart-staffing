"use client";

import { useId, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import type {
  DocumentItem,
  DocumentsPageContent,
} from "@/entities/landing";
import { useModalLock } from "@/shared/ui/modal-shell";

import shellStyles from "@/shared/ui/modal-shell/modal-shell.module.css";
import styles from "./SoftwareRightsModal.module.css";

type SoftwareRightsModalProps = {
  document: DocumentItem | null;
  content: DocumentsPageContent["softwareRights"];
  onClose: () => void;
};

export function SoftwareRightsModal({
  document: activeDocument,
  content,
  onClose,
}: SoftwareRightsModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = activeDocument !== null;

  useModalLock(open, onClose, closeRef);

  if (!activeDocument) {
    return null;
  }

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
        className={shellStyles["modal-shell__overlay"]}
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
          <h2 id={titleId} className={styles["software-rights-modal__title"]}>
            {activeDocument.title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className={styles["software-rights-modal__close"]}
            aria-label="Закрыть"
            onClick={onClose}
          >
            <Image
              src="/icons/close-grey.svg"
              alt=""
              width={48}
              height={48}
            />
          </button>
        </header>
        <div className={styles["software-rights-modal__scroll"]}>
          <div className={styles["software-rights-modal__content"]}>
            <ul className={styles["software-rights-modal__registrations"]}>
              {content.registrations.map((registration) => (
                <li key={registration}>{registration}</li>
              ))}
            </ul>
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}
