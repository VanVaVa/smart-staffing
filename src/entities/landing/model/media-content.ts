export type MediaArticleTag = "important" | "interesting" | "news";

export type MediaArticle = {
  id: string;
  slug: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  tag: MediaArticleTag;
  tagLabel: string;
  publishedAt: string;
  publishedLabel: string;
  title: string;
};

export type MediaArticleRelated = {
  id: string;
  slug: string;
  href: string;
  publishedAt: string;
  publishedLabel: string;
  title: string;
};

export type MediaArticleDetail = MediaArticle & {
  lead: string;
  paragraphs: string[];
  sourceHref: string;
  sourceLabel: string;
  relatedArticles: MediaArticleRelated[];
  meta: {
    title: string;
    description: string;
  };
};

export type MediaPageContent = {
  title: string;
  items: MediaArticle[];
  currentPage: number;
  totalPages: number;
};

const articleTitle =
  "Т1 Облако и «СмартСтаффинг» заключили соглашение о развитии технологий открытого кода для бизнеса";
const articleSlug =
  "t1-oblako-i-smartstaffing-razvivayut-tekhnologii-otkrytogo-koda";
const publishedAt = "2026-04-23";
const publishedLabel = "23.04.2026";
const articleImage = {
  imageSrc: "/landing/media/media-important.png",
  imageAlt: "Современное рабочее пространство",
} as const;

const articleParagraphs = [
  "Меморандум подписан на Петербургском международном экономическом форуме-2024.",
  "В рамках сотрудничества стороны будут развивать и внедрять решения с открытым кодом для бизнеса, формировать и укреплять технологический суверенитет на базе T1 Облако. Для этого будет создаваться единая база знаний российских решений с открытым кодом, понятная и доступная бизнесу, а участники-контрибьюторы получат долгосрочную мотивацию.",
  "GoOpenSource предоставляет возможность быстро и эффективно найти нужное open source решение, поделиться опытом, рассказать о своём проекте, команде, навыках и технологиях. Для представителей индустрии и заказчиков — это отличный шанс обозначить свои задачи и потребности.",
];

const relatedArticleTitles = [
  "СмартСтаффинг-проект B2BCloud в числе первых получил статус цифровой платформы «Сколково»",
  "Компания «СмартСтаффинг» вошла в рейтинг лучших аутстаф-разработчиков России Тэглайн (2024)",
] as const;

const relatedArticles = Array.from({ length: 8 }, (_, index) => {
  const id = `related-${index + 1}`;

  return {
    id,
    slug: articleSlug,
    href: `/media/${articleSlug}`,
    publishedAt,
    publishedLabel,
    title: relatedArticleTitles[index % relatedArticleTitles.length],
  };
});

const mediaArticle: MediaArticleDetail = {
  id: "featured",
  slug: articleSlug,
  href: `/media/${articleSlug}`,
  ...articleImage,
  tag: "important",
  tagLabel: "Важное",
  publishedAt,
  publishedLabel,
  title: articleTitle,
  lead:
    "Т1 Облако (Холдинг Т1) и ИТ-компания «СмартСтаффинг», резидент «Сколково», подписали меморандум о развитии решений с открытым исходным кодом в рамках проекта GoOpenSource — коллективной базы знаний и сообщества контрибьюторов Open Source-решений. В рамках сотрудничества стороны будут популяризировать и внедрять решения с открытым кодом для бизнеса.",
  paragraphs: articleParagraphs,
  sourceHref:
    "https://russoft.org/news/v-rossii-pristupili-k-zapusku-pervogo-portala-nejrosotrudnikov-dlya-biznesa/",
  sourceLabel:
    "https://russoft.org/news/v-rossii-pristupili-k-zapusku-pervogo-portala-nejrosotrudnikov-dlya-biznesa/",
  relatedArticles,
  meta: {
    title: `${articleTitle} — СмартСтаффинг`,
    description:
      "Т1 Облако и СмартСтаффинг развивают решения с открытым исходным кодом для российского бизнеса.",
  },
};

const mediaArticleTemplates = [
  {
    imageSrc: "/landing/media/media-important.png",
    imageAlt: "Современное рабочее пространство",
    tag: "important",
    tagLabel: "Важное",
  },
  {
    imageSrc: "/landing/media/media-interesting.png",
    imageAlt: "Промышленный энергетический комплекс",
    tag: "interesting",
    tagLabel: "Интересное",
  },
  {
    imageSrc: "/landing/media/media-news.png",
    imageAlt: "Иллюстрация цифрового профиля специалиста",
    tag: "news",
    tagLabel: "Новость",
  },
] as const satisfies ReadonlyArray<
  Pick<MediaArticle, "imageSrc" | "imageAlt" | "tag" | "tagLabel">
>;

const itemsPerPage = 12;
const totalPages = 8;

function normalizePage(page: number) {
  if (!Number.isInteger(page)) {
    return 1;
  }

  return Math.min(Math.max(page, 1), totalPages);
}

export function getMediaPage(requestedPage: number): MediaPageContent {
  const currentPage = normalizePage(requestedPage);
  const items = Array.from({ length: itemsPerPage }, (_, index) => {
    const template = mediaArticleTemplates[index % mediaArticleTemplates.length];
    const id = `${currentPage}-${index + 1}`;

    return {
      id,
      slug: articleSlug,
      href: `/media/${articleSlug}`,
      ...template,
      publishedAt,
      publishedLabel,
      title: articleTitle,
    };
  });

  return {
    title: "Медиа",
    items,
    currentPage,
    totalPages,
  };
}

export const mediaArticleSlugs = [articleSlug] as const;

export function getMediaArticle(slug: string): MediaArticleDetail | null {
  return slug === articleSlug ? mediaArticle : null;
}
