import type { AboutBlock } from "@/entities/landing/model/about-blocks";
import { AboutBenefitsSection } from "@/widgets/about-benefits-section";
import { AboutCareerBookSection } from "@/widgets/about-career-book-section";
import { AboutHistorySection } from "@/widgets/about-history-section";
import { AboutIntroSection } from "@/widgets/about-intro-section";
import { AboutLeadershipSection } from "@/widgets/about-leadership-section";
import { AboutPartnerSection } from "@/widgets/about-partner-section";
import { AboutSpotlightSection } from "@/widgets/about-spotlight-section";
import { AboutTrustedSection } from "@/widgets/about-trusted-section";

type AboutBlockRendererProps = {
  block: AboutBlock;
};

export function AboutBlockRenderer({ block }: AboutBlockRendererProps) {
  switch (block.type) {
    case "intro":
      return <AboutIntroSection content={block.props} />;
    case "spotlight":
      return <AboutSpotlightSection content={block.props} />;
    case "history":
      return <AboutHistorySection content={block.props} />;
    case "partner":
      return <AboutPartnerSection content={block.props} />;
    case "trusted":
      return <AboutTrustedSection content={block.props} />;
    case "benefits":
      return <AboutBenefitsSection content={block.props} />;
    case "leadership":
      return <AboutLeadershipSection content={block.props} />;
    case "careerBook":
      return <AboutCareerBookSection content={block.props} />;
  }
}
