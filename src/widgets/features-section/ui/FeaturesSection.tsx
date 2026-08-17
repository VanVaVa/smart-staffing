import type { FeaturesBlockProps } from "@/entities/landing/model/home-blocks";
import { FeatureRow } from "@/shared/ui/feature-row";

import styles from "./FeaturesSection.module.css";

type FeaturesSectionProps = {
  content: FeaturesBlockProps;
};

export function FeaturesSection({ content }: FeaturesSectionProps) {
  return (
    <section id="solutions" className={styles["features-section"]}>
      <div className={styles["features-section__list"]}>
        {content.rows.map((row, index) => (
          <FeatureRow key={`${row.title}-${index}`}
            rowIndex={index}
            title={row.title}
            description={row.description}
            descriptionAccent={row.descriptionAccent}
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
