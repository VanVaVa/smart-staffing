import { getDocumentsLandingPageContent } from "@/entities/landing/server";
import { AdminDocumentsEditorPage } from "@/views/admin-documents-editor";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { blocks } = await getDocumentsLandingPageContent();
  return <AdminDocumentsEditorPage initialBlocks={blocks} />;
}
