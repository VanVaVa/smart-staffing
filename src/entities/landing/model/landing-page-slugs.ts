import { clientSegmentSlugs, type ClientSegmentSlug } from "./clients-content";
import { documentSlugs } from "./documents-content";

export const LANDING_PAGE_SLUGS = {
  home: "home",
  about: "about",
  vacancies: "vacancies",
  documents: "documents",
  media: "media",
} as const;

export type StaticLandingPageSlug =
  (typeof LANDING_PAGE_SLUGS)[keyof typeof LANDING_PAGE_SLUGS];

export function clientsPageSlug(segment: ClientSegmentSlug): string {
  return `clients-${segment}`;
}

export function documentPageSlug(documentSlug: string): string {
  return `documents-${documentSlug}`;
}

export function mediaArticlePageSlug(articleSlug: string): string {
  return `media-${articleSlug}`;
}

export function isClientSegmentPageSlug(
  slug: string,
): slug is `clients-${ClientSegmentSlug}` {
  return clientSegmentSlugs.some((segment) => slug === clientsPageSlug(segment));
}

export function parseClientSegmentFromSlug(slug: string): ClientSegmentSlug | null {
  for (const segment of clientSegmentSlugs) {
    if (slug === clientsPageSlug(segment)) {
      return segment;
    }
  }
  return null;
}

export function isDocumentPageSlug(slug: string): slug is `documents-${string}` {
  if (slug === LANDING_PAGE_SLUGS.documents) {
    return false;
  }
  if (!slug.startsWith("documents-")) {
    return false;
  }
  const documentSlug = slug.slice("documents-".length);
  return documentSlugs.includes(documentSlug as (typeof documentSlugs)[number]);
}

export function parseDocumentSlugFromPageSlug(slug: string): string | null {
  if (!slug.startsWith("documents-") || slug === LANDING_PAGE_SLUGS.documents) {
    return null;
  }
  const documentSlug = slug.slice("documents-".length);
  return documentSlugs.includes(documentSlug as (typeof documentSlugs)[number])
    ? documentSlug
    : null;
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
  ...clientSegmentSlugs.map(clientsPageSlug),
  ...documentSlugs.map(documentPageSlug),
];

export function isStaticLandingPageSlug(slug: string): boolean {
  return STATIC_LANDING_PAGE_SLUGS.includes(slug);
}

export function isKnownLandingPageSlug(slug: string): boolean {
  return isStaticLandingPageSlug(slug) || isMediaArticlePageSlug(slug);
}

export const ALL_LANDING_PAGE_SLUGS = STATIC_LANDING_PAGE_SLUGS;
