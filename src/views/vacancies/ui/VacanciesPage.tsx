"use client";

import type { ReactNode } from "react";

import {
  defaultVacanciesBlockProps,
  VACANCIES_BLOCK_TYPES,
  VACANCIES_BLOCK_TYPE_LABELS,
  type VacanciesBlock,
} from "@/entities/landing/model/vacancies-blocks";
import { getLandingPageSchema } from "@/entities/landing/lib/landing-page-registry";
import { LANDING_PAGE_SLUGS } from "@/entities/landing/model/landing-page-slugs";
import {
  AdminInlineEditLayer,
} from "@/features/admin-landing-editor";
import { VacanciesSection } from "@/widgets/vacancies-section";

import styles from "./VacanciesPage.module.css";

export type VacanciesPageMode = "view" | "edit";

type VacanciesPageProps = {
  blocks: VacanciesBlock[];
  mode?: VacanciesPageMode;
  onBlockUpdate?: (block: VacanciesBlock) => void;
  renderBlock?: (
    block: VacanciesBlock,
    index: number,
    node: ReactNode,
  ) => ReactNode;
};

const vacanciesSchema = getLandingPageSchema(LANDING_PAGE_SLUGS.vacancies);

export function VacanciesPage({
  blocks,
  mode = "view",
  onBlockUpdate,
  renderBlock,
}: VacanciesPageProps) {
  const inlineEdit = mode === "edit" && Boolean(onBlockUpdate) && !renderBlock;
  const block = blocks[0];

  if (!block || block.type !== "vacancies") {
    return null;
  }

  let node = <VacanciesSection content={block.props} />;

  if (inlineEdit && onBlockUpdate) {
    node = (
      <AdminInlineEditLayer
        block={block}
        onUpdateBlock={onBlockUpdate}
        defaultCollectionItem={vacanciesSchema.defaultCollectionItem}
      >
        {node}
      </AdminInlineEditLayer>
    );
  }

  if (renderBlock) {
    return <div key={block.id}>{renderBlock(block, 0, node)}</div>;
  }

  return <div className={styles["vacancies-page"]}>{node}</div>;
}

export {
  defaultVacanciesBlockProps,
  VACANCIES_BLOCK_TYPES,
  VACANCIES_BLOCK_TYPE_LABELS,
};
