import { Badge } from "@/shared/ui/badge";

import styles from "./ProductShowcaseIntro.module.css";

type ProductShowcaseIntroProps = {
  tag: string;
  title: string;
  subtitle: string;
};

export function ProductShowcaseIntro({
  tag,
  title,
  subtitle,
}: ProductShowcaseIntroProps) {
  return (
    <header className={styles["product-showcase-intro"]}>
      <Badge variant="tag" className={styles["product-showcase-intro__tag"]}>
        <span>
          {tag}
        </span>
      </Badge>
      <div className={styles["product-showcase-intro__copy"]}>
        <h2 className={styles["product-showcase-intro__title"]}>
          {title}
        </h2>
        <p className={styles["product-showcase-intro__subtitle"]}>
          {subtitle}
        </p>
      </div>
    </header>
  );
}
