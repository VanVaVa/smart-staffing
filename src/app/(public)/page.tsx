import type { Metadata } from "next";

import { getHomePageContent } from "@/entities/landing/server";
import { HomePage } from "@/views/home";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getHomePageContent();
  return {
    title: meta?.title ?? "СмартСтаффинг",
    description: meta?.description,
  };
}

export default async function Page() {
  const { blocks } = await getHomePageContent();
  return <HomePage blocks={blocks} />;
}
