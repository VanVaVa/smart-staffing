import "server-only";

import { readFile } from "node:fs/promises";

import type nodemailer from "nodemailer";

import { getEmailSettings } from "@/entities/landing/lib/get-email-settings";
import {
  formatSubmissionChannel,
  formatSubmissionDate,
  formatSubmissionSource,
} from "@/entities/form-submission/lib/format-submission";
import {
  FORM_SUBMISSION_TYPE_LABELS,
  type FormSubmissionRecord,
  type FormSubmissionType,
} from "@/entities/form-submission/model/types";
import { getResumeAbsolutePath } from "@/shared/lib/save-form-resume";

import { createSmtpTransporter, getSmtpFromAddress, isSmtpConfigured } from "./smtp-client";

const DEFAULT_VACANCY_NOTIFICATION_EMAILS = [
  "group_resource-management@teamforce.ru",
  "o.konyukova@teamforce.ru",
];

function getVacancyRecipientsFromEnv(): string[] {
  const configured = process.env.VACANCY_NOTIFICATION_TO?.trim();
  if (!configured) {
    return DEFAULT_VACANCY_NOTIFICATION_EMAILS;
  }

  return configured
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

async function resolveRecipients(
  type: FormSubmissionType,
): Promise<string[]> {
  const settings = await getEmailSettings();

  if (type === "contact" || type === "partnership" || type === "book") {
    const email = settings.partnerNotificationEmail.trim();
    return email ? [email] : [];
  }

  if (type === "vacancy") {
    const configured = settings.vacancyNotificationEmails
      .map((email) => email.trim())
      .filter(Boolean);
    return configured.length > 0 ? configured : getVacancyRecipientsFromEnv();
  }

  return [];
}

function buildSubject(submission: FormSubmissionRecord): string {
  const typeLabel = FORM_SUBMISSION_TYPE_LABELS[submission.type];

  if (submission.type === "vacancy") {
    const vacancyTitle = submission.sourceLabel ?? "Вакансия";
    return `Заявка на вакансию: ${vacancyTitle}`;
  }

  if (submission.sourceLabel) {
    return `Новая заявка (${typeLabel}): ${submission.sourceLabel}`;
  }

  return `Новая заявка: ${typeLabel}`;
}

function buildEmailBody(submission: FormSubmissionRecord): string {
  const typeLabel = FORM_SUBMISSION_TYPE_LABELS[submission.type];
  const lines = [
    `Новая заявка: ${typeLabel}`,
    "",
    `ФИО: ${submission.fullName ?? "—"}`,
    `Канал связи: ${formatSubmissionChannel(submission.channel)}`,
    `Контакт: ${submission.contactValue}`,
    `Источник: ${formatSubmissionSource(submission.sourcePath, submission.sourceLabel)}`,
  ];

  if (submission.type === "vacancy") {
    lines.push(`Вакансия: ${submission.sourceLabel ?? submission.vacancyId ?? "—"}`);
  }

  lines.push(`Дата: ${formatSubmissionDate(submission.createdAt)}`);

  return lines.join("\n");
}

async function buildAttachments(
  submission: FormSubmissionRecord,
): Promise<nodemailer.SendMailOptions["attachments"]> {
  if (!submission.resumeStoragePath || !submission.resumeOriginalName) {
    return [];
  }

  const absolutePath = getResumeAbsolutePath(submission.resumeStoragePath);
  const content = await readFile(absolutePath);

  return [
    {
      filename: submission.resumeOriginalName,
      content,
    },
  ];
}

export async function sendFormNotificationEmail(
  submission: FormSubmissionRecord,
): Promise<void> {
  if (!isSmtpConfigured()) {
    console.warn("SMTP is not configured; form notification email skipped");
    return;
  }

  const recipients = await resolveRecipients(submission.type);
  if (recipients.length === 0) {
    console.warn(`No recipients configured for form type "${submission.type}"`);
    return;
  }

  const settings = await getEmailSettings();
  const from = getSmtpFromAddress(settings.senderEmail);
  const transporter = createSmtpTransporter(settings.senderEmail);
  const attachments = await buildAttachments(submission);

  await transporter.sendMail({
    from,
    to: recipients,
    subject: buildSubject(submission),
    text: buildEmailBody(submission),
    attachments,
  });
}
