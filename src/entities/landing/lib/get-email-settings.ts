import "server-only";

import { getPrismaClient } from "@/shared/lib/prisma";

import {
  defaultEmailSettingsBlockProps,
  parseEmailSettingsBlock,
  type EmailSettingsBlockProps,
} from "../model/email-settings-blocks";
import { LANDING_PAGE_SLUGS } from "../model/landing-page-slugs";
import { ensureSettingsLandingPage } from "./ensure-settings-landing-page";

export async function getEmailSettings(): Promise<EmailSettingsBlockProps> {
  await ensureSettingsLandingPage();

  const prisma = getPrismaClient();
  const page = await prisma.landingPage.findUnique({
    where: { slug: LANDING_PAGE_SLUGS.settings },
    include: {
      blocks: { orderBy: { order: "asc" } },
    },
  });

  if (!page || page.blocks.length === 0) {
    return defaultEmailSettingsBlockProps();
  }

  const settingsBlock =
    page.blocks.find((block) => block.type === "emailSettings") ?? page.blocks[0];
  const parsed = parseEmailSettingsBlock({
    id: settingsBlock.id,
    order: settingsBlock.order,
    type: settingsBlock.type,
    props: settingsBlock.props,
  });

  return parsed?.props ?? defaultEmailSettingsBlockProps();
}
