import type { Metadata } from "next";

import { getVacanciesPageContent } from "@/entities/landing/server";
import { VacanciesPage } from "@/views/vacancies";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getVacanciesPageContent();

  if (meta) {
    return meta;
  }

  return {
    title: "Вакансии — СмартСтаффинг",
    description:
      "Выберите направление, отправьте резюме и получите приглашение в команду СмартСтаффинг.",
  };
}

export default async function Page() {
  const { blocks } = await getVacanciesPageContent();
  return <VacanciesPage blocks={blocks} />;
}
