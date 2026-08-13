import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isClientSegmentSlug } from "@/entities/landing";
import { getClientsPageContent } from "@/entities/landing/server";
import { ClientsPage } from "@/views/clients";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ segment: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { segment } = await params;

  if (!isClientSegmentSlug(segment)) {
    return {};
  }

  const { meta } = await getClientsPageContent(segment);

  if (!meta) {
    return {};
  }

  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { segment } = await params;

  if (!isClientSegmentSlug(segment)) {
    notFound();
  }

  const { blocks } = await getClientsPageContent(segment);

  return <ClientsPage blocks={blocks} segment={segment} />;
}
