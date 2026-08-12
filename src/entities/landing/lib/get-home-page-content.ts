import "server-only";

import { getPrismaClient } from "@/shared/lib/prisma";

import {
  parseHomeBlock,
  type HomePageContent,
} from "../model/home-blocks";

const HOME_SLUG = "home";

export async function getHomePageContent(): Promise<HomePageContent> {
  const prisma = getPrismaClient();
  const page = await prisma.landingPage.findUnique({
    where: { slug: HOME_SLUG },
    include: {
      blocks: { orderBy: { order: "asc" } },
    },
  });

  if (!page) {
    throw new Error(
      `Landing page "${HOME_SLUG}" not found. Run db:migrate and db:seed.`,
    );
  }

  const blocks = page.blocks
    .map((block) =>
      parseHomeBlock({
        id: block.id,
        order: block.order,
        type: block.type,
        props: block.props,
      }),
    )
    .filter((block): block is NonNullable<typeof block> => block !== null);

  if (blocks.length !== page.blocks.length) {
    throw new Error("Invalid block data on home page");
  }

  const meta =
    page.meta &&
    typeof page.meta === "object" &&
    page.meta !== null &&
    "title" in page.meta &&
    "description" in page.meta &&
    typeof (page.meta as { title: unknown }).title === "string" &&
    typeof (page.meta as { description: unknown }).description === "string"
      ? {
          title: (page.meta as { title: string }).title,
          description: (page.meta as { description: string }).description,
        }
      : null;

  return {
    pageId: page.id,
    slug: page.slug,
    title: page.title,
    meta,
    blocks,
  };
}

export async function saveHomePageBlocks(
  pageId: string,
  blocks: Array<{ id?: string; type: string; order: number; props: unknown }>,
): Promise<void> {
  const prisma = getPrismaClient();
  await prisma.$transaction(async (tx) => {
    const existing = await tx.block.findMany({
      where: { landingPageId: pageId },
      select: { id: true },
    });
    const existingIds = new Set(existing.map((b) => b.id));
    const incomingIds = new Set(
      blocks.map((b) => b.id).filter((id): id is string => Boolean(id)),
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
