import type { FormSubmissionType as PrismaFormSubmissionType } from "@/generated/prisma/client";

export type FormSubmissionType = PrismaFormSubmissionType;

export const FORM_SUBMISSION_TYPES = [
  "contact",
  "partnership",
  "vacancy",
  "book",
] as const satisfies readonly FormSubmissionType[];

export type FormSubmissionRecord = {
  id: string;
  type: FormSubmissionType;
  channel: string | null;
  contactValue: string;
  fullName: string | null;
  consent: boolean;
  sourcePath: string;
  sourceLabel: string | null;
  vacancyId: string | null;
  resumeStoragePath: string | null;
  resumeOriginalName: string | null;
  createdAt: Date;
};

export type CreateFormSubmissionInput = {
  type: FormSubmissionType;
  channel?: string | null;
  contactValue: string;
  fullName?: string | null;
  consent: boolean;
  sourcePath: string;
  sourceLabel?: string | null;
  vacancyId?: string | null;
  resume?: File | null;
};

export const FORM_SUBMISSION_TYPE_LABELS: Record<FormSubmissionType, string> = {
  contact: "Контакты",
  partnership: "Партнёрство",
  vacancy: "Вакансии",
  book: "Книга",
};

export const FORM_SUBMISSION_ADMIN_PATHS: Record<FormSubmissionType, string> = {
  contact: "/admin/submissions/contact",
  partnership: "/admin/submissions/partnership",
  vacancy: "/admin/submissions/vacancy",
  book: "/admin/submissions/book",
};

export const FORM_SUBMISSIONS_PAGE_SIZE = 20;

export function isFormSubmissionType(value: string): value is FormSubmissionType {
  return (FORM_SUBMISSION_TYPES as readonly string[]).includes(value);
}
