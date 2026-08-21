import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

const UPLOAD_DIR = path.join(process.cwd(), "public/landing/uploads");

const CONTENT_TYPES: Readonly<Record<string, string>> = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

type RouteContext = {
  params: Promise<{ filename: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { filename } = await context.params;
  const extension = path.extname(filename).toLowerCase();
  const contentType = CONTENT_TYPES[extension];

  if (path.basename(filename) !== filename || !contentType) {
    return new NextResponse(null, { status: 404 });
  }

  try {
    const buffer = await readFile(path.join(UPLOAD_DIR, filename));

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentType,
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
