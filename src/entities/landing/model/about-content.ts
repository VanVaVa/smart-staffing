export const aboutIntro = {
  title: "СмартСтаффинг – эксперт гибкой проектной занятости",
  subtitle: {
    lead: "Помогаем компаниям ",
    teamsAccent: "формировать команды",
    middle: " для\u00a0реализации проектов и\u00a0гибко ",
    resourcesAccent: "управлять ресурсами",
  },
} as const;

export const aboutSpotlight = {
  leftTag: {
    label: "ресурсы для\u00a0роста",
    iconSrc: "/landing/about/icons/hr-search.svg",
  },
  collageSrc: "/landing/about/spotlight-collage.png",
  collageAlt: "Команда СмартСтаффинг",
  bookCoverSrc: "/landing/about/book-cover.png",
  bookCoverAlt: "Обложка книги о\u00a0стаффинге",
} as const;

export const aboutHistory = {
  title: "Более 15 лет развиваем «умный» подбор ИТ-специалистов",
  timeline: [
    {
      year: "2008",
      text: "Основание компании СмартСтаффинг",
    },
    {
      year: "2013",
      text: "Запуск первой федеральной платформы для\u00a0крупнейшей нефтяной компании",
    },
    {
      year: "2016",
      text: "Проработка пилотирования «сервисного убера» в\u00a0Почте России",
    },
    {
      year: "2019",
      text: "НИОКР, новый статус компании – резидент Сколково",
    },
    {
      year: "2020",
      text: "Расширение портфеля проектов в\u00a0направлении SAP и\u00a0разработки банковских систем",
    },
    {
      year: "2024",
      text: "Место в\u00a0рейтинге лучших аутстаф-разработчиков России по\u00a0версии Tagline. В\u00a0числе первых получили статус цифровой платформы «Сколково»",
    },
    {
      year: "2025",
      text: "Платформа B2BCloud признана лучшей в\u00a0рейтинге «Лидеры цифровизации»: «Лучшая платформа гибкой и\u00a0проектной занятости» и\u00a0«Лидер сегмента: HR-продукты»",
    },
    {
      year: "2026",
      text: "47 место в\u00a0рейтинге крупнейших поставщиков HR-tech решений (TAdviser)",
    },
  ],
  mission: {
    tag: "Миссия",
    items: [
      "Помогать выполнять сложные и\u00a0масштабные проекты, объединяя нужную экспертизу",
      "Перераспределять свободных специалистов внутри доверенного партнёрского пула",
      "Переводить бизнес от\u00a0жёсткой штатной модели к\u00a0гибкому управлению ресурсами",
    ],
    markers: [
      {
        iconSrc: "/landing/about/icons/milestone-mission.svg",
        alt: "",
      },
      {
        iconSrc: "/landing/about/icons/milestone-pool.svg",
        alt: "",
      },
      {
        iconSrc: "/landing/about/icons/milestone-flex.svg",
        alt: "",
      },
    ],
  },
} as const;

const aboutTrustedRow1Source = [
  {
    cellWidth: 297,
    src: "/landing/about/trusted-logos/logos/row1-01.png",
    logoWidth: 224,
    logoHeight: 56,
  },
  {
    cellWidth: 162,
    src: "/landing/about/trusted-logos/logos/row1-02.png",
    logoWidth: 111,
    logoHeight: 48,
  },
  {
    cellWidth: 297,
    src: "/landing/about/trusted-logos/logos/row1-03.png",
    logoWidth: 225,
    logoHeight: 56,
  },
  {
    cellWidth: 297,
    src: "/landing/about/trusted-logos/logos/row1-04.png",
    logoWidth: 173,
    logoHeight: 48,
  },
  {
    cellWidth: 162,
    src: "/landing/about/trusted-logos/logos/row1-05.png",
    logoWidth: 118,
    logoHeight: 56,
  },
  {
    cellWidth: 297,
    src: "/landing/about/trusted-logos/logos/row1-06.png",
    logoWidth: 224,
    logoHeight: 36,
  },
  {
    cellWidth: 297,
    src: "/landing/about/trusted-logos/logos/row1-07.png",
    logoWidth: 140,
    logoHeight: 36,
  },
] as const;

const aboutTrustedRow2Source = [
  {
    cellWidth: 297,
    src: "/landing/about/trusted-logos/logos/row2-01.png",
    logoWidth: 224,
    logoHeight: 28,
  },
  {
    cellWidth: 297,
    src: "/landing/about/trusted-logos/logos/row2-02.png",
    logoWidth: 224,
    logoHeight: 39,
  },
  {
    cellWidth: 162,
    src: "/landing/about/trusted-logos/logos/row2-03.png",
    logoWidth: 100,
    logoHeight: 40,
  },
  {
    cellWidth: 297,
    src: "/landing/about/trusted-logos/logos/row2-04.png",
    logoWidth: 200,
    logoHeight: 50,
  },
  {
    cellWidth: 297,
    src: "/landing/about/trusted-logos/logos/row2-05.png",
    logoWidth: 206,
    logoHeight: 30,
  },
  {
    cellWidth: 162,
    src: "/landing/about/trusted-logos/logos/row2-06.png",
    logoWidth: 125,
    logoHeight: 56,
  },
  {
    cellWidth: 297,
    src: "/landing/about/trusted-logos/logos/row2-07.png",
    logoWidth: 196,
    logoHeight: 30,
  },
] as const;

function buildAboutTrustedRowItems<
  T extends readonly {
    cellWidth: number;
    src: string;
    logoWidth: number;
    logoHeight: number;
  }[],
>(sources: T, rowId: string) {
  const sequence = [...sources, ...sources, sources[0]];
  return sequence.map((item, index) => ({
    id: `${rowId}-${String(index + 1).padStart(2, "0")}`,
    cellWidth: item.cellWidth,
    src: item.src,
    logoWidth: item.logoWidth,
    logoHeight: item.logoHeight,
  }));
}

export const aboutTrusted = {
  title: "Нам доверяют ведущие компании",
  rows: [
    {
      id: "row1",
      items: buildAboutTrustedRowItems(aboutTrustedRow1Source, "row1"),
    },
    {
      id: "row2",
      items: buildAboutTrustedRowItems(aboutTrustedRow2Source, "row2"),
    },
  ],
} as const;

export type AboutLeadershipMemberLayout =
  | "featured"
  | "strategy"
  | "alliance"
  | "development"
  | "analytics"
  | "marketing"
  | "investors"
  | "finance"
  | "extra";

export const ABOUT_LEADERSHIP_MOSAIC_LAYOUTS = [
  "featured",
  "strategy",
  "alliance",
  "development",
  "analytics",
  "marketing",
  "investors",
  "finance",
] as const satisfies readonly AboutLeadershipMemberLayout[];

export type AboutLeadershipMember = {
  id: string;
  role: string;
  name: string;
  imageSrc: string;
  layout?: AboutLeadershipMemberLayout;
};

export type AboutLeadershipContent = {
  title: string;
  members: AboutLeadershipMember[];
};

export const aboutLeadership = {
  title: "Познакомьтесь с\u00a0нашим руководством",
  members: [
    {
      id: "ruslan-gaynanov",
      role: "Стратегия",
      name: "Руслан Гайнанов",
      imageSrc: "/landing/about/leadership/ruslan-gaynanov.png",
      layout: "featured",
    },
    {
      id: "alexey-shapka",
      role: "Стратегия",
      name: "Алексей Шапка",
      imageSrc: "/landing/about/leadership/alexey-shapka.png",
      layout: "strategy",
    },
    {
      id: "kristina-lytsus",
      role: "Альянс",
      name: "Кристина Лыцусь",
      imageSrc: "/landing/about/leadership/kristina-lytsus.png",
      layout: "alliance",
    },
    {
      id: "ilya-vorobyov",
      role: "Развитие",
      name: "Илья Воробьёв",
      imageSrc: "/landing/about/leadership/ilya-vorobyov.png",
      layout: "development",
    },
    {
      id: "guzal-nazarova",
      role: "Аналитика",
      name: "Гузаль Назарова",
      imageSrc: "/landing/about/leadership/guzal-nazarova.png",
      layout: "analytics",
    },
    {
      id: "alexandra-sadikova",
      role: "Маркетинг и\u00a0PR",
      name: "Александра Садикова",
      imageSrc: "/landing/about/leadership/alexandra-sadikova.png",
      layout: "marketing",
    },
    {
      id: "olesya-meshcheryakova",
      role: "Инвесторы",
      name: "Олеся Мещерякова",
      imageSrc: "/landing/about/leadership/olesya-meshcheryakova.png",
      layout: "investors",
    },
    {
      id: "vladimir-ignatov",
      role: "Финансы",
      name: "Владимир Игнатов",
      imageSrc: "/landing/about/leadership/vladimir-ignatov.png",
      layout: "finance",
    },
  ],
} satisfies AboutLeadershipContent;

export const aboutBenefits = {
  title: "Преимущества работы с\u00a0нами",
  flex: {
    iconSrc: "/landing/about/benefits/flex-icon.png",
    title: "Гибкость под\u00a0разные модели работы",
    text: "Предоставляем возможность кастомизации СмартСтаффинг-платформы B2BCloud под\u00a0ваши процессы",
  },
  security: {
    imageSrc: "/landing/about/benefits/security-visual.png",
    title: "Соответствие требованиям безопасности и\u00a0регуляторов",
    text: "Имеем лицензии ФСБ, ФСТЭК и\u00a0Минцифры, решения подтверждены 49 свидетельствами на\u00a0ПО\u00a0и\u00a02 свидетельствами на\u00a0базы данных. Работаем как оператор персональных данных. Сертификация по\u00a0ГОСТ Р\u00a0ИСО 9001-2015, опыт разработки банковского ПО\u00a0по\u00a0ГОСТ Р\u00a057\u202f580.",
  },
  platform: {
    title: "Собственная платформа",
    text: "Объединяем подбор, планирование \nи\u00a0управление командами в\u00a0единой системе, синхронизируя все процессы работы с\u00a0ресурсами",
  },
  expertise: {
    imageSrc: "/landing/about/benefits/expertise-photo.png",
    title: "Подтвержденная экспертиза в\u00a0сложных проектах",
    text: "Опыт реализации ИТ-проектов разного уровня сложности позволяет нам понимать реальные боли бизнеса",
  },
} as const;

export const aboutCareerBook = {
  career: {
    title: "Работа в\u00a0СмартСтаффинг",
    subtitle: {
      lead: "Мы\u00a0растём и ",
      accent: "ищем талантливых специалистов",
      tail: ", готовых развиваться вместе с\u00a0нами",
    },
    cta: {
      text: "Найдите свою роль и\u00a0станьте частью нашей команды!",
      buttonLabel: "Смотрите доступные вакансии",
      buttonHref: "/vacancies",
      photoSrc: "/landing/about/career-cta-photo.png",
      photoAlt: "Сотрудник СмартСтаффинг",
    },
  },
  book: {
    title: "Узнайте секреты стаффинга",
    description: {
      accent: "Получите экспертную литературу",
      rest: ". В\u00a0ней мы\u00a0поделились опытом сложных ИТ-проектов, подходами к\u00a0подбору команд, а\u00a0также уникальными решениями для\u00a0корпоративного аутсорсинга.",
    },
    spreadSrc: "/landing/about/book-spread.png",
    spreadAlt: "Книга о\u00a0стаффинге",
    form: {
      inputPlaceholder: "@telegram_id",
      buttonHref: "https://t.me/b2bcloud_platform/6",
      buttonLabel: "Забрать книгу бесплатно",
    },
  },
} as const;

export const aboutPartner = {
  title: "СмартСтаффинг – признанный партнёр на\u00a0рынке",
  awards: [
    {
      id: "digital-leaders-2025",
      title: "Лидеры цифровизации\n2025",
      status: "Победитель",
      nomination: "Лидер сегмента: HR-продукты",
      project: "B2BCloud",
      document: {
        src: "/landing/about/partner/documents/digital-leaders-2025.png",
        alt: "Диплом: Лидеры цифровизации 2025 — лидер сегмента HR-продукты, проект B2BCloud",
        width: 707,
        height: 1000,
      },
    },
    {
      id: "russoft-2025",
      title: "Ассоциация «РУССОФТ» и\u00a0Комитет по\u00a0МСП Ассоциации «РУССОФТ»",
      status: "Благодарственное письмо",
      nomination:
        "За\u00a0участие и\u00a0выступление в\u00a0рамках серии бесплатных обучающих вебинаров, а\u00a0также вклад в\u00a0развитие предпринимательского ИТ-сообщества в\u00a02025 году.",
      project: "СмартСтаффинг",
      document: {
        src: "/landing/about/partner/documents/russoft-2025.png",
        alt: "Благодарственное письмо Ассоциации «РУССОФТ»",
        width: 620,
        height: 877,
      },
    },
    {
      id: "digital-leaders-2025-platform",
      title: "Лидеры цифровизации\n2025",
      status: "Победитель",
      nomination: "Лучшая платформа гибкой и\u00a0проектной занятости",
      project: "B2BCloud",
      document: {
        src: "/landing/about/partner/documents/digital-leaders-2025-platform.png",
        alt: "Диплом: Лидеры цифровизации 2025 — лучшая платформа гибкой и проектной занятости, проект B2BCloud",
        width: 707,
        height: 1000,
      },
    },
    {
      id: "global-cio",
      title: "Конкурс «Проект года»\nGlobal CIO",
      status: "Номинант",
      nomination: "Сервисы и\u00a0аутсорсинг",
      project: "B2BCloud",
      document: {
        src: "/landing/about/partner/documents/global-cio.png",
        alt: "Документ конкурса «Проект года» Global CIO",
        width: 931,
        height: 2048,
      },
    },
    {
      id: "runet-2025",
      title: "Премия Рунета-2025",
      status: "Номинант",
      nomination: "Облачное решение 2025",
      project: "B2BCloud",
      document: {
        src: "/landing/about/partner/documents/runet-2025.png",
        alt: "Документ премии Рунета-2025",
        width: 899,
        height: 418,
      },
    },
    {
      id: "rvf-2025",
      title: "Участие в\u00a0РВФ-2025",
      status: "Участник",
      nomination: "За\u00a0участие в\u00a0РВФ-2025",
      project: "B2BCloud",
      document: {
        src: "/landing/about/partner/documents/rvf-2025.png",
        alt: "Документ об участии в РВФ-2025, проект B2BCloud",
        width: 877,
        height: 620,
      },
    },
    {
      id: "digirate-2024",
      title: "Рейтинг Digirate аутстаф-подрядчиков по\u00a0выручке 2024\u00a0г",
      status: "ТОП-20",
      nomination: "ТОП-20 аутстаф-подрядчиков по\u00a0выручке",
      project: "ООО «СмартСтаффинг»",
      document: {
        src: "/landing/about/partner/documents/digirate-2024.png",
        alt: "Документ рейтинга Digirate аутстаф-подрядчиков по выручке 2024 г",
        width: 717,
        height: 2048,
      },
    },
    {
      id: "tagline-2024",
      title: "Рейтинг лучших аутстаф-разработчиков России Тэглайн (2024)",
      status: "ТОП-5",
      nomination: "Лучший аутстаф-разработчик России",
      project: "ООО «СмартСтаффинг»",
      document: {
        src: "/landing/about/partner/documents/tagline-2024.png",
        alt: "Документ рейтинга лучших аутстаф-разработчиков России Тэглайн 2024",
        width: 1280,
        height: 1021,
      },
    },
    {
      id: "absolute-reputation-2023",
      title: "Премия «Абсолютная репутация—2023»",
      status: "3-е место",
      nomination: "Абсолютная активность",
      project: "ООО «СмартСтаффинг»",
      document: {
        src: "/landing/about/partner/documents/absolute-reputation-2023.png",
        alt: "Диплом премии «Абсолютная репутация—2023»",
        width: 827,
        height: 1169,
      },
    },
    {
      id: "it-startups",
      title: "Биржа IT-Стартапов",
      status: "Участник",
      nomination: "За\u00a0участие в\u00a0конкурсе",
      project: "B2BCloud",
      document: {
        src: "/landing/about/partner/documents/it-startups.png",
        alt: "Документ об участии в конкурсе «Биржа IT-Стартапов»",
        width: 1169,
        height: 826,
      },
    },
    {
      id: "eabr-covid",
      title: "Евразийский Банк Развития",
      status: "Победитель",
      nomination:
        "Лучшие цифровые решения по\u00a0противодействию распространению и\u00a0предотвращению негативных последствий COVID-19",
      project: "B2BCloud",
      document: {
        src: "/landing/about/partner/documents/eabr-covid.png",
        alt: "Диплом Евразийского Банка Развития за цифровые решения по противодействию COVID-19",
        width: 1169,
        height: 828,
      },
    },
    {
      id: "tech-union",
      title: "Союз технологических компаний",
      status: "Участник",
      nomination:
        "Является полноправным членом Союза поддержки и\u00a0развития Технологических компаний",
      project: "СмартСтаффинг",
      document: {
        src: "/landing/about/partner/documents/tech-union.png",
        alt: "Документ о членстве в Союзе технологических компаний",
        width: 866,
        height: 1209,
      },
    },
    {
      id: "frri-sprint",
      title: "СПРИНТ: ФРИИ",
      status: "Участник",
      nomination: "За\u00a0участие в\u00a0акселераторе",
      project: "B2BCloud",
      document: {
        src: "/landing/about/partner/documents/frri-sprint.png",
        alt: "Документ об участии в акселераторе «СПРИНТ: ФРИИ»",
        width: 827,
        height: 1169,
      },
    },
    {
      id: "strong-ideas-2022",
      title: "Сильные идеи для\u00a0нового времени 2022",
      status: "ТОП-1000",
      nomination:
        "Указанная идея прошла экспертный отбор и\u00a0была включена в\u00a0список ТОП-1000",
      project: "СмартСтаффинг",
      document: {
        src: "/landing/about/partner/documents/strong-ideas-2022.png",
        alt: "Документ конкурса «Сильные идеи для нового времени 2022»",
        width: 807,
        height: 1169,
      },
    },
  ],
} as const;
