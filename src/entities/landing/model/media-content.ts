export type MediaArticleTag = "important" | "interesting" | "news";

export type MediaArticle = {
  id: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  tag: MediaArticleTag;
  tagLabel: string;
  publishedAt: string;
  publishedLabel: string;
  title: string;
};

export type MediaPageContent = {
  title: string;
  items: MediaArticle[];
  currentPage: number;
  totalPages: number;
};

const articleTitle =
  "Т1 Облако и «СмартСтаффинг» заключили соглашение о развитии технологий открытого кода для бизнеса";

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
      href: `#publication-${id}`,
      ...template,
      publishedAt: "2026-04-23",
      publishedLabel: "23.04.2026",
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
