"use client";

import { Button } from "@/shared/ui/button";

import styles from "./CompanyConnectionModal.module.css";

const FEATURES = [
  "Доступ к аккредитованным компаниям платформы без ограничений",
  "Добавление до 20 компаний в статус партнеров (не в сеть)",
  "Работа с запросами и специалистами",
  "Аналитика по ресурсам и проектам",
  "Участие в партнёрских сетях на платформе",
] as const;

type CompanyConnectionOfferProps = {
  contactHref: string;
  onContactClick?: () => void;
};

export function CompanyConnectionOffer({
  contactHref,
  onContactClick,
}: CompanyConnectionOfferProps) {
  return (
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
            Больше возможностей для масштабирования с расширенным тарифом
          </h3>
          <p className={styles["company-connection-modal__sales-description"]}>
            Создавайте собственные партнёрские сети, управляйте и распределяйте
            ресурсы. Больше контроля, гибкости и возможностей для масштабирования
            бизнеса.
          </p>
        </div>
        <Button
          href={contactHref}
          withArrow
          className={styles["company-connection-modal__sales-action"]}
          onClick={onContactClick}
        >
          Связаться с отделом продаж
        </Button>
      </section>
      <div className={styles["company-connection-modal__hero-cap"]} aria-hidden />
      <div className={styles["company-connection-modal__body"]}>
        <p className={styles["company-connection-modal__summary"]}>
          Используйте возможности платформы <strong>без ограничений</strong> для
          основных задач и работайте с ключевым функционалом платформы за{" "}
          <strong>0 ₽.</strong>
        </p>
        <h3 className={styles["company-connection-modal__features-title"]}>
          Доступно сразу после регистрации:
        </h3>
        <ul className={styles["company-connection-modal__features"]}>
          {FEATURES.map((feature) => (
            <li key={feature} className={styles["company-connection-modal__feature"]}>
              <span className={styles["company-connection-modal__check"]} aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
