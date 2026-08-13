import "server-only";

import { getPrismaClient } from "@/shared/lib/prisma";

import {
  FORM_SUBMISSION_TYPES,
  type FormSubmissionType,
} from "../model/types";

export type FormSubmissionCounts = Record<FormSubmissionType, number>;

export async function countFormSubmissionsByType(): Promise<FormSubmissionCounts> {
  const prisma = getPrismaClient();
  const groups = await prisma.formSubmission.groupBy({
    by: ["type"],
    _count: { _all: true },
  });

  const counts = Object.fromEntries(
    FORM_SUBMISSION_TYPES.map((type) => [type, 0]),
  ) as FormSubmissionCounts;

  for (const group of groups) {
    counts[group.type] = group._count._all;
  }

  return counts;
}
