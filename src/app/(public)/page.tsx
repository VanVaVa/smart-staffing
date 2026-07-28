import type { Metadata } from "next";

import { HomePage } from "@/views/home";

export const metadata: Metadata = {
  title: "СмартСтаффинг — управление подрядчиками и проектами",
  description:
    "Платформа для подбора специалистов, планирования загрузки и контроля проектов в одном контуре.",
};

export default function Page() {
  return <HomePage />;
}
