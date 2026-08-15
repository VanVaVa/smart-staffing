"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { useModalLock } from "@/shared/ui/modal-shell";
import { usePageFooter } from "@/shared/ui/page-chrome";
import { Button } from "@/shared/ui/button";

import shellStyles from "@/shared/ui/modal-shell/modal-shell.module.css";
import styles from "./CompanyConnectionModal.module.css";

const MODAL_OPEN_CLASS = "company-connection-modal-open";

const FEATURES = [
  "Доступ к аккредитованным компаниям платформы без ограничений",
  "Добавление до 20 компаний в статус партнеров (не в сеть)",
  "Работа с запросами и специалистами",
  "Аналитика по ресурсам и проектам",
  "Участие в партнёрских сетях на платформе",
] as const;

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
      <button
        type="button"
        className={shellStyles["modal-shell__overlay"]}
        aria-label="Закрыть окно"
        onClick={onClose}
      />
      <button
        type="button"
        className={styles["company-connection-modal__back"]}
        aria-label="Закрыть окно"
        onClick={onClose}
      >
        <ArrowIcon
          name="2Left"
          className={styles["company-connection-modal__back-icon"]}
        />
      </button>
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
        <div className={styles["company-connection-modal__content"]}>
          <section
            className={styles["company-connection-modal__sales-card"]}
          >
            <div
              className={styles["company-connection-modal__sales-orb--orange"]}
              aria-hidden
            />
            <div
              className={styles["company-connection-modal__sales-orb--purple"]}
              aria-hidden
            />
            <div className={styles["company-connection-modal__sales-copy"]}>
              <h3 className={styles["company-connection-modal__sales-title"]}>
                Больше возможностей для масштабирования с расширенным тарифом
              </h3>
              <p className={styles["company-connection-modal__sales-description"]}>
                Создавайте собственные партнёрские сети, управляйте и
                распределяйте ресурсы. Больше контроля, гибкости и возможностей
                для масштабирования бизнеса.
              </p>
            </div>
            <Button
              href="#contacts"
              withArrow
              className={styles["company-connection-modal__sales-action"]}
              onClick={handleContactClick}
            >
              Связаться с отделом продаж
            </Button>
          </section>
          <div
            className={styles["company-connection-modal__hero-cap"]}
            aria-hidden
          />
          <div className={styles["company-connection-modal__body"]}>
            <p className={styles["company-connection-modal__summary"]}>
              Используйте возможности платформы{" "}
              <strong>без ограничений</strong> для основных задач и работайте с
              ключевым функционалом платформы за <strong>0 ₽.</strong>
            </p>
            <h3 className={styles["company-connection-modal__features-title"]}>
              Доступно сразу после регистрации:
            </h3>
            <ul className={styles["company-connection-modal__features"]}>
              {FEATURES.map((feature) => (
                <li
                  key={feature}
                  className={styles["company-connection-modal__feature"]}
                >
                  <span
                    className={styles["company-connection-modal__check"]}
                    aria-hidden
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles["company-connection-modal__page-footer"]}>
          {pageFooter}
        </div>
      </div>
    </div>,
    document.body,
  );
}
