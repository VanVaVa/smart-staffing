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

export const DOCUMENTS_BLOCK_TYPE_LABELS: Record<DocumentsBlockType, string> = {
  documentsPage: "Документы",
};

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

export function defaultDocumentsBlockProps(): DocumentsBlockProps {
  return cloneProps(documentsPage);
}

export type DocumentsCollectionKey =
  | "categories"
  | "categories.items"
  | "certificates"
  | "softwareRights.registrations"
  | "softwareRights.paragraphs";

export function defaultDocumentsCollectionItem(collectionKey: DocumentsCollectionKey): unknown {
  switch (collectionKey) {
    case "categories":
      return {
        id: crypto.randomUUID(),
        title: "Категория",
        items: [],
      };
    case "categories.items":
      return {
        id: crypto.randomUUID(),
        slug: "new-document",
        title: "Новый документ",
        href: "/documents/new-document",
        pdfSrc: "/landing/documents/new-document.pdf",
        presentation: "page",
      };
    case "certificates":
      return {
        id: crypto.randomUUID(),
        title: "Свидетельство",
        pdfSrc: "/landing/documents/certificate-1.pdf",
      };
    case "softwareRights.registrations":
      return "2026000000 от\u00a001.01.2026";
    case "softwareRights.paragraphs":
      return "Новый абзац";
  }
}

export function documentsBlocksFromStaticContent(): Array<{
  order: number;
  type: DocumentsBlockType;
  props: DocumentsBlockProps;
}> {
  return [{ order: 0, type: "documentsPage", props: cloneProps(documentsPage) }];
}
