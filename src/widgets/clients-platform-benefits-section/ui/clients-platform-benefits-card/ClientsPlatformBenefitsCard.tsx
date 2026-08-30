import type { ClientsPlatformBenefitsCardContent } from "@/entities/landing";

import {
  ClientsPlatformBenefitsResponsiveImage,
  getClientsPlatformBenefitsAspectRatioStyle,
} from "../clients-platform-benefits-responsive-image";

import styles from "./ClientsPlatformBenefitsCard.module.css";

type ClientsPlatformBenefitsCardProps = {
  card: ClientsPlatformBenefitsCardContent;
};

export function ClientsPlatformBenefitsCard({ card }: ClientsPlatformBenefitsCardProps) {
  return (
    <article
      className={styles["clients-platform-benefits-card"]}
      style={getClientsPlatformBenefitsAspectRatioStyle(card)}
    >
      <ClientsPlatformBenefitsResponsiveImage
        className={styles["clients-platform-benefits-card__picture"]}
        alt={card.title}
        images={card}
      />
    </article>
  );
}
