export const HOME_BLOCK_TYPES = [
  "hero",
  "productShowcase",
  "features",
  "platformOnboarding",
  "caseStudies",
  "testimonials",
  "contact",
] as const;

export type HomeBlockType = (typeof HOME_BLOCK_TYPES)[number];

export type HeroSegment = {
  label: string;
  imageSrc: string;
};

export type HeroBlockProps = {
  title: string;
  subtitleLead: string;
  subtitleTail: string;
  primaryCta: string;
  registryLabel: string;
  registryHref: string;
  dashboardImageSrc: string;
  segments: HeroSegment[];
};

export type ProductShowcaseBenefitLayout =
  | "cost"
  | "wide-media"
  | "tall-media"
  | "stat";

export type ProductShowcaseBenefit = {
  id: string;
  layout: ProductShowcaseBenefitLayout;
  title: string;
  text: string;
  statValue?: string;
};

export type ProductShowcaseCostIcon = {
  imageSrc: string;
};

export const DEFAULT_PRODUCT_SHOWCASE_COST_ICONS: ProductShowcaseCostIcon[] = [
  { imageSrc: "/landing/product-showcase-benefit-cost-icon-1.png" },
  { imageSrc: "/landing/product-showcase-benefit-cost-icon-2.png" },
  { imageSrc: "/landing/product-showcase-benefit-cost-icon-3.png" },
];

export type ProductShowcaseBenefitMedia = {
  costIcons: ProductShowcaseCostIcon[];
  contractors: string;
  competencies: string;
  stat: string;
};

export type ProductShowcaseBlockProps = {
  tag: string;
  title: string;
  subtitle: string;
  benefitsTitle: string;
  benefits: ProductShowcaseBenefit[];
  benefitMedia: ProductShowcaseBenefitMedia;
  mockupDeviceSrc: string;
  mockupScreenSrc: string;
};

export type FeatureRow = {
  title: string;
  description: string;
  tags: string[];
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  reversed?: boolean;
};

export type FeaturesBlockProps = {
  rows: FeatureRow[];
};

export type PartnerCtaContent = {
  title: string;
  subtitle: string;
  subtitleAccent: string;
  cardText: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  cta: string;
};

export type DemoSectionContent = {
  title: string;
  subtitle: string;
  subtitleAccent: string;
  promoText: string;
  promoCta: string;
  mockupSrc: string;
  mockupWidth: number;
  mockupHeight: number;
};

export type StepItem = {
  title: string;
  text: string;
};

export type StepsSectionContent = {
  title: string;
  cta: string;
  steps: StepItem[];
};

export type PlatformOnboardingBlockProps = {
  partner: PartnerCtaContent;
  demo: DemoSectionContent;
  steps: StepsSectionContent;
};

export type CaseStudyItem = {
  href: string;
  panelSrc: string;
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  panelAlt: string;
  description: string;
  metric: string;
  metricLabel: string;
};

export type CaseStudiesBlockProps = {
  title: string;
  items: CaseStudyItem[];
};

export type TestimonialItem = {
  company: string;
  role: string;
  date: string;
  quote: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
};

export type TestimonialsBlockProps = {
  title: string;
  items: TestimonialItem[];
};

export type ContactBlockProps = {
  title: string;
  subtitle: string;
  subtitleAccent: string;
};

export type HomeBlockPropsByType = {
  hero: HeroBlockProps;
  productShowcase: ProductShowcaseBlockProps;
  features: FeaturesBlockProps;
  platformOnboarding: PlatformOnboardingBlockProps;
  caseStudies: CaseStudiesBlockProps;
  testimonials: TestimonialsBlockProps;
  contact: ContactBlockProps;
};

export type HomeBlock = {
  [K in HomeBlockType]: {
    id: string;
    order: number;
    type: K;
    props: HomeBlockPropsByType[K];
  };
}[HomeBlockType];

export type HomePageContent = {
  pageId: string;
  slug: string;
  title: string;
  meta: { title: string; description: string } | null;
  blocks: HomeBlock[];
};

export const HOME_BLOCK_TYPE_LABELS: Record<HomeBlockType, string> = {
  hero: "Hero",
  productShowcase: "Платформа",
  features: "Решения",
  platformOnboarding: "Демо и подключение",
  caseStudies: "Кейсы",
  testimonials: "Отзывы",
  contact: "Контакты",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function parseHeroSegment(value: unknown): HeroSegment | null {
  if (!isRecord(value)) return null;
  if (!isString(value.label) || !isString(value.imageSrc)) return null;
  return { label: value.label, imageSrc: value.imageSrc };
}

function parseHeroProps(value: unknown): HeroBlockProps | null {
  if (!isRecord(value)) return null;
  if (
    !isString(value.title) ||
    !isString(value.subtitleLead) ||
    !isString(value.subtitleTail) ||
    !isString(value.primaryCta) ||
    !isString(value.registryLabel) ||
    !isString(value.registryHref) ||
    !isString(value.dashboardImageSrc) ||
    !Array.isArray(value.segments)
  ) {
    return null;
  }
  const segments = value.segments
    .map(parseHeroSegment)
    .filter((s): s is HeroSegment => s !== null);
  if (segments.length !== value.segments.length) return null;
  return {
    title: value.title,
    subtitleLead: value.subtitleLead,
    subtitleTail: value.subtitleTail,
    primaryCta: value.primaryCta,
    registryLabel: value.registryLabel,
    registryHref: value.registryHref,
    dashboardImageSrc: value.dashboardImageSrc,
    segments,
  };
}

function parseCostIcon(value: unknown): ProductShowcaseCostIcon | null {
  if (!isRecord(value) || !isString(value.imageSrc)) {
    return null;
  }
  return { imageSrc: value.imageSrc };
}

function parseCostIcons(value: unknown): ProductShowcaseCostIcon[] | null {
  if (Array.isArray(value)) {
    const icons = value
      .map(parseCostIcon)
      .filter((icon): icon is ProductShowcaseCostIcon => icon !== null);
    if (icons.length !== value.length) {
      return null;
    }
    return icons;
  }
  return null;
}

function parseBenefit(value: unknown): ProductShowcaseBenefit | null {
  if (!isRecord(value)) return null;
  const layouts: ProductShowcaseBenefitLayout[] = [
    "cost",
    "wide-media",
    "tall-media",
    "stat",
  ];
  if (
    !isString(value.id) ||
    !isString(value.layout) ||
    !layouts.includes(value.layout as ProductShowcaseBenefitLayout) ||
    !isString(value.title) ||
    !isString(value.text)
  ) {
    return null;
  }
  const benefit: ProductShowcaseBenefit = {
    id: value.id,
    layout: value.layout as ProductShowcaseBenefitLayout,
    title: value.title,
    text: value.text,
  };
  if (value.statValue !== undefined) {
    if (!isString(value.statValue)) return null;
    benefit.statValue = value.statValue;
  }
  return benefit;
}

function parseProductShowcaseProps(
  value: unknown,
): ProductShowcaseBlockProps | null {
  if (!isRecord(value)) return null;
  if (
    !isString(value.tag) ||
    !isString(value.title) ||
    !isString(value.subtitle) ||
    !isString(value.benefitsTitle) ||
    !isString(value.mockupDeviceSrc) ||
    !isString(value.mockupScreenSrc) ||
    !Array.isArray(value.benefits) ||
    !isRecord(value.benefitMedia)
  ) {
    return null;
  }
  const media = value.benefitMedia;
  const costIcons =
    parseCostIcons(media.costIcons) ??
    (isString(media.cost) ? DEFAULT_PRODUCT_SHOWCASE_COST_ICONS : null);
  if (
    !costIcons ||
    !isString(media.contractors) ||
    !isString(media.competencies) ||
    !isString(media.stat)
  ) {
    return null;
  }
  const benefits = value.benefits
    .map(parseBenefit)
    .filter((b): b is ProductShowcaseBenefit => b !== null);
  if (benefits.length !== value.benefits.length) return null;
  return {
    tag: value.tag,
    title: value.title,
    subtitle: value.subtitle,
    benefitsTitle: value.benefitsTitle,
    benefits,
    benefitMedia: {
      costIcons,
      contractors: media.contractors,
      competencies: media.competencies,
      stat: media.stat,
    },
    mockupDeviceSrc: value.mockupDeviceSrc,
    mockupScreenSrc: value.mockupScreenSrc,
  };
}

function parseFeatureRow(value: unknown): FeatureRow | null {
  if (!isRecord(value)) return null;
  if (
    !isString(value.title) ||
    !isString(value.description) ||
    !isStringArray(value.tags) ||
    !isString(value.imageSrc) ||
    !isString(value.imageAlt) ||
    !isNumber(value.imageWidth) ||
    !isNumber(value.imageHeight)
  ) {
    return null;
  }
  const row: FeatureRow = {
    title: value.title,
    description: value.description,
    tags: value.tags,
    imageSrc: value.imageSrc,
    imageAlt: value.imageAlt,
    imageWidth: value.imageWidth,
    imageHeight: value.imageHeight,
  };
  if (value.reversed !== undefined) {
    if (typeof value.reversed !== "boolean") return null;
    row.reversed = value.reversed;
  }
  return row;
}

function parseFeaturesProps(value: unknown): FeaturesBlockProps | null {
  if (!isRecord(value) || !Array.isArray(value.rows)) return null;
  const rows = value.rows
    .map(parseFeatureRow)
    .filter((r): r is FeatureRow => r !== null);
  if (rows.length !== value.rows.length) return null;
  return { rows };
}

function parsePartner(value: unknown): PartnerCtaContent | null {
  if (!isRecord(value)) return null;
  if (
    !isString(value.title) ||
    !isString(value.subtitle) ||
    !isString(value.subtitleAccent) ||
    !isString(value.cardText) ||
    !isString(value.imageSrc) ||
    !isNumber(value.imageWidth) ||
    !isNumber(value.imageHeight) ||
    !isString(value.cta)
  ) {
    return null;
  }
  return {
    title: value.title,
    subtitle: value.subtitle,
    subtitleAccent: value.subtitleAccent,
    cardText: value.cardText,
    imageSrc: value.imageSrc,
    imageWidth: value.imageWidth,
    imageHeight: value.imageHeight,
    cta: value.cta,
  };
}

function parseDemo(value: unknown): DemoSectionContent | null {
  if (!isRecord(value)) return null;
  if (
    !isString(value.title) ||
    !isString(value.subtitle) ||
    !isString(value.subtitleAccent) ||
    !isString(value.promoText) ||
    !isString(value.promoCta) ||
    !isString(value.mockupSrc) ||
    !isNumber(value.mockupWidth) ||
    !isNumber(value.mockupHeight)
  ) {
    return null;
  }
  return {
    title: value.title,
    subtitle: value.subtitle,
    subtitleAccent: value.subtitleAccent,
    promoText: value.promoText,
    promoCta: value.promoCta,
    mockupSrc: value.mockupSrc,
    mockupWidth: value.mockupWidth,
    mockupHeight: value.mockupHeight,
  };
}

function parseStep(value: unknown): StepItem | null {
  if (!isRecord(value)) return null;
  if (!isString(value.title) || !isString(value.text)) return null;
  return { title: value.title, text: value.text };
}

function parseSteps(value: unknown): StepsSectionContent | null {
  if (!isRecord(value)) return null;
  if (!isString(value.title) || !isString(value.cta) || !Array.isArray(value.steps)) {
    return null;
  }
  const steps = value.steps
    .map(parseStep)
    .filter((s): s is StepItem => s !== null);
  if (steps.length !== value.steps.length) return null;
  return { title: value.title, cta: value.cta, steps };
}

function parsePlatformOnboardingProps(
  value: unknown,
): PlatformOnboardingBlockProps | null {
  if (!isRecord(value)) return null;
  const partner = parsePartner(value.partner);
  const demo = parseDemo(value.demo);
  const steps = parseSteps(value.steps);
  if (!partner || !demo || !steps) return null;
  return { partner, demo, steps };
}

function parseCaseStudyItem(value: unknown): CaseStudyItem | null {
  if (!isRecord(value)) return null;
  if (
    !isString(value.href) ||
    !isString(value.panelSrc) ||
    !isString(value.panelAlt) ||
    !isString(value.description) ||
    !isString(value.metric) ||
    !isString(value.metricLabel)
  ) {
    return null;
  }
  return {
    href: value.href,
    panelSrc: value.panelSrc,
    logoSrc: isString(value.logoSrc) ? value.logoSrc : undefined,
    logoWidth: typeof value.logoWidth === "number" ? value.logoWidth : undefined,
    logoHeight: typeof value.logoHeight === "number" ? value.logoHeight : undefined,
    panelAlt: value.panelAlt,
    description: value.description,
    metric: value.metric,
    metricLabel: value.metricLabel,
  };
}

function parseCaseStudiesProps(value: unknown): CaseStudiesBlockProps | null {
  if (!isRecord(value) || !isString(value.title) || !Array.isArray(value.items)) {
    return null;
  }
  const items = value.items
    .map(parseCaseStudyItem)
    .filter((i): i is CaseStudyItem => i !== null);
  if (items.length !== value.items.length) return null;
  return { title: value.title, items };
}

function parseTestimonialItem(value: unknown): TestimonialItem | null {
  if (!isRecord(value)) return null;
  if (
    !isString(value.company) ||
    !isString(value.role) ||
    !isString(value.date) ||
    !isString(value.quote) ||
    !isString(value.logoSrc) ||
    !isNumber(value.logoWidth) ||
    !isNumber(value.logoHeight)
  ) {
    return null;
  }
  return {
    company: value.company,
    role: value.role,
    date: value.date,
    quote: value.quote,
    logoSrc: value.logoSrc,
    logoWidth: value.logoWidth,
    logoHeight: value.logoHeight,
  };
}

function parseTestimonialsProps(value: unknown): TestimonialsBlockProps | null {
  if (!isRecord(value) || !isString(value.title) || !Array.isArray(value.items)) {
    return null;
  }
  const items = value.items
    .map(parseTestimonialItem)
    .filter((i): i is TestimonialItem => i !== null);
  if (items.length !== value.items.length) return null;
  return { title: value.title, items };
}

function parseContactProps(value: unknown): ContactBlockProps | null {
  if (!isRecord(value)) return null;
  if (
    !isString(value.title) ||
    !isString(value.subtitle) ||
    !isString(value.subtitleAccent)
  ) {
    return null;
  }
  return {
    title: value.title,
    subtitle: value.subtitle,
    subtitleAccent: value.subtitleAccent,
  };
}

export function parseHomeBlockProps(
  type: HomeBlockType,
  props: unknown,
): HomeBlockPropsByType[HomeBlockType] | null {
  switch (type) {
    case "hero":
      return parseHeroProps(props);
    case "productShowcase":
      return parseProductShowcaseProps(props);
    case "features":
      return parseFeaturesProps(props);
    case "platformOnboarding":
      return parsePlatformOnboardingProps(props);
    case "caseStudies":
      return parseCaseStudiesProps(props);
    case "testimonials":
      return parseTestimonialsProps(props);
    case "contact":
      return parseContactProps(props);
    default:
      return null;
  }
}

export function parseHomeBlock(record: {
  id: string;
  order: number;
  type: string;
  props: unknown;
}): HomeBlock | null {
  if (!HOME_BLOCK_TYPES.includes(record.type as HomeBlockType)) {
    return null;
  }
  const type = record.type as HomeBlockType;
  const parsedProps = parseHomeBlockProps(type, record.props);
  if (!parsedProps) return null;
  return {
    id: record.id,
    order: record.order,
    type,
    props: parsedProps,
  } as HomeBlock;
}

export type HomeCollectionKey =
  | "segments"
  | "benefits"
  | "rows"
  | "caseStudies.items"
  | "testimonials.items"
  | "steps.steps";

export function defaultCollectionItem(key: HomeCollectionKey): unknown {
  switch (key) {
    case "segments":
      return {
        label: "Новый сегмент",
        imageSrc: "/landing/hero-segment-enterprise.png",
      };
    case "benefits":
      return {
        id: globalThis.crypto?.randomUUID?.() ?? "new-benefit",
        layout: "cost" as ProductShowcaseBenefitLayout,
        title: "Заголовок",
        text: "Описание",
        statValue: "0%",
      };
    case "rows":
      return {
        title: "Новое решение",
        description: "Описание",
        tags: ["Тег"],
        imageSrc: "",
        imageAlt: "",
        imageWidth: 716,
        imageHeight: 506,
      };
    case "caseStudies.items":
      return {
        href: "#",
        panelSrc: "/landing/case-studies/panel-bg-case-2.png",
        logoSrc: "/landing/case-studies/logo-case-2.svg",
        logoWidth: 249,
        logoHeight: 60,
        panelAlt: "Логотип компании",
        description: "Описание кейса",
        metric: "0%",
        metricLabel: "Показатель",
      };
    case "testimonials.items":
      return {
        company: "Компания",
        role: "Должность",
        date: "01.01.2026",
        quote: "Текст отзыва",
        logoSrc: "/landing/testimonials/logo-kokoc.svg",
        logoWidth: 32,
        logoHeight: 17,
      };
    case "steps.steps":
      return {
        title: "Шаг",
        text: "Описание шага",
      };
  }
}

export function defaultBlockProps(type: HomeBlockType): HomeBlockPropsByType[HomeBlockType] {
  switch (type) {
    case "hero":
      return {
        title: "Заголовок",
        subtitleLead: "Подзаголовок",
        subtitleTail: "",
        primaryCta: "Подключить компанию",
        registryLabel: "В реестре отечественного ПО",
        registryHref: "https://reestr.digital.gov.ru/",
        dashboardImageSrc: "/landing/hero-segment-enterprise.png",
        segments: [],
      };
    case "productShowcase":
      return {
        tag: "Платформа",
        title: "СмартСтаффинг",
        subtitle: "",
        benefitsTitle: "",
        benefits: [],
        benefitMedia: {
          costIcons: DEFAULT_PRODUCT_SHOWCASE_COST_ICONS.map((icon) => ({ ...icon })),
          contractors: "/landing/product-showcase-benefit-contractors.png",
          competencies: "/landing/product-showcase-benefit-competencies.png",
          stat: "/landing/product-showcase-benefit-stat-bg.png",
        },
        mockupDeviceSrc: "/landing/iPad Pro Space Gray.png",
        mockupScreenSrc: "/landing/Mockup.png",
      };
    case "features":
      return { rows: [] };
    case "platformOnboarding":
      return {
        partner: {
          title: "",
          subtitle: "",
          subtitleAccent: "",
          cardText: "",
          imageSrc: "/landing/partner-networks.png",
          imageWidth: 213,
          imageHeight: 143,
          cta: "Подключиться",
        },
        demo: {
          title: "",
          subtitle: "",
          subtitleAccent: "",
          promoText: "",
          promoCta: "Оставить заявку",
          mockupSrc: "/landing/demo-ipad-mockup.png",
          mockupWidth: 812,
          mockupHeight: 1062,
        },
        steps: {
          title: "3 шага",
          cta: "Подключиться",
          steps: [],
        },
      };
    case "caseStudies":
      return { title: "Кейсы", items: [] };
    case "testimonials":
      return { title: "Отзывы", items: [] };
    case "contact":
      return {
        title: "Оставьте заявку",
        subtitle: "",
        subtitleAccent: "",
      };
  }
}

export function isHomeBlockType(value: string): value is HomeBlockType {
  return HOME_BLOCK_TYPES.includes(value as HomeBlockType);
}
