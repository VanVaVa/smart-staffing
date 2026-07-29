import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  clientSegmentSlugs,
  getClientsSegment,
  isClientSegmentSlug,
} from "@/entities/landing";
import { ClientsPage } from "@/views/clients";

type PageProps = {
  params: Promise<{ segment: string }>;
};

export function generateStaticParams() {
  return clientSegmentSlugs.map((segment) => ({ segment }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { segment } = await params;

  if (!isClientSegmentSlug(segment)) {
    return {};
  }

  const { meta } = getClientsSegment(segment);

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

  return <ClientsPage segment={segment} />;
}
