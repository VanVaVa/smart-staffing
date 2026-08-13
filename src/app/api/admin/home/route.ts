import { NextResponse } from "next/server";

import {
  getLandingPageContent,
  validateAndSaveLandingPageBlocks,
} from "@/entities/landing/server";
import { LANDING_PAGE_SLUGS } from "@/entities/landing/model/landing-page-slugs";

type SaveBlockPayload = {
  id?: string;
  type: string;
  order: number;
  props: unknown;
};

type SaveBody = {
  blocks?: SaveBlockPayload[];
};

export async function GET() {
  try {
    const content = await getLandingPageContent(LANDING_PAGE_SLUGS.home);
    return NextResponse.json(content);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load home content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
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
    const content = await validateAndSaveLandingPageBlocks(
      LANDING_PAGE_SLUGS.home,
      body.blocks,
    );
    return NextResponse.json(content);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save home content";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
