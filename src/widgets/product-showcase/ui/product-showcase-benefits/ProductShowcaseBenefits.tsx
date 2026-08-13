import type {
  ProductShowcaseBenefit,
  ProductShowcaseBenefitMedia,
} from "@/entities/landing/model/home-blocks";
import {
  EditableCollectionItem,
  EditableText,
} from "@/shared/ui/editable-field";

import {
  ProductShowcaseBenefitCostCard,
  ProductShowcaseBenefitStatCard,
  ProductShowcaseBenefitTallMediaCard,
  ProductShowcaseBenefitWideMediaCard,
} from "../product-showcase-benefit-card";
import cardStyles from "../product-showcase-benefit-card/ProductShowcaseBenefitCard.module.css";
import styles from "./ProductShowcaseBenefits.module.css";

type ProductShowcaseBenefitsProps = {
  benefitsTitle: string;
  benefits: ProductShowcaseBenefit[];
  benefitMedia: ProductShowcaseBenefitMedia;
};

function findBenefitIndex(
  benefits: ProductShowcaseBenefit[],
  layout: ProductShowcaseBenefit["layout"],
): number {
  return benefits.findIndex((benefit) => benefit.layout === layout);
}

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
      <EditableText
        path="benefitsTitle"
        label="Заголовок benefits"
        as="h3"
        className={styles["product-showcase-benefits__title"]}
      >
        {benefitsTitle}
      </EditableText>
      <div className={styles["product-showcase-benefits__grid"]}>
        {cost ? (
          <EditableCollectionItem
            arrayPath="benefits"
            index={findBenefitIndex(benefits, "cost")}
            variant="benefit"
            className={cardStyles["product-showcase-benefit-card--cost"]}
          >
            <ProductShowcaseBenefitCostCard
              benefitIndex={findBenefitIndex(benefits, "cost")}
              title={cost.title}
              text={cost.text}
              costIcons={benefitMedia.costIcons}
            />
          </EditableCollectionItem>
        ) : null}
        {contractors ? (
          <EditableCollectionItem
            arrayPath="benefits"
            index={findBenefitIndex(benefits, "wide-media")}
            variant="benefit"
            className={cardStyles["product-showcase-benefit-card--wide-media"]}
          >
            <ProductShowcaseBenefitWideMediaCard
              benefitIndex={findBenefitIndex(benefits, "wide-media")}
              title={contractors.title}
              text={contractors.text}
              mediaImageSrc={benefitMedia.contractors}
              mediaPath="benefitMedia.contractors"
            />
          </EditableCollectionItem>
        ) : null}
        {competencies ? (
          <EditableCollectionItem
            arrayPath="benefits"
            index={findBenefitIndex(benefits, "tall-media")}
            variant="benefit"
            className={cardStyles["product-showcase-benefit-card--tall-media"]}
          >
            <ProductShowcaseBenefitTallMediaCard
              benefitIndex={findBenefitIndex(benefits, "tall-media")}
              title={competencies.title}
              text={competencies.text}
              mediaImageSrc={benefitMedia.competencies}
              mediaPath="benefitMedia.competencies"
            />
          </EditableCollectionItem>
        ) : null}
        {stat ? (
          <EditableCollectionItem
            arrayPath="benefits"
            index={findBenefitIndex(benefits, "stat")}
            variant="benefit"
            className={cardStyles["product-showcase-benefit-card--stat"]}
          >
            <ProductShowcaseBenefitStatCard
              benefitIndex={findBenefitIndex(benefits, "stat")}
              statValue={stat.statValue ?? ""}
              title={stat.title}
              text={stat.text}
              mediaImageSrc={benefitMedia.stat}
              mediaPath="benefitMedia.stat"
            />
          </EditableCollectionItem>
        ) : null}
      </div>
    </div>
  );
}
