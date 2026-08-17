import "server-only";

import { getPrismaClient } from "@/shared/lib/prisma";

import type { LandingPageMeta } from "../model/landing-block-base";
import {
  isKnownLandingPageSlug,
  LANDING_PAGE_SLUGS,
} from "../model/landing-page-slugs";
import {
  getLandingPageSchema,
  type LandingPageSchema,
} from "./landing-page-registry";

export type ParsedLandingPageContent = {
  pageId: string;
  slug: string;
  title: string;
  meta: LandingPageMeta | null;
  blocks: unknown[];
};

function parsePageMeta(meta: unknown): LandingPageMeta | null {
  if (
    meta &&
    typeof meta === "object" &&
    meta !== null &&
    "title" in meta &&
    "description" in meta &&
    typeof (meta as { title: unknown }).title === "string" &&
    typeof (meta as { description: unknown }).description === "string"
  ) {
    return {
      title: (meta as { title: string }).title,
      description: (meta as { description: string }).description,
    };
  }
  return null;
}

export async function getLandingPageContent(
  slug: string,
): Promise<ParsedLandingPageContent> {
  if (!isKnownLandingPageSlug(slug)) {
    throw new Error(`Unknown landing page slug: "${slug}"`);
  }

  const schema = getLandingPageSchema(slug);
  const prisma = getPrismaClient();
  const page = await prisma.landingPage.findUnique({
    where: { slug },
    include: {
      blocks: { orderBy: { order: "asc" } },
    },
  });

  if (!page) {
    throw new Error(
      `Landing page "${slug}" not found. Run db:migrate and db:seed.`,
    );
  }

  const blocks = page.blocks
    .map((block) =>
      schema.parseBlock({
        id: block.id,
        order: block.order,
        type: block.type,
        props: block.props,
      }),
    )
    .filter((block): block is NonNullable<typeof block> => block !== null);

  if (blocks.length !== page.blocks.length) {
    throw new Error(`Invalid block data on landing page "${slug}"`);
  }

  return {
    pageId: page.id,
    slug: page.slug,
    title: page.title,
    meta: parsePageMeta(page.meta),
    blocks,
  };
}

export async function saveLandingPageBlocks(
  pageId: string,
  blocks: Array<{ id?: string; type: string; order: number; props: unknown }>,
): Promise<void> {
  const prisma = getPrismaClient();
  await prisma.$transaction(async (tx) => {
    const existing = await tx.block.findMany({
      where: { landingPageId: pageId },
      select: { id: true },
    });
    const existingIds = new Set(existing.map((block) => block.id));
    const incomingIds = new Set(
      blocks.map((block) => block.id).filter((id): id is string => Boolean(id)),
    );

    const toDelete = [...existingIds].filter((id) => !incomingIds.has(id));
    if (toDelete.length > 0) {
      await tx.block.deleteMany({ where: { id: { in: toDelete } } });
    }

    for (const block of blocks) {
      if (block.id && existingIds.has(block.id)) {
        await tx.block.update({
          where: { id: block.id },
          data: {
            type: block.type,
            order: block.order,
            props: block.props as object,
          },
        });
      } else {
        await tx.block.create({
          data: {
            landingPageId: pageId,
            type: block.type,
            order: block.order,
            props: block.props as object,
          },
        });
      }
    }
  });
}

export async function validateAndSaveLandingPageBlocks(
  slug: string,
  blocks: Array<{ id?: string; type: string; order: number; props: unknown }>,
): Promise<ParsedLandingPageContent> {
  const schema = getLandingPageSchema(slug);
  const sorted = [...blocks].sort((a, b) => a.order - b.order);

  for (let index = 0; index < sorted.length; index += 1) {
    const block = sorted[index];
    if (block.order !== index) {
      throw new Error("Invalid block order");
    }
    if (!schema.isBlockType(block.type)) {
      throw new Error(`Unknown block type: ${block.type}`);
    }
    const props = schema.parseBlockProps(block.type, block.props);
    if (!props) {
      throw new Error(`Invalid props for block type: ${block.type}`);
    }
    block.props = props;
  }

  const { pageId } = await getLandingPageContent(slug);
  await saveLandingPageBlocks(pageId, sorted);
  return getLandingPageContent(slug);
}

export function resolveLandingPageSchema(slug: string): LandingPageSchema {
  return getLandingPageSchema(slug);
}

export { LANDING_PAGE_SLUGS };
