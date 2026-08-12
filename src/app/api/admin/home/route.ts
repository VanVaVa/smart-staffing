import { NextResponse } from "next/server";

import {
  isHomeBlockType,
  parseHomeBlockProps,
} from "@/entities/landing";
import {
  getHomePageContent,
  saveHomePageBlocks,
} from "@/entities/landing/server";

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
    const content = await getHomePageContent();
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

  const sorted = [...body.blocks].sort((a, b) => a.order - b.order);

  for (let index = 0; index < sorted.length; index += 1) {
    const block = sorted[index];
    if (block.order !== index) {
      return NextResponse.json({ error: "Invalid block order" }, { status: 400 });
    }
    if (!isHomeBlockType(block.type)) {
      return NextResponse.json({ error: `Unknown block type: ${block.type}` }, { status: 400 });
    }
    const props = parseHomeBlockProps(block.type, block.props);
    if (!props) {
      return NextResponse.json(
        { error: `Invalid props for block type: ${block.type}` },
        { status: 400 },
      );
    }
    block.props = props;
  }

  try {
    const { pageId } = await getHomePageContent();
    await saveHomePageBlocks(pageId, sorted);
    const content = await getHomePageContent();
    return NextResponse.json(content);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save home content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
