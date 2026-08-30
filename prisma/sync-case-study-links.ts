import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "../src/generated/prisma/client";
import { clientsBlocksFromStaticContent } from "../src/entities/landing/model/clients-blocks";
import { clientSegmentSlugs } from "../src/entities/landing/model/clients-content";
import { caseStudies } from "../src/entities/landing/model/content";
import {
  clientsPageSlug,
  LANDING_PAGE_SLUGS,
} from "../src/entities/landing/model/landing-page-slugs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function syncHomeCaseStudies() {
  const page = await prisma.landingPage.findUnique({
    where: { slug: LANDING_PAGE_SLUGS.home },
    include: {
      blocks: {
        where: { type: "caseStudies" },
        take: 1,
      },
    },
  });

  if (!page?.blocks[0]) {
    throw new Error(
      `Case studies block not found on "${LANDING_PAGE_SLUGS.home}". Run db:seed.`,
    );
  }

  await prisma.block.update({
    where: { id: page.blocks[0].id },
    data: {
      props: {
        title: caseStudies.title,
        items: caseStudies.items.map((item) => ({ ...item })),
      },
    },
  });
}

async function syncClientsPartnersExperience() {
  for (const segment of clientSegmentSlugs) {
    const page = await prisma.landingPage.findUnique({
      where: { slug: clientsPageSlug(segment) },
      include: {
        blocks: {
          where: { type: "partnersExperience" },
          take: 1,
        },
      },
    });

    if (!page?.blocks[0]) {
      throw new Error(
        `Partners experience block not found on "${clientsPageSlug(segment)}". Run db:seed.`,
      );
    }

    const partnersExperienceBlock = clientsBlocksFromStaticContent(segment).find(
      (block) => block.type === "partnersExperience",
    );

    if (!partnersExperienceBlock) {
      throw new Error(`Partners experience content missing for "${segment}".`);
    }

    await prisma.block.update({
      where: { id: page.blocks[0].id },
      data: {
        props: partnersExperienceBlock.props as object,
      },
    });
  }
}

async function main() {
  await syncHomeCaseStudies();
  await syncClientsPartnersExperience();
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
