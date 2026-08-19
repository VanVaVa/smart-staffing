"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import type { DocumentCertificate } from "@/entities/landing";
import { ArrowIcon } from "@/shared/ui";

import { useDocumentModal } from "../../lib/use-document-modal";
import styles from "./CertificateGallery.module.css";

type CertificateGalleryProps = {
  certificates: DocumentCertificate[];
  activeIndex: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
};

export function CertificateGallery({
  certificates,
  activeIndex,
  onChange,
  onClose,
}: CertificateGalleryProps) {
  const backRef = useRef<HTMLButtonElement>(null);
  const open = activeIndex !== null;
  const activeCertificate =
    activeIndex === null ? null : certificates[activeIndex];

  useDocumentModal(open, onClose);

  useEffect(() => {
    if (!open || activeIndex === null) {
      return;
    }

    backRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        onChange((activeIndex - 1 + certificates.length) % certificates.length);
      }

      if (event.key === "ArrowRight") {
        onChange((activeIndex + 1) % certificates.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, certificates.length, onChange, open]);

  if (!activeCertificate || activeIndex === null) {
    return null;
  }

  const showPrevious = () =>
    onChange((activeIndex - 1 + certificates.length) % certificates.length);
  const showNext = () => onChange((activeIndex + 1) % certificates.length);

  return createPortal(
    <div className={styles["certificate-gallery"]}>
      <button
        type="button"
        className={styles["certificate-gallery__overlay"]}
        aria-label="Закрыть просмотр свидетельства"
        onClick={onClose}
      />
      <button
        ref={backRef}
        type="button"
        className={styles["certificate-gallery__back"]}
        onClick={onClose}
      >
        <ArrowIcon name="2Left" />
        Документы
      </button>
      <button
        type="button"
        className={`${styles["certificate-gallery__control"]} ${styles["certificate-gallery__control--previous"]}`}
        aria-label="Предыдущее свидетельство"
        onClick={showPrevious}
      >
        <ArrowIcon name="2Left" />
      </button>
      <div className={styles["certificate-gallery__slot"]}>
        <div
          className={styles["certificate-gallery__document"]}
          role="dialog"
          aria-modal="true"
          aria-label={activeCertificate.title}
        >
          <Image
            className={styles["certificate-gallery__image"]}
            src={activeCertificate.imageSrc}
            alt={activeCertificate.imageAlt}
            width={activeCertificate.imageWidth}
            height={activeCertificate.imageHeight}
            sizes="(max-width: 768px) 100vw, min(684px, 36vw)"
            priority
          />
        </div>
      </div>
      <button
        type="button"
        className={`${styles["certificate-gallery__control"]} ${styles["certificate-gallery__control--next"]}`}
        aria-label="Следующее свидетельство"
        onClick={showNext}
      >
        <ArrowIcon name="2Right" />
      </button>
    </div>,
    document.body,
  );
}
