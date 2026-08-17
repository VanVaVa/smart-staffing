import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDocumentViewPageContent } from "@/entities/landing/server";
import { DocumentViewPage } from "@/views/document-view";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { meta, blocks } = await getDocumentViewPageContent(slug);
    if (meta) {
      return meta;
    }

    const block = blocks[0];
    if (block?.type === "documentView") {
      return {
        title: `${block.props.title} — СмартСтаффинг`,
        description: `Документ «${block.props.title}» платформы СмартСтаффинг.`,
      };
    }
  } catch {
    return {};
  }

  return {};
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  try {
    const { blocks } = await getDocumentViewPageContent(slug);
    return <DocumentViewPage blocks={blocks} />;
  } catch {
    notFound();
  }
}
