export type ContactChannel = "telegram" | "phone" | "email";

export const CONTACT_FIELD_ERRORS = {
  telegram: "Проверьте формат Telegram",
  phone: "Проверьте формат телефона",
  email: "Проверьте формат email",
  fullName: "Проверьте формат ФИО",
} as const;

const TELEGRAM_INPUT_MAX = 33;
const PHONE_INPUT_MAX = 20;
const EMAIL_INPUT_MAX = 254;
const FULL_NAME_MAX = 100;

const TELEGRAM_USERNAME_PATTERN = /^@?[a-zA-Z][a-zA-Z0-9_]{4,31}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sanitizeTelegramInput(value: string): string {
  return value.replace(/[^@a-zA-Z0-9_]/g, "").slice(0, TELEGRAM_INPUT_MAX);
}

export function validateTelegram(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return CONTACT_FIELD_ERRORS.telegram;
  }

  if (!TELEGRAM_USERNAME_PATTERN.test(trimmed)) {
    return CONTACT_FIELD_ERRORS.telegram;
  }

  return null;
}

export function sanitizePhoneInput(value: string): string {
  return value.replace(/[^\d+\s()-]/g, "").slice(0, PHONE_INPUT_MAX);
}

export function validatePhone(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return CONTACT_FIELD_ERRORS.phone;
  }

  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 10) {
    return CONTACT_FIELD_ERRORS.phone;
  }

  return null;
}

export function sanitizeEmailInput(value: string): string {
  return value.replace(/[^\w.@+-]/g, "").slice(0, EMAIL_INPUT_MAX);
}

export function validateEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return CONTACT_FIELD_ERRORS.email;
  }

  if (!EMAIL_PATTERN.test(trimmed)) {
    return CONTACT_FIELD_ERRORS.email;
  }

  return null;
}

export function sanitizeFullNameInput(value: string): string {
  return value
    .replace(/[^\p{L}\s-]/gu, "")
    .replace(/\s+/g, " ")
    .slice(0, FULL_NAME_MAX);
}

export function validateFullName(value: string): string | null {
  const trimmed = value.trim();
  if (trimmed.length < 2) {
    return CONTACT_FIELD_ERRORS.fullName;
  }

  if (!/\p{L}/u.test(trimmed)) {
    return CONTACT_FIELD_ERRORS.fullName;
  }

  return null;
}

export function sanitizeContactValue(channel: ContactChannel, value: string): string {
  switch (channel) {
    case "telegram":
      return sanitizeTelegramInput(value);
    case "phone":
      return sanitizePhoneInput(value);
    case "email":
      return sanitizeEmailInput(value);
  }
}

export function validateContactValue(channel: ContactChannel, value: string): string | null {
  switch (channel) {
    case "telegram":
      return validateTelegram(value);
    case "phone":
      return validatePhone(value);
    case "email":
      return validateEmail(value);
  }
}
