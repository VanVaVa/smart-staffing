import { VacanciesSection } from "@/widgets/vacancies-section";

import styles from "./VacanciesPage.module.css";

export function VacanciesPage() {
  return (
    <div className={styles["vacancies-page"]}>
      <VacanciesSection />
    </div>
  );
}
