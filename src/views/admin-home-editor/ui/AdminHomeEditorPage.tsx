"use client";

import {
  defaultBlockProps,
  defaultCollectionItem,
  HOME_BLOCK_TYPES,
  HOME_BLOCK_TYPE_LABELS,
  type HomeBlock,
  type HomeBlockType,
} from "@/entities/landing";
import { getLandingPageSchema } from "@/entities/landing/lib/landing-page-registry";
import { LANDING_PAGE_SLUGS } from "@/entities/landing/model/landing-page-slugs";
import { AdminLandingEditorPage } from "@/views/admin-landing-editor";
import { HomePage } from "@/views/home";

type AdminHomeEditorPageProps = {
  initialBlocks: HomeBlock[];
};

const homeSchema = getLandingPageSchema(LANDING_PAGE_SLUGS.home);

export function AdminHomeEditorPage({ initialBlocks }: AdminHomeEditorPageProps) {
  return (
    <AdminLandingEditorPage
      slug={LANDING_PAGE_SLUGS.home}
      initialBlocks={initialBlocks}
      draftConfig={{
        slug: LANDING_PAGE_SLUGS.home,
        blockTypes: HOME_BLOCK_TYPES,
        defaultBlockProps,
      }}
      pageSchema={homeSchema}
      prepareCollectionItem={(block, _arrayPath, collectionKey, item) => {
        if (collectionKey === "rows" && block.type === "features") {
          const nextIndex = block.props.rows.length;
          return {
            ...(item as Record<string, unknown>),
            reversed: nextIndex % 2 === 1,
          };
        }
        return item;
      }}
      renderPage={({ blocks, renderBlock }) => (
        <HomePage
          blocks={blocks}
          mode="edit"
          onBlockUpdate={() => undefined}
          renderBlock={(block, index, node) => renderBlock(block, index, node)}
        />
      )}
    />
  );
}
