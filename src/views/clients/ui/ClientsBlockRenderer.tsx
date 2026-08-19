import type { ClientsBlock } from "@/entities/landing/model/clients-blocks";
import type {
  ClientSegmentSlug,
  ClientsPageVariant,
} from "@/entities/landing/model/clients-content";
import {
  getAdminPageLabel,
  getPublicPagePath,
} from "@/entities/landing/lib/landing-page-registry";
import { clientsPageSlug } from "@/entities/landing/model/landing-page-slugs";
import { ClientsHeroSection } from "@/widgets/clients-hero-section";
import { ClientsPartnersExperienceSection } from "@/widgets/clients-partners-experience-section";
import { ClientsPartnershipCtaSection } from "@/widgets/clients-partnership-cta-section";
import { ClientsPlatformBenefitsSection } from "@/widgets/clients-platform-benefits-section";
import { ClientsPlatformSection } from "@/widgets/clients-platform-section";

type ClientsBlockRendererProps = {
  block: ClientsBlock;
  segment: ClientSegmentSlug;
  pageVariant?: ClientsPageVariant;
};

export function ClientsBlockRenderer({
  block,
  segment,
  pageVariant = "clients",
}: ClientsBlockRendererProps) {
  const pageSlug = clientsPageSlug(segment);
  const sourcePath = getPublicPagePath(pageSlug);
  const sourceLabel = getAdminPageLabel(pageSlug);

  switch (block.type) {
    case "hero":
      return <ClientsHeroSection content={block.props} />;
    case "platform":
      return <ClientsPlatformSection content={block.props} />;
    case "platformBenefits":
      return (
        <ClientsPlatformBenefitsSection
          content={block.props}
          segment={segment}
          pageVariant={pageVariant}
        />
      );
    case "partnersExperience":
      return <ClientsPartnersExperienceSection content={block.props} />;
    case "partnershipCta":
      return (
        <ClientsPartnershipCtaSection
          content={block.props}
          sourcePath={sourcePath}
          sourceLabel={sourceLabel}
        />
      );
  }
}
