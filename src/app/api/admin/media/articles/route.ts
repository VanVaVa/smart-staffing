import { NextResponse } from "next/server";

import { createMediaArticle } from "@/entities/landing/server";

export async function POST() {
  try {
    const article = await createMediaArticle();
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create media article";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
