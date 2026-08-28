"use client";

import { Button } from "@/shared/ui/button";

import styles from "./CompanyConnectionModal.module.css";

const SALES_TITLE =
  "Больше возможностей для\u00a0масштабирования с\u00a0расширенным тарифом";

const SALES_DESCRIPTION =
  "Создавайте собственные партнёрские сети, управляйте и\u00a0распределяйте ресурсы. Больше контроля, гибкости и\u00a0возможностей для\u00a0масштабирования бизнеса.";

const SALES_ACTION = "Связаться с\u00a0отделом продаж";

const FEATURES_TITLE = "Доступно сразу после\u00a0регистрации:";

const FEATURES = [
  "Доступ к\u00a0аккредитованным компаниям платформы без\u00a0ограничений",
  "Добавление до\u00a020 компаний в\u00a0статус партнеров (не\u00a0в\u00a0сеть)",
  "Работа с\u00a0запросами и\u00a0специалистами",
  "Аналитика по\u00a0ресурсам и\u00a0проектам",
  "Участие в\u00a0партнёрских сетях на\u00a0платформе",
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
            {SALES_TITLE}
          </h3>
          <p className={styles["company-connection-modal__sales-description"]}>
            {SALES_DESCRIPTION}
          </p>
        </div>
        <Button
          href={contactHref}
          withArrow
          className={styles["company-connection-modal__sales-action"]}
          onClick={onContactClick}
        >
          {SALES_ACTION}
        </Button>
      </section>
      <div className={styles["company-connection-modal__hero-cap"]} aria-hidden />
      <div className={styles["company-connection-modal__body"]}>
        <p className={styles["company-connection-modal__summary"]}>
          {"Используйте возможности платформы "}
          <strong>{"без\u00a0ограничений"}</strong>
          {" для\u00a0основных задач и\u00a0работайте с\u00a0ключевым функционалом платформы за\u00a0"}
          <strong>0 ₽.</strong>
        </p>
        <h3 className={styles["company-connection-modal__features-title"]}>
          {FEATURES_TITLE}
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
