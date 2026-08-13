import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { EditableText } from "@/shared/ui/editable-field";

import styles from "./VacanciesListItem.module.css";

type VacanciesListItemProps = {
  title: string;
  employment: string;
  selected: boolean;
  onSelect: () => void;
  itemIndex: number;
};

export function VacanciesListItem({
  title,
  employment,
  selected,
  onSelect,
  itemIndex,
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
        <EditableText
          path={`vacancies.${itemIndex}.title`}
          label="Вакансия — название"
          className={styles["vacancies-list-item__title"]}
        >
          {title}
        </EditableText>
        <EditableText
          path={`vacancies.${itemIndex}.employment`}
          label="Вакансия — занятость"
          className={styles["vacancies-list-item__employment"]}
        >
          {employment}
        </EditableText>
      </span>
      <span className={styles["vacancies-list-item__arrow"]} aria-hidden>
        <ArrowIcon name="round" className={styles["vacancies-list-item__arrow-icon"]} />
      </span>
    </button>
  );
}
