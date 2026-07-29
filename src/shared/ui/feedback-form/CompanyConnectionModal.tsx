"use client";

import { useEffect, useId, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/shared/ui/button";

import styles from "./CompanyConnectionModal.module.css";

const PAGE_BLUR_CLASS = "company-connection-modal-open";

const FEATURES = [
  "До 10 пользователей в команде",
  "До 20 проектных команд внутри аккредитованных компаний платформы",
  "Работа с внешними подрядчиками и запросами платформы",
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

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

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
    <div className={styles["company-connection-modal"]}>
      <button
        type="button"
        className={styles["company-connection-modal__overlay"]}
        aria-label="Закрыть окно"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={styles["company-connection-modal__panel"]}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className={styles["company-connection-modal__header"]}>
          <h2 id={titleId} className={styles["company-connection-modal__title"]}>
            Тарифы
          </h2>
          <button
            type="button"
            className={styles["company-connection-modal__close"]}
            aria-label="Закрыть окно"
            onClick={onClose}
          >
            <span className={styles["company-connection-modal__close-icon"]} aria-hidden />
          </button>
        </div>
        <div className={styles["company-connection-modal__content"]}>
          <section className={styles["company-connection-modal__sales-card"]}>
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
                Больше возможностей для роста вашей сети с расширенным тарифом
              </h3>
              <p className={styles["company-connection-modal__sales-description"]}>
                Создавайте собственные сети партнёров, управляйте и распределяйте
                ресурсы между проектами. Больше контроля, гибкости и возможностей
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
    </div>,
    document.body,
  );
}
