import "server-only";

import { getPrismaClient } from "@/shared/lib/prisma";

import {
  defaultFooterBlockProps,
  parseFooterBlock,
  type FooterBlockProps,
} from "../model/footer-blocks";
import { LANDING_PAGE_SLUGS } from "../model/landing-page-slugs";
import { getEmailSettings } from "./get-email-settings";
import { listVisibleClientsPages } from "./get-clients-pages";

function filterSolutionsLinks(
  solutions: FooterBlockProps["solutions"],
  visibleClientHrefs: ReadonlySet<string>,
): FooterBlockProps["solutions"] {
  return solutions.filter((item) => {
    if (visibleClientHrefs.has(item.href)) {
      return true;
    }
    if (item.href.startsWith("/clients/") || item.href.startsWith("/pricing/")) {
      return false;
    }
    return true;
  });
}

export async function getFooterContent(): Promise<FooterBlockProps> {
  const [emailSettings, page, visibleClients] = await Promise.all([
    getEmailSettings(),
    getPrismaClient().landingPage.findUnique({
      where: { slug: LANDING_PAGE_SLUGS.footer },
      include: {
        blocks: { orderBy: { order: "asc" } },
      },
    }),
    listVisibleClientsPages(),
  ]);

  const visibleClientHrefs = new Set([
    ...visibleClients.map((item) => item.href),
    ...visibleClients.map((item) => item.href.replace("/clients/", "/pricing/")),
  ]);

  const applyInfoEmail = (content: FooterBlockProps): FooterBlockProps => ({
    ...content,
    contacts: {
      ...content.contacts,
      email: emailSettings.infoEmail.trim() || content.contacts.email,
    },
    solutions: filterSolutionsLinks(content.solutions, visibleClientHrefs),
  });

  if (!page || page.blocks.length === 0) {
    return applyInfoEmail(defaultFooterBlockProps());
  }

  const footerBlock = page.blocks.find((block) => block.type === "footer") ?? page.blocks[0];
  const parsed = parseFooterBlock({
    id: footerBlock.id,
    order: footerBlock.order,
    type: footerBlock.type,
    props: footerBlock.props,
  });

  const content = parsed?.props ?? defaultFooterBlockProps();

  return applyInfoEmail(content);
}

export async function getFooterPageBlocks() {
  const prisma = getPrismaClient();
  const page = await prisma.landingPage.findUnique({
    where: { slug: LANDING_PAGE_SLUGS.footer },
    include: {
      blocks: { orderBy: { order: "asc" } },
    },
  });

  if (!page) {
    throw new Error(
      `Landing page "${LANDING_PAGE_SLUGS.footer}" not found. Run db:migrate and db:seed.`,
    );
  }

  const blocks = page.blocks
    .map((block) =>
      parseFooterBlock({
        id: block.id,
        order: block.order,
        type: block.type,
        props: block.props,
      }),
    )
    .filter((block): block is NonNullable<typeof block> => block !== null);

  if (blocks.length !== page.blocks.length) {
    throw new Error(`Invalid block data on landing page "${LANDING_PAGE_SLUGS.footer}"`);
  }

  return blocks;
}
