import type { Metadata } from "next";

import {
  getMediaLandingPageContent,
  listMediaArticles,
} from "@/entities/landing/server";
import { isMediaArticleTag } from "@/entities/landing";
import type { MediaArticleTag } from "@/entities/landing";
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
): MediaArticleTag | null {
  const tag = Array.isArray(value) ? value[0] : value;
  if (!tag || !isMediaArticleTag(tag)) {
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

  return (
    <MediaPage
      blocks={blocks}
      articles={articles}
      currentPage={getRequestedPage(page)}
      activeTag={getActiveTag(tag)}
    />
  );
}
