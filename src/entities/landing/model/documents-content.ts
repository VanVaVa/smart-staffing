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
    ogrn: string;
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
        "Инструкция по поддержанию жизненного цикла",
      ),
      createDocument("installation-guide", "Инструкция по установке"),
      createDocument("user-guide", "Руководство пользователя"),
    ],
  },
  {
    id: "product",
    title: "О продукте",
    items: [
      createDocument("domestic-software-registry", "Реестр отечественного ПО"),
      createDocument("license", "Лицензия"),
      createDocument(
        "exclusive-software-rights",
        "Исключительные права на ПО",
        "modal",
      ),
      createDocument("technology-stack", "Стек технологий продукта"),
      createDocument("glossary", "Глоссарий"),
    ],
  },
];

export const documentsPage: DocumentsPageContent = {
  title: "Документы",
  company: {
    name: "Общество с ограниченной ответственностью «СМАРТСТАФФИНГ»",
    legalAddress:
      "121205, Москва г, Внутригородская территория муниципальный округ Можайский, Сколково инновационного центра тер, Большой б-р, дом 42, строение 1",
    activity:
      "62.0 — Разработка компьютерного программного обеспечения, консультационные услуги в данной области и другие сопутствующие услуги",
    activityCode: "1.01, 2.01",
    inn: "7 714 744 569",
    ogrn: "1087746759319",
  },
  categories,
  softwareRights: {
    registrations: [
      "2020661741 от 30.09.2020",
      "2021669533 от 30.11.2021",
      "2021668415 от 16.11.2021",
      "2021680079 от 07.12.2021",
      "2022621114 от 18.05.2022",
      "2022669457 от 20.10.2022",
      "2023610774 от 12.01.2023",
      "2023610566 от 11.01.2023",
      "2023610797 от 13.01.2023",
      "2023611473 от 20.01.2023",
      "2023616550 от 29.03.2023",
      "2023688948 от 25.12.2023",
      "2023688865 от 25.12.2023",
      "2024610580 от 11.01.2024",
      "2024610983 от 16.01.2024",
      "2024665133 от 27.06.2024",
      "2024664678 от 24.06.2024",
      "2025610073 от 09.01.2025",
      "2025610687 от 14.01.2025",
      "2025610603 от 13.01.2025",
      "2025660043 от 21.04.2025",
      "2025663289 от 27.05.2025",
      "2025697552 от 25.12.2025",
      "2026660599 от 14.04.2026",
    ],
    paragraphs: [
      "Право использования программного обеспечения предоставляется на условиях лицензионного договора, который заключается с каждым лицензиатом.",
      "ООО «Смартстаффинг» является обладателем исключительных прав на программное обеспечение «Межкорпоративная сеть для развития проектной кооперации между компаниями в сфере ИТ-услуг „B2BCloud“. Право использования программного обеспечения „Межкорпоративная сеть для развития проектной кооперации между компаниями в сфере ИТ-услуг „B2BCloud“ предоставляется на условиях лицензионного договора, который заключается с каждым лицензиатом.",
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
