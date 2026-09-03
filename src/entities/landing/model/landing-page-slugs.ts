export const LANDING_PAGE_SLUGS = {
  home: "home",
  about: "about",
  vacancies: "vacancies",
  documents: "documents",
  media: "media",
  footer: "footer",
  settings: "settings",
} as const;

export type StaticLandingPageSlug =
  (typeof LANDING_PAGE_SLUGS)[keyof typeof LANDING_PAGE_SLUGS];

export function clientsPageSlug(segment: string): string {
  return `clients-${segment}`;
}

export function documentPageSlug(documentSlug: string): string {
  return `documents-${documentSlug}`;
}

export function mediaArticlePageSlug(articleSlug: string): string {
  return `media-${articleSlug}`;
}

export function isClientSegmentPageSlug(slug: string): slug is `clients-${string}` {
  return slug.startsWith("clients-") && slug.length > "clients-".length;
}

export function parseClientSegmentFromSlug(slug: string): string | null {
  if (!isClientSegmentPageSlug(slug)) {
    return null;
  }
  return slug.slice("clients-".length);
}

export function isDocumentPageSlug(slug: string): slug is `documents-${string}` {
  return slug.startsWith("documents-") && slug !== LANDING_PAGE_SLUGS.documents;
}

export function parseDocumentSlugFromPageSlug(slug: string): string | null {
  return isDocumentPageSlug(slug) ? slug.slice("documents-".length) : null;
}

export function isMediaArticlePageSlug(slug: string): slug is `media-${string}` {
  return slug.startsWith("media-") && slug !== LANDING_PAGE_SLUGS.media;
}

export function parseMediaArticleSlugFromPageSlug(slug: string): string | null {
  if (!isMediaArticlePageSlug(slug)) {
    return null;
  }
  return slug.slice("media-".length);
}

export const STATIC_LANDING_PAGE_SLUGS: readonly string[] = [
  LANDING_PAGE_SLUGS.home,
  LANDING_PAGE_SLUGS.about,
  LANDING_PAGE_SLUGS.vacancies,
  LANDING_PAGE_SLUGS.documents,
  LANDING_PAGE_SLUGS.media,
];

export function isStaticLandingPageSlug(slug: string): boolean {
  return STATIC_LANDING_PAGE_SLUGS.includes(slug);
}

export function isKnownLandingPageSlug(slug: string): boolean {
  return (
    slug === LANDING_PAGE_SLUGS.footer ||
    slug === LANDING_PAGE_SLUGS.settings ||
    isStaticLandingPageSlug(slug) ||
    isClientSegmentPageSlug(slug) ||
    isDocumentPageSlug(slug) ||
    isMediaArticlePageSlug(slug)
  );
}

export const ALL_LANDING_PAGE_SLUGS = STATIC_LANDING_PAGE_SLUGS;
