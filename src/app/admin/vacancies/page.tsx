import { getVacanciesPageContent } from "@/entities/landing/server";
import { AdminVacanciesEditorPage } from "@/views/admin-vacancies-editor";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { blocks } = await getVacanciesPageContent();
  return <AdminVacanciesEditorPage initialBlocks={blocks} />;
}
