"use client";

import { useEffect, useId, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import { ArrowIcon } from "@/shared/ui/arrow-icon";

import styles from "./AboutPartnerAwardModal.module.css";

const PAGE_BLUR_CLASS = "about-partner-award-modal-open";

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
  const backRef = useRef<HTMLButtonElement>(null);
  const scrollYRef = useRef(0);
  const onCloseRef = useRef(onClose);

  onCloseRef.current = onClose;

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
    backRef.current?.focus();

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

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

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
          ref={backRef}
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
    </div>,
    document.body,
  );
}
