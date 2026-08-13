import type { MediaArticle, MediaPageContent } from "./media-content";
import { isRecord, isString } from "../lib/block-parse-utils";
import type { LandingBlockBase } from "./landing-block-base";

export const MEDIA_BLOCK_TYPES = ["mediaListing"] as const;

export type MediaBlockType = (typeof MEDIA_BLOCK_TYPES)[number];

export type MediaListingBlockProps = {
  title: string;
};

export type MediaBlock = LandingBlockBase<"mediaListing", MediaListingBlockProps>;

export type MediaLandingPageContent = {
  pageId: string;
  slug: string;
  title: string;
  meta: { title: string; description: string } | null;
  blocks: MediaBlock[];
};

export const MEDIA_BLOCK_TYPE_LABELS: Record<MediaBlockType, string> = {
  mediaListing: "Медиа",
};

function parseMediaListingProps(value: unknown): MediaListingBlockProps | null {
  if (!isRecord(value) || !isString(value.title)) {
    return null;
  }
  return { title: value.title };
}

export function parseMediaBlockProps(
  type: MediaBlockType,
  props: unknown,
): MediaListingBlockProps | null {
  if (type !== "mediaListing") {
    return null;
  }
  return parseMediaListingProps(props);
}

export function parseMediaBlock(input: {
  id: string;
  order: number;
  type: string;
  props: unknown;
}): MediaBlock | null {
  if (!isMediaBlockType(input.type)) {
    return null;
  }
  const props = parseMediaBlockProps(input.type, input.props);
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

export function isMediaBlockType(value: string): value is MediaBlockType {
  return MEDIA_BLOCK_TYPES.includes(value as MediaBlockType);
}

export function defaultMediaBlockProps(): MediaListingBlockProps {
  return { title: "Медиа" };
}

export function mediaBlocksFromStaticContent(): Array<{
  order: number;
  type: MediaBlockType;
  props: MediaListingBlockProps;
}> {
  return [{ order: 0, type: "mediaListing", props: { title: "Медиа" } }];
}

export function buildMediaPageContent(
  articles: MediaArticle[],
  title: string,
  requestedPage: number,
): MediaPageContent {
  const itemsPerPage = 12;
  const totalPages = Math.max(1, Math.ceil(articles.length / itemsPerPage));
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);
  const start = (currentPage - 1) * itemsPerPage;
  const items = articles.slice(start, start + itemsPerPage);

  return {
    title,
    items,
    currentPage,
    totalPages,
  };
}
