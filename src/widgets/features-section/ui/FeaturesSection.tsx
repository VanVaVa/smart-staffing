import { featureRows } from "@/entities/landing";
import { FeatureRow } from "@/shared/ui/feature-row";

import styles from "./FeaturesSection.module.css";

export function FeaturesSection() {
  return (
    <section id="solutions" className={styles["features-section"]}>
      <div className={styles["features-section__list"]}>
        {featureRows.map((row) => (
          <FeatureRow
            key={row.title}
            title={row.title}
            description={row.description}
            tags={[...row.tags]}
            imageSrc={row.imageSrc}
            imageAlt={row.imageAlt}
            imageWidth={row.imageWidth}
            imageHeight={row.imageHeight}
            reversed={row.reversed}
          />
        ))}
      </div>
    </section>
  );
}
