"use client";

import {
  CLIENTS_BLOCK_TYPES,
  defaultClientsBlockProps,
  type ClientsBlock,
} from "@/entities/landing/model/clients-blocks";
import type { ClientSegmentSlug } from "@/entities/landing/model/clients-content";
import { getLandingPageSchema } from "@/entities/landing/lib/landing-page-registry";
import { clientsPageSlug } from "@/entities/landing/model/landing-page-slugs";
import { AdminLandingEditorPage } from "@/views/admin-landing-editor";
import { ClientsPage } from "@/views/clients";

type AdminClientsEditorPageProps = {
  segment: ClientSegmentSlug;
  initialBlocks: ClientsBlock[];
};

export function AdminClientsEditorPage({
  segment,
  initialBlocks,
}: AdminClientsEditorPageProps) {
  const slug = clientsPageSlug(segment);
  const clientsSchema = getLandingPageSchema(slug);

  return (
    <AdminLandingEditorPage
      slug={slug}
      initialBlocks={initialBlocks}
      draftConfig={{
        slug,
        blockTypes: CLIENTS_BLOCK_TYPES,
        defaultBlockProps: (type) => defaultClientsBlockProps(type, segment),
      }}
      pageSchema={clientsSchema}
      allowAddRemove={false}
      renderPage={({ blocks, renderBlock }) => (
        <ClientsPage
          blocks={blocks}
          segment={segment}
          mode="edit"
          renderBlock={(block, index, node) => renderBlock(block, index, node)}
        />
      )}
    />
  );
}
