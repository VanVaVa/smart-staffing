import { NextResponse } from "next/server";

import { deleteMediaArticle } from "@/entities/landing/server";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function DELETE(_request: Request, context: RouteContext) {
  const { slug } = await context.params;

  try {
    await deleteMediaArticle(slug);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete media article";
    return NextResponse.json({ error: message }, { status: 404 });
  }
}
