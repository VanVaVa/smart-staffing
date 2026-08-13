import type { Metadata } from "next";

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
  const { page } = await searchParams;
  const [{ blocks }, articles] = await Promise.all([
    getMediaLandingPageContent(),
    listMediaArticles(),
  ]);

  return (
    <MediaPage
      blocks={blocks}
      articles={articles}
      currentPage={getRequestedPage(page)}
    />
  );
}
