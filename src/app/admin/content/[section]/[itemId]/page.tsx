import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAdminSection } from "@/entities/landing";
import { getFooterContent, readAdminSectionItem } from "@/entities/landing/server";
import { emptyValues } from "@/shared/ui/admin-form";
import { AdminSectionFormPage } from "@/views/admin-content";
import { AdminClientsEditorPage } from "@/views/admin-clients-editor";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ section: string; itemId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section } = await params;
  return {
    title: `${getAdminSection(section)?.title ?? "Раздел"} — админ-панель`,
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: PageProps) {
  const { section: sectionKey, itemId } = await params;
  const section = getAdminSection(sectionKey);

  if (!section || section.mode !== "collection") {
    notFound();
  }

  if (sectionKey === "clients-pages") {
    if (itemId === "new") {
      notFound();
    }

    const footerContent = await getFooterContent();

    const values = await readAdminSectionItem(section, itemId);
    if (!values) {
      notFound();
    }

    return (
      <AdminClientsEditorPage
        itemId={itemId}
        initialValues={{ ...emptyValues(section.fields), ...values }}
        footerContent={footerContent}
      />
    );
  }

  if (itemId === "new") {
    return (
      <AdminSectionFormPage
        section={section}
        itemId={null}
        isNew
        title={section.addLabel}
        values={{ ...emptyValues(section.fields), ...section.createValues() }}
      />
    );
  }

  const values = await readAdminSectionItem(section, itemId);
  if (!values) {
    notFound();
  }

  return (
    <AdminSectionFormPage
      section={section}
      itemId={itemId}
      isNew={false}
      title={section.itemTitle(values, Number(itemId) || 0) || section.title}
      values={{ ...emptyValues(section.fields), ...values }}
    />
  );
}
