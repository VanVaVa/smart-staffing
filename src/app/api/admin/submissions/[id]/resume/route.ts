import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { getFormSubmission } from "@/entities/form-submission/server";
import { getResumeAbsolutePath } from "@/shared/lib/save-form-resume";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const submission = await getFormSubmission(id);

  if (!submission?.resumeStoragePath) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  const absolutePath = getResumeAbsolutePath(submission.resumeStoragePath);

  let buffer: Buffer;
  try {
    buffer = await readFile(absolutePath);
  } catch {
    return NextResponse.json({ error: "Resume file missing" }, { status: 404 });
  }

  const filename = submission.resumeOriginalName ?? path.basename(absolutePath);
  const encodedFilename = encodeURIComponent(filename);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodedFilename}`,
    },
  });
}
