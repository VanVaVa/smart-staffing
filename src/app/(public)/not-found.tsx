import type { Metadata } from "next";

import { NotFoundPage } from "@/views/not-found";

export const metadata: Metadata = {
  title: "Страница не найдена — СмартСтаффинг",
  description: "Запрашиваемая страница не существует или была удалена.",
};

export default function NotFound() {
  return <NotFoundPage />;
}
