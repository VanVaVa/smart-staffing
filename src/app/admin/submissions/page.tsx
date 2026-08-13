import { countFormSubmissionsByType } from "@/entities/form-submission/server";
import { AdminSubmissionsIndexPage } from "@/views/admin-submissions";

export const dynamic = "force-dynamic";

export default async function AdminSubmissionsPage() {
  const counts = await countFormSubmissionsByType();
  return <AdminSubmissionsIndexPage counts={counts} />;
}
