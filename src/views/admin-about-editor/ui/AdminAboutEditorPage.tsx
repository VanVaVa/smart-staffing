"use client";

import {
  defaultAboutBlockProps,
  ABOUT_BLOCK_TYPES,
  type AboutBlock,
} from "@/entities/landing/model/about-blocks";
import { getLandingPageSchema } from "@/entities/landing/lib/landing-page-registry";
import { LANDING_PAGE_SLUGS } from "@/entities/landing/model/landing-page-slugs";
import { AdminLandingEditorPage } from "@/views/admin-landing-editor";
import { AboutPage } from "@/views/about";

const aboutSchema = getLandingPageSchema(LANDING_PAGE_SLUGS.about);

type AdminAboutEditorPageProps = {
  initialBlocks: AboutBlock[];
};

export function AdminAboutEditorPage({ initialBlocks }: AdminAboutEditorPageProps) {
  return (
    <AdminLandingEditorPage
      slug={LANDING_PAGE_SLUGS.about}
      initialBlocks={initialBlocks}
      draftConfig={{
        slug: LANDING_PAGE_SLUGS.about,
        blockTypes: ABOUT_BLOCK_TYPES,
        defaultBlockProps: defaultAboutBlockProps,
      }}
      pageSchema={aboutSchema}
      allowAddRemove={false}
      renderPage={({ blocks, renderBlock }) => (
        <AboutPage
          blocks={blocks}
          mode="edit"
          renderBlock={(block, index, node) => renderBlock(block, index, node)}
        />
      )}
    />
  );
}
