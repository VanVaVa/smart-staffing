import type {
  ProductShowcaseBenefit,
  ProductShowcaseBenefitMedia,
} from "@/entities/landing/model/home-blocks";

import {
  ProductShowcaseBenefitCostCard,
  ProductShowcaseBenefitStatCard,
  ProductShowcaseBenefitTallMediaCard,
  ProductShowcaseBenefitWideMediaCard,
} from "../product-showcase-benefit-card";
import styles from "./ProductShowcaseBenefits.module.css";

type ProductShowcaseBenefitsProps = {
  benefitsTitle: string;
  benefits: ProductShowcaseBenefit[];
  benefitMedia: ProductShowcaseBenefitMedia;
};

export function ProductShowcaseBenefits({
  benefitsTitle,
  benefits,
  benefitMedia,
}: ProductShowcaseBenefitsProps) {
  const cost = benefits.find((b) => b.layout === "cost");
  const contractors = benefits.find((b) => b.layout === "wide-media");
  const competencies = benefits.find((b) => b.layout === "tall-media");
  const stat = benefits.find((b) => b.layout === "stat");

  return (
    <div id="pricing" className={styles["product-showcase-benefits"]}>
      <h3 className={styles["product-showcase-benefits__title"]}>
        {benefitsTitle}
      </h3>
      <div className={styles["product-showcase-benefits__grid"]}>
        {cost ? (
          <ProductShowcaseBenefitCostCard
            title={cost.title}
            text={cost.text}
            costIcons={benefitMedia.costIcons}
          />
        ) : null}
        {contractors ? (
          <ProductShowcaseBenefitWideMediaCard
            title={contractors.title}
            text={contractors.text}
            mediaImageSrc={benefitMedia.contractors}
          />
        ) : null}
        {competencies ? (
          <ProductShowcaseBenefitTallMediaCard
            title={competencies.title}
            text={competencies.text}
            mediaImageSrc={benefitMedia.competencies}
          />
        ) : null}
        {stat ? (
          <ProductShowcaseBenefitStatCard
            statValue={stat.statValue ?? ""}
            title={stat.title}
            text={stat.text}
            mediaImageSrc={benefitMedia.stat}
          />
        ) : null}
      </div>
    </div>
  );
}
