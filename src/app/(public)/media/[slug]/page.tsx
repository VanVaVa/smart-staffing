import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  buildRelatedArticles,
  getMediaArticlePageContent,
  listMediaArticles,
  mediaArticleExists,
} from "@/entities/landing/server";
import { MediaArticlePage } from "@/views/media-article";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!(await mediaArticleExists(slug))) {
    return {};
  }

  try {
    const { blocks, meta } = await getMediaArticlePageContent(slug);
    const articleBlock = blocks.find((block) => block.type === "mediaArticle");

    return articleBlock?.props.meta ?? meta ?? {};
  } catch {
    return {};
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  if (!(await mediaArticleExists(slug))) {
    notFound();
  }

  try {
    const [{ blocks }, articles] = await Promise.all([
      getMediaArticlePageContent(slug),
      listMediaArticles(),
    ]);

    const relatedArticles = buildRelatedArticles(slug, articles);

    return (
      <MediaArticlePage blocks={blocks} relatedArticles={relatedArticles} />
    );
  } catch {
    notFound();
  }
}
