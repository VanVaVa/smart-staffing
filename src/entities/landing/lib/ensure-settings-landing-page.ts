import "server-only";

import { getPrismaClient } from "@/shared/lib/prisma";

import { emailSettingsBlocksFromStaticContent } from "../model/email-settings-blocks";
import { LANDING_PAGE_SLUGS } from "../model/landing-page-slugs";

export async function ensureSettingsLandingPage(): Promise<void> {
  const prisma = getPrismaClient();
  const existing = await prisma.landingPage.findUnique({
    where: { slug: LANDING_PAGE_SLUGS.settings },
    select: { id: true },
  });

  if (existing) {
    return;
  }

  const blocks = emailSettingsBlocksFromStaticContent();

  await prisma.landingPage.create({
    data: {
      slug: LANDING_PAGE_SLUGS.settings,
      title: "Настройки",
      meta: {
        title: "Настройки — СмартСтаффинг",
        description: "Email-адреса и параметры уведомлений.",
        hidden: true,
      },
      blocks: {
        create: blocks.map((block) => ({
          type: block.type,
          order: block.order,
          props: block.props as object,
        })),
      },
    },
  });
}
