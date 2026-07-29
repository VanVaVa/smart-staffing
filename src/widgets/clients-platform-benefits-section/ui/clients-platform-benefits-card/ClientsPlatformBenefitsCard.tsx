import Image from "next/image";

import type { ClientsPlatformBenefitsCardContent } from "@/entities/landing";

import styles from "./ClientsPlatformBenefitsCard.module.css";

type ClientsPlatformBenefitsCardProps = {
  card: ClientsPlatformBenefitsCardContent;
};

export function ClientsPlatformBenefitsCard({ card }: ClientsPlatformBenefitsCardProps) {
  const toneClass =
    card.titleTone === "light"
      ? styles["clients-platform-benefits-card__title--light"]
      : styles["clients-platform-benefits-card__title--dark"];

  return (
    <article
      className={`${styles["clients-platform-benefits-card"]} ${styles[`clients-platform-benefits-card--${card.variant}`]}`}
    >
      <p
        className={`${styles["clients-platform-benefits-card__title"]} ${toneClass}`}
      >
        {card.title}
      </p>
      <div className={styles["clients-platform-benefits-card__visual"]}>
        <Image
          className={styles["clients-platform-benefits-card__image"]}
          src={card.visual.imageSrc}
          alt={card.visual.imageAlt}
          width={card.visual.imageWidth}
          height={card.visual.imageHeight}
          sizes="(max-width: 960px) 100vw, 25vw"
        />
      </div>
    </article>
  );
}
