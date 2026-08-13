import { notFound } from "next/navigation";

import {
  buildRelatedArticles,
  getMediaArticlePageContent,
  listMediaArticles,
} from "@/entities/landing/server";
import { AdminMediaArticleEditorPage } from "@/views/admin-media-article-editor";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  try {
    const [{ blocks }, articles] = await Promise.all([
      getMediaArticlePageContent(slug),
      listMediaArticles(),
    ]);

    const relatedArticles = buildRelatedArticles(slug, articles);

    return (
      <AdminMediaArticleEditorPage
        articleSlug={slug}
        initialBlocks={blocks}
        relatedArticles={relatedArticles}
      />
    );
  } catch {
    notFound();
  }
}
