import type { AboutLeadershipMemberLayout } from "@/entities/landing/model/about-content";
import { EditableMedia, EditableText } from "@/shared/ui/editable-field";

import styles from "./AboutLeadershipCard.module.css";

type AboutLeadershipCardProps = {
  role: string;
  name: string;
  imageSrc: string;
  layout: AboutLeadershipMemberLayout;
  itemIndex: number;
};

export function AboutLeadershipCard({
  role,
  name,
  imageSrc,
  layout,
  itemIndex,
}: AboutLeadershipCardProps) {
  const prefix = `members.${itemIndex}.`;

  return (
    <article
      className={`${styles["about-leadership-card"]} ${styles[`about-leadership-card--${layout}`]}`}
    >
      <EditableMedia
        path={`${prefix}imageSrc`}
        label="Руководство — фото"
        className={styles["about-leadership-card__media"]}
      >
        <img
          src={imageSrc}
          alt=""
          className={styles["about-leadership-card__photo"]}
          width={603}
          height={396}
        />
      </EditableMedia>
      <div
        className={styles["about-leadership-card__overlay"]}
        aria-hidden
      />
      <div className={styles["about-leadership-card__caption"]}>
        <EditableText
          path={`${prefix}role`}
          label="Руководство — роль"
          className={styles["about-leadership-card__role"]}
        >
          {role}
        </EditableText>
        <EditableText
          path={`${prefix}name`}
          label="Руководство — имя"
          className={styles["about-leadership-card__name"]}
        >
          {name}
        </EditableText>
      </div>
    </article>
  );
}
