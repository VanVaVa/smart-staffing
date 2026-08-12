import type { ReactNode } from "react";

import type { HomeBlock } from "@/entities/landing/model/home-blocks";
import { CaseStudiesSection } from "@/widgets/case-studies-section";
import { ContactSection } from "@/widgets/contact-section";
import { FeaturesSection } from "@/widgets/features-section";
import { Hero } from "@/widgets/hero";
import { PlatformOnboardingSection } from "@/widgets/platform-onboarding-section";
import { ProductShowcase } from "@/widgets/product-showcase";
import { TestimonialsSection } from "@/widgets/testimonials-section";

type HomeBlockRendererProps = {
  block: HomeBlock;
  interactive?: boolean;
};

export function HomeBlockRenderer({
  block,
  interactive = true,
}: HomeBlockRendererProps): ReactNode {
  switch (block.type) {
    case "hero":
      return <Hero content={block.props} interactive={interactive} />;
    case "productShowcase":
      return <ProductShowcase content={block.props} />;
    case "features":
      return <FeaturesSection content={block.props} />;
    case "platformOnboarding":
      return (
        <PlatformOnboardingSection
          content={block.props}
          interactive={interactive}
        />
      );
    case "caseStudies":
      return <CaseStudiesSection content={block.props} />;
    case "testimonials":
      return <TestimonialsSection content={block.props} />;
    case "contact":
      return (
        <ContactSection content={block.props} interactive={interactive} />
      );
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}
