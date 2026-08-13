import "server-only";

import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const RESUME_DIR = path.join(/* turbopackIgnore: true */ process.cwd(), ".uploads", "resumes");
const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([".pdf", ".doc", ".docx"]);

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

function getExtension(filename: string): string {
  const index = filename.lastIndexOf(".");
  if (index === -1) {
    return "";
  }
  return filename.slice(index).toLowerCase();
}

export type SavedFormResume = {
  storagePath: string;
  originalName: string;
};

export function validateResumeFile(file: File): string | null {
  if (file.size > MAX_BYTES) {
    return "Файл слишком большой (максимум 10 МБ)";
  }

  const extension = getExtension(file.name || "");
  if (!ALLOWED_EXTENSIONS.has(extension)) {
    return "Допустимы только файлы PDF, DOC и DOCX";
  }

  return null;
}

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
