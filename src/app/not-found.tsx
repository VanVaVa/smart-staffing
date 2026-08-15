import type { Metadata } from "next";

import { getFooterContent } from "@/entities/landing/server";
import { NotFoundPage } from "@/views/not-found";
import { PublicPageShell } from "@/widgets/public-page-shell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Страница не найдена — СмартСтаффинг",
  description: "Запрашиваемая страница не существует или была удалена.",
};

export default async function GlobalNotFound() {
  const footerContent = await getFooterContent();

  return (
    <PublicPageShell footerContent={footerContent}>
      <NotFoundPage />
    </PublicPageShell>
  );
}
