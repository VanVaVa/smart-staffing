import type { Metadata } from "next";

import { countFormSubmissionsByType } from "@/entities/form-submission/server";
import { ADMIN_SECTIONS } from "@/entities/landing";
import { countAdminSectionItems } from "@/entities/landing/server";
import { AdminDashboardPage } from "@/views/admin-dashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Админ-панель",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const [submissionCounts, counts] = await Promise.all([
    countFormSubmissionsByType(),
    Promise.all(
      ADMIN_SECTIONS.map(async (section) => [
        section.key,
        section.mode === "collection" ? await countAdminSectionItems(section) : null,
      ] as const),
    ),
  ]);

  return (
    <AdminDashboardPage
      submissionCounts={submissionCounts}
      sectionCounts={Object.fromEntries(counts)}
    />
  );
}
