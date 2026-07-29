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
} as const;
