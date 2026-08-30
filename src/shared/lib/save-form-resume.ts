import "server-only";

import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { validateResumeFile } from "@/shared/lib/validate-form-resume";

const RESUME_DIR = path.join(/* turbopackIgnore: true */ process.cwd(), ".uploads", "resumes");

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

export type SavedFormResume = {
  storagePath: string;
  originalName: string;
};

export { validateResumeFile } from "@/shared/lib/validate-form-resume";

export async function saveFormResume(file: File): Promise<SavedFormResume> {
  const validationError = validateResumeFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const originalName = file.name || "resume.pdf";
  const safeName = sanitizeFilename(originalName);
  const filename = `${randomUUID()}-${safeName}`;
  const storagePath = path.join(RESUME_DIR, filename);

  await mkdir(RESUME_DIR, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(storagePath, buffer);

  return { storagePath, originalName };
}

export function getResumeAbsolutePath(storagePath: string): string {
  if (path.isAbsolute(storagePath)) {
    return storagePath;
  }
  return path.join(process.cwd(), storagePath);
}
