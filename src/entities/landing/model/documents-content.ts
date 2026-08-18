export type DocumentItem = {
  id: string;
  slug: string;
  title: string;
  href: string;
  pdfSrc: string;
  presentation: "page" | "modal";
};

export type DocumentCategory = {
  id: string;
  title: string;
  items: DocumentItem[];
};

export type DocumentCertificate = {
  id: string;
  title: string;
  pdfSrc: string;
};

export type DocumentsPageContent = {
  title: string;
  company: {
    name: string;
    legalAddress: string;
    activity: string;
    activityCode: string;
    inn: string;
  };
  categories: DocumentCategory[];
  softwareRights: {
    registrations: string[];
    paragraphs: string[];
  };
  certificatesTitle: string;
  certificates: DocumentCertificate[];
};

const createDocument = (
  slug: string,
  title: string,
  presentation: DocumentItem["presentation"] = "page",
): DocumentItem => ({
  id: slug,
  slug,
  title,
  href: `/documents/${slug}`,
  pdfSrc: `/landing/documents/${slug}.pdf`,
  presentation,
});

const categories: DocumentCategory[] = [
  {
    id: "product",
    title: "О\u00a0продукте",
    items: [
      createDocument("domestic-software-registry", "Реестр отечественного ПО"),
      createDocument("license", "Лицензия"),
      createDocument(
        "exclusive-software-rights",
        "Исключительные права на\u00a0ПО",
        "modal",
      ),
      createDocument("technology-stack", "Стек технологий продукта"),
      createDocument("glossary", "Глоссарий"),
    ],
  },
  {
    id: "clients",
    title: "Клиентам",
    items: [
      createDocument("service-agreement", "Договор услуг"),
      createDocument("license-agreement", "Лицензионное соглашение"),
      createDocument("privacy-policy", "Политика конфиденциальности"),
      createDocument("terms-of-use", "Пользовательское соглашение"),
    ],
  },
  {
    id: "platform",
    title: "Документы платформы",
    items: [
      createDocument("platform-features", "Функции платформы"),
      createDocument(
        "lifecycle-maintenance",
        "Инструкция по\u00a0поддержанию жизненного цикла",
      ),
      createDocument("installation-guide", "Инструкция по\u00a0установке"),
      createDocument("user-guide", "Руководство пользователя"),
    ],
  },
];

export const documentsPage: DocumentsPageContent = {
  title: "Документы",
  company: {
    name: "Общество с\u00a0ограниченной ответственностью «СМАРТСТАФФИНГ»",
    legalAddress:
      "121205, Москва г, Внутригородская территория муниципальный округ Можайский, Сколково инновационного центра тер, Большой б-р, дом 42, строение 1",
    activity:
      "62.0 — Разработка компьютерного программного обеспечения, консультационные услуги в\u00a0данной области и\u00a0другие сопутствующие услуги",
    activityCode: "1.01, 2.01",
    inn: "7714744569 / 1087746759319",
  },
  categories,
  softwareRights: {
    registrations: [
      "2020661741 от\u00a030.09.2020",
      "2021669533 от\u00a030.11.2021",
      "2021668415 от\u00a016.11.2021",
      "2021680079 от\u00a007.12.2021",
      "2022621114 от\u00a018.05.2022",
      "2022669457 от\u00a020.10.2022",
      "2023610774 от\u00a012.01.2023",
      "2023610566 от\u00a011.01.2023",
      "2023610797 от\u00a013.01.2023",
      "2023611473 от\u00a020.01.2023",
      "2023616550 от\u00a029.03.2023",
      "2023688948 от\u00a025.12.2023",
      "2023688865 от\u00a025.12.2023",
      "2024610580 от\u00a011.01.2024",
      "2024610983 от\u00a016.01.2024",
      "2024665133 от\u00a027.06.2024",
      "2024664678 от\u00a024.06.2024",
      "2025610073 от\u00a009.01.2025",
      "2025610687 от\u00a014.01.2025",
      "2025610603 от\u00a013.01.2025",
      "2025660043 от\u00a021.04.2025",
      "2025663289 от\u00a027.05.2025",
      "2025697552 от\u00a025.12.2025",
      "2026660599 от\u00a014.04.2026",
    ],
    paragraphs: [
      "Право использования программного обеспечения предоставляется на\u00a0условиях лицензионного договора, который заключается с\u00a0каждым лицензиатом.",
      "ООО «Смартстаффинг» является обладателем исключительных прав на\u00a0программное обеспечение «Межкорпоративная сеть для\u00a0развития проектной кооперации между компаниями в\u00a0сфере ИТ-услуг „B2BCloud“. Право использования программного обеспечения „Межкорпоративная сеть для\u00a0развития проектной кооперации между компаниями в\u00a0сфере ИТ-услуг „B2BCloud“ предоставляется на\u00a0условиях лицензионного договора, который заключается с\u00a0каждым лицензиатом.",
    ],
  },
  certificatesTitle: "Свидетельства",
  certificates: Array.from({ length: 4 }, (_, index) => {
    const number = index + 1;

    return {
      id: `certificate-${number}`,
      title: `Свидетельство ${number}`,
      pdfSrc: `/landing/documents/certificate-${number}.pdf`,
    };
  }),
};

const documents = categories.flatMap((category) => category.items);

export const documentSlugs = documents
  .filter((document) => document.presentation === "page")
  .map((document) => document.slug);

export function getDocument(slug: string): DocumentItem | undefined {
  return documents.find(
    (document) =>
      document.slug === slug && document.presentation === "page",
  );
}
