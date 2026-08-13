import { notFound } from "next/navigation";

import { documentSlugs } from "@/entities/landing";
import { getDocumentViewPageContent, getFooterContent } from "@/entities/landing/server";
import { AdminDocumentViewEditorPage } from "@/views/admin-document-view-editor";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  if (!documentSlugs.includes(slug as (typeof documentSlugs)[number])) {
    notFound();
  }

  const [{ blocks }, footerContent] = await Promise.all([
    getDocumentViewPageContent(slug),
    getFooterContent(),
  ]);

  return (
    <AdminDocumentViewEditorPage
      documentSlug={slug}
      initialBlocks={blocks}
      footerContent={footerContent}
    />
  );
}
