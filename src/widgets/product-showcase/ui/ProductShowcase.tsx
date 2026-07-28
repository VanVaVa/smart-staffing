import { headerBackdropProps } from "@/shared/config";

import { ProductShowcaseBenefits } from "./product-showcase-benefits";
import { ProductShowcaseIntro } from "./product-showcase-intro";
import { ProductShowcaseMockup } from "./product-showcase-mockup";
import styles from "./ProductShowcase.module.css";

export function ProductShowcase() {
  return (
    <section
      id="platform"
      className={styles["product-showcase"]}
      {...headerBackdropProps("dark")}
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
          <ProductShowcaseIntro />
          <div className={styles["product-showcase__stage"]}>
            <div className={styles["product-showcase__mockup-slot"]}>
              <ProductShowcaseMockup />
            </div>
          </div>
            <div className={styles["product-showcase__benefits-slot"]}>
              <ProductShowcaseBenefits />
            </div>
        </div>
      </div>
    </section>
  );
}
