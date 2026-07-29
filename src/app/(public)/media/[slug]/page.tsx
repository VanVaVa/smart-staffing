import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getMediaArticle,
  mediaArticleSlugs,
} from "@/entities/landing";
import { MediaArticlePage } from "@/views/media-article";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return mediaArticleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getMediaArticle(slug);

  if (!article) {
    return {};
  }

  return article.meta;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = getMediaArticle(slug);

  if (!article) {
    notFound();
  }

  return <MediaArticlePage article={article} />;
}
