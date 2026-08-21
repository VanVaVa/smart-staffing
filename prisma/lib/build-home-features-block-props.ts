import { featureRows } from "../../src/entities/landing/model/content";
import type { FeaturesBlockProps } from "../../src/entities/landing/model/home-blocks";

export function buildHomeFeaturesBlockProps(): FeaturesBlockProps {
  return {
    rows: featureRows.map((row) => ({
      title: row.title,
      description: row.description,
      descriptionAccent: row.descriptionAccent,
      tags: [...row.tags],
      imageSrc: row.imageSrc,
      imageAlt: row.imageAlt,
      imageWidth: row.imageWidth,
      imageHeight: row.imageHeight,
      ...(row.reversed ? { reversed: row.reversed } : {}),
    })),
  };
}
