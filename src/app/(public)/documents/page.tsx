import type { Metadata } from "next";

import { getDocumentsLandingPageContent } from "@/entities/landing/server";
import { DocumentsPage } from "@/views/documents";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getDocumentsLandingPageContent();

  if (meta) {
    return meta;
  }

  return {
    title: "Документы — СмартСтаффинг",
    description:
      "Юридические документы, сведения о платформе и свидетельства СмартСтаффинг.",
  };
}

export default async function Page() {
  const { blocks } = await getDocumentsLandingPageContent();
  return <DocumentsPage blocks={blocks} />;
}
