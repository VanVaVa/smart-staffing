import type { DocumentItem } from "./documents-content";
import { isRecord, isString } from "../lib/block-parse-utils";
import type { LandingBlockBase } from "./landing-block-base";

export const DOCUMENT_VIEW_BLOCK_TYPES = ["documentView"] as const;

export type DocumentViewBlockType = (typeof DOCUMENT_VIEW_BLOCK_TYPES)[number];

export type DocumentViewBlockProps = Pick<
  DocumentItem,
  "slug" | "title" | "pdfSrc" | "href"
>;

export type DocumentViewBlock = LandingBlockBase<"documentView", DocumentViewBlockProps>;

export type DocumentViewPageContent = {
  pageId: string;
  slug: string;
  title: string;
  meta: { title: string; description: string } | null;
  blocks: DocumentViewBlock[];
};

;

function parseDocumentViewProps(value: unknown): DocumentViewBlockProps | null {
  if (
    !isRecord(value) ||
    !isString(value.slug) ||
    !isString(value.title) ||
    !isString(value.pdfSrc) ||
    !isString(value.href)
  ) {
    return null;
  }
  return {
    slug: value.slug,
    title: value.title,
    pdfSrc: value.pdfSrc,
    href: value.href,
  };
}

export function parseDocumentViewBlockProps(
  type: DocumentViewBlockType,
  props: unknown,
): DocumentViewBlockProps | null {
  if (type !== "documentView") {
    return null;
  }
  return parseDocumentViewProps(props);
}

export function parseDocumentViewBlock(input: {
  id: string;
  order: number;
  type: string;
  props: unknown;
}): DocumentViewBlock | null {
  if (!isDocumentViewBlockType(input.type)) {
    return null;
  }
  const props = parseDocumentViewBlockProps(input.type, input.props);
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

export function isDocumentViewBlockType(value: string): value is DocumentViewBlockType {
  return DOCUMENT_VIEW_BLOCK_TYPES.includes(value as DocumentViewBlockType);
}

export function documentViewBlocksFromItem(item: DocumentItem): Array<{
  order: number;
  type: DocumentViewBlockType;
  props: DocumentViewBlockProps;
}> {
  return [
    {
      order: 0,
      type: "documentView",
      props: {
        slug: item.slug,
        title: item.title,
        href: item.href,
        pdfSrc: item.pdfSrc,
      },
    },
  ];
}
