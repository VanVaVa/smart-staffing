import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAdminSection } from "@/entities/landing";
import {
  isReorderableSection,
  listAdminSectionItems,
  readAdminSectionValues,
} from "@/entities/landing/server";
import { AdminSectionFormPage, AdminSectionListPage } from "@/views/admin-content";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ section: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section } = await params;
  return {
    title: `${getAdminSection(section)?.title ?? "Раздел"} — админ-панель`,
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: PageProps) {
  const { section: sectionKey } = await params;
  const section = getAdminSection(sectionKey);

  if (!section) {
    notFound();
  }

  if (section.mode === "singleton") {
    return (
      <AdminSectionFormPage
        section={section}
        itemId={null}
        isNew={false}
        title={section.title}
        values={await readAdminSectionValues(section)}
      />
    );
  }

  return (
    <AdminSectionListPage
      section={section}
      items={await listAdminSectionItems(section)}
      reorderable={isReorderableSection(section)}
    />
  );
}
