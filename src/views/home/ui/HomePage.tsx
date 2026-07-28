import { CaseStudiesSection } from "@/widgets/case-studies-section";
import { ContactSection } from "@/widgets/contact-section";
import { FeaturesSection } from "@/widgets/features-section";
import { Hero } from "@/widgets/hero";
import { PlatformOnboardingSection } from "@/widgets/platform-onboarding-section";
import { ProductShowcase } from "@/widgets/product-showcase";
import { StepsSection } from "@/widgets/steps-section";
import { TestimonialsSection } from "@/widgets/testimonials-section";

export function HomePage() {
  return (
    <>
      <Hero />
      <ProductShowcase />
      <FeaturesSection />
      <PlatformOnboardingSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
