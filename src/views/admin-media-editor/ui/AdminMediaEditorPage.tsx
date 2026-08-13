"use client";

import type { MediaArticle } from "@/entities/landing";
import {
  defaultMediaBlockProps,
  MEDIA_BLOCK_TYPES,
  type MediaBlock,
} from "@/entities/landing/model/media-blocks";
import { getLandingPageSchema } from "@/entities/landing/lib/landing-page-registry";
import { LANDING_PAGE_SLUGS } from "@/entities/landing/model/landing-page-slugs";
import { AdminLandingEditorPage } from "@/views/admin-landing-editor";
import { MediaPage } from "@/views/media";

const mediaSchema = getLandingPageSchema(LANDING_PAGE_SLUGS.media);

type AdminMediaEditorPageProps = {
  initialBlocks: MediaBlock[];
  articles: MediaArticle[];
};

export function AdminMediaEditorPage({
  initialBlocks,
  articles,
}: AdminMediaEditorPageProps) {
  return (
    <AdminLandingEditorPage
      slug={LANDING_PAGE_SLUGS.media}
      initialBlocks={initialBlocks}
      draftConfig={{
        slug: LANDING_PAGE_SLUGS.media,
        blockTypes: MEDIA_BLOCK_TYPES,
        defaultBlockProps: () => defaultMediaBlockProps(),
      }}
      pageSchema={mediaSchema}
      allowAddRemove={false}
      renderPage={({ blocks, renderBlock }) => (
        <MediaPage
          blocks={blocks}
          articles={articles}
          mode="edit"
          renderBlock={(block, index, node) => renderBlock(block, index, node)}
        />
      )}
    />
  );
}
