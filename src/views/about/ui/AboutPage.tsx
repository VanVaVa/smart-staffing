import { AboutBenefitsSection } from "@/widgets/about-benefits-section";
import { AboutHistorySection } from "@/widgets/about-history-section";
import { AboutIntroSection } from "@/widgets/about-intro-section";
import { AboutPartnerSection } from "@/widgets/about-partner-section";
import { AboutSpotlightSection } from "@/widgets/about-spotlight-section";
import { AboutTrustedSection } from "@/widgets/about-trusted-section";

import styles from "./AboutPage.module.css";

export function AboutPage() {
  return (
    <div className={styles["about-page"]}>
      <AboutIntroSection />
      <AboutSpotlightSection />
      <AboutHistorySection />
      <AboutPartnerSection />
      <AboutTrustedSection />
      <AboutBenefitsSection />
    </div>
  );
}
