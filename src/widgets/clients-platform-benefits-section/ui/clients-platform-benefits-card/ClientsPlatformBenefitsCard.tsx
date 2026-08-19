import Image from "next/image";

import type { ClientsPlatformBenefitsCardContent } from "@/entities/landing";

import styles from "./ClientsPlatformBenefitsCard.module.css";

type ClientsPlatformBenefitsCardProps = {
  card: ClientsPlatformBenefitsCardContent;
  cardIndex: number;
  cardCount: number;
  mobileFullWidth: boolean;
};

function ClientsPlatformBenefitsInProgressIcon() {
  return (
    <svg
      className={styles["clients-platform-benefits-card__in-progress-icon"]}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4.667 3.5v19.25a1.75 1.75 0 0 0 1.75 1.75h17.5v-2.333H7V3.5H4.667Z"
        fill="currentColor"
      />
      <path
        d="M9.333 5.833h12.834v3.5H9.333v-3.5Zm0 5.834h8.167v3.5H9.333v-3.5Zm2.334 5.833h9.333v3.5h-9.333v-3.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ClientsPlatformBenefitsCard({
  card,
  cardIndex,
  cardCount,
  mobileFullWidth,
}: ClientsPlatformBenefitsCardProps) {
  const toneClass =
    card.backgroundType === "dark-bg"
      ? styles["clients-platform-benefits-card__title--light"]
      : styles["clients-platform-benefits-card__title--dark"];

  const visualLayoutClass =
    card.visualLayout === "dark-bg"
      ? styles["clients-platform-benefits-card--dark-visual"]
      : "";

  const slotLayoutClass =
    cardCount >= 4 && cardIndex === 3
      ? styles["clients-platform-benefits-card--slot-4-geometry-layout"]
      : cardCount === 3 && cardIndex === 1
        ? styles["clients-platform-benefits-card--slot-3-wide-layout"]
        : "";

  const mobileFullWidthClass = mobileFullWidth
    ? card.backgroundType === "full-bg"
      ? styles["clients-platform-benefits-card--mobile-full-bleed"]
      : styles["clients-platform-benefits-card--mobile-wide"]
    : "";

  const inProgressClass = card.inProgress
    ? styles["clients-platform-benefits-card--in-progress"]
    : "";

  const visualAlignClass =
    card.visualAlign === "start"
      ? styles["clients-platform-benefits-card--visual-align-start"]
      : "";

  const showGeometry =
    card.backgroundType === "geometry-bg" ||
    (card.backgroundType === "light-bg" && mobileFullWidth);

  const geometryMobileOnlyClass =
    card.backgroundType === "light-bg" && mobileFullWidth
      ? styles["clients-platform-benefits-card__geometry--mobile-only"]
      : "";

  return (
    <article
      className={`${styles["clients-platform-benefits-card"]} ${styles[`clients-platform-benefits-card--${card.backgroundType}`]} ${visualLayoutClass} ${slotLayoutClass} ${mobileFullWidthClass} ${inProgressClass} ${visualAlignClass}`}
      data-header-backdrop={card.backgroundType === "dark-bg" ? "dark" : undefined}
    >
      {showGeometry ? (
        <div
          className={`${styles["clients-platform-benefits-card__geometry"]} ${geometryMobileOnlyClass}`}
          aria-hidden
        >
          <span
            className={styles["clients-platform-benefits-card__geometry-blob--purple"]}
          />
          <span
            className={styles["clients-platform-benefits-card__geometry-blob--orange"]}
          />
        </div>
      ) : null}
      <p className={`${styles["clients-platform-benefits-card__title"]} ${toneClass}`}>
        {card.title}
      </p>
      <div className={styles["clients-platform-benefits-card__visual"]}>
        <div className={
            card.visual.imageMobileSrc
              ? styles["clients-platform-benefits-card__slot--desktop"]
              : undefined
          }>
          <Image
            className={styles["clients-platform-benefits-card__image"]}
            src={card.visual.imageSrc}
            alt={card.visual.imageAlt}
            width={card.visual.imageWidth}
            height={card.visual.imageHeight}
            sizes="(max-width: 768px) 100vw, (max-width: 992px) 288px, 25vw"
          />
        </div>
        {card.visual.imageMobileSrc ? (
          <div className={styles["clients-platform-benefits-card__slot--mobile"]}>
            <Image
              className={styles["clients-platform-benefits-card__image"]}
              src={card.visual.imageMobileSrc}
              alt={card.visual.imageAlt}
              width={card.visual.imageMobileWidth ?? card.visual.imageWidth}
              height={card.visual.imageMobileHeight ?? card.visual.imageHeight}
              sizes="100vw"
            />
          </div>
        ) : null}
        {card.inProgress ? (
          <>
            <div
              className={styles["clients-platform-benefits-card__visual-overlay"]}
              aria-hidden
            />
            <div className={styles["clients-platform-benefits-card__in-progress"]}>
              <ClientsPlatformBenefitsInProgressIcon />
              <span className={styles["clients-platform-benefits-card__in-progress-text"]}>
                скоро
              </span>
            </div>
          </>
        ) : null}
      </div>
    </article>
  );
}
