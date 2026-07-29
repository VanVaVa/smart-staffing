import type { AboutLeadershipMemberLayout } from "@/entities/landing";

import styles from "./AboutLeadershipCard.module.css";

type AboutLeadershipCardProps = {
  role: string;
  name: string;
  imageSrc: string;
  layout: AboutLeadershipMemberLayout;
};

export function AboutLeadershipCard({
  role,
  name,
  imageSrc,
  layout,
}: AboutLeadershipCardProps) {
  return (
    <article
      className={`${styles["about-leadership-card"]} ${styles[`about-leadership-card--${layout}`]}`}
    >
      <img
        src={imageSrc}
        alt=""
        className={styles["about-leadership-card__photo"]}
        width={603}
        height={396}
      />
      <div
        className={styles["about-leadership-card__overlay"]}
        aria-hidden
      />
      <div className={styles["about-leadership-card__caption"]}>
        <p className={styles["about-leadership-card__role"]}>{role}</p>
        <p className={styles["about-leadership-card__name"]}>{name}</p>
      </div>
    </article>
  );
}
