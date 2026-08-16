import type { Metadata } from "next";

import { CompanyConnectionPage } from "@/views/company-connection";

export const metadata: Metadata = {
  title: "Подключение компании — СмартСтаффинг",
  description:
    "Возможности платформы СмартСтаффинг без ограничений: партнёрские сети, работа с запросами и специалистами, аналитика по ресурсам и проектам.",
};

export default function Page() {
  return <CompanyConnectionPage />;
}
