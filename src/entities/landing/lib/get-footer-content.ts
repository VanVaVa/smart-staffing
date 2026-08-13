import "server-only";

import { getPrismaClient } from "@/shared/lib/prisma";

import {
  defaultFooterBlockProps,
  parseFooterBlock,
  type FooterBlockProps,
} from "../model/footer-blocks";
import { LANDING_PAGE_SLUGS } from "../model/landing-page-slugs";

export async function getFooterContent(): Promise<FooterBlockProps> {
  const prisma = getPrismaClient();
  const page = await prisma.landingPage.findUnique({
    where: { slug: LANDING_PAGE_SLUGS.footer },
    include: {
      blocks: { orderBy: { order: "asc" } },
    },
  });

  if (!page || page.blocks.length === 0) {
    return defaultFooterBlockProps();
  }

  const footerBlock = page.blocks.find((block) => block.type === "footer") ?? page.blocks[0];
  const parsed = parseFooterBlock({
    id: footerBlock.id,
    order: footerBlock.order,
    type: footerBlock.type,
    props: footerBlock.props,
  });

  return parsed?.props ?? defaultFooterBlockProps();
}

export async function getFooterPageBlocks() {
  const prisma = getPrismaClient();
  const page = await prisma.landingPage.findUnique({
    where: { slug: LANDING_PAGE_SLUGS.footer },
    include: {
      blocks: { orderBy: { order: "asc" } },
    },
  });

  if (!page) {
    throw new Error(
      `Landing page "${LANDING_PAGE_SLUGS.footer}" not found. Run db:migrate and db:seed.`,
    );
  }

  const blocks = page.blocks
    .map((block) =>
      parseFooterBlock({
        id: block.id,
        order: block.order,
        type: block.type,
        props: block.props,
      }),
    )
    .filter((block): block is NonNullable<typeof block> => block !== null);

  if (blocks.length !== page.blocks.length) {
    throw new Error(`Invalid block data on landing page "${LANDING_PAGE_SLUGS.footer}"`);
  }

  return blocks;
}
