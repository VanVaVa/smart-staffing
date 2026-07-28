export const aboutIntro = {
  title: "СмартСтаффинг – эксперт гибкой проектной занятости",
  subtitle: {
    lead: "Помогаем компаниям ",
    teamsAccent: "формировать команды",
    middle: " для реализации проектов и гибко ",
    resourcesAccent: "управлять ресурсами",
  },
} as const;

export const aboutSpotlight = {
  leftTag: {
    label: "ресурсы для роста",
    iconSrc: "/landing/about/icons/hr-search.svg",
  },
  collageSrc: "/landing/about/spotlight-collage.png",
  collageAlt: "Команда СмартСтаффинг",
  bookCoverSrc: "/landing/about/book-cover.png",
  bookCoverAlt: "Обложка книги о стаффинге",
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
      text: "Запуск первой федеральной платформы для крупнейшей нефтяной компании",
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
      text: "Расширение портфеля проектов в направлении SAP и разработки банковских систем",
    },
    {
      year: "2024",
      text: "Место в рейтинге лучших аутстаф-разработчиков России по версии  Tagline",
    },
  ],
  mission: {
    tag: "Миссия",
    items: [
      "Помогать выполнять сложные и масштабные проекты, объединяя нужную экспертизу",
      "Перераспределять свободных специалистов внутри доверенного партнёрского пула",
      "Переводить бизнес от жёсткой штатной модели к гибкому управлению ресурсами",
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

export const aboutBenefits = {
  title: "Преимущества работы с нами",
  flex: {
    iconSrc: "/landing/about/benefits/flex-icon.png",
    title: "Гибкость под разные модели работы",
    text: "Предоставляем возможность кастомизации СмартСтаффинг-платформы под ваши процессы\u00a0— от\u00a0white-label до\u00a0полной интеграции\nс\u00a0внутренними системами (ERP, HRM) и\u00a0on-premise",
  },
  security: {
    imageSrc: "/landing/about/benefits/security-visual.png",
    title: "Соответствие требованиям безопасности и регуляторов",
    text: "Имеем лицензии ФСБ, ФСТЭК и\u00a0Минцифры, соответствуем требованиям оператора персональных данных и\u00a0включены в\u00a0реестр отечественного ПО\u00a0(№\u202f14\u202f503)",
  },
  platform: {
    title: "Собственная платформа",
    text: "Объединяем подбор, планирование \nи управление командами в единой системе, синхронизируя все процессы работы с ресурсами",
  },
  expertise: {
    imageSrc: "/landing/about/benefits/expertise-photo.png",
    title: "Подтвержденная экспертиза в сложных проектах",
    text: "Опыт реализации ИТ-проектов разного уровня сложности позволяет нам понимать реальные боли бизнеса",
  },
} as const;

export const aboutPartner = {
  title: "СмартСтаффинг – признанный партнёр на рынке",
  awards: [
    {
      id: "digital-leaders-2025",
      title: "Лидеры цифровизации\n2025",
      status: "Победитель",
      nomination: "Лидер сегмента: HR-продукты",
      project: "B2BCloud",
    },
    {
      id: "russoft-2025",
      title: "Ассоциация «РУССОФТ» и\u00a0Комитет по\u00a0МСП Ассоциации «РУССОФТ»",
      status: "Благодарственное письмо",
      nomination:
        "За участие и выступление в рамках серии бесплатных обучающих вебинаров, а также вклад в развитие предпринимательского ИТ-сообщества в 2025 году.",
      project: "СмартСтаффинг",
    },
    {
      id: "global-cio",
      title: "Конкурс «Проект года»\nGlobal CIO",
      status: "Номинант",
      nomination: "Сервисы и аутсорсинг",
      project: "B2BCloud",
    },
    {
      id: "runet-2025",
      title: "Премия Рунета-2025",
      status: "Номинант",
      nomination: "Облачное решение 2025",
      project: "B2BCloud",
    },
  ],
} as const;
