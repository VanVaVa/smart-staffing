import { getAboutPageContent } from "@/entities/landing/server";
import { AdminAboutEditorPage } from "@/views/admin-about-editor";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { blocks } = await getAboutPageContent();
  return <AdminAboutEditorPage initialBlocks={blocks} />;
}
