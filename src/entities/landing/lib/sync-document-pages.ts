import "server-only";

import { getPrismaClient } from "@/shared/lib/prisma";

import { parseDocumentsBlockProps } from "../model/documents-blocks";
import { documentViewBlocksFromItem } from "../model/document-view-blocks";
import { documentPageSlug, LANDING_PAGE_SLUGS } from "../model/landing-page-slugs";
import type { DocumentItem } from "../model/documents-content";

async function readPageDocuments(): Promise<DocumentItem[]> {
  const prisma = getPrismaClient();
  const page = await prisma.landingPage.findUnique({
    where: { slug: LANDING_PAGE_SLUGS.documents },
    include: { blocks: true },
  });

  const block = page?.blocks.find((item) => item.type === "documentsPage");
  const props = block ? parseDocumentsBlockProps("documentsPage", block.props) : null;
  if (!props) {
    return [];
  }

  return props.categories
    .flatMap((category) => category.items)
    .filter((item) => item.presentation === "page" && item.slug.length > 0);
}

export async function syncDocumentPages(): Promise<void> {
  const prisma = getPrismaClient();
  const documents = await readPageDocuments();
  const desiredSlugs = new Set(documents.map((item) => documentPageSlug(item.slug)));

  const existing = await prisma.landingPage.findMany({
    where: { slug: { startsWith: "documents-" } },
    include: { blocks: true },
  });
  const existingBySlug = new Map(existing.map((page) => [page.slug, page]));

  for (const document of documents) {
    const slug = documentPageSlug(document.slug);
    const page = existingBySlug.get(slug);
    const [blockData] = documentViewBlocksFromItem(document);

    if (!page) {
      await prisma.landingPage.create({
        data: {
          slug,
          title: document.title,
          meta: {
            title: `${document.title} — СмартСтаффинг`,
            description: `Документ «${document.title}» платформы СмартСтаффинг.`,
          },
          blocks: { create: blockData },
        },
      });
      continue;
    }

    const block = page.blocks.find((item) => item.type === "documentView");
    await prisma.$transaction([
      prisma.landingPage.update({
        where: { id: page.id },
        data: { title: document.title },
      }),
      block
        ? prisma.block.update({
            where: { id: block.id },
            data: { props: blockData.props },
          })
        : prisma.block.create({
            data: { landingPageId: page.id, ...blockData },
          }),
    ]);
  }

  const orphans = existing.filter((page) => !desiredSlugs.has(page.slug));
  if (orphans.length > 0) {
    await prisma.landingPage.deleteMany({
      where: { id: { in: orphans.map((page) => page.id) } },
    });
  }
}

export async function listDocumentPageSlugs(): Promise<string[]> {
  const documents = await readPageDocuments();
  return documents.map((item) => item.slug);
}
