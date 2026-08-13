"use client";

import type { MediaArticleRelated } from "@/entities/landing";
import {
  defaultMediaArticleBlockProps,
  MEDIA_ARTICLE_BLOCK_TYPES,
  type MediaArticleBlock,
} from "@/entities/landing/model/media-article-blocks";
import { getLandingPageSchema } from "@/entities/landing/lib/landing-page-registry";
import { mediaArticlePageSlug } from "@/entities/landing/model/landing-page-slugs";
import { AdminLandingEditorPage } from "@/views/admin-landing-editor";
import { MediaArticlePage } from "@/views/media-article";

type AdminMediaArticleEditorPageProps = {
  articleSlug: string;
  initialBlocks: MediaArticleBlock[];
  relatedArticles: MediaArticleRelated[];
};

export function AdminMediaArticleEditorPage({
  articleSlug,
  initialBlocks,
  relatedArticles,
}: AdminMediaArticleEditorPageProps) {
  const pageSlug = mediaArticlePageSlug(articleSlug);
  const articleSchema = getLandingPageSchema(pageSlug);

  return (
    <AdminLandingEditorPage
      slug={pageSlug}
      initialBlocks={initialBlocks}
      draftConfig={{
        slug: pageSlug,
        blockTypes: MEDIA_ARTICLE_BLOCK_TYPES,
        defaultBlockProps: () => defaultMediaArticleBlockProps(articleSlug),
      }}
      pageSchema={articleSchema}
      allowAddRemove={false}
      renderPage={({ blocks, renderBlock }) => (
        <MediaArticlePage
          blocks={blocks}
          relatedArticles={relatedArticles}
          mode="edit"
          renderBlock={(block, index, node) => renderBlock(block, index, node)}
        />
      )}
    />
  );
}
