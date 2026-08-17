export const clientSegmentSlugs = [
  "enterprise",
  "outstaffing",
  "mid-market",
  "agencies",
] as const;

export type ClientSegmentSlug = (typeof clientSegmentSlugs)[number];

export const clientsPlatformBenefitsMobileOrder: Record<
  ClientSegmentSlug,
  readonly number[]
> = {
  enterprise: [1, 2, 4, 3],
  outstaffing: [2, 4, 1, 3],
  "mid-market": [1, 3, 2],
  agencies: [3, 1, 2, 4],
};

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

export type ClientsPlatformBenefitsVisual = {
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  imageMobileSrc?: string;
  imageMobileWidth?: number;
  imageMobileHeight?: number;
};

export type ClientsPlatformBenefitsCardBackground =
  | "full-bg"
  | "light-bg"
  | "dark-bg"
  | "geometry-bg";

export type ClientsPlatformBenefitsCardContent = {
  title: string;
  backgroundType: ClientsPlatformBenefitsCardBackground;
  visualLayout?: "dark-bg";
  visualAlign?: "start" | "end";
  inProgress?: boolean;
  visual: ClientsPlatformBenefitsVisual;
};

export type ClientsPlatformBenefitsShowcaseStat = {
  value: string;
  description: string;
};

export type ClientsPlatformBenefitsShowcaseVariant =
  | "it-costs"
  | "quality"
  | "scaling";

export type ClientsPlatformBenefitsShowcaseItem = {
  variant: ClientsPlatformBenefitsShowcaseVariant;
  title: string;
  subtitle: string;
  visual: ClientsPlatformBenefitsVisual;
  stat?: ClientsPlatformBenefitsShowcaseStat;
};

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
      backgroundType: "full-bg",
      visual: {
        imageSrc: "/landing/clients/enterprise/benefits-roles-visual.png",
        imageWidth: 436,
        imageHeight: 540,
        imageAlt: "",
        imageMobileSrc: "/landing/clients/enterprise/benefits-roles-visual-mobile.png",
        imageMobileWidth: 592,
        imageMobileHeight: 240,
      },
    },
    {
      title: "Уровни доступа",
      backgroundType: "light-bg",
      visual: {
        imageSrc: "/landing/clients/enterprise/benefits-access-visual.png",
        imageWidth: 619,
        imageHeight: 409,
        imageAlt: "",
      },
    },
    {
      title: "Результаты в\u00a0реальном времени",
      backgroundType: "geometry-bg",
      visual: {
        imageSrc: "/landing/clients/enterprise/benefits-realtime-card.png",
        imageWidth: 396,
        imageHeight: 236,
        imageAlt: "",
      },
    },
    {
      title: "Аналитика по\u00a0партнёрским сетям",
      backgroundType: "dark-bg",
      inProgress: true,
      visual: {
        imageSrc: "/landing/clients/enterprise/benefits-analytics-visual.png",
        imageWidth: 396,
        imageHeight: 394,
        imageAlt: "",
      },
    },
  ],
  showcase: [
    {
      variant: "it-costs",
      title: "Снижение затрат на\u00a0ИТ-ресурсы",
      subtitle:
        "Сократите простои, дублирование функций и\u00a0неэффективное распределение специалистов",
      visual: {
        imageSrc: "/landing/clients/enterprise/benefits-showcase-it-visual.png",
        imageWidth: 728,
        imageHeight: 728,
        imageAlt: "",
      },
    },
    {
      variant: "quality",
      title: "Предсказуемые сроки и\u00a0качество",
      subtitle:
        "Работайте с\u00a0прозрачной моделью ресурсов и\u00a0контролируйте выполнение задач на\u00a0каждом этапе",
      stat: {
        value: "50%",
        description: "сократили временные затраты на\u00a0управление проектами",
      },
      visual: {
        imageSrc: "/landing/clients/enterprise/benefits-showcase-quality-visual.png",
        imageWidth: 1197,
        imageHeight: 424,
        imageAlt: "",
      },
    },
    {
      variant: "scaling",
      title: "Быстрое масштабирование",
      subtitle:
        "Подключайте проверенных подрядчиков и\u00a0специалистов без\u00a0долгого найма и\u00a0бюрократии",
      visual: {
        imageSrc: "/landing/clients/enterprise/benefits-showcase-scaling-visual.png",
        imageWidth: 1824,
        imageHeight: 600,
        imageAlt: "",
      },
    },
  ],
};

const enterprisePartnersExperience: ClientsPartnersExperienceContent = {
  sectionTitle: "Реальный опыт наших партнёров",
  caseStudy: {
    href: "#",
    tag: "Банк",
    panelSrc: "/landing/case-studies/panel-bg-case-3.png",
    panelWidth: 571,
    panelHeight: 484,
    panelAlt: "Логотип компании Репола",
    logoSrc: "/landing/case-studies/logo-case-3.svg",
    logoWidth: 260,
    logoHeight: 80,
    description:
      "Платформа помогла выстроить централизованное управление подрядчиками и\u00a0ресурсами, сократить сроки формирования команд и\u00a0повысить прозрачность работы по\u00a0ИТ-проектам",
    metric: "20%",
    metricLabel: "Снижение затрат на\u00a0фонд оплаты труда",
  },
};

const enterprisePartnershipCta: ClientsPartnershipCtaContent = {
  title: "Масштабируйтесь через партнёрства на\u00a0своих условиях",
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
    "Без прозрачного распределения падает загрузка",
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
      backgroundType: "light-bg",
      visualLayout: "dark-bg",
      visual: {
        imageSrc: "/landing/clients/outstaffing/benefits-roles-visual.png",
        imageWidth: 401,
        imageHeight: 302,
        imageAlt: "",
      },
    },
    {
      title: "Умный поиск по\u00a0стеку, грейду и\u00a0ставке",
      backgroundType: "full-bg",
      visual: {
        imageSrc: "/landing/clients/outstaffing/benefits-access-visual.png",
        imageWidth: 436,
        imageHeight: 540,
        imageAlt: "",
        imageMobileSrc:
          "/landing/clients/outstaffing/benefits-search-visual-mobile.png",
        imageMobileWidth: 992,
        imageMobileHeight: 280,
      },
    },
    {
      title: "Статус занятости специалистов",
      backgroundType: "light-bg",
      visualLayout: "dark-bg",
      visual: {
        imageSrc: "/landing/clients/outstaffing/benefits-analytics-visual.png",
        imageWidth: 396,
        imageHeight: 248,
        imageAlt: "",
      },
    },
    {
      title: "Результаты в\u00a0реальном времени",
      backgroundType: "dark-bg",
      visual: {
        imageSrc: "/landing/clients/outstaffing/benefits-realtime-visual.png",
        imageWidth: 396,
        imageHeight: 436,
        imageAlt: "",
      },
    },
  ],
  showcase: [
    {
      variant: "it-costs",
      title: "Доступ к\u00a0новым проектам и\u00a0заказчикам",
      subtitle:
        "Получаете поток проектных запросов от\u00a0корпораций и\u00a0партнёрской сети, не\u00a0завися от\u00a0одного канала продаж",
      visual: {
        imageSrc: "/landing/clients/outstaffing/benefits-showcase-it-visual.png",
        imageWidth: 1000,
        imageHeight: 667,
        imageAlt: "",
      },
    },
    {
      variant: "quality",
      title: "Максимальная загрузка команды",
      subtitle:
        "Минимизируйте простой и\u00a0подключайте свободных специалистов к\u00a0проектам",
      stat: {
        value: "15%",
        description: "рост производительности проектной команды",
      },
      visual: {
        imageSrc: "/landing/clients/outstaffing/benefits-showcase-quality-visual.png",
        imageWidth: 889,
        imageHeight: 334,
        imageAlt: "",
      },
    },
    {
      variant: "scaling",
      title: "Работа через сеть проверенных партнёров",
      subtitle:
        "Дополнительный функционал позволяет создавать закрытые и\u00a0открытые партнёрские сети, сегментировать поставщиков по\u00a0отраслям, компетенциям и\u00a0уровню доступа",
      visual: {
        imageSrc: "/landing/clients/outstaffing/benefits-showcase-scaling-visual.png",
        imageWidth: 1824,
        imageHeight: 600,
        imageAlt: "",
      },
    },
  ],
};

const outstaffingPartnersExperience: ClientsPartnersExperienceContent = {
  sectionTitle: "Реальный опыт наших партнёров",
  caseStudy: {
    href: "#",
    tag: "Банк",
    panelSrc: "/landing/case-studies/panel-bg-case-3.png",
    panelWidth: 571,
    panelHeight: 484,
    panelAlt: "Логотип партнёра на\u00a0платформе СмартСтаффинг",
    logoSrc: "/landing/case-studies/logo-case-3.svg",
    logoWidth: 260,
    logoHeight: 80,
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
    "Усиливайте команду исполнителями, которых уже проверили в\u00a0реальных проектах",
  cards: [
    {
      title: "Поиск специалистов",
      backgroundType: "light-bg",
      visual: {
        imageSrc: "/landing/clients/mid-market/benefits-roles-visual.png",
        imageWidth: 560,
        imageHeight: 545,
        imageAlt: "",
      },
    },
    {
      title: "Подтверждённый опыт",
      backgroundType: "light-bg",
      visualLayout: "dark-bg",
      visual: {
        imageSrc: "/landing/clients/mid-market/benefits-access-visual.png",
        imageWidth: 489,
        imageHeight: 239,
        imageAlt: "",
      },
    },
    {
      title: "Контроль качества исполнителей",
      backgroundType: "full-bg",
      visual: {
        imageSrc: "/landing/clients/mid-market/benefits-analytics-visual.png",
        imageWidth: 584,
        imageHeight: 540,
        imageAlt: "",
        imageMobileSrc:
          "/landing/clients/mid-market/benefits-analytics-visual-mobile.png",
        imageMobileWidth: 992,
        imageMobileHeight: 280,
      },
    },
  ],
  showcase: [
    {
      variant: "it-costs",
      title: "Контроль сроков и\u00a0выполнения задач",
      subtitle:
        "Управляйте проектами и\u00a0командами в\u00a0одном месте. Следите за\u00a0загрузкой, статусами и\u00a0ролями без\u00a0лишних коммуникаций.",
      visual: {
        imageSrc: "/landing/clients/mid-market/benefits-showcase-it-visual.png",
        imageWidth: 486,
        imageHeight: 725,
        imageAlt: "",
      },
    },
    {
      variant: "quality",
      title: "Оптимизация затрат на\u00a0разработку",
      subtitle:
        "Снижайте расходы и\u00a0находите специалистов точно под\u00a0задачу",
      stat: {
        value: "5%",
        description: "рост рентабельности проектов",
      },
      visual: {
        imageSrc: "/landing/clients/mid-market/benefits-showcase-quality-visual.png",
        imageWidth: 1197,
        imageHeight: 424,
        imageAlt: "",
      },
    },
    {
      variant: "scaling",
      title: "Быстрый доступ к\u00a0нужным специалистам",
      subtitle:
        "Подбирайте не\u00a0только специалистов, но и\u00a0формируйте проектные команды под\u00a0задачи без\u00a0долгого найма",
      visual: {
        imageSrc: "/landing/clients/mid-market/benefits-showcase-scaling-visual.png",
        imageWidth: 1824,
        imageHeight: 600,
        imageAlt: "",
      },
    },
  ],
};

const midMarketPartnersExperience: ClientsPartnersExperienceContent = {
  sectionTitle: "Реальный опыт наших партнёров",
  caseStudy: {
    href: "#",
    tag: "Банк",
    panelSrc: "/landing/case-studies/panel-bg-case-3.png",
    panelWidth: 571,
    panelHeight: 484,
    panelAlt: "Логотип банка-партнёра",
    logoSrc: "/landing/case-studies/logo-case-3.svg",
    logoWidth: 260,
    logoHeight: 80,
    description:
      "Платформа помогла выстроить централизованное управление подрядчиками и\u00a0ресурсами, сократить сроки формирования команд и\u00a0повысить прозрачность работы по\u00a0ИТ-проектам",
    metric: "20%",
    metricLabel: "Снижение затрат на\u00a0фонд оплаты труда",
  },
};

const midMarketPartnershipCta: ClientsPartnershipCtaContent = {
  title: "Снизим ваши затраты на\u00a0ресурсы",
  subtitle:
    "Покажем, как закрыть нехватку специалистов без\u00a0расширения штата",
};

const agenciesPlatformBenefits: ClientsPlatformBenefitsContent = {
  sectionTitle: "С\u00a0платформой вы\u00a0получаете",
  panelTitle: "Быстрое закрытие вакансий",
  panelSubtitle:
    "Формируйте команды точно под\u00a0задачи проекта в\u00a0кратчайшие сроки",
  cards: [
    {
      title: "Релевантный список специалистов",
      backgroundType: "light-bg",
      visualLayout: "dark-bg",
      visual: {
        imageSrc: "/landing/clients/agencies/benefits-relevant-visual.png",
        imageWidth: 276,
        imageHeight: 214,
        imageAlt: "",
      },
    },
    {
      title: "Роли в\u00a0командах",
      backgroundType: "dark-bg",
      visualAlign: "start",
      visual: {
        imageSrc: "/landing/clients/agencies/benefits-roles-visual.png",
        imageWidth: 285,
        imageHeight: 104,
        imageAlt: "",
      },
    },
    {
      title: "Сокращение срока подбора",
      backgroundType: "full-bg",
      visual: {
        imageSrc: "/landing/clients/agencies/benefits-speed-visual.png",
        imageWidth: 323,
        imageHeight: 408,
        imageAlt: "",
      },
    },
    {
      title: "Чёткие критерии отбора",
      backgroundType: "light-bg",
      visual: {
        imageSrc: "/landing/clients/agencies/benefits-criteria-visual.png",
        imageWidth: 417,
        imageHeight: 470,
        imageAlt: "",
      },
    },
  ],
  showcase: [
    {
      variant: "it-costs",
      title: "Доступ к\u00a0кандидатам с\u00a0узкопрофильной специальностью",
      subtitle:
        "Работайте со\u00a0специалистами, которых нет в\u00a0открытом доступе. Находите нужные компетенции под\u00a0сложные запросы.",
      visual: {
        imageSrc:
          "/landing/clients/agencies/benefits-showcase-specialists-visual.png",
        imageWidth: 453,
        imageHeight: 626,
        imageAlt: "",
      },
    },
    {
      variant: "quality",
      title: "Повышение эффективности подбора",
      subtitle:
        "Работайте с\u00a0кандидатами с\u00a0подтверждённым опытом и\u00a0повышайте конверсию закрытия вакансий",
      stat: {
        value: "48 ч",
        description: "на\u00a0вывод специалистов",
      },
      visual: {
        imageSrc:
          "/landing/clients/agencies/benefits-showcase-efficiency-visual.png",
        imageWidth: 1197,
        imageHeight: 424,
        imageAlt: "",
      },
    },
    {
      variant: "scaling",
      title: "Усиление позиций на\u00a0рынке",
      subtitle:
        "Быстро закрывайте вакансии за\u00a0счёт доступа к\u00a0готовому списку специалистов",
      visual: {
        imageSrc:
          "/landing/clients/agencies/benefits-showcase-market-visual.png",
        imageWidth: 1824,
        imageHeight: 600,
        imageAlt: "",
      },
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
  title: "Начните закрывать больше вакансий уже сегодня",
  subtitle: "Оставьте контакты — организуем встречу и\u00a0ответим на\u00a0ваши вопросы",
  subtitleAccent: "Оставьте контакты",
};

const enterpriseHero: ClientsHeroContent = {
  title: "С\u00a0нами порядок: \nединая сеть доверенных поставщиков",
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
        "Платформа объединяет работодателей, специалистов и\u00a0партнёров, помогая быстрее находить нужные компетенции и\u00a0закрывать вакансии через доверенные сети",
      tags: ["Усиление команд", "Рост выручки"],
      imageSrc: "/landing/clients/agencies/platform-agencies-preview.png",
    },
    platformBenefits: agenciesPlatformBenefits,
    partnersExperience: agenciesPartnersExperience,
    partnershipCta: agenciesPartnershipCta,
  },
};

const clientSegmentFooterLabels: Record<ClientSegmentSlug, string> = {
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
