import { partnerCta } from "@/entities/landing";
import { Button } from "@/shared/ui/button";
import { Section } from "@/shared/ui/section";

import styles from "./PartnerCta.module.css";

export function PartnerCta() {
  return (
    <Section tone="light">
      <div className={styles["partner-cta__banner"]}>
        <div className={styles["partner-cta__text-block"]}>
          <h2 className={styles["partner-cta__title"]}>{partnerCta.title}</h2>
          <p className={styles["partner-cta__subtitle"]}>{partnerCta.subtitle}</p>
        </div>
        <div className={styles["partner-cta__orb"]} aria-hidden />
        <Button href="#contacts">{partnerCta.cta}</Button>
      </div>
    </Section>
  );
}
