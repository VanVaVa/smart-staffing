"use client";

import { useEffect, useId, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import { routes } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";

import styles from "./VacanciesApplicationSuccessModal.module.css";

const PAGE_BLUR_CLASS = "vacancies-application-success-modal-open";

type VacanciesApplicationSuccessModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  homeLabel: string;
  illustrationSrc: string;
  illustrationWidth: number;
  illustrationHeight: number;
};

export function VacanciesApplicationSuccessModal({
  open,
  onClose,
  title,
  description,
  homeLabel,
  illustrationSrc,
  illustrationWidth,
  illustrationHeight,
}: VacanciesApplicationSuccessModalProps) {
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

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className={styles["vacancies-application-success-modal"]}>
      <button
        type="button"
        className={styles["vacancies-application-success-modal__overlay"]}
        aria-label="Закрыть окно"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={styles["vacancies-application-success-modal__panel"]}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <Image
          className={styles["vacancies-application-success-modal__illustration"]}
          src={illustrationSrc}
          alt=""
          width={illustrationWidth}
          height={illustrationHeight}
          sizes="(max-width: 768px) min(245px, 100vw), min(245px, 12.8vw)"
          priority
        />
        <div className={styles["vacancies-application-success-modal__copy"]}>
          <h2
            id={titleId}
            className={styles["vacancies-application-success-modal__title"]}
          >
            {title}
          </h2>
          <p
            id={descriptionId}
            className={styles["vacancies-application-success-modal__description"]}
          >
            {description}
          </p>
        </div>
        <Button
          href={routes.home}
          variant="dark"
          size="lg"
          fullWidth
          className={styles["vacancies-application-success-modal__action"]}
        >
          {homeLabel}
        </Button>
      </div>
    </div>,
    document.body,
  );
}
