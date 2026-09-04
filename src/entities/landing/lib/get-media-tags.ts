import "server-only";

import { getPrismaClient } from "@/shared/lib/prisma";

import { LANDING_PAGE_SLUGS } from "../model/landing-page-slugs";
import { parseMediaBlockProps } from "../model/media-blocks";
import type { MediaTagDefinition } from "../model/media-content";
import { listMediaArticles } from "./get-media-articles";

async function readMediaListingTags(): Promise<MediaTagDefinition[]> {
  const prisma = getPrismaClient();
  const page = await prisma.landingPage.findUnique({
    where: { slug: LANDING_PAGE_SLUGS.media },
    include: { blocks: { orderBy: { order: "asc" } } },
  });

  const block = page?.blocks.find((item) => item.type === "mediaListing");
  if (!block) {
    const props = parseMediaBlockProps("mediaListing", { title: "Медиа" });
    return props?.tags ?? [];
  }

  const props = parseMediaBlockProps("mediaListing", block.props);
  return props?.tags ?? [];
}

export async function listMediaTags(): Promise<MediaTagDefinition[]> {
  return readMediaListingTags();
}

export async function getMediaTagBySlug(
  slug: string,
): Promise<MediaTagDefinition | null> {
  const tags = await readMediaListingTags();
  return tags.find((tag) => tag.slug === slug) ?? null;
}

export async function countArticlesWithTag(slug: string): Promise<number> {
  const articles = await listMediaArticles();
  return articles.filter((article) => article.tag === slug).length;
}
