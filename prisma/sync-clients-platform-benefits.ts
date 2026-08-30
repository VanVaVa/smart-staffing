import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "../src/generated/prisma/client";
import { clientsBlocksFromStaticContent } from "../src/entities/landing/model/clients-blocks";
import { clientSegmentSlugs } from "../src/entities/landing/model/clients-content";
import { clientsPageSlug } from "../src/entities/landing/model/landing-page-slugs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function syncClientsPlatformBenefits() {
  for (const segment of clientSegmentSlugs) {
    const page = await prisma.landingPage.findUnique({
      where: { slug: clientsPageSlug(segment) },
      include: {
        blocks: {
          where: { type: "platformBenefits" },
          take: 1,
        },
      },
    });

    if (!page?.blocks[0]) {
      throw new Error(
        `Platform benefits block not found on "${clientsPageSlug(segment)}". Run db:seed.`,
      );
    }

    const platformBenefitsBlock = clientsBlocksFromStaticContent(segment).find(
      (block) => block.type === "platformBenefits",
    );

    if (!platformBenefitsBlock) {
      throw new Error(`Platform benefits content missing for "${segment}".`);
    }

    await prisma.block.update({
      where: { id: page.blocks[0].id },
      data: {
        props: platformBenefitsBlock.props as object,
      },
    });
  }
}

async function main() {
  await syncClientsPlatformBenefits();
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
