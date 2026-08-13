export const clientSegmentSlugs = [
  "enterprise",
  "outstaffing",
  "mid-market",
  "agencies",
] as const;

export type ClientSegmentSlug = (typeof clientSegmentSlugs)[number];

export type ClientsHeroSubtitle = {
  before: string;
  accent?: string;
};

export type ClientsHeroContent = {
  title: string;
  subtitle: ClientsHeroSubtitle;
  cta: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
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
};

export type ClientsPlatformBenefitsCardBackground =
  | "full-bg"
  | "light-bg"
  | "dark-bg"
  | "geometry-bg";

export type ClientsPlatformBenefitsCardContent = {
  title: string;
  backgroundType: ClientsPlatformBenefitsCardBackground;
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
    "Раздуваются сроки и бюджет",
  ],
  title: "СмартСтаффинг-платформа организует работу ",
  subtitle:
    "Быстро собирайте команды под проекты и работайте с множеством поставщиков в одном окне, не переходя с ресурса на ресурс",
  tags: ["Оптимизация бюджета", "Загрузка команды", "Контроль сроков"],
  imageSrc: "/landing/clients/enterprise/platform-preview.png",
  imageWidth: 602,
  imageHeight: 311,
  imageAlt: "Интерфейс платформы СмартСтаффинг",
};

const enterprisePlatformBenefits: ClientsPlatformBenefitsContent = {
  sectionTitle: "С платформой вы получаете",
  panelTitle: "Полный контроль над поставщиками",
  panelSubtitle: "Управляйте участниками без ручного контроля",
  cards: [
    {
      title: "Роли по отраслям и компетенциям",
      backgroundType: "full-bg",
      visual: {
        imageSrc: "/landing/clients/enterprise/benefits-roles-visual.png",
        imageWidth: 436,
        imageHeight: 540,
        imageAlt: "",
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
      title: "Аналитика по партнёрским сетям",
      backgroundType: "dark-bg",
      inProgress: true,
      visual: {
        imageSrc: "/landing/clients/enterprise/benefits-analytics-visual.png",
        imageWidth: 396,
        imageHeight: 394,
        imageAlt: "",
      },
    },
    {
      title: "Результаты в реальном времени",
      backgroundType: "geometry-bg",
      visual: {
        imageSrc: "/landing/clients/enterprise/benefits-realtime-card.png",
        imageWidth: 396,
        imageHeight: 236,
        imageAlt: "",
      },
    },
  ],
  showcase: [
    {
      variant: "it-costs",
      title: "Снижение затрат на ИТ-ресурсы",
      subtitle:
        "Сократите простои, дублирование функций и неэффективное распределение специалистов",
      visual: {
        imageSrc: "/landing/clients/enterprise/benefits-showcase-it-visual.png",
        imageWidth: 728,
        imageHeight: 728,
        imageAlt: "",
      },
    },
    {
      variant: "quality",
      title: "Предсказуемые сроки и качество",
      subtitle:
        "Работайте с прозрачной моделью ресурсов и контролируйте выполнение задач на каждом этапе",
      stat: {
        value: "50%",
        description: "сократили временные затраты на управление проектами",
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
        "Подключайте проверенных подрядчиков и специалистов без долгого найма и бюрократии",
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
      "Платформа помогла выстроить централизованное управление подрядчиками и ресурсами, сократить сроки формирования команд и повысить прозрачность работы по ИТ-проектам",
    metric: "20%",
    metricLabel: "Снижение затрат на фонд оплаты труда",
  },
};

const enterprisePartnershipCta: ClientsPartnershipCtaContent = {
  title: "Масштабируйтесь через партнёрства на своих условиях",
  subtitle: "Оставьте контакты — организуем встречу и ответим на ваши вопросы",
};

const outstaffingHero: ClientsHeroContent = {
  title: "Монетизируйте простои команд и ресурсов",
  subtitle: {
    before:
      "Размещайте свободных специалистов, находите проекты, масштабируйтесь в партнёрских сетях",
  },
  cta: "Подключить компанию",
  imageSrc: "/landing/clients/outstaffing/outstaffing-hero.png",
  imageWidth: 956,
  imageHeight: 960,
  imageAlt: "Аутстаффинговая компания на платформе СмартСтаффинг",
};

const outstaffingPlatform: ClientsPlatformContent = {
  painPoints: [
    "Команда простаивает без задач без ключевых специалистов",
    "Увеличиваются сроки и бюджет на поиск подходящего кандидата",
    "Без прозрачного распределения падает загрузка",
  ],
  title: "Поможем использовать ресурсы с максимальной отдачей",
  subtitle:
    "СмартСтаффинг-платформа объединяет заказчиков, партнёров и доступных специалистов в едином пространстве",
  tags: ["Загрузка специалистов", "Повышение выручки"],
  imageSrc: "/landing/clients/outstaffing/outstaffing-platform-preview.png",
  imageWidth: 602,
  imageHeight: 311,
  imageAlt: "Интерфейс платформы СмартСтаффинг",
};

const outstaffingPlatformBenefits: ClientsPlatformBenefitsContent = {
  sectionTitle: "С платформой вы получаете",
  panelTitle: "Все данные в одном окне",
  panelSubtitle: "Настройте управление без постоянного контроля",
  cards: [
    {
      title: "Публикация доступных компетенций",
      backgroundType: "light-bg",
      visual: {
        imageSrc: "/landing/clients/outstaffing/benefits-roles-visual.png",
        imageWidth: 401,
        imageHeight: 302,
        imageAlt: "",
      },
    },
    {
      title: "Умный поиск по стеку, грейду и ставке",
      backgroundType: "full-bg",
      visual: {
        imageSrc: "/landing/clients/outstaffing/benefits-access-visual.png",
        imageWidth: 436,
        imageHeight: 540,
        imageAlt: "",
      },
    },
    {
      title: "Статус занятости специалистов",
      backgroundType: "light-bg",
      visual: {
        imageSrc: "/landing/clients/outstaffing/benefits-analytics-visual.png",
        imageWidth: 396,
        imageHeight: 248,
        imageAlt: "",
      },
    },
    {
      title: "Результаты в реальном времени",
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
      title: "Доступ к новым проектам и заказчикам",
      subtitle:
        "Получаете поток проектных запросов от корпораций и партнёрской сети, не завися от одного канала продаж",
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
        "Минимизируйте простой и подключайте свободных специалистов к проектам",
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
        "Профессиональный тариф открывает возможность создавать собственные партнёрские сети и оперативно собирать проектные команды под требования заказчика",
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
    panelAlt: "Логотип партнёра на платформе СмартСтаффинг",
    logoSrc: "/landing/case-studies/logo-case-3.svg",
    logoWidth: 260,
    logoHeight: 80,
    description:
      "Платформа помогла выстроить централизованное управление подрядчиками и ресурсами, сократить сроки формирования команд и повысить прозрачность работы по ИТ-проектам",
    metric: "20%",
    metricLabel: "Снижение затрат на фонд оплаты труда",
  },
};

const midMarketHero: ClientsHeroContent = {
  title: "Запускайте проекты, не дожидаясь найма",
  subtitle: {
    before:
      "Быстро находите проверенных специалистов, собирайте проектные команды и запускайте проекты без лишних затрат и бюрократии",
  },
  cta: "Подключить компанию",
  imageSrc: "/landing/clients/mid-market/hero.png",
  imageWidth: 956,
  imageHeight: 960,
  imageAlt: "Средний бизнес запускает проекты на платформе СмартСтаффинг",
};

const midMarketPlatform: ClientsPlatformContent = {
  painPoints: [
    "Проект буксует — нужных специалистов не найти вовремя",
    "Штат перегружен и работает на пределе",
  ],
  title: "Даём доступ к редким специалистам",
  subtitle:
    "Платформа объединяет заказчиков, партнёров и экспертов под любые задачи в едином пространстве",
  tags: ["Быстрый запуск проектов", "Единое рабочее пространство"],
  imageSrc: "/landing/clients/mid-market/platform-preview.png",
  imageWidth: 602,
  imageHeight: 311,
  imageAlt: "Интерфейс платформы СмартСтаффинг",
};

const midMarketPlatformBenefits: ClientsPlatformBenefitsContent = {
  sectionTitle: "С платформой вы получаете",
  panelTitle: "Надёжные специалисты без рисков",
  panelSubtitle:
    "Усиливайте команду исполнителями, которых уже проверили в реальных проектах",
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
      },
    },
  ],
  showcase: [
    {
      variant: "it-costs",
      title: "Контроль сроков и выполнения задач",
      subtitle:
        "Управляйте проектами и командами в одном месте. Следите за загрузкой, статусами и ролями без лишних коммуникаций",
      visual: {
        imageSrc: "/landing/clients/mid-market/benefits-showcase-it-visual.png",
        imageWidth: 486,
        imageHeight: 725,
        imageAlt: "",
      },
    },
    {
      variant: "quality",
      title: "Оптимизация затрат на разработку",
      subtitle:
        "Снижайте расходы и находите специалистов точно под задачу",
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
      title: "Быстрый доступ к нужным специалистам",
      subtitle:
        "Закрывайте вакансии и усиливайте проекты точечной экспертизой без долгого найма",
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
      "Платформа помогла выстроить централизованное управление подрядчиками и ресурсами, сократить сроки формирования команд и повысить прозрачность работы по ИТ-проектам",
    metric: "20%",
    metricLabel: "Снижение затрат на фонд оплаты труда",
  },
};

const midMarketPartnershipCta: ClientsPartnershipCtaContent = {
  title: "Снизим ваши затраты на ресурсы",
  subtitle:
    "Покажем, как закрыть нехватку специалистов без расширения штата",
};

const agenciesPlatformBenefits: ClientsPlatformBenefitsContent = {
  sectionTitle: "С платформой вы получаете",
  panelTitle: "Быстрое закрытие вакансий",
  panelSubtitle:
    "Формируйте команды точно под задачи проекта в кратчайшие сроки",
  cards: [
    {
      title: "Релевантный список специалистов",
      backgroundType: "light-bg",
      visual: {
        imageSrc: "/landing/clients/agencies/benefits-relevant-visual.png",
        imageWidth: 276,
        imageHeight: 214,
        imageAlt: "",
      },
    },
    {
      title: "Роли в командах",
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
      title: "Чёткие критерии отбора",
      backgroundType: "light-bg",
      visual: {
        imageSrc: "/landing/clients/agencies/benefits-criteria-visual.png",
        imageWidth: 417,
        imageHeight: 470,
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
  ],
  showcase: [
    {
      variant: "it-costs",
      title: "Доступ к кандидатам с узкопрофильной специальностью",
      subtitle:
        "Работайте со специалистами, которых нет в открытом доступе. Находите нужные компетенции под сложные запросы.",
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
        "Работайте с кандидатами с подтверждённым опытом и повышайте конверсию закрытия вакансий",
      stat: {
        value: "48 ч",
        description: "на вывод специалистов",
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
      title: "Усиление позиций на рынке",
      subtitle:
        "Подбирайте не только специалистов, но и формируйте проектные команды под задачи заказчиков",
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
  subtitle: "Оставьте контакты — организуем встречу и ответим на ваши вопросы",
};

const enterpriseHero: ClientsHeroContent = {
  title: "С нами порядок: \nединая сеть доверенных поставщиков",
  subtitle: {
    before: "Создавайте партнёрские сети и ",
    accent: "управляйте десятками подрядчиков без бюрократии",
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
        "Единая сеть доверенных поставщиков и управление подрядчиками для крупных корпораций на платформе СмартСтаффинг.",
    },
    hero: enterpriseHero,
    platform: enterprisePlatform,
    platformBenefits: enterprisePlatformBenefits,
    partnersExperience: enterprisePartnersExperience,
    partnershipCta: enterprisePartnershipCta,
  },
  outstaffing: {
    meta: {
      title: "Аутстаффинговые и аутсорсинговые компании — СмартСтаффинг",
      description:
        "Монетизируйте простои команд: размещайте специалистов, находите проекты и масштабируйтесь в партнёрских сетях на СмартСтаффинг.",
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
        "Быстро находите проверенных специалистов, собирайте проектные команды и запускайте проекты без лишних затрат на СмартСтаффинг.",
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
        "Кадровым агентствам: витрина специалистов, запросы заказчиков и прозрачная работа на СмартСтаффинг.",
    },
    hero: {
      ...enterpriseHero,
      title: "Быстрый доступ к редким компетенциям рынка",
      subtitle: {
        before:
          "Получите доступ к проверенным специалистам, которых нет на job-сайтах",
      },
      imageSrc: "/landing/clients/agencies/hero.png",
      imageAlt: "Кадровое агентство находит редких специалистов",
    },
    platform: {
      ...enterprisePlatform,
      painPoints: [
        "Узкопрофильных экспертов на открытых площадках почти нет",
        "Поиск нужного специалиста растягивается на недели",
        "Требования клиентов всё жёстче, времени всё меньше",
      ],
      title: "Найдём подрядчиков под любые задачи",
      subtitle:
        "Платформа объединяет работодателей, специалистов и партнёров, помогая быстрее находить нужные компетенции и закрывать вакансии через доверенные сети",
      tags: ["Усиление команд", "Рост выручки"],
      imageSrc: "/landing/clients/agencies/platform-agencies-preview.png",
    },
    platformBenefits: agenciesPlatformBenefits,
    partnersExperience: agenciesPartnersExperience,
    partnershipCta: agenciesPartnershipCta,
  },
};

const clientSegmentNavLabels: Record<ClientSegmentSlug, string> = {
  enterprise: "Крупные корпорации",
  outstaffing: "Аутстаффинговые и аутсорсинговые компании",
  "mid-market": "Средний бизнес",
  agencies: "Кадровые агентства",
};

export const clientSegmentNavItems = clientSegmentSlugs.map((slug) => ({
  label: clientSegmentNavLabels[slug],
  href: `/clients/${slug}`,
}));

export function isClientSegmentSlug(value: string): value is ClientSegmentSlug {
  return (clientSegmentSlugs as readonly string[]).includes(value);
}

export function getClientsSegment(slug: ClientSegmentSlug): ClientsSegmentContent {
  return clientsSegments[slug];
}
