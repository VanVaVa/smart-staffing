import { productShowcase } from "@/entities/landing";

import {
  ProductShowcaseBenefitCostCard,
  ProductShowcaseBenefitStatCard,
  ProductShowcaseBenefitTallMediaCard,
  ProductShowcaseBenefitWideMediaCard,
} from "../product-showcase-benefit-card";
import styles from "./ProductShowcaseBenefits.module.css";

const BENEFIT_COST_ICONS_SRC = "/landing/product-showcase-benefit-cost-icons.png";
const BENEFIT_CONTRACTORS_MEDIA_SRC =
  "/landing/product-showcase-benefit-contractors.png";
const BENEFIT_COMPETENCIES_MEDIA_SRC =
  "/landing/product-showcase-benefit-competencies.png";
const BENEFIT_STAT_MEDIA_SRC = "/landing/product-showcase-benefit-stat-bg.png";

export function ProductShowcaseBenefits() {
  const [cost, contractors, competencies, stat] = productShowcase.benefits;

  return (
    <div id="pricing" className={styles["product-showcase-benefits"]}>
      <h3 className={styles["product-showcase-benefits__title"]}>
        {productShowcase.benefitsTitle}
      </h3>
      <div className={styles["product-showcase-benefits__grid"]}>
        <ProductShowcaseBenefitCostCard
          title={cost.title}
          text={cost.text}
          iconsImageSrc={BENEFIT_COST_ICONS_SRC}
        />
        <ProductShowcaseBenefitWideMediaCard
          title={contractors.title}
          text={contractors.text}
          mediaImageSrc={BENEFIT_CONTRACTORS_MEDIA_SRC}
        />
        <ProductShowcaseBenefitTallMediaCard
          title={competencies.title}
          text={competencies.text}
          mediaImageSrc={BENEFIT_COMPETENCIES_MEDIA_SRC}
        />
        <ProductShowcaseBenefitStatCard
          statValue={stat.statValue}
          title={stat.title}
          text={stat.text}
          mediaImageSrc={BENEFIT_STAT_MEDIA_SRC}
        />
      </div>
    </div>
  );
}
