import { notFound } from "next/navigation";

import { documentSlugs } from "@/entities/landing";
import { getDocumentViewPageContent } from "@/entities/landing/server";
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

  const { blocks } = await getDocumentViewPageContent(slug);
  return (
    <AdminDocumentViewEditorPage documentSlug={slug} initialBlocks={blocks} />
  );
}
