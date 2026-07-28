import type { Metadata } from "next";

import { AboutPage } from "@/views/about";

export const metadata: Metadata = {
  title: "О компании — СмартСтаффинг",
  description:
    "СмартСтаффинг — эксперт гибкой проектной занятости. История компании, миссия и подход к подбору ИТ-специалистов.",
};

export default function Page() {
  return <AboutPage />;
}
