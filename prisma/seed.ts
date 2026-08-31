import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

import bcrypt from "bcryptjs";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "../src/generated/prisma/client";
import { parseMediaArticleSlugFromPageSlug } from "../src/entities/landing/model/landing-page-slugs";
import { TEAMFORCE_MEDIA_ARTICLES } from "../src/entities/landing/model/media-articles-seed";

import { buildSeedPages, type SeedPage } from "./lib/build-seed-pages";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedLandingPage(page: SeedPage) {
  const record = await prisma.landingPage.upsert({
    where: { slug: page.slug },
    create: {
      slug: page.slug,
      title: page.title,
      meta: page.meta,
    },
    update: {
      title: page.title,
      meta: page.meta,
    },
  });

  await prisma.block.deleteMany({ where: { landingPageId: record.id } });

  for (const block of page.blocks) {
    await prisma.block.create({
      data: {
        landingPageId: record.id,
        type: block.type,
        order: block.order,
        props: block.props as object,
      },
    });
  }
}

async function cleanupOrphanedMediaPages(validArticleSlugs: Set<string>) {
  const pages = await prisma.landingPage.findMany({
    where: { slug: { startsWith: "media-" } },
    select: { id: true, slug: true },
  });

  for (const page of pages) {
    const articleSlug = parseMediaArticleSlugFromPageSlug(page.slug);
    if (articleSlug && !validArticleSlugs.has(articleSlug)) {
      await prisma.landingPage.delete({ where: { id: page.id } });
    }
  }
}

async function main() {
  async function ensureAdminUser() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (adminEmail && adminPassword) {
      const passwordHash = await bcrypt.hash(adminPassword, 12);
      await prisma.adminUser.upsert({
        where: { email: adminEmail },
        create: { email: adminEmail, passwordHash },
        update: { passwordHash },
      });
    }
  }

  for (const page of buildSeedPages()) {
    await seedLandingPage(page);
  }

  await cleanupOrphanedMediaPages(
    new Set(TEAMFORCE_MEDIA_ARTICLES.map((article) => article.slug)),
  );

  await ensureAdminUser();
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
