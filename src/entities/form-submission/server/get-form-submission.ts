import "server-only";

import { getPrismaClient } from "@/shared/lib/prisma";

import type { FormSubmissionRecord } from "../model/types";

export async function getFormSubmission(id: string): Promise<FormSubmissionRecord | null> {
  const prisma = getPrismaClient();
  return prisma.formSubmission.findUnique({ where: { id } });
}
