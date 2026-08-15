import type { Metadata } from "next";

import { getAboutPageContent } from "@/entities/landing/server";
import { AboutPage } from "@/views/about";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getAboutPageContent();

  if (meta) {
    return meta;
  }

  return {
    title: "О компании — СмартСтаффинг",
    description:
      "Более 15 лет развиваем «умный» подбор ИТ-специалистов и платформу СмартСтаффинг.",
  };
}

export default async function Page() {
  const { blocks } = await getAboutPageContent();
  return <AboutPage blocks={blocks} />;
}
