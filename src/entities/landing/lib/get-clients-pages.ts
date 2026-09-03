import "server-only";

import { getPrismaClient } from "@/shared/lib/prisma";
import type { AdminValues } from "@/shared/ui/admin-form";

import {
  CLIENTS_BLOCK_TYPES,
  createDefaultClientsPageBlocks,
  parseClientsBlockProps,
  type ClientsBlock,
  type ClientsBlockType,
} from "../model/clients-blocks";
import {
  clientsPageFromFormValues,
  clientsPageToFormValues,
  createDefaultClientsPageFormValues,
} from "../model/clients-admin-form";
import type { LandingPageMeta } from "../model/landing-block-base";
import {
  clientsPageSlug,
  parseClientSegmentFromSlug,
} from "../model/landing-page-slugs";

type DbBlock = {
  id: string;
  order: number;
  type: string;
  props: unknown;
};

type DbPage = {
  id: string;
  slug: string;
  title: string;
  meta: unknown;
  blocks: DbBlock[];
};

export type VisibleClientsPage = {
  segment: string;
  navLabel: string;
  href: string;
};

function asRecord(value: unknown): AdminValues {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as AdminValues)
    : {};
}

function parseStoredMeta(meta: unknown): LandingPageMeta & { navLabel?: string } {
  const record = asRecord(meta);
  const title = typeof record.title === "string" ? record.title : "";
  const description = typeof record.description === "string" ? record.description : "";
  return {
    title,
    description,
    hidden: record.hidden === true,
    navLabel: typeof record.navLabel === "string" ? record.navLabel : undefined,
  };
}

function getBlockProps(page: DbPage, type: ClientsBlockType): AdminValues {
  const block = page.blocks.find((item) => item.type === type);
  return block ? asRecord(block.props) : {};
}

function pageToFormValues(page: DbPage): AdminValues {
  const segment = parseClientSegmentFromSlug(page.slug);
  if (!segment) {
    throw new Error(`Invalid clients page slug: "${page.slug}"`);
  }

  const meta = parseStoredMeta(page.meta);

  return clientsPageToFormValues({
    segment,
    meta: {
      title: meta.title,
      description: meta.description,
      navLabel: meta.navLabel ?? "",
      hidden: meta.hidden === true,
    },
    hero: getBlockProps(page, "hero"),
    platform: getBlockProps(page, "platform"),
    platformBenefits: getBlockProps(page, "platformBenefits"),
    partnersExperience: getBlockProps(page, "partnersExperience"),
    partnershipCta: getBlockProps(page, "partnershipCta"),
  });
}

function validateBlocks(blocks: Record<string, AdminValues>): Array<{
  type: ClientsBlockType;
  order: number;
  props: unknown;
}> {
  return CLIENTS_BLOCK_TYPES.map((type, order) => {
    const props = parseClientsBlockProps(type, blocks[type]);
    if (!props) {
      throw new Error(`Не удалось сохранить страницу: проверьте блок «${type}»`);
    }
    return { type, order, props };
  });
}

export async function listClientsPageFormValues(): Promise<AdminValues[]> {
  const prisma = getPrismaClient();
  const pages = await prisma.landingPage.findMany({
    where: { slug: { startsWith: "clients-" } },
    include: { blocks: { orderBy: { order: "asc" } } },
    orderBy: { slug: "asc" },
  });

  return pages.map((page) => pageToFormValues(page));
}

export async function getClientsPageFormValues(segment: string): Promise<AdminValues | null> {
  const prisma = getPrismaClient();
  const page = await prisma.landingPage.findUnique({
    where: { slug: clientsPageSlug(segment) },
    include: { blocks: { orderBy: { order: "asc" } } },
  });

  return page ? pageToFormValues(page) : null;
}

export async function getClientsPageBySegment(segment: string): Promise<{
  segment: string;
  meta: LandingPageMeta | null;
  blocks: ClientsBlock[];
} | null> {
  const prisma = getPrismaClient();
  const page = await prisma.landingPage.findUnique({
    where: { slug: clientsPageSlug(segment) },
    include: { blocks: { orderBy: { order: "asc" } } },
  });

  if (!page) {
    return null;
  }

  const parsedBlocks = page.blocks
    .map((block) => {
      if (!CLIENTS_BLOCK_TYPES.includes(block.type as ClientsBlockType)) {
        return null;
      }
      const props = parseClientsBlockProps(block.type as ClientsBlockType, block.props);
      if (!props) {
        return null;
      }
      return {
        id: block.id,
        order: block.order,
        type: block.type,
        props,
      } as ClientsBlock;
    })
    .filter((block): block is ClientsBlock => block !== null);

  if (parsedBlocks.length !== page.blocks.length) {
    return null;
  }

  return {
    segment,
    meta: parseStoredMeta(page.meta),
    blocks: parsedBlocks,
  };
}

export async function isClientsPageVisible(segment: string): Promise<boolean> {
  const page = await getClientsPageBySegment(segment);
  return page !== null && page.meta?.hidden !== true;
}

export async function listVisibleClientsPages(): Promise<VisibleClientsPage[]> {
  const prisma = getPrismaClient();
  const pages = await prisma.landingPage.findMany({
    where: { slug: { startsWith: "clients-" } },
    orderBy: { slug: "asc" },
  });

  return pages
    .map((page) => {
      const segment = parseClientSegmentFromSlug(page.slug);
      if (!segment) {
        return null;
      }
      const meta = parseStoredMeta(page.meta);
      if (meta.hidden) {
        return null;
      }
      return {
        segment,
        navLabel: meta.navLabel || meta.title || segment,
        href: `/clients/${segment}`,
      };
    })
    .filter((page): page is VisibleClientsPage => page !== null);
}

export async function createClientsPage(): Promise<string> {
  const prisma = getPrismaClient();
  const segment = `draft-${crypto.randomUUID().slice(0, 8)}`;
  const defaults = createDefaultClientsPageFormValues();
  defaults.segment = segment;
  const parsed = clientsPageFromFormValues(defaults);
  const defaultBlocks = createDefaultClientsPageBlocks();
  const blocks = defaultBlocks.map((block, order) => ({
    type: block.type,
    order,
    props: block.props as object,
  }));

  await prisma.landingPage.create({
    data: {
      slug: clientsPageSlug(segment),
      title: `Клиенты: ${segment}`,
      meta: parsed.meta as object,
      blocks: {
        create: blocks,
      },
    },
  });

  return segment;
}

export async function saveClientsPageFormValues(
  currentSegment: string,
  values: AdminValues,
): Promise<string> {
  const parsed = clientsPageFromFormValues(values);
  const validatedBlocks = validateBlocks(parsed.blocks);

  const prisma = getPrismaClient();
  const page = await prisma.landingPage.findUnique({
    where: { slug: clientsPageSlug(currentSegment) },
    include: { blocks: { orderBy: { order: "asc" } } },
  });

  if (!page) {
    throw new Error(`Страница clients "${currentSegment}" не найдена`);
  }

  const nextSlug = clientsPageSlug(parsed.segment);
  if (nextSlug !== page.slug) {
    const conflict = await prisma.landingPage.findUnique({
      where: { slug: nextSlug },
      select: { id: true },
    });
    if (conflict) {
      throw new Error(`Адрес "${parsed.segment}" уже занят другой страницей`);
    }
  }

  const blocksByType = new Map(page.blocks.map((block) => [block.type, block]));

  await prisma.$transaction([
    prisma.landingPage.update({
      where: { id: page.id },
      data: {
        slug: nextSlug,
        title: `Клиенты: ${parsed.segment}`,
        meta: parsed.meta as object,
      },
    }),
    ...validatedBlocks.map((block) => {
      const existing = blocksByType.get(block.type);
      if (existing) {
        return prisma.block.update({
          where: { id: existing.id },
          data: { order: block.order, props: block.props as object },
        });
      }
      return prisma.block.create({
        data: {
          landingPageId: page.id,
          type: block.type,
          order: block.order,
          props: block.props as object,
        },
      });
    }),
  ]);

  return parsed.segment;
}

export async function deleteClientsPage(segment: string): Promise<void> {
  const prisma = getPrismaClient();
  const page = await prisma.landingPage.findUnique({
    where: { slug: clientsPageSlug(segment) },
    select: { id: true },
  });

  if (!page) {
    throw new Error(`Страница clients "${segment}" не найдена`);
  }

  await prisma.landingPage.delete({
    where: { id: page.id },
  });
}

export function createClientsPageAdminSeedValues(): AdminValues {
  return createDefaultClientsPageFormValues();
}
