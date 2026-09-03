import { clientsPlatformBenefitsImageDimensions } from "../lib/clients-platform-benefits-image-dimensions";

export const clientSegmentSlugs = [
  "enterprise",
  "outstaffing",
  "mid-market",
  "agencies",
] as const;

export type ClientSegmentSlug = (typeof clientSegmentSlugs)[number];

export type ClientsPageVariant = "clients" | "pricing";

export const clientsPlatformBenefitsMobileOrder: Record<
  ClientSegmentSlug,
  readonly number[]
> = {
  enterprise: [1, 2, 3, 4],
  outstaffing: [2, 4, 1, 3],
  "mid-market": [1, 3, 2],
  agencies: [3, 1, 2, 4],
};

export const pricingPlatformBenefitsMobileOrder: Partial<
  Record<ClientSegmentSlug, readonly number[]>
> = {
  enterprise: [1, 2, 4, 3],
  agencies: [3, 2, 1, 4],
};

export const clientsPlatformBenefitsMobileOrder360: Partial<
  Record<ClientSegmentSlug, readonly number[]>
> = {
  outstaffing: [2, 4, 3, 1],
};

export const pricingPlatformBenefitsMobileOrder360: Partial<
  Record<ClientSegmentSlug, readonly number[]>
> = {
  agencies: [2, 3, 1, 4],
};

export function getClientsPlatformBenefitsMobileOrder(
  segment: string,
  pageVariant: ClientsPageVariant = "clients",
): readonly number[] {
  const knownSegment = segment as ClientSegmentSlug;
  if (pageVariant === "pricing") {
    return pricingPlatformBenefitsMobileOrder[knownSegment] ?? clientsPlatformBenefitsMobileOrder[knownSegment] ?? [1, 2, 3, 4];
  }

  return clientsPlatformBenefitsMobileOrder[knownSegment] ?? [1, 2, 3, 4];
}

export function getClientsPlatformBenefitsMobileOrder360(
  segment: string,
  pageVariant: ClientsPageVariant = "clients",
): readonly number[] | undefined {
  const knownSegment = segment as ClientSegmentSlug;
  if (pageVariant === "pricing") {
    return pricingPlatformBenefitsMobileOrder360[knownSegment]
      ?? clientsPlatformBenefitsMobileOrder360[knownSegment];
  }

  return clientsPlatformBenefitsMobileOrder360[knownSegment];
}

export type ClientsHeroSubtitle = {
  before: string;
  accent?: string;
  after?: string;
};

export type ClientsHeroContent = {
  title: string;
  subtitle: ClientsHeroSubtitle;
  cta: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  imageMobileSrc?: string;
  imageMobileWidth?: number;
  imageMobileHeight?: number;
};

export type ClientsPlatformContent = {
  painPoints: readonly string[];
  title: string;
  subtitle: string;
  tags: readonly string[];
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
};

export type ClientsPlatformBenefitsBreakpoint =
  | "1920"
  | "1440"
  | "992"
  | "768"
  | "576"
  | "360";

export type ClientsPlatformBenefitsResponsiveBreakpoint = Exclude<
  ClientsPlatformBenefitsBreakpoint,
  "1920"
>;

export type ClientsPlatformBenefitsImage = {
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
};

export type ClientsPlatformBenefitsImageFields = ClientsPlatformBenefitsImage & {
  responsiveImages?: Partial<
    Record<ClientsPlatformBenefitsResponsiveBreakpoint, ClientsPlatformBenefitsImage>
  >;
};

export type ClientsPlatformBenefitsCardContent = {
  title: string;
} & ClientsPlatformBenefitsImageFields;

export type ClientsPlatformBenefitsShowcaseItem = {
  title: string;
} & ClientsPlatformBenefitsImageFields;

const clientsPlatformBenefitsResponsiveBreakpoints: readonly ClientsPlatformBenefitsResponsiveBreakpoint[] =
  ["1440", "992", "768", "576", "360"];

type ClientsPlatformBenefitsImageFileBase =
  | "benefits-card-1"
  | "benefits-card-2"
  | "benefits-card-3"
  | "benefits-card-4"
  | "showcase-it"
  | "showcase-quality"
  | "showcase-scaling";

type ClientsPlatformBenefitsBreakpointDimensions = Partial<
  Record<ClientsPlatformBenefitsBreakpoint, readonly [number, number]>
> & {
  "1920": readonly [number, number];
};

function buildClientsPlatformBenefitsImage(
  segment: ClientSegmentSlug,
  fileBase: ClientsPlatformBenefitsImageFileBase,
): ClientsPlatformBenefitsImageFields {
  const segmentDimensions = clientsPlatformBenefitsImageDimensions[segment] as Record<
    ClientsPlatformBenefitsImageFileBase,
    ClientsPlatformBenefitsBreakpointDimensions
  >;
  const breakpointDimensions = segmentDimensions[fileBase];
  const [desktopWidth, desktopHeight] = breakpointDimensions["1920"];
  const responsiveImages: Partial<
    Record<ClientsPlatformBenefitsResponsiveBreakpoint, ClientsPlatformBenefitsImage>
  > = {};

  for (const breakpoint of clientsPlatformBenefitsResponsiveBreakpoints) {
    const dimensions = breakpointDimensions[breakpoint];
    if (!dimensions) {
      continue;
    }

    const [imageWidth, imageHeight] = dimensions;
    responsiveImages[breakpoint] = {
      imageSrc: `/landing/clients/${segment}/${fileBase}-${breakpoint}.png`,
      imageWidth,
      imageHeight,
    };
  }

  return {
    imageSrc: `/landing/clients/${segment}/${fileBase}.png`,
    imageWidth: desktopWidth,
    imageHeight: desktopHeight,
    responsiveImages,
  };
}

export type ClientsPlatformBenefitsContent = {
  sectionTitle: string;
  panelTitle: string;
  panelSubtitle: string;
  cards: readonly ClientsPlatformBenefitsCardContent[];
  showcase: readonly [
    ClientsPlatformBenefitsShowcaseItem,
    ClientsPlatformBenefitsShowcaseItem,
    ClientsPlatformBenefitsShowcaseItem,
  ];
};

export type ClientsPartnershipCtaContent = {
  title: string;
  subtitle: string;
  subtitleAccent?: string;
  submitLabel?: string;
};

export type ClientsPartnersExperienceCaseStudy = {
  href: string;
  tag: string;
  panelSrc: string;
  panelWidth: number;
  panelHeight: number;
  panelAlt: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  description: string;
  metric: string;
  metricLabel: string;
};

export type ClientsPartnersExperienceContent = {
  sectionTitle: string;
  caseStudy: ClientsPartnersExperienceCaseStudy;
};

export type ClientsSegmentContent = {
  meta: {
    title: string;
    description: string;
  };
  hero: ClientsHeroContent;
  platform: ClientsPlatformContent;
  platformBenefits: ClientsPlatformBenefitsContent;
  partnersExperience: ClientsPartnersExperienceContent;
  partnershipCta: ClientsPartnershipCtaContent;
};

const enterprisePlatform: ClientsPlatformContent = {
  painPoints: [
    "Растёт число поставщиков",
    "Усложняется управление ресурсами",
    "Раздуваются сроки и\u00a0бюджет",
  ],
  title: "СмартСтаффинг-платформа организует работу ",
  subtitle:
    "Быстро собирайте команды под\u00a0проекты и\u00a0работайте с\u00a0множеством поставщиков в\u00a0одном окне, не\u00a0переходя с\u00a0ресурса на\u00a0ресурс",
  tags: ["Оптимизация бюджета", "Загрузка команды", "Контроль сроков"],
  imageSrc: "/landing/clients/enterprise/platform-preview.png",
  imageWidth: 602,
  imageHeight: 311,
  imageAlt: "Интерфейс платформы СмартСтаффинг",
};

const enterprisePlatformBenefits: ClientsPlatformBenefitsContent = {
  sectionTitle: "С\u00a0платформой вы\u00a0получаете",
  panelTitle: "Полный контроль над\u00a0поставщиками",
  panelSubtitle: "Управляйте участниками без\u00a0ручного контроля",
  cards: [
    {
      title: "Роли по\u00a0отраслям и\u00a0компетенциям",
      ...buildClientsPlatformBenefitsImage("enterprise", "benefits-card-1"),
    },
    {
      title: "Уровни доступа",
      ...buildClientsPlatformBenefitsImage("enterprise", "benefits-card-2"),
    },
    {
      title: "Результаты в\u00a0реальном времени",
      ...buildClientsPlatformBenefitsImage("enterprise", "benefits-card-3"),
    },
    {
      title: "Аналитика по\u00a0партнёрским сетям",
      ...buildClientsPlatformBenefitsImage("enterprise", "benefits-card-4"),
    },
  ],
  showcase: [
    {
      title: "Снижение затрат на\u00a0ИТ-ресурсы",
      ...buildClientsPlatformBenefitsImage("enterprise", "showcase-it"),
    },
    {
      title: "Предсказуемые сроки и\u00a0качество",
      ...buildClientsPlatformBenefitsImage("enterprise", "showcase-quality"),
    },
    {
      title: "Быстрое масштабирование",
      ...buildClientsPlatformBenefitsImage("enterprise", "showcase-scaling"),
    },
  ],
};

const enterprisePartnersExperience: ClientsPartnersExperienceContent = {
  sectionTitle: "Реальный опыт наших партнёров",
  caseStudy: {
    href: "https://repola.dev/",
    tag: "Банк",
    panelSrc: "/landing/case-studies/panel-bg-case-3.png",
    panelWidth: 571,
    panelHeight: 484,
    panelAlt: "Логотип компании Репола",
    logoSrc: "/landing/case-studies/logo-case-3.svg",
    logoWidth: 251,
    logoHeight: 49,
    description:
      "Платформа помогла выстроить централизованное управление подрядчиками и\u00a0ресурсами, сократить сроки формирования команд и\u00a0повысить прозрачность работы по\u00a0ИТ-проектам",
    metric: "20%",
    metricLabel: "Снижение затрат на\u00a0фонд оплаты труда",
  },
};

const enterprisePartnershipCta: ClientsPartnershipCtaContent = {
  title: "Масштабируйтесь через\u00a0партнёрства на\u00a0своих условиях",
  subtitle: "Оставьте контакты — организуем встречу и\u00a0ответим на\u00a0ваши вопросы",
  subtitleAccent: "Оставьте контакты",
};

const outstaffingHero: ClientsHeroContent = {
  title: "Монетизируйте простои команд и\u00a0ресурсов",
  subtitle: {
    before: "Размещайте свободных специалистов, находите проекты, ",
    accent: "масштабируйтесь в\u00a0партнёрских сетях",
  },
  cta: "Подключить компанию",
  imageSrc: "/landing/clients/outstaffing/outstaffing-hero.png",
  imageWidth: 956,
  imageHeight: 960,
  imageAlt: "Аутстаффинговая компания на\u00a0платформе СмартСтаффинг",
};

const outstaffingPlatform: ClientsPlatformContent = {
  painPoints: [
    "Команда простаивает без\u00a0задач без\u00a0ключевых специалистов",
    "Увеличиваются сроки и\u00a0бюджет на\u00a0поиск подходящего кандидата",
    "Без\u00a0прозрачного распределения падает загрузка",
  ],
  title: "Поможем использовать ресурсы с\u00a0максимальной отдачей",
  subtitle:
    "СмартСтаффинг-платформа объединяет заказчиков, партнёров и\u00a0доступных специалистов в\u00a0едином пространстве",
  tags: ["Загрузка специалистов", "Повышение выручки"],
  imageSrc: "/landing/clients/outstaffing/outstaffing-platform-preview.png",
  imageWidth: 602,
  imageHeight: 311,
  imageAlt: "Интерфейс платформы СмартСтаффинг",
};

const outstaffingPlatformBenefits: ClientsPlatformBenefitsContent = {
  sectionTitle: "С\u00a0платформой вы\u00a0получаете",
  panelTitle: "Все данные в\u00a0одном окне",
  panelSubtitle: "Настройте управление без\u00a0постоянного контроля",
  cards: [
    {
      title: "Публикация доступных компетенций",
      ...buildClientsPlatformBenefitsImage("outstaffing", "benefits-card-1"),
    },
    {
      title: "Умный поиск по\u00a0стеку, грейду и\u00a0ставке",
      ...buildClientsPlatformBenefitsImage("outstaffing", "benefits-card-2"),
    },
    {
      title: "Статус занятости специалистов",
      ...buildClientsPlatformBenefitsImage("outstaffing", "benefits-card-3"),
    },
    {
      title: "Результаты в\u00a0реальном времени",
      ...buildClientsPlatformBenefitsImage("outstaffing", "benefits-card-4"),
    },
  ],
  showcase: [
    {
      title: "Доступ к\u00a0новым проектам и\u00a0заказчикам",
      ...buildClientsPlatformBenefitsImage("outstaffing", "showcase-it"),
    },
    {
      title: "Максимальная загрузка команды",
      ...buildClientsPlatformBenefitsImage("outstaffing", "showcase-quality"),
    },
    {
      title: "Работа через\u00a0сеть проверенных партнёров",
      ...buildClientsPlatformBenefitsImage("outstaffing", "showcase-scaling"),
    },
  ],
};

const outstaffingPartnersExperience: ClientsPartnersExperienceContent = {
  sectionTitle: "Реальный опыт наших партнёров",
  caseStudy: {
    href: "https://repola.dev/",
    tag: "Банк",
    panelSrc: "/landing/case-studies/panel-bg-case-3.png",
    panelWidth: 571,
    panelHeight: 484,
    panelAlt: "Логotip партнёра на\u00a0платформе СмартСтаффинг",
    logoSrc: "/landing/case-studies/logo-case-3.svg",
    logoWidth: 251,
    logoHeight: 49,
    description:
      "Платформа помогла выстроить централизованное управление подрядчиками и\u00a0ресурсами, сократить сроки формирования команд и\u00a0повысить прозрачность работы по\u00a0ИТ-проектам",
    metric: "20%",
    metricLabel: "Снижение затрат на\u00a0фонд оплаты труда",
  },
};

const midMarketHero: ClientsHeroContent = {
  title: "Запускайте проекты, не\u00a0дожидаясь найма",
  subtitle: {
    before: "Быстро находите проверенных специалистов, собирайте проектные команды и ",
    accent: "запускайте проекты без\u00a0лишних затрат",
    after: " и\u00a0бюрократии",
  },
  cta: "Подключить компанию",
  imageSrc: "/landing/clients/mid-market/hero.png",
  imageWidth: 956,
  imageHeight: 960,
  imageAlt: "Средний бизнес запускает проекты на\u00a0платформе СмартСтаффинг",
  imageMobileSrc: "/landing/clients/mid-market/hero-mobile.png",
  imageMobileWidth: 1488,
  imageMobileHeight: 816,
};

const midMarketPlatform: ClientsPlatformContent = {
  painPoints: [
    "Проект буксует — нужных специалистов не\u00a0найти вовремя",
    "Штат перегружен и\u00a0работает на\u00a0пределе",
  ],
  title: "Найдём подрядчиков\nпод\u00a0любые задачи",
  subtitle:
    "Платформа объединяет заказчиков, партнёров и\u00a0экспертов под\u00a0любые задачи в\u00a0едином пространстве",
  tags: ["Быстрый запуск проектов", "Единое рабочее пространство"],
  imageSrc: "/landing/clients/mid-market/platform-preview.png",
  imageWidth: 602,
  imageHeight: 311,
  imageAlt: "Интерфейс платформы СмартСтаффинг",
};

const midMarketPlatformBenefits: ClientsPlatformBenefitsContent = {
  sectionTitle: "С\u00a0платформой вы\u00a0получаете",
  panelTitle: "Надёжные специалисты без\u00a0рисков",
  panelSubtitle:
    "Усиливайте команду исполнителями, которых уже\u00a0проверили в\u00a0реальных проектах",
  cards: [
    {
      title: "Поиск специалистов",
      ...buildClientsPlatformBenefitsImage("mid-market", "benefits-card-1"),
    },
    {
      title: "Подтверждённый опыт",
      ...buildClientsPlatformBenefitsImage("mid-market", "benefits-card-2"),
    },
    {
      title: "Контроль качества исполнителей",
      ...buildClientsPlatformBenefitsImage("mid-market", "benefits-card-3"),
    },
  ],
  showcase: [
    {
      title: "Контроль сроков и\u00a0выполнения задач",
      ...buildClientsPlatformBenefitsImage("mid-market", "showcase-it"),
    },
    {
      title: "Оптимизация затрат на\u00a0разработку",
      ...buildClientsPlatformBenefitsImage("mid-market", "showcase-quality"),
    },
    {
      title: "Быстрый доступ к\u00a0нужным специалистам",
      ...buildClientsPlatformBenefitsImage("mid-market", "showcase-scaling"),
    },
  ],
};

const midMarketPartnersExperience: ClientsPartnersExperienceContent = {
  sectionTitle: "Реальный опыт наших партнёров",
  caseStudy: {
    href: "https://repola.dev/",
    tag: "Банк",
    panelSrc: "/landing/case-studies/panel-bg-case-3.png",
    panelWidth: 571,
    panelHeight: 484,
    panelAlt: "Логотип банка-партнёра",
    logoSrc: "/landing/case-studies/logo-case-3.svg",
    logoWidth: 251,
    logoHeight: 49,
    description:
      "Платформа помогла выстроить централизованное управление подрядчиками и\u00a0ресурсами, сократить сроки формирования команд и\u00a0повысить прозрачность работы по\u00a0ИТ-проектам",
    metric: "20%",
    metricLabel: "Снижение затрат на\u00a0фонд оплаты труда",
  },
};

const midMarketPartnershipCta: ClientsPartnershipCtaContent = {
  title: "Снизим ваши затраты на\u00a0ресурсы",
  subtitle:
    "Покажем, как\u00a0закрыть нехватку специалистов без\u00a0расширения штата",
  subtitleAccent: "закрыть нехватку специалистов"
};

const agenciesPlatformBenefits: ClientsPlatformBenefitsContent = {
  sectionTitle: "С\u00a0платформой вы\u00a0получаете",
  panelTitle: "Быстрое закрытие вакансий",
  panelSubtitle:
    "Формируйте команды точно под\u00a0задачи проекта в\u00a0кратчайшие сроки",
  cards: [
    {
      title: "Релевантный список специалистов",
      ...buildClientsPlatformBenefitsImage("agencies", "benefits-card-1"),
    },
    {
      title: "Роли в\u00a0командах",
      ...buildClientsPlatformBenefitsImage("agencies", "benefits-card-2"),
    },
    {
      title: "Сокращение срока подбора",
      ...buildClientsPlatformBenefitsImage("agencies", "benefits-card-3"),
    },
    {
      title: "Чёткие критерии отбора",
      ...buildClientsPlatformBenefitsImage("agencies", "benefits-card-4"),
    },
  ],
  showcase: [
    {
      title: "Доступ к\u00a0кандидатам с\u00a0узкопрофильной специальностью",
      ...buildClientsPlatformBenefitsImage("agencies", "showcase-it"),
    },
    {
      title: "Повышение эффективности подбора",
      ...buildClientsPlatformBenefitsImage("agencies", "showcase-quality"),
    },
    {
      title: "Усиление позиций на\u00a0рынке",
      ...buildClientsPlatformBenefitsImage("agencies", "showcase-scaling"),
    },
  ],
};

const agenciesPartnersExperience: ClientsPartnersExperienceContent = {
  ...enterprisePartnersExperience,
  caseStudy: {
    ...enterprisePartnersExperience.caseStudy,
    panelSrc: "/landing/case-studies/panel-bg-case-3.png",
    logoSrc: "/landing/case-studies/logo-case-3.svg",
  },
};

const agenciesPartnershipCta: ClientsPartnershipCtaContent = {
  title: "Начните закрывать больше вакансий уже\u00a0сегодня",
  subtitle: "Оставьте контакты — организуем встречу и\u00a0ответим на\u00a0ваши вопросы",
  subtitleAccent: "Оставьте контакты",
};

const enterpriseHero: ClientsHeroContent = {
  title: "С\u00a0нами порядок: единая сеть доверенных поставщиков",
  subtitle: {
    before: "Создавайте партнёрские сети и ",
    accent: "управляйте десятками подрядчиков без\u00a0бюрократии",
  },
  cta: "Подключить компанию",
  imageSrc: "/landing/clients/enterprise/hero.png",
  imageWidth: 956,
  imageHeight: 960,
  imageAlt: "Крупная корпорация использует СмартСтаффинг",
};

export const clientsSegments: Record<ClientSegmentSlug, ClientsSegmentContent> = {
  enterprise: {
    meta: {
      title: "Крупные корпорации — СмартСтаффинг",
      description:
        "Единая сеть доверенных поставщиков и\u00a0управление подрядчиками для\u00a0крупных корпораций на\u00a0платформе СмартСтаффинг.",
    },
    hero: enterpriseHero,
    platform: enterprisePlatform,
    platformBenefits: enterprisePlatformBenefits,
    partnersExperience: enterprisePartnersExperience,
    partnershipCta: enterprisePartnershipCta,
  },
  outstaffing: {
    meta: {
      title: "Аутстаффинговые и\u00a0аутсорсинговые компании — СмартСтаффинг",
      description:
        "Монетизируйте простои команд: размещайте специалистов, находите проекты и\u00a0масштабируйтесь в\u00a0партнёрских сетях на\u00a0СмартСтаффинг.",
    },
    hero: outstaffingHero,
    platform: outstaffingPlatform,
    platformBenefits: outstaffingPlatformBenefits,
    partnersExperience: outstaffingPartnersExperience,
    partnershipCta: enterprisePartnershipCta,
  },
  "mid-market": {
    meta: {
      title: "Средний бизнес — СмартСтаффинг",
      description:
        "Быстро находите проверенных специалистов, собирайте проектные команды и\u00a0запускайте проекты без\u00a0лишних затрат на\u00a0СмартСтаффинг.",
    },
    hero: midMarketHero,
    platform: midMarketPlatform,
    platformBenefits: midMarketPlatformBenefits,
    partnersExperience: midMarketPartnersExperience,
    partnershipCta: midMarketPartnershipCta,
  },
  agencies: {
    meta: {
      title: "Кадровые агентства — СмартСтаффинг",
      description:
        "Кадровым агентствам: витрина специалистов, запросы заказчиков и\u00a0прозрачная работа на\u00a0СмартСтаффинг.",
    },
    hero: {
      ...enterpriseHero,
      title: "Быстрый доступ к\u00a0редким компетенциям рынка",
      subtitle: {
        before: "Получите ",
        accent: "доступ к\u00a0проверенным специалистам,",
        after: " которых нет на\u00a0job-сайтах",
      },
      imageSrc: "/landing/clients/agencies/hero.png",
      imageAlt: "Кадровое агентство находит редких специалистов",
    },
    platform: {
      ...enterprisePlatform,
      painPoints: [
        "Узкопрофильных экспертов на\u00a0открытых площадках почти нет",
        "Поиск нужного специалиста растягивается на\u00a0недели",
        "Требования клиентов всё жёстче, времени всё меньше",
      ],
      title: "Даём доступ к\u00a0редким специалистам",
      subtitle:
        "Платформа объединяет работодателей, специалистов и\u00a0партнёров, помогая быстрее находить нужные компетенции и\u00a0закрывать вакансии через\u00a0доверенные сети",
      tags: ["Усиление команд", "Рост выручки"],
      imageSrc: "/landing/clients/agencies/platform-agencies-preview.png",
    },
    platformBenefits: agenciesPlatformBenefits,
    partnersExperience: agenciesPartnersExperience,
    partnershipCta: agenciesPartnershipCta,
  },
};

export const clientSegmentFooterLabels: Record<ClientSegmentSlug, string> = {
  enterprise: "Крупным корпорациям",
  outstaffing: "Аутстаффинговым и\u00a0аутсорсинговым компаниям",
  "mid-market": "Среднему бизнесу",
  agencies: "Кадровым агентствам",
};

export const clientSegmentFooterItems = clientSegmentSlugs.map((slug) => ({
  label: clientSegmentFooterLabels[slug],
  href: `/clients/${slug}`,
}));

export function isClientSegmentSlug(value: string): value is ClientSegmentSlug {
  return (clientSegmentSlugs as readonly string[]).includes(value);
}

export function getClientsSegment(slug: ClientSegmentSlug): ClientsSegmentContent {
  return clientsSegments[slug];
}
