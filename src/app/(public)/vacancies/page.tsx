import { getVacanciesPageContent } from "@/entities/landing/server";
import { VacanciesPage } from "@/views/vacancies";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { blocks } = await getVacanciesPageContent();
  return <VacanciesPage blocks={blocks} />;
}
