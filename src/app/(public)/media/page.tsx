import type { Metadata } from "next";

import { getMediaPage } from "@/entities/landing";
import { MediaPage } from "@/views/media";

export const metadata: Metadata = {
  title: "Медиа — СмартСтаффинг",
  description:
    "Новости, важные события и публикации платформы СмартСтаффинг.",
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getRequestedPage(value: string | string[] | undefined) {
  const page = Array.isArray(value) ? value[0] : value;
  return Number(page ?? 1);
}

export default async function Page({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const content = getMediaPage(getRequestedPage(page));

  return <MediaPage content={content} />;
}
