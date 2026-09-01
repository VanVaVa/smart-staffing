export {
  ADMIN_SECTIONS,
  ADMIN_SECTION_GROUPS,
  adminSectionPath,
  getAdminSection,
} from "./model/admin-sections";
export type {
  AdminCollectionSection,
  AdminSection,
  AdminSingletonSection,
} from "./model/admin-sections";
export {
  benefitsCards,
  benefitsSection,
  caseStudies,
  contactSection,
  demoSection,
  featureRows,
  footerContent,
  heroContent,
  landingNav,
  partnerCta,
  productShowcase,
  stepsSection,
  testimonials,
} from "./model/content";
export {
  HOME_BLOCK_TYPES,
  isHomeBlockType,
  parseHomeBlock,
  parseHomeBlockProps,
  type CaseStudiesBlockProps,
  type ContactBlockProps,
  type FeaturesBlockProps,
  type HeroBlockProps,
  type HomeBlock,
  type HomeBlockType,
  type HomePageContent,
  type PlatformOnboardingBlockProps,
  type ProductShowcaseBlockProps,
  type TestimonialsBlockProps,
} from "./model/home-blocks";
export {
  aboutBenefits,
  aboutCareerBook,
  aboutHistory,
  aboutIntro,
  aboutLeadership,
  aboutPartner,
  aboutSpotlight,
  aboutTrusted,
} from "./model/about-content";
export type { AboutLeadershipMemberLayout } from "./model/about-content";
export { vacanciesPage } from "./model/vacancies-content";
export {
  clientSegmentSlugs,
  clientsPlatformBenefitsMobileOrder,
  clientsPlatformBenefitsMobileOrder360,
  clientsSegments,
  getClientsPlatformBenefitsMobileOrder,
  getClientsPlatformBenefitsMobileOrder360,
  getClientsSegment,
  isClientSegmentSlug,
  pricingPlatformBenefitsMobileOrder,
  pricingPlatformBenefitsMobileOrder360,
} from "./model/clients-content";
export type {
  ClientSegmentSlug,
  ClientsPageVariant,
  ClientsHeroContent,
  ClientsHeroSubtitle,
  ClientsPartnersExperienceCaseStudy,
  ClientsPartnersExperienceContent,
  ClientsPartnershipCtaContent,
  ClientsPlatformBenefitsBreakpoint,
  ClientsPlatformBenefitsCardContent,
  ClientsPlatformBenefitsContent,
  ClientsPlatformBenefitsImage,
  ClientsPlatformBenefitsImageFields,
  ClientsPlatformBenefitsResponsiveBreakpoint,
  ClientsPlatformBenefitsShowcaseItem,
  ClientsPlatformContent,
  ClientsSegmentContent,
} from "./model/clients-content";
export { EXAMPLE_MEDIA_ARTICLE } from "./model/media-content";
export type {
  MediaArticle,
  MediaArticleBodyBlock,
  MediaArticleContent,
  MediaArticleRelated,
  MediaArticleTag,
  MediaPageContent,
} from "./model/media-content";
export {
  documentSlugs,
  documentsPage,
  getDocument,
  getDocumentModalContent,
} from "./model/documents-content";
export type {
  DocumentCategory,
  DocumentCertificate,
  DocumentItem,
  DocumentModalContent,
  DocumentsPageContent,
} from "./model/documents-content";
