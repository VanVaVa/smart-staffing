import { ArrowIcon } from "@/shared/ui/arrow-icon";

import styles from "./AboutPartnerAwardCard.module.css";

type AboutPartnerAwardCardProps = {
  title: string;
  status: string;
  nomination: string;
  project: string;
  href?: string;
  onClick?: () => void;
};

export function AboutPartnerAwardCard({
  title,
  status,
  nomination,
  project,
  href,
  onClick,
}: AboutPartnerAwardCardProps) {
  const rootClass = styles["about-partner-award-card"];
  const ariaLabel = `Подробнее: ${title.replace(/\n/g, " ")}`;

  const content = (
    <>
      <h3 className={styles["about-partner-award-card__title"]}>
        {title}
      </h3>
      <div className={styles["about-partner-award-card__body"]}>
        <dl className={styles["about-partner-award-card__fields"]}>
          <div className={styles["about-partner-award-card__field"]}>
            <dt className={styles["about-partner-award-card__field-label"]}>Статус</dt>
            <dd className={styles["about-partner-award-card__field-value"]}>
              <span>
                {status}
              </span>
            </dd>
          </div>
          <div className={styles["about-partner-award-card__field"]}>
            <dt className={styles["about-partner-award-card__field-label"]}>Номинация</dt>
            <dd className={styles["about-partner-award-card__field-value"]}>
              <span>
                {nomination}
              </span>
            </dd>
          </div>
          <div className={styles["about-partner-award-card__field"]}>
            <dt className={styles["about-partner-award-card__field-label"]}>Проект</dt>
            <dd className={styles["about-partner-award-card__field-value"]}>
              <span>
                {project}
              </span>
            </dd>
          </div>
        </dl>
        <span className={styles["about-partner-award-card__action"]} aria-hidden>
          <ArrowIcon
            name="round"
            className={styles["about-partner-award-card__action-icon"]}
          />
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        className={rootClass}
        data-partner-award-card
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={rootClass}
      data-partner-award-card
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
