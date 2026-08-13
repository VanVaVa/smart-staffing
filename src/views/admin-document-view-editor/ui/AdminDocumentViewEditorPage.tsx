"use client";

import type { FooterBlockProps } from "@/entities/landing/model/footer-blocks";
import {
  defaultDocumentViewBlockProps,
  DOCUMENT_VIEW_BLOCK_TYPES,
  type DocumentViewBlock,
} from "@/entities/landing/model/document-view-blocks";
import { getLandingPageSchema } from "@/entities/landing/lib/landing-page-registry";
import { documentPageSlug } from "@/entities/landing/model/landing-page-slugs";
import { AdminLandingEditorPage } from "@/views/admin-landing-editor";
import { DocumentViewPage } from "@/views/document-view";

type AdminDocumentViewEditorPageProps = {
  documentSlug: string;
  initialBlocks: DocumentViewBlock[];
  footerContent: FooterBlockProps;
};

export function AdminDocumentViewEditorPage({
  documentSlug,
  initialBlocks,
  footerContent,
}: AdminDocumentViewEditorPageProps) {
  const pageSlug = documentPageSlug(documentSlug);
  const documentViewSchema = getLandingPageSchema(pageSlug);

  return (
    <AdminLandingEditorPage
      slug={pageSlug}
      initialBlocks={initialBlocks}
      footerContent={footerContent}
      draftConfig={{
        slug: pageSlug,
        blockTypes: DOCUMENT_VIEW_BLOCK_TYPES,
        defaultBlockProps: () =>
          defaultDocumentViewBlockProps(documentSlug, "Документ"),
      }}
      pageSchema={documentViewSchema}
      allowAddRemove={false}
      renderPage={({ blocks, renderBlock }) => (
        <DocumentViewPage
          documentSlug={documentSlug}
          blocks={blocks}
          mode="edit"
          renderBlock={(block, index, node) => renderBlock(block, index, node)}
        />
      )}
    />
  );
}
