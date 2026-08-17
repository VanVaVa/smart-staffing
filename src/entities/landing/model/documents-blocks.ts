import type { DocumentsPageContent } from "./documents-content";
import { documentsPage } from "./documents-content";
import { cloneProps, isRecord, isString } from "../lib/block-parse-utils";
import type { LandingBlockBase } from "./landing-block-base";

export const DOCUMENTS_BLOCK_TYPES = ["documentsPage"] as const;

export type DocumentsBlockType = (typeof DOCUMENTS_BLOCK_TYPES)[number];

export type DocumentsBlockProps = DocumentsPageContent;

export type DocumentsBlock = LandingBlockBase<"documentsPage", DocumentsBlockProps>;

export type DocumentsLandingPageContent = {
  pageId: string;
  slug: string;
  title: string;
  meta: { title: string; description: string } | null;
  blocks: DocumentsBlock[];
};

;

function parseDocumentsPageProps(value: unknown): DocumentsBlockProps | null {
  if (!isRecord(value) || !isString(value.title) || !Array.isArray(value.categories)) {
    return null;
  }
  return cloneProps(value as DocumentsBlockProps);
}

export function parseDocumentsBlockProps(
  type: DocumentsBlockType,
  props: unknown,
): DocumentsBlockProps | null {
  if (type !== "documentsPage") {
    return null;
  }
  return parseDocumentsPageProps(props);
}

export function parseDocumentsBlock(input: {
  id: string;
  order: number;
  type: string;
  props: unknown;
}): DocumentsBlock | null {
  if (!isDocumentsBlockType(input.type)) {
    return null;
  }
  const props = parseDocumentsBlockProps(input.type, input.props);
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

export function isDocumentsBlockType(value: string): value is DocumentsBlockType {
  return DOCUMENTS_BLOCK_TYPES.includes(value as DocumentsBlockType);
}

export function documentsBlocksFromStaticContent(): Array<{
  order: number;
  type: DocumentsBlockType;
  props: DocumentsBlockProps;
}> {
  return [{ order: 0, type: "documentsPage", props: cloneProps(documentsPage) }];
}
