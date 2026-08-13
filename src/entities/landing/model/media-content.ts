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
};

const exampleSlug =
  "t1-oblako-i-smartstaffing-razvivayut-tekhnologii-otkrytogo-koda";
const exampleTitle =
  "Т1 Облако и «СмартСтаффинг» заключили соглашение о развитии технологий открытого кода для бизнеса";
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
    "Т1 Облако (Холдинг Т1) и ИТ-компания «СмартСтаффинг», резидент «Сколково», подписали меморандум о развитии решений с открытым исходным кодом в рамках проекта GoOpenSource — коллективной базы знаний и сообщества контрибьюторов Open Source-решений. В рамках сотрудничества стороны будут популяризировать и внедрять решения с открытым кодом для бизнеса.",
  bodyBlocks: [
    {
      type: "paragraph",
      text: "Меморандум подписан на Петербургском международном экономическом форуме-2024.",
    },
    {
      type: "image",
      imageSrc: "/landing/media/media-important.png",
      imageAlt: "Подписание меморандума",
    },
    {
      type: "paragraph",
      text: "В рамках сотрудничества стороны будут развивать и внедрять решения с открытым кодом для бизнеса, формировать и укреплять технологический суверенитет на базе T1 Облако. Для этого будет создаваться единая база знаний российских решений с открытым кодом, понятная и доступная бизнесу, а участники-контрибьюторы получат долгосрочную мотивацию.",
    },
    {
      type: "paragraph",
      text: "GoOpenSource предоставляет возможность быстро и эффективно найти нужное open source решение, поделиться опытом, рассказать о своём проекте, команде, навыках и технологиях. Для представителей индустрии и заказчиков — это отличный шанс обозначить свои задачи и потребности.",
    },
  ],
  sourceHref:
    "https://russoft.org/news/v-rossii-pristupili-k-zapusku-pervogo-portala-nejrosotrudnikov-dlya-biznesa/",
  sourceLabel:
    "https://russoft.org/news/v-rossii-pristupili-k-zapusku-pervogo-portala-nejrosotrudnikov-dlya-biznesa/",
  meta: {
    title: `${exampleTitle} — СмартСтаффинг`,
    description:
      "Т1 Облако и СмартСтаффинг развивают решения с открытым исходным кодом для российского бизнеса.",
  },
};
