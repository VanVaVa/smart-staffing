import { getDocumentsLandingPageContent, getFooterContent } from "@/entities/landing/server";
import { AdminDocumentsEditorPage } from "@/views/admin-documents-editor";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [{ blocks }, footerContent] = await Promise.all([
    getDocumentsLandingPageContent(),
    getFooterContent(),
  ]);
  return <AdminDocumentsEditorPage initialBlocks={blocks} footerContent={footerContent} />;
}
