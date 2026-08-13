import "server-only";

import { saveFormResume } from "@/shared/lib/save-form-resume";
import { getPrismaClient } from "@/shared/lib/prisma";

import type { CreateFormSubmissionInput, FormSubmissionRecord } from "../model/types";

export async function createFormSubmission(
  input: CreateFormSubmissionInput,
): Promise<FormSubmissionRecord> {
  let resumeStoragePath: string | null = null;
  let resumeOriginalName: string | null = null;

  if (input.resume) {
    const saved = await saveFormResume(input.resume);
    resumeStoragePath = saved.storagePath;
    resumeOriginalName = saved.originalName;
  }

  const prisma = getPrismaClient();
  return prisma.formSubmission.create({
    data: {
      type: input.type,
      channel: input.channel ?? null,
      contactValue: input.contactValue,
      fullName: input.fullName ?? null,
      consent: input.consent,
      sourcePath: input.sourcePath,
      sourceLabel: input.sourceLabel ?? null,
      vacancyId: input.vacancyId ?? null,
      resumeStoragePath,
      resumeOriginalName,
    },
  });
}
