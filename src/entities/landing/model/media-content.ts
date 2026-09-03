export type MediaArticleTag = "important" | "interesting" | "news";

export const MEDIA_ARTICLE_TAGS: MediaArticleTag[] = [
  "important",
  "interesting",
  "news",
];

export const MEDIA_ARTICLE_TAG_LABELS: Record<MediaArticleTag, string> = {
  important: "Важное",
  interesting: "Интересное",
  news: "Новость",
};

export function isMediaArticleTag(value: string): value is MediaArticleTag {
  return MEDIA_ARTICLE_TAGS.includes(value as MediaArticleTag);
}

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

export type MediaArticleBodyParagraphBlock = {
  type: "paragraph";
  text: string;
};

export type MediaArticleBodyImageBlock = {
  type: "image";
  imageSrc: string;
  imageAlt: string;
};

export type MediaArticleBodyBlock =
  | MediaArticleBodyParagraphBlock
  | MediaArticleBodyImageBlock;

export type MediaArticleContent = MediaArticle & {
  heroImageSrc: string;
  heroImageAlt: string;
  lead: string;
  bodyBlocks: MediaArticleBodyBlock[];
  sourceHref: string;
  sourceLabel: string;
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
  activeTag: MediaArticleTag | null;
};

const exampleSlug =
  "t1-oblako-i-smartstaffing-razvivayut-tekhnologii-otkrytogo-koda";
const exampleTitle =
  "Т1 Облако и\u00a0«СмартСтаффинг» заключили соглашение о\u00a0развитии технологий открытого кода для\u00a0бизнеса";
const examplePublishedAt = "2026-04-23";
const examplePublishedLabel = "23.04.2026";

export const EXAMPLE_MEDIA_ARTICLE: MediaArticleContent = {
  id: "featured",
  slug: exampleSlug,
  href: `/media/${exampleSlug}`,
  imageSrc: "/landing/media/media-important.png",
  imageAlt: "Современное рабочее пространство",
  heroImageSrc: "/landing/media/media-important.png",
  heroImageAlt: "Современное рабочее пространство",
  tag: "important",
  tagLabel: "Важное",
  publishedAt: examplePublishedAt,
  publishedLabel: examplePublishedLabel,
  title: exampleTitle,
  lead:
    "Т1 Облако (Холдинг Т1) и\u00a0ИТ-компания «СмартСтаффинг», резидент «Сколково», подписали меморандум о\u00a0развитии решений с\u00a0открытым исходным кодом в\u00a0рамках проекта GoOpenSource — коллективной базы знаний и\u00a0сообщества контрибьюторов Open Source-решений. В\u00a0рамках сотрудничества стороны будут популяризировать и\u00a0внедрять решения с\u00a0открытым кодом для\u00a0бизнеса.",
  bodyBlocks: [
    {
      type: "paragraph",
      text: "Меморандум подписан на\u00a0Петербургском международном экономическом форуме-2024.",
    },
    {
      type: "image",
      imageSrc: "/landing/media/media-important.png",
      imageAlt: "Подписание меморандума",
    },
    {
      type: "paragraph",
      text: "В\u00a0рамках сотрудничества стороны будут развивать и\u00a0внедрять решения с\u00a0открытым кодом для\u00a0бизнеса, формировать и\u00a0укреплять технологический суверенитет на\u00a0базе T1 Облако. Для\u00a0этого будет создаваться единая база знаний российских решений с\u00a0открытым кодом, понятная и\u00a0доступная бизнесу, а\u00a0участники-контрибьюторы получат долгосрочную мотивацию.",
    },
    {
      type: "paragraph",
      text: "GoOpenSource предоставляет возможность быстро и\u00a0эффективно найти нужное open source решение, поделиться опытом, рассказать о\u00a0своём проекте, команде, навыках и\u00a0технологиях. Для\u00a0представителей индустрии и\u00a0заказчиков — это отличный шанс обозначить свои задачи и\u00a0потребности.",
    },
  ],
  sourceHref:
    "https://russoft.org/news/v-rossii-pristupili-k-zapusku-pervogo-portala-nejrosotrudnikov-dlya-biznesa/",
  sourceLabel:
    "https://russoft.org/news/v-rossii-pristupili-k-zapusku-pervogo-portala-nejrosotrudnikov-dlya-biznesa/",
  meta: {
    title: `${exampleTitle} — СмартСтаффинг`,
    description:
      "Т1 Облако и\u00a0СмартСтаффинг развивают решения с\u00a0открытым исходным кодом для\u00a0российского бизнеса.",
  },
};
