import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

import bcrypt from "bcryptjs";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "../src/generated/prisma/client";

import { buildSeedPages, type SeedPage } from "./lib/build-seed-pages";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedLandingPage(page: SeedPage) {
  const existing = await prisma.landingPage.findUnique({
    where: { slug: page.slug },
    select: { id: true },
  });

  if (existing) {
    return;
  }

  await prisma.landingPage.create({
    data: {
      slug: page.slug,
      title: page.title,
      meta: page.meta,
      blocks: {
        create: page.blocks.map((block) => ({
          type: block.type,
          order: block.order,
          props: block.props as object,
        })),
      },
    },
  });
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
