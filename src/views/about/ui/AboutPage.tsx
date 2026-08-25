import type { AboutBlock } from "@/entities/landing/model/about-blocks";

import { AboutBlockRenderer } from "./AboutBlockRenderer";
import styles from "./AboutPage.module.css";

type AboutPageProps = {
  blocks: AboutBlock[];
};

export function AboutPage({ blocks }: AboutPageProps) {
  return (
    <div className={styles["about-page"]} data-header-veil-bg="#f9f9fb">
      {blocks.map((block) => (
        <div key={block.id}>
          <AboutBlockRenderer block={block} />
        </div>
      ))}
    </div>
  );
}
