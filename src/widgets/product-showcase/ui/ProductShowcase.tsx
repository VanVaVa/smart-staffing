import type { ProductShowcaseBlockProps } from "@/entities/landing/model/home-blocks";

import { ProductShowcaseBenefits } from "./product-showcase-benefits";
import { ProductShowcaseIntro } from "./product-showcase-intro";
import { ProductShowcaseMockup } from "./product-showcase-mockup";
import styles from "./ProductShowcase.module.css";

type ProductShowcaseProps = {
  content: ProductShowcaseBlockProps;
};

export function ProductShowcase({ content }: ProductShowcaseProps) {
  return (
    <section
      id="platform"
      className={styles["product-showcase"]}
      data-header-backdrop="dark"
      data-header-veil-bg="#090909"
    >
      <div className={styles["product-showcase__decor"]} aria-hidden>
        <div className={styles["product-showcase__gradient"]} />
        <div
          className={`${styles["product-showcase__orb"]} ${styles["product-showcase__orb--orange-large"]}`}
        />
        <div
          className={`${styles["product-showcase__orb"]} ${styles["product-showcase__orb--orange-small"]}`}
        />
        <div
          className={`${styles["product-showcase__orb"]} ${styles["product-showcase__orb--purple"]}`}
        />
      </div>
      <div className={styles["product-showcase__inner"]}>
        <div className={styles["product-showcase__content"]}>
          <ProductShowcaseIntro
            tag={content.tag}
            title={content.title}
            subtitle={content.subtitle}
          />
          <div className={styles["product-showcase__stage"]}>
            <div className={styles["product-showcase__mockup-slot"]}>
              <ProductShowcaseMockup
                deviceSrc={content.mockupDeviceSrc}
                screenSrc={content.mockupScreenSrc}
              />
            </div>
          </div>
            <div className={styles["product-showcase__benefits-slot"]}>
              <ProductShowcaseBenefits
                benefitsTitle={content.benefitsTitle}
                benefits={content.benefits}
                benefitMedia={content.benefitMedia}
              />
            </div>
        </div>
      </div>
    </section>
  );
}
