import type { ClientSegmentSlug } from "@/entities/landing";
import { getClientsSegment } from "@/entities/landing";
import { ClientsHeroSection } from "@/widgets/clients-hero-section";
import { ClientsPartnersExperienceSection } from "@/widgets/clients-partners-experience-section";
import { ClientsPartnershipCtaSection } from "@/widgets/clients-partnership-cta-section";
import { ClientsPlatformBenefitsSection } from "@/widgets/clients-platform-benefits-section";
import { ClientsPlatformSection } from "@/widgets/clients-platform-section";

import styles from "./ClientsPage.module.css";

type ClientsPageProps = {
  segment: ClientSegmentSlug;
};

export function ClientsPage({ segment }: ClientsPageProps) {
  const content = getClientsSegment(segment);

  return (
    <div className={styles["clients-page"]}>
      <ClientsHeroSection content={content.hero} />
      <ClientsPlatformSection content={content.platform} />
      <ClientsPlatformBenefitsSection content={content.platformBenefits} />
      <ClientsPartnersExperienceSection content={content.partnersExperience} />
      <ClientsPartnershipCtaSection content={content.partnershipCta} />
    </div>
  );
}
