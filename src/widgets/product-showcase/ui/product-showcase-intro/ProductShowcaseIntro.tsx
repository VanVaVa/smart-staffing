import { productShowcase } from "@/entities/landing";
import { Badge } from "@/shared/ui/badge";

import styles from "./ProductShowcaseIntro.module.css";

export function ProductShowcaseIntro() {
  return (
    <header className={styles["product-showcase-intro"]}>
      <Badge variant="tag" className={styles["product-showcase-intro__tag"]}>
        {productShowcase.tag}
      </Badge>
      <div className={styles["product-showcase-intro__copy"]}>
        <h2 className={styles["product-showcase-intro__title"]}>
          {productShowcase.title}
        </h2>
        <p className={styles["product-showcase-intro__subtitle"]}>
          {productShowcase.subtitle}
        </p>
      </div>
    </header>
  );
}
