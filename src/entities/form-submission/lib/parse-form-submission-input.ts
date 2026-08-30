import type { CreateFormSubmissionInput, FormSubmissionType } from "@/entities/form-submission";
import { isFormSubmissionType } from "@/entities/form-submission";
import {
  type ContactChannel,
  validateContactValue,
  validateFullName,
  validateTelegram,
} from "@/entities/form-submission/lib/contact-field-validation";

const CHANNELS = new Set(["telegram", "phone", "email"]);

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function requiresChannel(type: FormSubmissionType): boolean {
  return type === "contact" || type === "partnership" || type === "vacancy";
}

export function parseFormSubmissionInput(
  formData: FormData,
): { ok: true; input: CreateFormSubmissionInput } | { ok: false; error: string } {
  const typeRaw = readString(formData, "type");
  if (!isFormSubmissionType(typeRaw)) {
    return { ok: false, error: "Некорректный тип заявки" };
  }

  const type = typeRaw;
  const contactValue = readString(formData, "contactValue");
  if (!contactValue) {
    return { ok: false, error: "Укажите контактные данные" };
  }

  const consentRaw = readString(formData, "consent");
  if (consentRaw !== "true") {
    return { ok: false, error: "Необходимо согласие на обработку данных" };
  }

  const sourcePath = readString(formData, "sourcePath");
  if (!sourcePath) {
    return { ok: false, error: "Не указан источник заявки" };
  }

  const channel = readString(formData, "channel") || null;
  if (requiresChannel(type)) {
    if (!channel || !CHANNELS.has(channel)) {
      return { ok: false, error: "Укажите способ связи" };
    }
  }

  const fullName = readString(formData, "fullName") || null;
  if (type === "vacancy" && !fullName) {
    return { ok: false, error: "Укажите ФИО" };
  }

  if (type === "book") {
    const contactError = validateTelegram(contactValue);
    if (contactError) {
      return { ok: false, error: contactError };
    }
  } else if (requiresChannel(type) && channel) {
    const contactError = validateContactValue(channel as ContactChannel, contactValue);
    if (contactError) {
      return { ok: false, error: contactError };
    }
  }

  if (type === "vacancy" && fullName) {
    const fullNameError = validateFullName(fullName);
    if (fullNameError) {
      return { ok: false, error: fullNameError };
    }
  }

  const sourceLabel = readString(formData, "sourceLabel") || null;
  const vacancyId = readString(formData, "vacancyId") || null;

  const resumeField = formData.get("resume");
  const resume = resumeField instanceof File && resumeField.size > 0 ? resumeField : null;

  return {
    ok: true,
    input: {
      type,
      channel: type === "book" ? "telegram" : channel,
      contactValue,
      fullName,
      consent: true,
      sourcePath,
      sourceLabel,
      vacancyId,
      resume,
    },
  };
}
