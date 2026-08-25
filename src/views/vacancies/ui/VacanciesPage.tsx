import type { VacanciesBlock } from "@/entities/landing/model/vacancies-blocks";
import { VacanciesSection } from "@/widgets/vacancies-section";

import styles from "./VacanciesPage.module.css";

type VacanciesPageProps = {
  blocks: VacanciesBlock[];
};

export function VacanciesPage({ blocks }: VacanciesPageProps) {
  const block = blocks[0];

  if (!block || block.type !== "vacancies") {
    return null;
  }

  return (
    <div className={styles["vacancies-page"]} data-header-veil-bg="#f9f9fb">
      <VacanciesSection content={block.props} />
    </div>
  );
}
