export const vacanciesPage = {
  title: "Присоединяйтесь к\u00a0нам",
  subtitle: {
    lead: "Выберите направление, отправьте резюме и ",
    accent: "получите приглашение в\u00a0команду",
  },
  heroImageSrc: "/landing/vacancies/hero-photo.png",
  heroImageWidth: 1106,
  heroImageHeight: 932,
  heroImageMobileSrc: "/landing/vacancies/hero-photo-mobile.png",
  heroImageMobileWidth: 656,
  heroImageMobileHeight: 328,
  heroImageAlt: "Рабочее место в\u00a0офисе СмартСтаффинг",
  vacancies: [
    {
      id: "system-analyst-sap-salary-sberbank",
      title: "Системный Аналитик Миграция SAP Зарплата (Middle+/ Senior) / Сбербанк",
      employment: "Удаленная работа",
    },
    {
      id: "business-analyst-sap-uvhd",
      title: "Бизнес аналитик/ Senior-Middle/ Миграция SAP УВХД",
      employment: "Удаленная работа",
    },
  ],
  form: {
    fullNamePlaceholder: "ФИО",
    submitLabel: "Отправить",
    attachLabel: "Прикрепить резюме",
    attachLoadingLabel: "Идёт загрузка",
  },
  applicationSuccessModal: {
    title: "Резюме успешно отправлено",
    description:
      "Спасибо за\u00a0интерес к\u00a0нашей компании!\nЕсли\u00a0Ваш опыт соответствует требованиям, мы\u00a0свяжемся с\u00a0вами для\u00a0дальнейших шагов",
    homeLabel: "На\u00a0главную",
    illustrationSrc: "/landing/vacancies/application-success-illustration.png",
    illustrationWidth: 490,
    illustrationHeight: 344,
  },
} as const;
