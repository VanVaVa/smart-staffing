import type { Metadata } from "next";

import { VacanciesPage } from "@/views/vacancies";

export const metadata: Metadata = {
  title: "Вакансии — СмартСтаффинг",
  description:
    "Открытые вакансии СмартСтаффинг: выберите направление, отправьте резюме и присоединяйтесь к команде.",
};

export default function Page() {
  return <VacanciesPage />;
}
