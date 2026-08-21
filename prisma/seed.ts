import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

import bcrypt from "bcryptjs";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "../src/generated/prisma/client";
import { aboutBlocksFromStaticContent } from "../src/entities/landing/model/about-blocks";
import {
  clientsBlocksFromStaticContent,
  clientsMetaFromStaticContent,
} from "../src/entities/landing/model/clients-blocks";
import { clientSegmentSlugs } from "../src/entities/landing/model/clients-content";
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
import { documentViewBlocksFromItem } from "../src/entities/landing/model/document-view-blocks";
import { documentsBlocksFromStaticContent } from "../src/entities/landing/model/documents-blocks";
import { footerBlocksFromStaticContent } from "../src/entities/landing/model/footer-blocks";
import {
  documentSlugs,
  getDocument,
} from "../src/entities/landing/model/documents-content";
import {
  documentPageSlug,
  clientsPageSlug,
  LANDING_PAGE_SLUGS,
  mediaArticlePageSlug,
} from "../src/entities/landing/model/landing-page-slugs";
import { mediaArticleBlocksFromContent } from "../src/entities/landing/model/media-article-blocks";
import { mediaBlocksFromStaticContent } from "../src/entities/landing/model/media-blocks";
import {
  EXAMPLE_MEDIA_ARTICLE,
  type MediaArticleContent,
} from "../src/entities/landing/model/media-content";
import { vacanciesBlocksFromStaticContent } from "../src/entities/landing/model/vacancies-blocks";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const homeSeedBlocks = [
  {
    order: 0,
    type: "hero",
    props: {
      title: heroContent.title,
      subtitleLead: "50 000+ специалистов из\u00a0150+ компаний-партнёров",
      subtitleTail: "на\u00a0единой СмартСтаффинг-платформе",
      primaryCta: heroContent.primaryCta,
      registryLabel: heroContent.registryLabel,
      registryHref: heroContent.registryHref,
      dashboardImageSrc: "/landing/hero-segment-enterprise.png",
      segments: heroContent.segments.map((segment) => ({
        label: segment.label,
        imageSrc: segment.imageSrc,
        thumbImageSrc: segment.thumbImageSrc,
        href: segment.href,
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
      benefits: productShowcase.benefits.map((benefit) => ({
        id: benefit.id,
        layout: benefit.layout,
        title: benefit.title,
        text: benefit.text,
        ...(benefit.layout === "stat" && "statValue" in benefit
          ? { statValue: benefit.statValue }
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
        descriptionAccent: row.descriptionAccent,
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
        steps: stepsSection.steps.map((step) => ({ ...step })),
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

type SeedBlock = {
  order: number;
  type: string;
  props: unknown;
};

type SeedPage = {
  slug: string;
  title: string;
  meta: { title: string; description: string };
  blocks: SeedBlock[];
};

const MOCK_MEDIA_ARTICLE_COUNT = 25;

const MOCK_MEDIA_ARTICLE_TAGS = [
  {
    tag: "important" as const,
    tagLabel: "Важное",
    imageSrc: "/landing/media/media-important.png",
  },
  {
    tag: "interesting" as const,
    tagLabel: "Интересное",
    imageSrc: "/landing/media/media-interesting.png",
  },
  {
    tag: "news" as const,
    tagLabel: "Новость",
    imageSrc: "/landing/media/media-news.png",
  },
];

function buildMockMediaArticles(): MediaArticleContent[] {
  return Array.from({ length: MOCK_MEDIA_ARTICLE_COUNT }, (_, index) => {
    const tagConfig = MOCK_MEDIA_ARTICLE_TAGS[index % MOCK_MEDIA_ARTICLE_TAGS.length];
    const publishedDate = new Date("2026-08-01T12:00:00Z");
    publishedDate.setUTCDate(publishedDate.getUTCDate() - index);
    const publishedAt = publishedDate.toISOString().slice(0, 10);
    const [year, month, day] = publishedAt.split("-");
    const publishedLabel = `${day}.${month}.${year}`;
    const slug = `mock-publikaciya-${index + 1}`;
    const title = `Тестовая публикация ${index + 1}: ${tagConfig.tagLabel.toLowerCase()} СмартСтаффинг`;

    return {
      id: `mock-${index + 1}`,
      slug,
      href: `/media/${slug}`,
      imageSrc: tagConfig.imageSrc,
      imageAlt: "Иллюстрация к\u00a0публикации",
      heroImageSrc: tagConfig.imageSrc,
      heroImageAlt: "Иллюстрация к\u00a0публикации",
      tag: tagConfig.tag,
      tagLabel: tagConfig.tagLabel,
      publishedAt,
      publishedLabel,
      title,
      lead: `Краткий анонс тестовой публикации №${index + 1} для проверки пагинации на странице «Медиа».`,
      bodyBlocks: [
        {
          type: "paragraph",
          text: `Это тестовая публикация №${index + 1}. Она создана для проверки отображения списка статей и пагинации.`,
        },
      ],
      sourceHref: "",
      sourceLabel: "",
      meta: {
        title: `${title} — СмартСтаффинг`,
        description: `Тестовая публикация №${index + 1} для проверки пагинации.`,
      },
    };
  });
}

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

function buildSeedPages(): SeedPage[] {
  const pages: SeedPage[] = [
    {
      slug: LANDING_PAGE_SLUGS.home,
      title: "Главная",
      meta: {
        title: "СмартСтаффинг — управление подрядчиками и\u00a0проектами",
        description:
          "Платформа для\u00a0подбора специалистов, планирования загрузки и\u00a0контроля проектов в\u00a0одном контуре.",
      },
      blocks: homeSeedBlocks,
    },
    {
      slug: LANDING_PAGE_SLUGS.about,
      title: "О\u00a0компании",
      meta: {
        title: "О\u00a0компании — СмартСтаффинг",
        description:
          "СмартСтаффинг — эксперт гибкой проектной занятости. История компании, миссия и\u00a0подход к\u00a0подбору ИТ-специалистов.",
      },
      blocks: aboutBlocksFromStaticContent(),
    },
    {
      slug: LANDING_PAGE_SLUGS.vacancies,
      title: "Вакансии",
      meta: {
        title: "Вакансии — СмартСтаффинг",
        description: "Присоединяйтесь к\u00a0команде СмартСтаффинг.",
      },
      blocks: vacanciesBlocksFromStaticContent(),
    },
    {
      slug: LANDING_PAGE_SLUGS.documents,
      title: "Документы",
      meta: {
        title: "Документы — СмартСтаффинг",
        description:
          "Юридические документы, сведения о\u00a0платформе и\u00a0свидетельства СмартСтаффинг.",
      },
      blocks: documentsBlocksFromStaticContent(),
    },
    {
      slug: LANDING_PAGE_SLUGS.media,
      title: "Медиа",
      meta: {
        title: "Медиа — СмартСтаффинг",
        description: "Новости и\u00a0публикации СмартСтаффинг.",
      },
      blocks: mediaBlocksFromStaticContent(),
    },
    {
      slug: LANDING_PAGE_SLUGS.footer,
      title: "Футер",
      meta: {
        title: "Футер — СмартСтаффинг",
        description: "Глобальные настройки футера сайта.",
      },
      blocks: footerBlocksFromStaticContent(),
    },
  ];

  for (const segment of clientSegmentSlugs) {
    const meta = clientsMetaFromStaticContent(segment);
    pages.push({
      slug: clientsPageSlug(segment),
      title: `Клиенты: ${segment}`,
      meta,
      blocks: clientsBlocksFromStaticContent(segment),
    });
  }

  for (const slug of documentSlugs) {
    const document = getDocument(slug);
    if (!document) {
      continue;
    }
    pages.push({
      slug: documentPageSlug(slug),
      title: document.title,
      meta: {
        title: `${document.title} — СмартСтаффинг`,
        description: `Документ «${document.title}» платформы СмартСтаффинг.`,
      },
      blocks: documentViewBlocksFromItem(document),
    });
  }

  pages.push({
    slug: mediaArticlePageSlug(EXAMPLE_MEDIA_ARTICLE.slug),
    title: EXAMPLE_MEDIA_ARTICLE.title,
    meta: EXAMPLE_MEDIA_ARTICLE.meta,
    blocks: mediaArticleBlocksFromContent(EXAMPLE_MEDIA_ARTICLE),
  });

  for (const article of buildMockMediaArticles()) {
    pages.push({
      slug: mediaArticlePageSlug(article.slug),
      title: article.title,
      meta: article.meta,
      blocks: mediaArticleBlocksFromContent(article),
    });
  }

  return pages;
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
