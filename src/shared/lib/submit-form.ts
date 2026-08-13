import type { FormSubmissionType } from "@/entities/form-submission";

export type SubmitFormPayload = {
  type: FormSubmissionType;
  channel?: string;
  contactValue: string;
  fullName?: string;
  consent: boolean;
  sourcePath: string;
  sourceLabel?: string;
  vacancyId?: string;
  resume?: File | null;
};

export type SubmitFormResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export async function submitForm(payload: SubmitFormPayload): Promise<SubmitFormResult> {
  const formData = new FormData();
  formData.set("type", payload.type);
  formData.set("contactValue", payload.contactValue);
  formData.set("consent", payload.consent ? "true" : "false");
  formData.set("sourcePath", payload.sourcePath);

  if (payload.channel) {
    formData.set("channel", payload.channel);
  }
  if (payload.fullName) {
    formData.set("fullName", payload.fullName);
  }
  if (payload.sourceLabel) {
    formData.set("sourceLabel", payload.sourceLabel);
  }
  if (payload.vacancyId) {
    formData.set("vacancyId", payload.vacancyId);
  }
  if (payload.resume) {
    formData.set("resume", payload.resume);
  }

  let response: Response;
  try {
    response = await fetch("/api/forms/submit", {
      method: "POST",
      body: formData,
    });
  } catch {
    return { ok: false, error: "Не удалось отправить заявку. Проверьте подключение к сети." };
  }

  let body: { id?: string; error?: string };
  try {
    body = (await response.json()) as { id?: string; error?: string };
  } catch {
    return { ok: false, error: "Не удалось отправить заявку. Попробуйте позже." };
  }

  if (!response.ok) {
    return { ok: false, error: body.error ?? "Не удалось отправить заявку." };
  }

  if (!body.id) {
    return { ok: false, error: "Не удалось отправить заявку." };
  }

  return { ok: true, id: body.id };
}
