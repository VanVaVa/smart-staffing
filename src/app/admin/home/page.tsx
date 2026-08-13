import type { Metadata } from "next";

import { getFooterContent, getHomePageContent } from "@/entities/landing/server";
import { AdminHomeEditorPage } from "@/views/admin-home-editor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Редактор главной — админ-панель",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const [{ blocks }, footerContent] = await Promise.all([
    getHomePageContent(),
    getFooterContent(),
  ]);
  return <AdminHomeEditorPage initialBlocks={blocks} footerContent={footerContent} />;
}
