import { routes, siteUrl } from "@/shared/config";

import { transitionFaq } from "./content";

const pageUrl = `${siteUrl}${routes.outplacement}`;

function toPlainText(value: string) {
  return value.replaceAll("\u00a0", " ").replaceAll("\u2011", "-");
}

export const transitionSeo = {
  title: "Аутплейсмент ИТ-специалистов: переход вместо увольнения — СмартСтаффинг",
  description:
    "Аутплейсмент ИТ-специалистов: сотрудники переходят к новым работодателям партнёрской сети ещё в срок предупреждения о сокращении.",
  keywords: [
    "аутплейсмент",
    "аутплейсмент ИТ-специалистов",
    "аутплейсмент сотрудников",
    "переход вместо увольнения",
    "сокращение ИТ-штата",
    "сокращение персонала",
    "трудоустройство при сокращении",
    "сокращение ФОТ",
  ],
  socialTitle: "Сократите ФОТ. Поддерживайте занятость специалистов — СмартСтаффинг",
  socialDescription: "Аутплейсмент ИТ-специалистов: переход к новым работодателям вместо сокращения.",
  url: pageUrl,
  image: {
    url: `${siteUrl}/landing/transition/og.jpg`,
    width: 1200,
    height: 630,
    alt: "Аутплейсмент ИТ-специалистов на платформе СмартСтаффинг",
  },
};

export const transitionStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: "Аутплейсмент ИТ-специалистов",
      serviceType: "Аутплейсмент",
      description: transitionSeo.description,
      url: pageUrl,
      areaServed: { "@type": "Country", name: "Россия" },
      provider: { "@type": "Organization", name: "СмартСтаффинг", url: siteUrl },
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: transitionFaq.items.map((item) => ({
        "@type": "Question",
        name: toPlainText(item.question),
        acceptedAnswer: { "@type": "Answer", text: toPlainText(item.answer) },
      })),
    },
  ],
};
