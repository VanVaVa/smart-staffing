import "server-only";

import nodemailer from "nodemailer";

const DEFAULT_SMTP_HOST = "mx.mailtf.ru";
const DEFAULT_SMTP_PORT = 465;
const DEFAULT_SMTP_SECURE = true;
const DEFAULT_SMTP_FROM = "noreply@smartstaffing.ru";

function readEnvString(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

function readEnvBoolean(name: string, fallback: boolean): boolean {
  const value = readEnvString(name);
  if (value === undefined) {
    return fallback;
  }
  return value === "true" || value === "1";
}

function readEnvPort(name: string, fallback: number): number {
  const value = readEnvString(name);
  if (!value) {
    return fallback;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function isSmtpConfigured(): boolean {
  return Boolean(readEnvString("SMTP_PASS"));
}

export function getSmtpFromAddress(fallbackFrom?: string): string {
  return readEnvString("SMTP_FROM") ?? fallbackFrom ?? DEFAULT_SMTP_FROM;
}

export function createSmtpTransporter(fromAddress?: string) {
  const user = readEnvString("SMTP_USER") ?? getSmtpFromAddress(fromAddress);

  return nodemailer.createTransport({
    host: readEnvString("SMTP_HOST") ?? DEFAULT_SMTP_HOST,
    port: readEnvPort("SMTP_PORT", DEFAULT_SMTP_PORT),
    secure: readEnvBoolean("SMTP_SECURE", DEFAULT_SMTP_SECURE),
    auth: {
      user,
      pass: process.env.SMTP_PASS,
    },
  });
}
