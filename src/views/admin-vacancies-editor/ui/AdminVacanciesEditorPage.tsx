"use client";

import {
  defaultVacanciesBlockProps,
  VACANCIES_BLOCK_TYPES,
  type VacanciesBlock,
} from "@/entities/landing/model/vacancies-blocks";
import { getLandingPageSchema } from "@/entities/landing/lib/landing-page-registry";
import { LANDING_PAGE_SLUGS } from "@/entities/landing/model/landing-page-slugs";
import { AdminLandingEditorPage } from "@/views/admin-landing-editor";
import { VacanciesPage } from "@/views/vacancies";

const vacanciesSchema = getLandingPageSchema(LANDING_PAGE_SLUGS.vacancies);

type AdminVacanciesEditorPageProps = {
  initialBlocks: VacanciesBlock[];
};

export function AdminVacanciesEditorPage({
  initialBlocks,
}: AdminVacanciesEditorPageProps) {
  return (
    <AdminLandingEditorPage
      slug={LANDING_PAGE_SLUGS.vacancies}
      initialBlocks={initialBlocks}
      draftConfig={{
        slug: LANDING_PAGE_SLUGS.vacancies,
        blockTypes: VACANCIES_BLOCK_TYPES,
        defaultBlockProps: () => defaultVacanciesBlockProps(),
      }}
      pageSchema={vacanciesSchema}
      allowAddRemove={false}
      renderPage={({ blocks, renderBlock }) => (
        <VacanciesPage
          blocks={blocks}
          mode="edit"
          renderBlock={(block, index, node) => renderBlock(block, index, node)}
        />
      )}
    />
  );
}
