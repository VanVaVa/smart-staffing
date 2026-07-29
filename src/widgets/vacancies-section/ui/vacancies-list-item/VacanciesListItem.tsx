import { ArrowIcon } from "@/shared/ui/arrow-icon";

import styles from "./VacanciesListItem.module.css";

type VacanciesListItemProps = {
  title: string;
  employment: string;
  selected: boolean;
  onSelect: () => void;
};

export function VacanciesListItem({
  title,
  employment,
  selected,
  onSelect,
}: VacanciesListItemProps) {
  return (
    <button
      type="button"
      className={[
        styles["vacancies-list-item"],
        selected ? styles["vacancies-list-item--selected"] : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className={styles["vacancies-list-item__copy"]}>
        <span className={styles["vacancies-list-item__title"]}>{title}</span>
        <span className={styles["vacancies-list-item__employment"]}>{employment}</span>
      </span>
      <span className={styles["vacancies-list-item__arrow"]} aria-hidden>
        <ArrowIcon name="round" className={styles["vacancies-list-item__arrow-icon"]} />
      </span>
    </button>
  );
}
