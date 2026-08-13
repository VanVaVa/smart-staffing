import type { Metadata } from "next";

import { getFooterContent, getFooterPageBlocks } from "@/entities/landing/server";
import { AdminFooterEditorPage } from "@/views/admin-footer-editor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Редактор футера — админ-панель",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const [blocks, footerContent] = await Promise.all([
    getFooterPageBlocks(),
    getFooterContent(),
  ]);

  return <AdminFooterEditorPage initialBlocks={blocks} footerContent={footerContent} />;
}
