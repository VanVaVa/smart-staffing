import type { Metadata } from "next";

import { NotFoundPage } from "@/views/not-found";

import PublicLayout from "./(public)/layout";

export const metadata: Metadata = {
  title: "Страница не найдена — СмартСтаффинг",
  description: "Запрашиваемая страница не существует или была удалена.",
};

export default function GlobalNotFound() {
  return (
    <PublicLayout>
      <NotFoundPage />
    </PublicLayout>
  );
}
