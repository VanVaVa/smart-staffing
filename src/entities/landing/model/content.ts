import { clientSegmentFooterItems } from "./clients-content";

export const landingNav = [
  { label: "О\u00a0компании", href: "/about" },
  { label: "Медиа", href: "/media" },
  {
    label: "Клиентам",
    href: "/pricing",
    children: [
      { label: "Крупные корпорации", href: "/pricing/enterprise" },
      {
        label: "Аутстаффинговые и\u00a0аутсорсинговые компании",
        href: "/pricing/outstaffing",
      },
      { label: "Средний бизнес", href: "/pricing/mid-market" },
      { label: "Кадровые агентства", href: "/pricing/agencies" },
    ],
  },
] as const;

export const heroContent = {
  title: "Управляйте поставщиками, ресурсами и\u00a0проектами\nв\u00a0одном месте",
  primaryCta: "Подключить компанию за\u00a00 ₽",
  registryLabel: "В\u00a0реестре отечественного ПО",
  registryHref: "https://reestr.digital.gov.ru/",
  segments: [
    {
      label: "Крупным корпорациям",
      imageSrc: "/landing/hero-segment-enterprise.png",
      thumbImageSrc: "/landing/thumb-hero-segment-enterprise.png",
      href: "/pricing/enterprise",
    },
    {
      label: "Среднему бизнесу",
      imageSrc: "/landing/hero-segment-midmarket.png",
      thumbImageSrc: "/landing/thumb-hero-segment-midmarket.png",
      href: "/pricing/mid-market",
    },
    {
      label: "Кадровым агентствам",
      imageSrc: "/landing/hero-segment-agencies.png",
      thumbImageSrc: "/landing/thumb-hero-segment-agencies.png",
      href: "/pricing/agencies",
    },
    {
      label: "Аутстаффинговым и\u00a0аутсорсинговым компаниям",
      imageSrc: "/landing/hero-segment-outstaffing.png",
      thumbImageSrc: "/landing/thumb-hero-segment-outstaffing.png",
      href: "/pricing/outstaffing",
    },
  ],
} as const;

export const productShowcase = {
  tag: "Платформа",
  title: "СмартСтаффинг",
  subtitle:
    "Маркетплейс поиска готовых специалистов от\u00a0проверенных компаний. Платформа позволяет безопасно обмениваться ресурсами, управлять проектами, контролировать затраты и\u00a0подключать специалистов \nиз\u00a0бенча за\u00a0часы. Всё в\u00a0едином доверенном контуре.",
  benefitsTitle: "Превращаем CAPEX в\u00a0OPEX",
  benefits: [
    {
      id: "cost",
      layout: "cost" as const,
      title: "Сокращение расходов на\u00a0специалистов",
      text: "Платите только за\u00a0реальную работу. Превращайте простои в\u00a0доход и\u00a0сокращайте совокупную стоимость владения ресурсами",
    },
    {
      id: "contractors",
      layout: "wide-media" as const,
      title: "Предсказуемая работа с\u00a0подрядчиками",
      text: "Контакты, чаты и\u00a0договорённости\u00a0— в\u00a0одном окне. Ни\u00a0одна переписка не\u00a0теряется, и\u00a0вы всегда знаете, на\u00a0каком этапе каждый подрядчик.",
    },
    {
      id: "competencies",
      layout: "tall-media" as const,
      title: "Доступ к\u00a0редким компетенциям",
      text: "Подключайте специалистов \nс\u00a0подтвержденной квалификацией \nи\u00a0уникальными навыками для\u00a0задач любого масштаба",
    },
    {
      id: "stat",
      layout: "stat" as const,
      statValue: "40–50%",
      title: "Ускорение запуска проектов",
      text: "Сократите рутину благодаря\u00a0управлению командой и\u00a0настроенному подбору в\u00a0одном окне",
    },
  ],
} as const;

export const benefitsSection = {
  title: "Превращаем CAPEX в\u00a0OPEX",
  subtitle:
    "Платите за\u00a0результат и\u00a0фактическую загрузку, а\u00a0не\u00a0за\u00a0содержание штатного резерва.",
} as const;

export const benefitsCards = [
  {
    statValue: "40–50%",
    text: "экономия на\u00a0содержании резерва специалистов при\u00a0переходе на\u00a0аутстаффинг через\u00a0платформу",
    variant: "accent" as const,
  },
  {
    title: "Гибкая модель",
    text: "Масштабируйте команды под\u00a0проект без\u00a0долгого найма и\u00a0простоя между\u00a0этапами.",
  },
  {
    title: "Прозрачная ставка",
    text: "Фиксированные условия, понятная маржа и\u00a0контроль бюджета в\u00a0реальном времени.",
  },
  {
    title: "Быстрый старт",
    text: "Подключение подрядчиков и\u00a0запуск первого проекта за\u00a0несколько дней, а\u00a0не\u00a0месяцев.",
  },
  {
    title: "Комплаенс",
    text: "Договоры, документы и\u00a0отчётность собраны в\u00a0одном контуре с\u00a0историей изменений.",
  },
  {
    title: "Офис без\u00a0границ",
    text: "Удалённые команды, смешанный формат и\u00a0единые правила взаимодействия.",
    imageSrc: "/landing/benefit-office.svg",
    imageAlt: "Современное рабочее пространство",
  },
];

export const featureRows = [
  {
    title: "Одна система для\u00a0управления проектами",
    description:
      "Проекты, требования, задачи и\u00a0таймшиты — полная картина перед\u00a0глазами, без\u00a0переключения между\u00a0сервисами",
    descriptionAccent: "без\u00a0переключения между\u00a0сервисами",
    tags: [
      "Контроль за\u00a0ходом проекта",
      "Отслеживание резюме",
      "Контроль загрузки специалистов",
      "Чаты внутри платформы",
    ],
    imageSrc: "/landing/features/feature-menu-requests.mp4",
    imageAlt: "Интерфейс управления проектами и\u00a0запросами",
    imageWidth: 1920,
    imageHeight: 1080,
  },
  {
    title: "Формирование команды",
    description:
      "Выбирайте специалистов и\u00a0команды на\u00a0основе выполненных проектов и\u00a0профессиональных связей с\u00a0учетом доступности и\u00a0ставок",
    descriptionAccent: "с\u00a0учетом доступности и\u00a0ставок",
    tags: [
      "Подбор специалистов и\u00a0команд",
      "Оценка на\u00a0основе реального опыта",
      "Учёт доступности",
      "Управление бюджетом",
    ],
    imageSrc: "/landing/features/feature-requests-specialists.mp4",
    imageAlt: "Подбор специалистов и\u00a0формирование команды",
    imageWidth: 1920,
    imageHeight: 1080,
    reversed: true,
  },
  {
    title: "Оптимизация кадров",
    description:
      "Отслеживайте загрузку сотрудников и\u00a0подрядчиков в\u00a0реальном времени и\u00a0перераспределяйте ресурсы под\u00a0текущие задачи — никто не\u00a0простаивает и\u00a0не\u00a0перегружен",
    descriptionAccent: "перераспределяйте ресурсы",
    tags: [
      "Контроль загрузки специалистов",
      "Усиление команд",
      "Учёт внешних подрядчиков",
      "Ресурсное планирование",
    ],
    imageSrc: "/landing/features/feature-analytics.mp4",
    imageAlt: "Аналитика загрузки специалистов",
    imageWidth: 1920,
    imageHeight: 1080,
  },
  {
    title: "Контроль подбора специалистов",
    description:
      "Все этапы под\u00a0контролем ресурсного или\u00a0проектного менеджера",
    descriptionAccent: "Все этапы под\u00a0контролем",
    tags: [
      "Управление воронкой найма",
      "Контроль за\u00a0изменением статусов",
      "Учёт доступных специалистов",
      "Оценка статуса свободных позиций",
    ],
    imageSrc: "/landing/features/feature-requests-candidates.mp4",
    imageAlt: "Контроль подбора специалистов",
    imageWidth: 1920,
    imageHeight: 1080,
    reversed: true,
  },
  {
    title: "Чаты внутри платформы",
    description:
      "Защищенный обмен сообщениями без\u00a0перехода в\u00a0сторонние мессенджеры",
    descriptionAccent: "Защищенный обмен сообщениями",
    tags: [
      "Корпоративная коммуникация",
      "Ведение проектов",
      "История договорённостей",
      "Командное взаимодействие",
    ],
    imageSrc: "/landing/features/feature-chat.mp4",
    imageAlt: "Корпоративные чаты платформы",
    imageWidth: 1920,
    imageHeight: 1080,
  },
];

export const partnerCta = {
  title: "Присоединяйтесь к\u00a0партнёрским сетям",
  subtitle: "Расширьте возможности платформы и\u00a0управляйте собственной сетью",
  subtitleAccent: "Расширьте возможности платформы",
  cardText:
    "Функция открывает доступ к\u00a0инструментам для\u00a0создания и\u00a0развития партнёрских сетей",
  imageSrc: "/landing/partner-networks.png",
  imageWidth: 152,
  imageHeight: 143,
  cta: "Подключиться к\u00a0платформе",
} as const;

export const demoSection = {
  title: "Покажем, как\u00a0СмартСтаффинг решает ваши задачи",
  subtitle:
    "Продемонстрируем, как\u00a0платформа встраивается в\u00a0ваш контур управления подрядчиками и\u00a0ресурсами",
  subtitleAccent: "платформа встраивается в\u00a0ваш контур",
  promoText: "Получите бесплатную демонстрацию – мы\u00a0ответим на\u00a0все вопросы",
  promoCta: "Оставить заявку",
  mockupSrc: "/landing/demo-ipad-mockup.png",
  mockupWidth: 812,
  mockupHeight: 1062,
} as const;

export const stepsSection = {
  title: "3 шага для\u00a0запуска проекта",
  cta: "Подключиться сейчас",
  steps: [
    {
      title: "Подключитесь к\u00a0платформе",
      text: "Оставьте заявку, и\u00a0мы\u00a0свяжемся с\u00a0вами, чтобы\u00a0обсудить задачи и\u00a0подобрать наиболее удобный формат работы. Заключим оферту и\u00a0настроим доступ с\u00a0учётом всех требований безопасности.",
    },
    {
      title: "Сформируйте проектный запрос",
      text: "Создайте запрос, определите требования и\u00a0получите подбор специалистов или\u00a0команд из\u00a0внутреннего и\u00a0партнёрского пула с\u00a0учётом сроков, бюджета и\u00a0текущей загрузки.",
    },
    {
      title: "Управляйте и\u00a0контролируйте",
      text: "Выстраивайте межкорпоративные сети и\u00a0работайте с\u00a0единым пулом ресурсов. Закрывайте проекты проверенными командами, монетизируйте простой специалистов, анализируйте и\u00a0контролируйте каждый этап",
    },
  ],
} as const;

export const caseStudies = {
  title: "Компании уже\u00a0используют платформу для\u00a0роста эффективности",
  items: [
    {
      href: "#",
      panelSrc: "/landing/case-studies/panel-bg-timforce.png",
      logoSrc: "/landing/case-studies/logo-timforce.svg",
      logoWidth: 363,
      logoHeight: 80,
      panelAlt: "Логотип группы компаний ТИМ ФОРС",
      description:
        "Благодаря внедрению платформы группа компаний «ТИМ ФОРС» смогла выстроить прозрачную и\u00a0управляемую экосистему взаимодействия с\u00a0подрядчиками, повысив рентабельность проектов на\u00a05%",
      metric: "15%",
      metricLabel: "к\u00a0производительности проектного департамента",
    },
    {
      href: "#",
      panelSrc: "/landing/case-studies/panel-bg-case-2.png",
      logoSrc: "/landing/case-studies/logo-case-2.svg",
      logoWidth: 249,
      logoHeight: 60,
      panelAlt: "Логотип компании",
      description:
        "Внедрение платформы помогло повысить производительность команд на\u00a025%, снизить ошибки и\u00a0дублирование задач на\u00a035%, а\u00a0также вдвое сократить время управленческого контроля над\u00a0проектом благодаря росту прозрачности процессов и\u00a0улучшению управляемости работы с\u00a0подрядчиками",
      metric: "40%",
      metricLabel: "Снижение временных затрат на\u00a0подбор исполнителей",
    },
    {
      href: "#",
      panelSrc: "/landing/case-studies/panel-bg-case-3.png",
      logoSrc: "/landing/case-studies/logo-case-3.svg",
      logoWidth: 260,
      logoHeight: 80,
      panelAlt: "Логотип компании Репола",
      description:
        "Платформа позволила компании «Репола» автоматизировать распределение заявок между\u00a0проверенными подрядчиками и\u00a0организовать витрину доступных специалистов. В\u00a0результате внедрения сроки закрытия позиций сократились с\u00a05 до\u00a02,5 дней, а\u00a0уровень удовлетворенности внутренних заказчиков достиг 95%.",
      metric: "30%",
      metricLabel: "Снижение времени на\u00a0администрирование заявок",
    },
  ],
} as const;

export const testimonials = {
  title: "Отзывы наших клиентов",
  items: [
    {
      company: "KOKOC.TECH",
      role: "HR-менеджер Иванова З.С.",
      date: "23.01.2026",
      quote:
        "Очень удобная и\u00a0понятная платформа. Достаточно быстро разобралась с\u00a0нюансами. Полностью понятный интерфейс. Можно отрабатывать, как\u00a0запросы, так\u00a0и\u00a0предлагать свои вакансии для\u00a0поиска кандидатов. В\u00a0том числе можно предоставлять свои ресурсы.",
      logoSrc: "/landing/testimonials/logo-kokoc.svg",
      logoWidth: 32,
      logoHeight: 17,
    },
    {
      company: "Digital Utopia",
      role: "HR-менеджер Иванова З.С.",
      date: "23.01.2026",
      quote:
        "Старт работ прошёл без\u00a0сложностей. Документация нормальная, примеры рабочие. Подключились и\u00a0«полный вперёд». Поддержка. Пишем в\u00a0чат — отвечают быстро и\u00a0по\u00a0делу. Вообще менеджеры — отдельная любовь работы с\u00a0площадкой! Не\u00a0передать словами то, как\u00a0я им\u00a0благодарен за\u00a0пояснения при\u00a0возникновении абсолютно разных вопросов! Площадка не\u00a0зависает, страницы загружаются быстро. Работать комфортно и\u00a0удобно. Могу всецело рекомендовать площадку, так\u00a0как\u00a0видно, что\u00a0к\u00a0её\u00a0созданию подошли с\u00a0душой и\u00a0ответственностью!",
      logoSrc: "/landing/testimonials/logo-digital-utopia.svg",
      logoWidth: 28,
      logoHeight: 28,
    },
    {
      company: "Финейтив",
      role: "HR-менеджер Иванова З.С.",
      date: "23.01.2026",
      quote:
        "С\u00a0помощью B2BCloud у\u00a0нас получилось ускорить процесс подбора проектов и\u00a0нормализовать коммуникации между\u00a0партнерами. В\u00a0результате мы\u00a0планируем свести простой специалистов к\u00a0минимуму. Причём сможем сделать это в\u00a0кратчайшие сроки и\u00a0в\u00a0более удобном централизованном пространстве без\u00a0увеличения своих расходов! Спасибо ТИМ ФОРС за\u00a0B2BCloud и, что\u00a0дали нам возможность заработать на\u00a0простоях!",
      logoSrc: "/landing/testimonials/logo-finitev.png",
      logoWidth: 26,
      logoHeight: 26,
    },
    {
      company: "Firecode",
      role: "HR-менеджер Иванова З.С.",
      date: "23.01.2026",
      quote:
        "Компания Firecode выражает благодарность команде Тим Форс за\u00a0возможность пользования платформой B2BCloud. За\u00a0время работы с\u00a0платформой мы\u00a0убедились в\u00a0её\u00a0надежности, функциональности и\u00a0удобстве. Платформа позволила нам значительно упростить и\u00a0ускорить процесс подачи на\u00a0запросы наших специалистов, также\u00a0повысить прозрачность и\u00a0эффективность коммуникаций (отображаются все статусы по\u00a0актуальным запросам и\u00a0откликам). Также\u00a0хотелось бы\u00a0отметить интуитивно понятный интерфейс, стабильную работу системы, AI для\u00a0обработки и\u00a0импорта CV. Отдельное спасибо команде, ответственной за\u00a0продукт — специалисты оперативно реагируют на\u00a0обращения, подробно консультируют и\u00a0всегда помогают по\u00a0всем возникающим вопросам. Работа с\u00a0платформой B2BCloud стала для\u00a0нас значимым этапом в\u00a0оптимизации процессов!",
      logoSrc: "/landing/testimonials/logo-firecode.svg",
      logoWidth: 48,
      logoHeight: 7,
    },
  ],
} as const;

export const contactSection = {
  title: "Оставьте заявку",
  subtitle: "Покажем платформу на\u00a0вашем сценарии и\u00a0ответим на\u00a0вопросы",
  subtitleAccent: "Покажем платформу",
} as const;

export const footerContent = {
  menuTitle: "Меню",
  solutionsTitle: "Клиентам",
  contactsTitle: "Контакты",
  menu: [
    { label: "О\u00a0СмартСтаффинг", href: "/about" },
    { label: "Медиа", href: "/media" },
    { label: "Документы", href: "/documents" },
    { label: "Тарифы B2BCloud", href: "#open-pricing-modal" },
  ],
  solutions: clientSegmentFooterItems.map(({ label, href }) => ({ label, href })),
  contacts: {
    phone: "+7 (499) 226 20 35",
    email: "info@smartstaffing.ru",
    social: [
      {
        label: "Telegram",
        href: "https://t.me/",
        iconSrc: "/icons/social/telegram.svg",
        width: 32,
        height: 28,
      },
      {
        label: "VK",
        href: "https://vk.com/",
        iconSrc: "/icons/social/vk.svg",
        width: 40,
        height: 24,
      },
      {
        label: "Дзен",
        href: "https://dzen.ru/",
        iconSrc: "/icons/social/dzen.svg",
        width: 28,
        height: 28,
      },
    ],
  },
  legal: [
    { label: "Политика обработки персональных данных", href: "/documents/privacy-policy" },
    { label: "ГК ТИМ ФОРС", href: "https://teamforce.ru/" },
  ],
  copyright: '© 2008-2026 , ООО "СмартCтаффинг"',
};
