import {
  getMediaLandingPageContent,
  listMediaArticles,
} from "@/entities/landing/server";
import { AdminMediaEditorPage } from "@/views/admin-media-editor";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [{ blocks }, articles] = await Promise.all([
    getMediaLandingPageContent(),
    listMediaArticles(),
  ]);

  return <AdminMediaEditorPage initialBlocks={blocks} articles={articles} />;
}
