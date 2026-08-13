import "server-only";

import type { AboutPageContent } from "../model/about-blocks";
import type { ClientsPageContent } from "../model/clients-blocks";
import type { DocumentViewPageContent } from "../model/document-view-blocks";
import type { DocumentsLandingPageContent } from "../model/documents-blocks";
import type { HomePageContent } from "../model/home-blocks";
import type { MediaArticlePageContent } from "../model/media-article-blocks";
import type { MediaLandingPageContent } from "../model/media-blocks";
import {
  clientsPageSlug,
  documentPageSlug,
  LANDING_PAGE_SLUGS,
  mediaArticlePageSlug,
} from "../model/landing-page-slugs";
import type { ClientSegmentSlug } from "../model/clients-content";
import type { VacanciesPageContent } from "../model/vacancies-blocks";
import {
  getFooterContent,
  getFooterPageBlocks,
} from "../lib/get-footer-content";
import {
  getLandingPageContent,
  saveLandingPageBlocks,
  validateAndSaveLandingPageBlocks,
} from "../lib/get-landing-page-content";
import { getHomePageContent } from "../lib/get-home-page-content";
import {
  buildRelatedArticles,
  createMediaArticle,
  deleteMediaArticle,
  listMediaArticlePageSlugs,
  listMediaArticles,
  mediaArticleExists,
} from "../lib/get-media-articles";

export {
  getLandingPageContent,
  saveLandingPageBlocks,
  validateAndSaveLandingPageBlocks,
  getHomePageContent,
  getFooterContent,
  getFooterPageBlocks,
  buildRelatedArticles,
  createMediaArticle,
  deleteMediaArticle,
  listMediaArticlePageSlugs,
  listMediaArticles,
  mediaArticleExists,
};

export async function getAboutPageContent(): Promise<AboutPageContent> {
  return (await getLandingPageContent(LANDING_PAGE_SLUGS.about)) as AboutPageContent;
}

export async function getVacanciesPageContent(): Promise<VacanciesPageContent> {
  return (await getLandingPageContent(
    LANDING_PAGE_SLUGS.vacancies,
  )) as VacanciesPageContent;
}

export async function getDocumentsLandingPageContent(): Promise<DocumentsLandingPageContent> {
  return (await getLandingPageContent(
    LANDING_PAGE_SLUGS.documents,
  )) as DocumentsLandingPageContent;
}

export async function getDocumentViewPageContent(
  documentSlug: string,
): Promise<DocumentViewPageContent> {
  return (await getLandingPageContent(
    documentPageSlug(documentSlug),
  )) as DocumentViewPageContent;
}

export async function getMediaLandingPageContent(): Promise<MediaLandingPageContent> {
  return (await getLandingPageContent(LANDING_PAGE_SLUGS.media)) as MediaLandingPageContent;
}

export async function getMediaArticlePageContent(
  articleSlug: string,
): Promise<MediaArticlePageContent> {
  return (await getLandingPageContent(
    mediaArticlePageSlug(articleSlug),
  )) as MediaArticlePageContent;
}

export async function getClientsPageContent(
  segment: ClientSegmentSlug,
): Promise<ClientsPageContent> {
  return (await getLandingPageContent(
    clientsPageSlug(segment),
  )) as ClientsPageContent;
}
