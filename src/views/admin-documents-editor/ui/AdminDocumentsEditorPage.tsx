"use client";

import {
  defaultDocumentsBlockProps,
  DOCUMENTS_BLOCK_TYPES,
  type DocumentsBlock,
} from "@/entities/landing/model/documents-blocks";
import { getLandingPageSchema } from "@/entities/landing/lib/landing-page-registry";
import { LANDING_PAGE_SLUGS } from "@/entities/landing/model/landing-page-slugs";
import { AdminLandingEditorPage } from "@/views/admin-landing-editor";
import { DocumentsPage } from "@/views/documents";

const documentsSchema = getLandingPageSchema(LANDING_PAGE_SLUGS.documents);

type AdminDocumentsEditorPageProps = {
  initialBlocks: DocumentsBlock[];
};

export function AdminDocumentsEditorPage({
  initialBlocks,
}: AdminDocumentsEditorPageProps) {
  return (
    <AdminLandingEditorPage
      slug={LANDING_PAGE_SLUGS.documents}
      initialBlocks={initialBlocks}
      draftConfig={{
        slug: LANDING_PAGE_SLUGS.documents,
        blockTypes: DOCUMENTS_BLOCK_TYPES,
        defaultBlockProps: () => defaultDocumentsBlockProps(),
      }}
      pageSchema={documentsSchema}
      allowAddRemove={false}
      renderPage={({ blocks, renderBlock }) => (
        <DocumentsPage
          blocks={blocks}
          mode="edit"
          renderBlock={(block, index, node) => renderBlock(block, index, node)}
        />
      )}
    />
  );
}
