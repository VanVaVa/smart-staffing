import type {
  MediaArticle,
  MediaArticleBodyBlock,
  MediaArticleContent,
} from "./media-content";
import { EXAMPLE_MEDIA_ARTICLE } from "./media-content";
import { cloneProps, isRecord, isString } from "../lib/block-parse-utils";
import type { LandingBlockBase } from "./landing-block-base";

export const MEDIA_ARTICLE_BLOCK_TYPES = ["mediaArticle"] as const;

export type MediaArticleBlockType = (typeof MEDIA_ARTICLE_BLOCK_TYPES)[number];

export type MediaArticleBlockProps = MediaArticleContent;

export type MediaArticleBlock = LandingBlockBase<"mediaArticle", MediaArticleBlockProps>;

export type MediaArticlePageContent = {
  pageId: string;
  slug: string;
  title: string;
  meta: { title: string; description: string } | null;
  blocks: MediaArticleBlock[];
};

;

function parseBodyBlock(value: unknown): MediaArticleBodyBlock | null {
  if (!isRecord(value) || !isString(value.type)) {
    return null;
  }

  if (value.type === "paragraph" && isString(value.text)) {
    return { type: "paragraph", text: value.text };
  }

  if (value.type === "image" && isString(value.imageSrc)) {
    return {
      type: "image",
      imageSrc: value.imageSrc,
      imageAlt: isString(value.imageAlt) ? value.imageAlt : "",
    };
  }

  return null;
}

function normalizeBodyBlocks(raw: Record<string, unknown>): MediaArticleBodyBlock[] {
  if (Array.isArray(raw.bodyBlocks)) {
    return raw.bodyBlocks
      .map(parseBodyBlock)
      .filter((block): block is MediaArticleBodyBlock => block !== null);
  }

  if (Array.isArray(raw.paragraphs)) {
    return raw.paragraphs
      .filter(isString)
      .map((text) => ({ type: "paragraph" as const, text }));
  }

  return [];
}

function parseMediaArticleProps(value: unknown): MediaArticleBlockProps | null {
  if (!isRecord(value) || !isString(value.slug) || !isString(value.title)) {
    return null;
  }

  const imageSrc = isString(value.imageSrc) ? value.imageSrc : "";
  const imageAlt = isString(value.imageAlt) ? value.imageAlt : "";
  const heroImageSrc = isString(value.heroImageSrc) ? value.heroImageSrc : imageSrc;
  const heroImageAlt = isString(value.heroImageAlt) ? value.heroImageAlt : imageAlt;

  return {
    id: isString(value.id) ? value.id : crypto.randomUUID(),
    slug: value.slug,
    href: isString(value.href) ? value.href : `/media/${value.slug}`,
    imageSrc,
    imageAlt,
    heroImageSrc,
    heroImageAlt,
    tag: value.tag === "important" || value.tag === "interesting" || value.tag === "news"
      ? value.tag
      : "news",
    tagLabel: isString(value.tagLabel) ? value.tagLabel : "Новость",
    publishedAt: isString(value.publishedAt) ? value.publishedAt : "",
    publishedLabel: isString(value.publishedLabel) ? value.publishedLabel : "",
    title: value.title,
    lead: isString(value.lead) ? value.lead : "",
    bodyBlocks: normalizeBodyBlocks(value),
    sourceHref: isString(value.sourceHref) ? value.sourceHref : "",
    sourceLabel: isString(value.sourceLabel) ? value.sourceLabel : "",
    meta: isRecord(value.meta) &&
      isString(value.meta.title) &&
      isString(value.meta.description)
      ? { title: value.meta.title, description: value.meta.description }
      : { title: `${value.title} — СмартСтаффинг`, description: "" },
  };
}

export function parseMediaArticleBlockProps(
  type: MediaArticleBlockType,
  props: unknown,
): MediaArticleBlockProps | null {
  if (type !== "mediaArticle") {
    return null;
  }
  return parseMediaArticleProps(props);
}

export function parseMediaArticleBlock(input: {
  id: string;
  order: number;
  type: string;
  props: unknown;
}): MediaArticleBlock | null {
  if (!isMediaArticleBlockType(input.type)) {
    return null;
  }
  const props = parseMediaArticleBlockProps(input.type, input.props);
  if (!props) {
    return null;
  }
  return {
    id: input.id,
    order: input.order,
    type: input.type,
    props,
  };
}

export function isMediaArticleBlockType(value: string): value is MediaArticleBlockType {
  return MEDIA_ARTICLE_BLOCK_TYPES.includes(value as MediaArticleBlockType);
}

export function articleToMediaArticle(props: MediaArticleContent): MediaArticle {
  return {
    id: props.id,
    slug: props.slug,
    href: props.href,
    imageSrc: props.imageSrc,
    imageAlt: props.imageAlt,
    tag: props.tag,
    tagLabel: props.tagLabel,
    publishedAt: props.publishedAt,
    publishedLabel: props.publishedLabel,
    title: props.title,
  };
}

export function createDefaultMediaArticleProps(slug: string): MediaArticleBlockProps {
  const today = new Date().toISOString().slice(0, 10);
  const [year, month, day] = today.split("-");
  const publishedLabel = `${day}.${month}.${year}`;
  const defaultImage = "/landing/media/media-news.png";

  return {
    id: crypto.randomUUID(),
    slug,
    href: `/media/${slug}`,
    imageSrc: defaultImage,
    imageAlt: "",
    heroImageSrc: defaultImage,
    heroImageAlt: "",
    tag: "news",
    tagLabel: "Новость",
    publishedAt: today,
    publishedLabel,
    title: "Новая статья",
    lead: "",
    bodyBlocks: [],
    sourceHref: "",
    sourceLabel: "",
    meta: {
      title: "Новая статья — СмартСтаффинг",
      description: "",
    },
  };
}

export function mediaArticleBlocksFromContent(
  content: MediaArticleContent,
): Array<{
  order: number;
  type: MediaArticleBlockType;
  props: MediaArticleBlockProps;
}> {
  return [
    {
      order: 0,
      type: "mediaArticle",
      props: cloneProps(content),
    },
  ];
}

export function mediaArticleBlocksFromStaticContent(
  slug: string,
): Array<{
  order: number;
  type: MediaArticleBlockType;
  props: MediaArticleBlockProps;
}> {
  if (slug !== EXAMPLE_MEDIA_ARTICLE.slug) {
    throw new Error(`Media article "${slug}" not found in static content`);
  }
  return mediaArticleBlocksFromContent(EXAMPLE_MEDIA_ARTICLE);
}

