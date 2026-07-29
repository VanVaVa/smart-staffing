import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  documentSlugs,
  getDocument,
} from "@/entities/landing";
import { DocumentViewPage } from "@/views/document-view";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return documentSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = getDocument(slug);

  if (!document) {
    return {};
  }

  return {
    title: `${document.title} — СмартСтаффинг`,
    description: `Документ «${document.title}» платформы СмартСтаффинг.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const document = getDocument(slug);

  if (!document) {
    notFound();
  }

  return <DocumentViewPage document={document} />;
}
