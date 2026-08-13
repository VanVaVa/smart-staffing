import "server-only";

import { getPrismaClient } from "@/shared/lib/prisma";

import {
  FORM_SUBMISSIONS_PAGE_SIZE,
  type FormSubmissionRecord,
  type FormSubmissionType,
} from "../model/types";

export type FormSubmissionsListResult = {
  items: FormSubmissionRecord[];
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
};

export async function listFormSubmissions(
  type: FormSubmissionType,
  page: number,
): Promise<FormSubmissionsListResult> {
  const pageSize = FORM_SUBMISSIONS_PAGE_SIZE;
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const skip = (safePage - 1) * pageSize;

  const prisma = getPrismaClient();
  const [items, total] = await Promise.all([
    prisma.formSubmission.findMany({
      where: { type },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.formSubmission.count({ where: { type } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return {
    items,
    total,
    totalPages,
    page: safePage,
    pageSize,
  };
}
