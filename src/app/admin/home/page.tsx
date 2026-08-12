import type { Metadata } from "next";

import { getHomePageContent } from "@/entities/landing/server";
import { AdminHomeEditorPage } from "@/views/admin-home-editor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Редактор главной — админ-панель",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const { blocks } = await getHomePageContent();
  return <AdminHomeEditorPage initialBlocks={blocks} />;
}
