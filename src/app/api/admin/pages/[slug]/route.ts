import { NextResponse } from "next/server";

import {
  getLandingPageContent,
  validateAndSaveLandingPageBlocks,
} from "@/entities/landing/server";
import { isKnownLandingPageSlug } from "@/entities/landing/model/landing-page-slugs";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

type SaveBlockPayload = {
  id?: string;
  type: string;
  order: number;
  props: unknown;
};

type SaveBody = {
  blocks?: SaveBlockPayload[];
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;

  if (!isKnownLandingPageSlug(slug)) {
    return NextResponse.json({ error: "Unknown page slug" }, { status: 404 });
  }

  try {
    const content = await getLandingPageContent(slug);
    return NextResponse.json(content);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load page content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const { slug } = await context.params;

  if (!isKnownLandingPageSlug(slug)) {
    return NextResponse.json({ error: "Unknown page slug" }, { status: 404 });
  }

  let body: SaveBody;
  try {
    body = (await request.json()) as SaveBody;
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (!body.blocks || !Array.isArray(body.blocks)) {
    return NextResponse.json({ error: "blocks array required" }, { status: 400 });
  }

  try {
    const content = await validateAndSaveLandingPageBlocks(slug, body.blocks);
    return NextResponse.json(content);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save page content";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
