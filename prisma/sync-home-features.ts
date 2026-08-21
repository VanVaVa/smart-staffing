import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "../src/generated/prisma/client";
import { LANDING_PAGE_SLUGS } from "../src/entities/landing/model/landing-page-slugs";

import { buildHomeFeaturesBlockProps } from "./lib/build-home-features-block-props";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const page = await prisma.landingPage.findUnique({
    where: { slug: LANDING_PAGE_SLUGS.home },
    include: {
      blocks: {
        where: { type: "features" },
        take: 1,
      },
    },
  });

  if (!page) {
    throw new Error(
      `Landing page "${LANDING_PAGE_SLUGS.home}" not found. Run db:migrate and db:seed.`,
    );
  }

  const featuresBlock = page.blocks[0];
  if (!featuresBlock) {
    throw new Error(
      `Features block not found on landing page "${LANDING_PAGE_SLUGS.home}". Run db:seed.`,
    );
  }

  await prisma.block.update({
    where: { id: featuresBlock.id },
    data: {
      props: buildHomeFeaturesBlockProps() as object,
    },
  });
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
