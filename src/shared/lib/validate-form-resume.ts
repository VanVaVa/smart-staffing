const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([".pdf", ".doc", ".docx"]);

function getExtension(filename: string): string {
  const index = filename.lastIndexOf(".");
  if (index === -1) {
    return "";
  }
  return filename.slice(index).toLowerCase();
}

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
