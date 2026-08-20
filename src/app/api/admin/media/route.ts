import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

const UPLOAD_DIR = path.join(process.cwd(), "public/landing/uploads");
const MAX_BYTES = 10 * 1024 * 1024;

const IMAGE_EXTENSIONS: Readonly<Record<string, string>> = {
  "image/gif": ".gif",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/svg+xml": ".svg",
  "image/webp": ".webp",
};

function hasImageSignature(buffer: Buffer, type: string): boolean {
  if (type === "image/jpeg") {
    return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  if (type === "image/png") {
    return (
      buffer.length >= 8 &&
      buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    );
  }

  if (type === "image/gif") {
    const signature = buffer.subarray(0, 6).toString("ascii");
    return signature === "GIF87a" || signature === "GIF89a";
  }

  if (type === "image/webp") {
    return (
      buffer.length >= 12 &&
      buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
      buffer.subarray(8, 12).toString("ascii") === "WEBP"
    );
  }

  if (type === "image/svg+xml") {
    const content = buffer.subarray(0, Math.min(buffer.length, 4096)).toString("utf8").trim();
    return content.startsWith("<svg") || content.startsWith("<?xml");
  }

  return false;
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file field required" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large" }, { status: 400 });
  }

  const extension = IMAGE_EXTENSIONS[file.type];
  if (!extension) {
    return NextResponse.json({ error: "Unsupported image type" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (!hasImageSignature(buffer, file.type)) {
    return NextResponse.json({ error: "Invalid image file" }, { status: 400 });
  }

  const filename = `${randomUUID()}${extension}`;

  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return NextResponse.json({ url: `/landing/uploads/${filename}` });
}
