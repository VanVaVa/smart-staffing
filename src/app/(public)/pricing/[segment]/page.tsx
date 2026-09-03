import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getClientsPageBySegment } from "@/entities/landing/server";
import { ClientsPage } from "@/views/clients";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ segment: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { segment } = await params;
  const page = await getClientsPageBySegment(segment);

  if (!page || page.meta?.hidden) {
    return {};
  }

  if (!page.meta) {
    return {};
  }

  return {
    title: page.meta.title,
    description: page.meta.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { segment } = await params;
  const page = await getClientsPageBySegment(segment);

  if (!page || page.meta?.hidden) {
    notFound();
  }

  return (
    <ClientsPage blocks={page.blocks} segment={segment} pageVariant="pricing" />
  );
}
