import "dotenv/config";

import bcrypt from "bcryptjs";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "../src/generated/prisma/client";
import {
  caseStudies,
  contactSection,
  demoSection,
  featureRows,
  heroContent,
  partnerCta,
  productShowcase,
  stepsSection,
  testimonials,
} from "../src/entities/landing/model/content";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const HOME_SLUG = "home";

const seedBlocks = [
  {
    order: 0,
    type: "hero",
    props: {
      title: heroContent.title,
      subtitleLead: "50 000+ специалистов из 150+ компаний-партнёров",
      subtitleTail: "на единой СмартСтаффинг-платформе",
      primaryCta: heroContent.primaryCta,
      registryLabel: heroContent.registryLabel,
      registryHref: heroContent.registryHref,
      dashboardImageSrc: "/landing/hero-segment-enterprise.png",
      segments: heroContent.segments.map((s) => ({
        label: s.label,
        imageSrc: s.imageSrc,
      })),
    },
  },
  {
    order: 1,
    type: "productShowcase",
    props: {
      tag: productShowcase.tag,
      title: productShowcase.title,
      subtitle: productShowcase.subtitle,
      benefitsTitle: productShowcase.benefitsTitle,
      benefits: productShowcase.benefits.map((b) => ({
        id: b.id,
        layout: b.layout,
        title: b.title,
        text: b.text,
        ...(b.layout === "stat" && "statValue" in b
          ? { statValue: b.statValue }
          : {}),
      })),
      benefitMedia: {
        costIcons: [
          { imageSrc: "/landing/product-showcase-benefit-cost-icon-1.png" },
          { imageSrc: "/landing/product-showcase-benefit-cost-icon-2.png" },
          { imageSrc: "/landing/product-showcase-benefit-cost-icon-3.png" },
        ],
        contractors: "/landing/product-showcase-benefit-contractors.png",
        competencies: "/landing/product-showcase-benefit-competencies.png",
        stat: "/landing/product-showcase-benefit-stat-bg.png",
      },
      mockupDeviceSrc: "/landing/iPad Pro Space Gray.png",
      mockupScreenSrc: "/landing/Mockup.png",
    },
  },
  {
    order: 2,
    type: "features",
    props: {
      rows: featureRows.map((row) => ({
        title: row.title,
        description: row.description,
        tags: [...row.tags],
        imageSrc: row.imageSrc,
        imageAlt: row.imageAlt,
        imageWidth: row.imageWidth,
        imageHeight: row.imageHeight,
        ...(row.reversed ? { reversed: row.reversed } : {}),
      })),
    },
  },
  {
    order: 3,
    type: "platformOnboarding",
    props: {
      partner: { ...partnerCta },
      demo: { ...demoSection },
      steps: {
        title: stepsSection.title,
        cta: stepsSection.cta,
        steps: stepsSection.steps.map((s) => ({ ...s })),
      },
    },
  },
  {
    order: 4,
    type: "caseStudies",
    props: {
      title: caseStudies.title,
      items: caseStudies.items.map((item) => ({ ...item })),
    },
  },
  {
    order: 5,
    type: "testimonials",
    props: {
      title: testimonials.title,
      items: testimonials.items.map((item) => ({ ...item })),
    },
  },
  {
    order: 6,
    type: "contact",
    props: { ...contactSection },
  },
];

async function main() {
  const pageMeta = {
    title: "СмартСтаффинг — управление подрядчиками и проектами",
    description:
      "Платформа для подбора специалистов, планирования загрузки и контроля проектов в одном контуре.",
  };

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

  const existingPage = await prisma.landingPage.findUnique({
    where: { slug: HOME_SLUG },
    include: { _count: { select: { blocks: true } } },
  });

  if (existingPage && existingPage._count.blocks > 0) {
    await ensureAdminUser();
    return;
  }

  const page = await prisma.landingPage.upsert({
    where: { slug: HOME_SLUG },
    create: {
      slug: HOME_SLUG,
      title: "Главная",
      meta: pageMeta,
    },
    update: {
      title: "Главная",
      meta: pageMeta,
    },
  });

  await prisma.block.deleteMany({ where: { landingPageId: page.id } });

  for (const block of seedBlocks) {
    await prisma.block.create({
      data: {
        landingPageId: page.id,
        type: block.type,
        order: block.order,
        props: block.props,
      },
    });
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
