import {
  ABOUT_BLOCK_TYPES,
  ABOUT_BLOCK_TYPE_LABELS,
  defaultAboutBlockProps,
  defaultAboutCollectionItem,
  isAboutBlockType,
  parseAboutBlock,
  parseAboutBlockProps,
  type AboutBlockType,
} from "../model/about-blocks";
import {
  CLIENTS_BLOCK_TYPES,
  CLIENTS_BLOCK_TYPE_LABELS,
  defaultClientsBlockProps,
  defaultClientsCollectionItem,
  isClientsBlockType,
  parseClientsBlock,
  parseClientsBlockProps,
  type ClientsBlockType,
} from "../model/clients-blocks";
import {
  defaultDocumentViewBlockProps,
  DOCUMENT_VIEW_BLOCK_TYPES,
  DOCUMENT_VIEW_BLOCK_TYPE_LABELS,
  isDocumentViewBlockType,
  parseDocumentViewBlock,
  parseDocumentViewBlockProps,
  type DocumentViewBlockType,
} from "../model/document-view-blocks";
import {
  defaultDocumentsBlockProps,
  defaultDocumentsCollectionItem,
  DOCUMENTS_BLOCK_TYPES,
  DOCUMENTS_BLOCK_TYPE_LABELS,
  isDocumentsBlockType,
  parseDocumentsBlock,
  parseDocumentsBlockProps,
  type DocumentsBlockType,
} from "../model/documents-blocks";
import {
  defaultFooterBlockProps,
  defaultFooterCollectionItem,
  FOOTER_BLOCK_TYPES,
  FOOTER_BLOCK_TYPE_LABELS,
  isFooterBlockType,
  parseFooterBlock,
  parseFooterBlockProps,
} from "../model/footer-blocks";
import {
  defaultBlockProps as defaultHomeBlockProps,
  defaultCollectionItem as defaultHomeCollectionItem,
  HOME_BLOCK_TYPES,
  HOME_BLOCK_TYPE_LABELS,
  isHomeBlockType,
  parseHomeBlock,
  parseHomeBlockProps,
  type HomeBlockType,
} from "../model/home-blocks";
import {
  defaultMediaArticleBlockProps,
  defaultMediaArticleCollectionItem,
  isMediaArticleBlockType,
  MEDIA_ARTICLE_BLOCK_TYPES,
  MEDIA_ARTICLE_BLOCK_TYPE_LABELS,
  parseMediaArticleBlock,
  parseMediaArticleBlockProps,
  type MediaArticleBlockType,
} from "../model/media-article-blocks";
import {
  defaultMediaBlockProps,
  isMediaBlockType,
  MEDIA_BLOCK_TYPES,
  MEDIA_BLOCK_TYPE_LABELS,
  parseMediaBlock,
  parseMediaBlockProps,
  type MediaBlockType,
} from "../model/media-blocks";
import {
  isKnownLandingPageSlug,
  LANDING_PAGE_SLUGS,
  parseClientSegmentFromSlug,
  parseDocumentSlugFromPageSlug,
  parseMediaArticleSlugFromPageSlug,
} from "../model/landing-page-slugs";
import {
  defaultVacanciesBlockProps,
  defaultVacanciesCollectionItem,
  isVacanciesBlockType,
  VACANCIES_BLOCK_TYPES,
  VACANCIES_BLOCK_TYPE_LABELS,
  parseVacanciesBlock,
  parseVacanciesBlockProps,
  type VacanciesBlockType,
} from "../model/vacancies-blocks";

export type LandingPageSchema = {
  slug: string;
  blockTypes: readonly string[];
  blockTypeLabels: Record<string, string>;
  isBlockType: (value: string) => boolean;
  parseBlockProps: (type: string, props: unknown) => unknown | null;
  parseBlock: (input: {
    id: string;
    order: number;
    type: string;
    props: unknown;
  }) => unknown | null;
  defaultBlockProps: (type: string) => unknown;
  defaultCollectionItem: (collectionKey: string) => unknown;
};

function createSchema<TType extends string>(config: {
  slug: string;
  blockTypes: readonly TType[];
  blockTypeLabels: Record<TType, string>;
  isBlockType: (value: string) => value is TType;
  parseBlockProps: (type: TType, props: unknown) => unknown | null;
  parseBlock: (input: {
    id: string;
    order: number;
    type: string;
    props: unknown;
  }) => unknown | null;
  defaultBlockProps: (type: TType) => unknown;
  defaultCollectionItem: (collectionKey: string) => unknown;
}): LandingPageSchema {
  return {
    slug: config.slug,
    blockTypes: config.blockTypes,
    blockTypeLabels: config.blockTypeLabels,
    isBlockType: (value) => config.isBlockType(value),
    parseBlockProps: (type, props) =>
      config.isBlockType(type) ? config.parseBlockProps(type, props) : null,
    parseBlock: config.parseBlock,
    defaultBlockProps: (type) =>
      config.isBlockType(type) ? config.defaultBlockProps(type) : null,
    defaultCollectionItem: config.defaultCollectionItem,
  };
}

const HOME_SCHEMA = createSchema({
  slug: LANDING_PAGE_SLUGS.home,
  blockTypes: HOME_BLOCK_TYPES,
  blockTypeLabels: HOME_BLOCK_TYPE_LABELS,
  isBlockType: isHomeBlockType,
  parseBlockProps: parseHomeBlockProps,
  parseBlock: parseHomeBlock,
  defaultBlockProps: defaultHomeBlockProps,
  defaultCollectionItem: (key) => defaultHomeCollectionItem(key as never),
});

const ABOUT_SCHEMA = createSchema({
  slug: LANDING_PAGE_SLUGS.about,
  blockTypes: ABOUT_BLOCK_TYPES,
  blockTypeLabels: ABOUT_BLOCK_TYPE_LABELS,
  isBlockType: isAboutBlockType,
  parseBlockProps: parseAboutBlockProps,
  parseBlock: parseAboutBlock,
  defaultBlockProps: defaultAboutBlockProps,
  defaultCollectionItem: (key) => defaultAboutCollectionItem(key as never),
});

const VACANCIES_SCHEMA = createSchema({
  slug: LANDING_PAGE_SLUGS.vacancies,
  blockTypes: VACANCIES_BLOCK_TYPES,
  blockTypeLabels: VACANCIES_BLOCK_TYPE_LABELS,
  isBlockType: isVacanciesBlockType,
  parseBlockProps: parseVacanciesBlockProps,
  parseBlock: parseVacanciesBlock,
  defaultBlockProps: () => defaultVacanciesBlockProps(),
  defaultCollectionItem: () => defaultVacanciesCollectionItem(),
});

const DOCUMENTS_SCHEMA = createSchema({
  slug: LANDING_PAGE_SLUGS.documents,
  blockTypes: DOCUMENTS_BLOCK_TYPES,
  blockTypeLabels: DOCUMENTS_BLOCK_TYPE_LABELS,
  isBlockType: isDocumentsBlockType,
  parseBlockProps: parseDocumentsBlockProps,
  parseBlock: parseDocumentsBlock,
  defaultBlockProps: () => defaultDocumentsBlockProps(),
  defaultCollectionItem: (key) => defaultDocumentsCollectionItem(key as never),
});

const MEDIA_SCHEMA = createSchema({
  slug: LANDING_PAGE_SLUGS.media,
  blockTypes: MEDIA_BLOCK_TYPES,
  blockTypeLabels: MEDIA_BLOCK_TYPE_LABELS,
  isBlockType: isMediaBlockType,
  parseBlockProps: parseMediaBlockProps,
  parseBlock: parseMediaBlock,
  defaultBlockProps: () => defaultMediaBlockProps(),
  defaultCollectionItem: () => ({}),
});

function createDocumentViewSchema(slug: string, documentSlug: string): LandingPageSchema {
  return createSchema({
    slug,
    blockTypes: DOCUMENT_VIEW_BLOCK_TYPES,
    blockTypeLabels: DOCUMENT_VIEW_BLOCK_TYPE_LABELS,
    isBlockType: isDocumentViewBlockType,
    parseBlockProps: parseDocumentViewBlockProps,
    parseBlock: parseDocumentViewBlock,
    defaultBlockProps: () =>
      defaultDocumentViewBlockProps(documentSlug, "Документ"),
    defaultCollectionItem: () => ({}),
  });
}

function createMediaArticleSchema(slug: string, articleSlug: string): LandingPageSchema {
  return createSchema({
    slug,
    blockTypes: MEDIA_ARTICLE_BLOCK_TYPES,
    blockTypeLabels: MEDIA_ARTICLE_BLOCK_TYPE_LABELS,
    isBlockType: isMediaArticleBlockType,
    parseBlockProps: parseMediaArticleBlockProps,
    parseBlock: parseMediaArticleBlock,
    defaultBlockProps: () => defaultMediaArticleBlockProps(articleSlug),
    defaultCollectionItem: (key) => defaultMediaArticleCollectionItem(key as never),
  });
}

function createClientsSchema(slug: string, segment: string): LandingPageSchema {
  return createSchema({
    slug,
    blockTypes: CLIENTS_BLOCK_TYPES,
    blockTypeLabels: CLIENTS_BLOCK_TYPE_LABELS,
    isBlockType: isClientsBlockType,
    parseBlockProps: parseClientsBlockProps,
    parseBlock: parseClientsBlock,
    defaultBlockProps: (type) =>
      defaultClientsBlockProps(type, segment as never),
    defaultCollectionItem: (key) => defaultClientsCollectionItem(key as never),
  });
}

const FOOTER_SCHEMA = createSchema({
  slug: LANDING_PAGE_SLUGS.footer,
  blockTypes: FOOTER_BLOCK_TYPES,
  blockTypeLabels: FOOTER_BLOCK_TYPE_LABELS,
  isBlockType: isFooterBlockType,
  parseBlockProps: parseFooterBlockProps,
  parseBlock: parseFooterBlock,
  defaultBlockProps: () => defaultFooterBlockProps(),
  defaultCollectionItem: (key) => defaultFooterCollectionItem(key as never),
});

const STATIC_SCHEMAS: Record<string, LandingPageSchema> = {
  [LANDING_PAGE_SLUGS.home]: HOME_SCHEMA,
  [LANDING_PAGE_SLUGS.about]: ABOUT_SCHEMA,
  [LANDING_PAGE_SLUGS.vacancies]: VACANCIES_SCHEMA,
  [LANDING_PAGE_SLUGS.documents]: DOCUMENTS_SCHEMA,
  [LANDING_PAGE_SLUGS.media]: MEDIA_SCHEMA,
  [LANDING_PAGE_SLUGS.footer]: FOOTER_SCHEMA,
};

export function getLandingPageSchema(slug: string): LandingPageSchema {
  if (STATIC_SCHEMAS[slug]) {
    return STATIC_SCHEMAS[slug];
  }

  const clientSegment = parseClientSegmentFromSlug(slug);
  if (clientSegment) {
    return createClientsSchema(slug, clientSegment);
  }

  const documentSlug = parseDocumentSlugFromPageSlug(slug);
  if (documentSlug) {
    return createDocumentViewSchema(slug, documentSlug);
  }

  const articleSlug = parseMediaArticleSlugFromPageSlug(slug);
  if (articleSlug) {
    return createMediaArticleSchema(slug, articleSlug);
  }

  if (!isKnownLandingPageSlug(slug)) {
    throw new Error(`Unknown landing page slug: "${slug}"`);
  }

  throw new Error(`No schema registered for landing page slug: "${slug}"`);
}

export function getAdminPageLabel(slug: string): string {
  if (slug === LANDING_PAGE_SLUGS.home) return "Главная";
  if (slug === LANDING_PAGE_SLUGS.about) return "О компании";
  if (slug === LANDING_PAGE_SLUGS.vacancies) return "Вакансии";
  if (slug === LANDING_PAGE_SLUGS.documents) return "Документы";
  if (slug === LANDING_PAGE_SLUGS.media) return "Медиа";
  if (slug === LANDING_PAGE_SLUGS.footer) return "Футер";

  const clientSegment = parseClientSegmentFromSlug(slug);
  if (clientSegment) {
    return `Клиенты: ${clientSegment}`;
  }

  const documentSlug = parseDocumentSlugFromPageSlug(slug);
  if (documentSlug) {
    return `Документ: ${documentSlug}`;
  }

  const articleSlug = parseMediaArticleSlugFromPageSlug(slug);
  if (articleSlug) {
    return `Статья: ${articleSlug}`;
  }

  return slug;
}

export function getAdminPagePath(slug: string): string {
  if (slug === LANDING_PAGE_SLUGS.home) return "/admin/home";
  if (slug === LANDING_PAGE_SLUGS.footer) return "/admin/footer";

  const clientSegment = parseClientSegmentFromSlug(slug);
  if (clientSegment) {
    return `/admin/clients/${clientSegment}`;
  }

  const documentSlug = parseDocumentSlugFromPageSlug(slug);
  if (documentSlug) {
    return `/admin/documents/${documentSlug}`;
  }

  const articleSlug = parseMediaArticleSlugFromPageSlug(slug);
  if (articleSlug) {
    return `/admin/media/${articleSlug}`;
  }

  return `/admin/${slug}`;
}

export function getPublicPagePath(slug: string): string {
  if (slug === LANDING_PAGE_SLUGS.home) return "/";
  if (slug === LANDING_PAGE_SLUGS.footer) return "/";

  const clientSegment = parseClientSegmentFromSlug(slug);
  if (clientSegment) {
    return `/clients/${clientSegment}`;
  }

  const documentSlug = parseDocumentSlugFromPageSlug(slug);
  if (documentSlug) {
    return `/documents/${documentSlug}`;
  }

  const articleSlug = parseMediaArticleSlugFromPageSlug(slug);
  if (articleSlug) {
    return `/media/${articleSlug}`;
  }

  return `/${slug}`;
}
