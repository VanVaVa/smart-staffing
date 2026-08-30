import type { ClientsPlatformBenefitsShowcaseItem } from "@/entities/landing";

import {
  ClientsPlatformBenefitsResponsiveImage,
  getClientsPlatformBenefitsAspectRatioStyle,
} from "../clients-platform-benefits-responsive-image";

import styles from "./ClientsPlatformBenefitsShowcaseCard.module.css";

type ClientsPlatformBenefitsShowcaseCardProps = {
  item: ClientsPlatformBenefitsShowcaseItem;
};

export function ClientsPlatformBenefitsShowcaseCard({
  item,
}: ClientsPlatformBenefitsShowcaseCardProps) {
  return (
    <article
      className={styles["clients-platform-benefits-showcase-card"]}
      style={getClientsPlatformBenefitsAspectRatioStyle(item)}
    >
      <ClientsPlatformBenefitsResponsiveImage
        className={styles["clients-platform-benefits-showcase-card__picture"]}
        alt={item.title}
        images={item}
      />
    </article>
  );
}
