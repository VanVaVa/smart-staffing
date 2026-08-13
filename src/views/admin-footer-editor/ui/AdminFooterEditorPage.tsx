"use client";

import {
  defaultFooterBlockProps,
  FOOTER_BLOCK_TYPES,
  type FooterBlock,
  type FooterBlockProps,
} from "@/entities/landing/model/footer-blocks";
import { getLandingPageSchema } from "@/entities/landing/lib/landing-page-registry";
import { LANDING_PAGE_SLUGS } from "@/entities/landing/model/landing-page-slugs";
import { AdminLandingEditorPage } from "@/views/admin-landing-editor";

const footerSchema = getLandingPageSchema(LANDING_PAGE_SLUGS.footer);

type AdminFooterEditorPageProps = {
  initialBlocks: FooterBlock[];
  footerContent: FooterBlockProps;
};

export function AdminFooterEditorPage({
  initialBlocks,
  footerContent,
}: AdminFooterEditorPageProps) {
  return (
    <AdminLandingEditorPage
      slug={LANDING_PAGE_SLUGS.footer}
      initialBlocks={initialBlocks}
      footerContent={footerContent}
      draftConfig={{
        slug: LANDING_PAGE_SLUGS.footer,
        blockTypes: FOOTER_BLOCK_TYPES,
        defaultBlockProps: () => defaultFooterBlockProps(),
      }}
      pageSchema={footerSchema}
      allowAddRemove={false}
      renderPage={() => null}
      renderFooter={({ block, renderBlock }) => (footer) => renderBlock(block, 0, footer)}
    />
  );
}
