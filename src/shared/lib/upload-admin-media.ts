const FALLBACK_ERROR = "Не удалось загрузить файл";

export async function uploadAdminMedia(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/admin/media", {
    method: "POST",
    body: formData,
  });

  const data = (await response.json().catch(() => ({}))) as {
    url?: string;
    error?: string;
  };

  if (!response.ok || !data.url) {
    throw new Error(data.error ?? FALLBACK_ERROR);
  }

  return data.url;
}
