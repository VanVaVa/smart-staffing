import type { AboutLeadershipMemberLayout } from "@/entities/landing/model/about-content";

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
      <div className={styles["about-leadership-card__media"]}>
        <img
          src={imageSrc}
          alt=""
          className={styles["about-leadership-card__photo"]}
          width={603}
          height={396}
        />
      </div>
      <div
        className={styles["about-leadership-card__overlay"]}
        aria-hidden
      />
      <div className={styles["about-leadership-card__caption"]}>
        <span className={styles["about-leadership-card__role"]}>
          {role}
        </span>
        <span className={styles["about-leadership-card__name"]}>
          {name}
        </span>
      </div>
    </article>
  );
}
