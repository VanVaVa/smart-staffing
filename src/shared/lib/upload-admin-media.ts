export async function uploadAdminMedia(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/admin/media", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  const data = (await response.json()) as { url?: string };
  if (!data.url) {
    throw new Error("Upload failed");
  }

  return data.url;
}
