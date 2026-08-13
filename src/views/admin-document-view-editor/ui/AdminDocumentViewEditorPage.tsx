"use client";

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
};

export function AdminDocumentViewEditorPage({
  documentSlug,
  initialBlocks,
}: AdminDocumentViewEditorPageProps) {
  const pageSlug = documentPageSlug(documentSlug);
  const documentViewSchema = getLandingPageSchema(pageSlug);

  return (
    <AdminLandingEditorPage
      slug={pageSlug}
      initialBlocks={initialBlocks}
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
