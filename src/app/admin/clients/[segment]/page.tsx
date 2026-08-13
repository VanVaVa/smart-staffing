import { notFound } from "next/navigation";

import { isClientSegmentSlug } from "@/entities/landing";
import { getClientsPageContent, getFooterContent } from "@/entities/landing/server";
import { AdminClientsEditorPage } from "@/views/admin-clients-editor";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ segment: string }>;
};

export default async function Page({ params }: PageProps) {
  const { segment } = await params;

  if (!isClientSegmentSlug(segment)) {
    notFound();
  }

  const [{ blocks }, footerContent] = await Promise.all([
    getClientsPageContent(segment),
    getFooterContent(),
  ]);

  return (
    <AdminClientsEditorPage
      segment={segment}
      initialBlocks={blocks}
      footerContent={footerContent}
    />
  );
}
