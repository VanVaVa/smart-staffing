import "server-only";

import { getPrismaClient } from "@/shared/lib/prisma";

import {
  articleToMediaArticle,
  createDefaultMediaArticleProps,
  parseMediaArticleBlock,
} from "../model/media-article-blocks";
import type { MediaArticle, MediaArticleRelated } from "../model/media-content";
import {
  mediaArticlePageSlug,
  parseMediaArticleSlugFromPageSlug,
} from "../model/landing-page-slugs";

function compareArticlesByDate(a: MediaArticle, b: MediaArticle): number {
  return b.publishedAt.localeCompare(a.publishedAt);
}

function parseArticleFromPage(page: {
  slug: string;
  blocks: Array<{ type: string; order: number; id: string; props: unknown }>;
}): MediaArticle | null {
  const articleSlug = parseMediaArticleSlugFromPageSlug(page.slug);
  if (!articleSlug) {
    return null;
  }

  const block = page.blocks.find((item) => item.type === "mediaArticle");
  if (!block) {
    return null;
  }

  const parsed = parseMediaArticleBlock({
    id: block.id,
    order: block.order,
    type: block.type,
    props: block.props,
  });

  if (!parsed) {
    return null;
  }

  return articleToMediaArticle(parsed.props);
}

export async function listMediaArticles(): Promise<MediaArticle[]> {
  const prisma = getPrismaClient();
  const pages = await prisma.landingPage.findMany({
    where: {
      slug: {
        startsWith: "media-",
      },
    },
    include: {
      blocks: { orderBy: { order: "asc" } },
    },
  });

  const articles = pages
    .map(parseArticleFromPage)
    .filter((article): article is MediaArticle => article !== null);

  return articles.sort(compareArticlesByDate);
}

export async function listMediaArticlePageSlugs(): Promise<string[]> {
  const articles = await listMediaArticles();
  return articles.map((article) => mediaArticlePageSlug(article.slug));
}

export async function mediaArticleExists(articleSlug: string): Promise<boolean> {
  const prisma = getPrismaClient();
  const page = await prisma.landingPage.findUnique({
    where: { slug: mediaArticlePageSlug(articleSlug) },
    select: { id: true },
  });
  return page !== null;
}

export async function createMediaArticle(): Promise<{
  slug: string;
  adminPath: string;
  publicPath: string;
}> {
  const prisma = getPrismaClient();
  const slug = `draft-${crypto.randomUUID()}`;
  const pageSlug = mediaArticlePageSlug(slug);
  const props = createDefaultMediaArticleProps(slug);

  await prisma.landingPage.create({
    data: {
      slug: pageSlug,
      title: props.title,
      meta: props.meta,
      blocks: {
        create: {
          type: "mediaArticle",
          order: 0,
          props: props as object,
        },
      },
    },
  });

  return {
    slug,
    adminPath: `/admin/media/${slug}`,
    publicPath: `/media/${slug}`,
  };
}

export async function deleteMediaArticle(articleSlug: string): Promise<void> {
  const prisma = getPrismaClient();
  const pageSlug = mediaArticlePageSlug(articleSlug);

  const page = await prisma.landingPage.findUnique({
    where: { slug: pageSlug },
    select: { id: true },
  });

  if (!page) {
    throw new Error(`Media article "${articleSlug}" not found`);
  }

  await prisma.landingPage.delete({
    where: { id: page.id },
  });
}

export function buildRelatedArticles(
  currentSlug: string,
  articles: MediaArticle[],
  limit = 8,
): MediaArticleRelated[] {
  return articles
    .filter((article) => article.slug !== currentSlug)
    .sort(compareArticlesByDate)
    .slice(0, limit)
    .map((article) => ({
      id: article.id,
      slug: article.slug,
      href: article.href,
      publishedAt: article.publishedAt,
      publishedLabel: article.publishedLabel,
      title: article.title,
    }));
}
