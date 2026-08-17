import {
  isAboutBlockType,
  parseAboutBlock,
  parseAboutBlockProps,
} from "../model/about-blocks";
import {
  isClientsBlockType,
  parseClientsBlock,
  parseClientsBlockProps,
} from "../model/clients-blocks";
import {
  isDocumentViewBlockType,
  parseDocumentViewBlock,
  parseDocumentViewBlockProps,
} from "../model/document-view-blocks";
import {
  isDocumentsBlockType,
  parseDocumentsBlock,
  parseDocumentsBlockProps,
} from "../model/documents-blocks";
import {
  isFooterBlockType,
  parseFooterBlock,
  parseFooterBlockProps,
} from "../model/footer-blocks";
import {
  isHomeBlockType,
  parseHomeBlock,
  parseHomeBlockProps,
} from "../model/home-blocks";
import {
  isMediaArticleBlockType,
  parseMediaArticleBlock,
  parseMediaArticleBlockProps,
} from "../model/media-article-blocks";
import {
  isMediaBlockType,
  parseMediaBlock,
  parseMediaBlockProps,
} from "../model/media-blocks";
import {
  isKnownLandingPageSlug,
  LANDING_PAGE_SLUGS,
  parseClientSegmentFromSlug,
  parseDocumentSlugFromPageSlug,
  parseMediaArticleSlugFromPageSlug,
} from "../model/landing-page-slugs";
import {
  isVacanciesBlockType,
  parseVacanciesBlock,
  parseVacanciesBlockProps,
} from "../model/vacancies-blocks";

export type LandingPageSchema = {
  slug: string;
  isBlockType: (value: string) => boolean;
  parseBlockProps: (type: string, props: unknown) => unknown | null;
  parseBlock: (input: {
    id: string;
    order: number;
    type: string;
    props: unknown;
  }) => unknown | null;
};

function createSchema<TType extends string>(config: {
  slug: string;
  isBlockType: (value: string) => value is TType;
  parseBlockProps: (type: TType, props: unknown) => unknown | null;
  parseBlock: (input: {
    id: string;
    order: number;
    type: string;
    props: unknown;
  }) => unknown | null;
}): LandingPageSchema {
  return {
    slug: config.slug,
    isBlockType: (value) => config.isBlockType(value),
    parseBlockProps: (type, props) =>
      config.isBlockType(type) ? config.parseBlockProps(type, props) : null,
    parseBlock: config.parseBlock,
  };
}

const HOME_SCHEMA = createSchema({
  slug: LANDING_PAGE_SLUGS.home,
  isBlockType: isHomeBlockType,
  parseBlockProps: parseHomeBlockProps,
  parseBlock: parseHomeBlock,
});

const ABOUT_SCHEMA = createSchema({
  slug: LANDING_PAGE_SLUGS.about,
  isBlockType: isAboutBlockType,
  parseBlockProps: parseAboutBlockProps,
  parseBlock: parseAboutBlock,
});

const VACANCIES_SCHEMA = createSchema({
  slug: LANDING_PAGE_SLUGS.vacancies,
  isBlockType: isVacanciesBlockType,
  parseBlockProps: parseVacanciesBlockProps,
  parseBlock: parseVacanciesBlock,
});

const DOCUMENTS_SCHEMA = createSchema({
  slug: LANDING_PAGE_SLUGS.documents,
  isBlockType: isDocumentsBlockType,
  parseBlockProps: parseDocumentsBlockProps,
  parseBlock: parseDocumentsBlock,
});

const MEDIA_SCHEMA = createSchema({
  slug: LANDING_PAGE_SLUGS.media,
  isBlockType: isMediaBlockType,
  parseBlockProps: parseMediaBlockProps,
  parseBlock: parseMediaBlock,
});

const FOOTER_SCHEMA = createSchema({
  slug: LANDING_PAGE_SLUGS.footer,
  isBlockType: isFooterBlockType,
  parseBlockProps: parseFooterBlockProps,
  parseBlock: parseFooterBlock,
});

function createDocumentViewSchema(slug: string): LandingPageSchema {
  return createSchema({
    slug,
    isBlockType: isDocumentViewBlockType,
    parseBlockProps: parseDocumentViewBlockProps,
    parseBlock: parseDocumentViewBlock,
  });
}

function createMediaArticleSchema(slug: string): LandingPageSchema {
  return createSchema({
    slug,
    isBlockType: isMediaArticleBlockType,
    parseBlockProps: parseMediaArticleBlockProps,
    parseBlock: parseMediaArticleBlock,
  });
}

function createClientsSchema(slug: string): LandingPageSchema {
  return createSchema({
    slug,
    isBlockType: isClientsBlockType,
    parseBlockProps: parseClientsBlockProps,
    parseBlock: parseClientsBlock,
  });
}

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

  if (parseClientSegmentFromSlug(slug)) {
    return createClientsSchema(slug);
  }

  if (parseDocumentSlugFromPageSlug(slug)) {
    return createDocumentViewSchema(slug);
  }

  if (parseMediaArticleSlugFromPageSlug(slug)) {
    return createMediaArticleSchema(slug);
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
