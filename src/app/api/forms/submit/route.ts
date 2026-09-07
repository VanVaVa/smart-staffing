import { NextResponse } from "next/server";

import { createFormSubmission } from "@/entities/form-submission/server";
import { parseFormSubmissionInput } from "@/entities/form-submission/lib/parse-form-submission-input";
import { sendFormNotificationEmail } from "@/shared/lib/email/send-form-notification-email";

const NOTIFICATION_FORM_TYPES = new Set(["contact", "partnership", "vacancy", "book"]);

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Некорректные данные формы" }, { status: 400 });
  }

  const parsed = parseFormSubmissionInput(formData);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const submission = await createFormSubmission(parsed.input);

    if (NOTIFICATION_FORM_TYPES.has(submission.type)) {
      void sendFormNotificationEmail(submission).catch((error) => {
        console.error("Failed to send form notification email:", error);
      });
    }

    return NextResponse.json({ id: submission.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Не удалось сохранить заявку";
    const status = message.includes("слишком большой") || message.includes("Допустимы только")
      ? 413
      : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
