import { getFooterContent, getVacanciesPageContent } from "@/entities/landing/server";
import { AdminVacanciesEditorPage } from "@/views/admin-vacancies-editor";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [{ blocks }, footerContent] = await Promise.all([
    getVacanciesPageContent(),
    getFooterContent(),
  ]);
  return <AdminVacanciesEditorPage initialBlocks={blocks} footerContent={footerContent} />;
}
