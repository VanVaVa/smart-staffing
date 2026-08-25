import Image from "next/image";

import type { ClientsPlatformBenefitsShowcaseItem } from "@/entities/landing";

import styles from "./ClientsPlatformBenefitsShowcaseCard.module.css";

type ClientsPlatformBenefitsShowcaseCardProps = {
  item: ClientsPlatformBenefitsShowcaseItem;
  itemIndex: number;
};

export function ClientsPlatformBenefitsShowcaseCard({
  item,
}: ClientsPlatformBenefitsShowcaseCardProps) {
  if (item.variant === "it-costs") {
    const isPortraitVisual = item.visual.imageHeight > item.visual.imageWidth;

    return (
      <article
        className={`${styles["clients-platform-benefits-showcase-card"]} ${styles["clients-platform-benefits-showcase-card--it-costs"]} ${styles["clients-platform-benefits-showcase-card--dark-bg"]}`}
        data-header-backdrop="dark"
        data-header-veil-bg="#212039"
      >
        <div className={styles["clients-platform-benefits-showcase-card__copy"]}>
          <h3 className={styles["clients-platform-benefits-showcase-card__title"]}>
            {item.title}
          </h3>
          <p className={styles["clients-platform-benefits-showcase-card__subtitle"]}>
            {item.subtitle}
          </p>
        </div>
        <div>
          <Image
            className={`${styles["clients-platform-benefits-showcase-card__it-visual"]} ${
              isPortraitVisual
                ? ` ${styles["clients-platform-benefits-showcase-card__it-visual--portrait"]}`
                : ""
            } ${
              item.title.includes("Контроль сроков") || item.title.includes("Доступ к кандидатам")
                ? `${styles["clients-platform-benefits-showcase-card__it-visual--big-portrait"]}`
                : ""}`
            }
            src={item.visual.imageSrc}
            alt={item.visual.imageAlt}
            width={item.visual.imageWidth}
            height={item.visual.imageHeight}
            sizes="(max-width: 768px) 100vw, (max-width: 1050px) 460px, 31vw"
          />
        </div>
      </article>
    );
  }

  if (item.variant === "quality") {
    return (
      <article
        className={`${styles["clients-platform-benefits-showcase-card"]} ${styles["clients-platform-benefits-showcase-card--quality"]}`}
        data-header-veil-bg="#ffffff"
      >
        <div className={styles["clients-platform-benefits-showcase-card__quality-top"]}>
          <div className={styles["clients-platform-benefits-showcase-card__copy"]}>
            <h3 className={`${styles["clients-platform-benefits-showcase-card__title"]} ${styles["clients-platform-benefits-showcase-card__title--dark"]}`}>
              {item.title}
            </h3>
            <p className={`${styles["clients-platform-benefits-showcase-card__subtitle"]} ${styles["clients-platform-benefits-showcase-card__subtitle--dark"]}`}>
              {item.subtitle}
            </p>
          </div>
          {item.stat ? (
            <div className={styles["clients-platform-benefits-showcase-card__stat"]}>
              <span
                className={styles["clients-platform-benefits-showcase-card__stat-bar"]}
                aria-hidden
              />
              <p className={styles["clients-platform-benefits-showcase-card__stat-value"]}>
                {item.stat.value}
              </p>
              <p className={styles["clients-platform-benefits-showcase-card__stat-text"]}>
                {item.stat.description}
              </p>
            </div>
          ) : null}
        </div>
        <div className={styles["clients-platform-benefits-showcase-card__quality-visual"]}>
          <div>
            <Image
              className={styles["clients-platform-benefits-showcase-card__quality-image"]}
              src={item.visual.imageSrc}
              alt={item.visual.imageAlt}
              width={item.visual.imageWidth}
              height={item.visual.imageHeight}
              sizes="(max-width: 768px) 100vw, (max-width: 1050px) 460px, 66vw"
            />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`${styles["clients-platform-benefits-showcase-card"]} ${styles["clients-platform-benefits-showcase-card--scaling"]}`}
      data-header-veil-bg="#decab2"
    >
      <div>
        <Image
          className={styles["clients-platform-benefits-showcase-card__scaling-photo"]}
          src={item.visual.imageSrc}
          alt={item.visual.imageAlt}
          width={item.visual.imageWidth}
          height={item.visual.imageHeight}
          sizes="(max-width: 1050px) 928px, 100vw"
        />
      </div>
      <div className={styles["clients-platform-benefits-showcase-card__copy"]}>
        <h3 className={`${styles["clients-platform-benefits-showcase-card__title"]} ${styles["clients-platform-benefits-showcase-card__title--dark"]}`}>
          {item.title}
        </h3>
        <p className={`${styles["clients-platform-benefits-showcase-card__subtitle"]} ${styles["clients-platform-benefits-showcase-card__subtitle--dark"]}`}>
          {item.subtitle}
        </p>
      </div>
    </article>
  );
}
