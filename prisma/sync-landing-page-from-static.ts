import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "../src/generated/prisma/client";

import { buildSeedPages, type SeedBlock } from "./lib/build-seed-pages";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function resolveStaticBlocks(
  slug: string,
  blockType?: string,
): { page: ReturnType<typeof buildSeedPages>[number]; blocks: SeedBlock[] } {
  const page = buildSeedPages().find((candidate) => candidate.slug === slug);

  if (!page) {
    throw new Error(
      `Unknown landing page slug "${slug}". Check prisma/lib/build-seed-pages.ts.`,
    );
  }

  const blocks = blockType
    ? page.blocks.filter((block) => block.type === blockType)
    : page.blocks;

  if (blocks.length === 0) {
    throw new Error(
      blockType
        ? `Block type "${blockType}" not found on page "${slug}".`
        : `No blocks defined for page "${slug}".`,
    );
  }

  return { page, blocks };
}

async function syncLandingPage(slug: string, blockType?: string) {
  const { page, blocks } = resolveStaticBlocks(slug, blockType);

  const dbPage = await prisma.landingPage.findUnique({
    where: { slug },
    include: {
      blocks: { orderBy: { order: "asc" } },
    },
  });

  if (!dbPage) {
    throw new Error(
      `Landing page "${slug}" not found in database. Run db:migrate and db:seed.`,
    );
  }

  if (!blockType) {
    await prisma.landingPage.update({
      where: { id: dbPage.id },
      data: {
        title: page.title,
        meta: page.meta,
      },
    });
  }

  for (const staticBlock of blocks) {
    const dbBlock = dbPage.blocks.find((block) => block.order === staticBlock.order);

    if (!dbBlock) {
      throw new Error(
        `Block order ${staticBlock.order} (${staticBlock.type}) not found on page "${slug}". Run db:seed.`,
      );
    }

    await prisma.block.update({
      where: { id: dbBlock.id },
      data: {
        props: staticBlock.props as object,
      },
    });
  }
}

async function main() {
  const [slug, blockType] = process.argv.slice(2);

  if (!slug) {
    for (const page of buildSeedPages()) {
      await syncLandingPage(page.slug);
    }
    return;
  }

  await syncLandingPage(slug, blockType);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
