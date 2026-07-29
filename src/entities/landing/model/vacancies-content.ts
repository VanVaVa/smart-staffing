export const vacanciesPage = {
  title: "Присоединяйтесь к нам",
  subtitle: {
    lead: "Выберите направление, отправьте резюме и ",
    accent: "получите приглашение в команду",
  },
  heroImageSrc: "/landing/vacancies/hero-photo.png",
  heroImageWidth: 1106,
  heroImageHeight: 932,
  heroImageAlt: "Рабочее место в офисе СмартСтаффинг",
  vacancies: [
    { id: "developer", title: "Разработчик", employment: "Полная занятость" },
    { id: "designer-1", title: "Дизайнер UX|UI", employment: "Полная занятость" },
    { id: "designer-2", title: "Дизайнер UX|UI", employment: "Полная занятость" },
    { id: "designer-3", title: "Дизайнер UX|UI", employment: "Полная занятость" },
    { id: "project-manager", title: "Менеджер проектов", employment: "Полная занятость" },
    { id: "qa-engineer", title: "Инженер по тестированию", employment: "Полная занятость" },
  ],
  form: {
    fullNamePlaceholder: "ФИО",
    submitLabel: "Отправить",
    attachLabel: "Прикрепить резюме",
  },
  applicationSuccessModal: {
    title: "Резюме успешно отправлено",
    description:
      "Спасибо за интерес к нашей компании!\nЕсли Ваш опыт соответствует требованиям, мы свяжемся с вами для дальнейших шагов",
    homeLabel: "На главную",
    illustrationSrc: "/landing/vacancies/application-success-illustration.png",
    illustrationWidth: 490,
    illustrationHeight: 344,
  },
} as const;
