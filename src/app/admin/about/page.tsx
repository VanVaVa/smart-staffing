import { getAboutPageContent, getFooterContent } from "@/entities/landing/server";
import { AdminAboutEditorPage } from "@/views/admin-about-editor";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [{ blocks }, footerContent] = await Promise.all([
    getAboutPageContent(),
    getFooterContent(),
  ]);
  return <AdminAboutEditorPage initialBlocks={blocks} footerContent={footerContent} />;
}
