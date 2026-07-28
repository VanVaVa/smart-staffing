import { demoSection } from "@/entities/landing";
import { Section } from "@/shared/ui/section";
import { SectionTitle } from "@/shared/ui/section-title";

import styles from "./DemoSection.module.css";

export function DemoSection() {
  return (
    <Section id="demo" tone="muted">
      <SectionTitle
        title={demoSection.title}
        subtitle={demoSection.subtitle}
        centered
      />
      <div className={styles["demo-section__player"]}>
        <img
          className={styles["demo-section__preview"]}
          src="/landing/dashboard-preview.svg"
          alt=""
          width={960}
          height={540}
        />
        <div className={styles["demo-section__overlay"]}>
          <button type="button" className={styles["demo-section__play-button"]} aria-label="Смотреть демо">
            <span className={styles["demo-section__play-icon"]} />
          </button>
        </div>
      </div>
    </Section>
  );
}
