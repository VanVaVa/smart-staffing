import Image from "next/image";

import type { ClientsPlatformBenefitsCardContent } from "@/entities/landing";
import { EditableMedia, EditableText } from "@/shared/ui/editable-field";

import styles from "./ClientsPlatformBenefitsCard.module.css";

type ClientsPlatformBenefitsCardProps = {
  card: ClientsPlatformBenefitsCardContent;
  cardIndex: number;
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
        d="M5.25 22.75V14H8.75V22.75H5.25ZM12.25 22.75V9.625H15.75V22.75H12.25ZM19.25 22.75V5.25H22.75V22.75H19.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ClientsPlatformBenefitsCard({
  card,
  cardIndex,
}: ClientsPlatformBenefitsCardProps) {
  const prefix = `cards.${cardIndex}.`;
  const toneClass =
    card.backgroundType === "dark-bg"
      ? styles["clients-platform-benefits-card__title--light"]
      : styles["clients-platform-benefits-card__title--dark"];

  const inProgressClass = card.inProgress
    ? styles["clients-platform-benefits-card--in-progress"]
    : "";

  const visualAlignClass =
    card.visualAlign === "start"
      ? styles["clients-platform-benefits-card--visual-align-start"]
      : "";

  return (
    <article
      className={`${styles["clients-platform-benefits-card"]} ${styles[`clients-platform-benefits-card--${card.backgroundType}`]} ${inProgressClass} ${visualAlignClass}`}
    >
      {card.backgroundType === "geometry-bg" ? (
        <div className={styles["clients-platform-benefits-card__geometry"]} aria-hidden>
          <span
            className={styles["clients-platform-benefits-card__geometry-blob--purple"]}
          />
          <span
            className={styles["clients-platform-benefits-card__geometry-blob--orange"]}
          />
        </div>
      ) : null}
      <EditableText
        path={`${prefix}title`}
        label="Карточка — заголовок"
        as="p"
        className={`${styles["clients-platform-benefits-card__title"]} ${toneClass}`}
        multiline
      >
        {card.title}
      </EditableText>
      <div className={styles["clients-platform-benefits-card__visual"]}>
        <EditableMedia path={`${prefix}visual.imageSrc`} label="Карточка — изображение">
          <Image
            className={styles["clients-platform-benefits-card__image"]}
            src={card.visual.imageSrc}
            alt={card.visual.imageAlt}
            width={card.visual.imageWidth}
            height={card.visual.imageHeight}
            sizes="(max-width: 768px) 100vw, (max-width: 992px) 288px, 25vw"
          />
        </EditableMedia>
        {card.inProgress ? (
          <>
            <div
              className={styles["clients-platform-benefits-card__visual-overlay"]}
              aria-hidden
            />
            <div className={styles["clients-platform-benefits-card__in-progress"]}>
              <ClientsPlatformBenefitsInProgressIcon />
              <span className={styles["clients-platform-benefits-card__in-progress-text"]}>
                скоро реализуем
              </span>
            </div>
          </>
        ) : null}
      </div>
    </article>
  );
}
