"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

import { useModalLock } from "@/shared/ui/modal-shell";
import { usePageFooter } from "@/shared/ui/page-chrome";

import { CompanyConnectionOffer } from "./CompanyConnectionOffer";
import shellStyles from "@/shared/ui/modal-shell/modal-shell.module.css";
import styles from "./CompanyConnectionModal.module.css";

const MODAL_OPEN_CLASS = "company-connection-modal-open";

type CompanyConnectionModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CompanyConnectionModal({
  open,
  onClose,
}: CompanyConnectionModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const pageFooter = usePageFooter();

  useModalLock(open, onClose, panelRef);

  useEffect(() => {
    if (!open) {
      return;
    }

    document.documentElement.classList.add(MODAL_OPEN_CLASS);

    return () => {
      document.documentElement.classList.remove(MODAL_OPEN_CLASS);
    };
  }, [open]);

  if (!open) {
    return null;
  }

  const handleContactClick = () => {
    onClose();
    window.setTimeout(() => {
      document.getElementById("contacts")?.scrollIntoView();
    });
  };

  return createPortal(
    <div
      className={[
        shellStyles["modal-shell"],
        shellStyles["modal-shell--full-page"],
      ].join(" ")}
    >
      <div
        className={styles["company-connection-modal__header-backdrop"]}
        data-header-veil-bg="#0e0d18"
        data-header-backdrop="dark"
        data-header-overlap="full"
        aria-hidden
      />
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
          shellStyles["modal-shell__panel--wide"],
          styles["company-connection-modal__panel"],
          styles["company-connection-modal--full-page"],
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          type="button"
          className={styles["company-connection-modal__close"]}
          aria-label="Закрыть окно"
          onClick={onClose}
        >
          <span className={styles["company-connection-modal__close-icon"]} aria-hidden />
        </button>
        <CompanyConnectionOffer
          contactHref="#contacts"
          onContactClick={handleContactClick}
        />
        <div className={styles["company-connection-modal__page-footer"]}>
          {pageFooter}
        </div>
      </div>
    </div>,
    document.body,
  );
}
