import { notFound } from "next/navigation";

import {
  FORM_SUBMISSION_TYPE_LABELS,
  isFormSubmissionType,
} from "@/entities/form-submission";
import { listFormSubmissions } from "@/entities/form-submission/server";
import { AdminSubmissionsListPage } from "@/views/admin-submissions";

export const dynamic = "force-dynamic";

type AdminSubmissionsTypePageProps = {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: AdminSubmissionsTypePageProps) {
  const { type } = await params;
  if (!isFormSubmissionType(type)) {
    return { title: "Заявки" };
  }
  return { title: `${FORM_SUBMISSION_TYPE_LABELS[type]} — Заявки` };
}

export default async function AdminSubmissionsTypePage({
  params,
  searchParams,
}: AdminSubmissionsTypePageProps) {
  const { type } = await params;
  if (!isFormSubmissionType(type)) {
    notFound();
  }

  const { page: pageParam } = await searchParams;
  const page = pageParam ? Number.parseInt(pageParam, 10) : 1;
  const list = await listFormSubmissions(type, page);

  return <AdminSubmissionsListPage type={type} list={list} />;
}
