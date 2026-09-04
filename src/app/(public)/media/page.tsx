import type { Metadata } from "next";

import {
  DEFAULT_MEDIA_TAGS,
  isMediaArticleTag,
  type MediaArticleTag,
} from "@/entities/landing";
import {
  getMediaLandingPageContent,
  listMediaArticles,
} from "@/entities/landing/server";
import { MediaPage } from "@/views/media";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getRequestedPage(value: string | string[] | undefined) {
  const page = Array.isArray(value) ? value[0] : value;
  return Number(page ?? 1);
}

function getActiveTag(
  value: string | string[] | undefined,
  tags: typeof DEFAULT_MEDIA_TAGS,
): MediaArticleTag | null {
  const tag = Array.isArray(value) ? value[0] : value;
  if (!tag || !isMediaArticleTag(tag, tags)) {
    return null;
  }
  return tag;
}

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getMediaLandingPageContent();

  return (
    meta ?? {
      title: "Медиа — СмартСтаффинг",
      description:
        "Новости, важные события и публикации платформы СмартСтаффинг.",
    }
  );
}

export default async function Page({ searchParams }: PageProps) {
  const { page, tag } = await searchParams;
  const [{ blocks }, articles] = await Promise.all([
    getMediaLandingPageContent(),
    listMediaArticles(),
  ]);
  const listingBlock = blocks.find((item) => item.type === "mediaListing");
  const tags = listingBlock?.props.tags ?? DEFAULT_MEDIA_TAGS;

  return (
    <MediaPage
      blocks={blocks}
      articles={articles}
      currentPage={getRequestedPage(page)}
      activeTag={getActiveTag(tag, tags)}
    />
  );
}
