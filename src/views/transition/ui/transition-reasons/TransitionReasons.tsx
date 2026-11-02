import { transitionReasons } from "../../model/content";
import { TransitionCard } from "../transition-card";
import { MockAvatar, MockChip, MockRow, MockSheet } from "../transition-mock";
import { TransitionSectionTitle } from "../transition-section-title";

import styles from "./TransitionReasons.module.css";

type TransitionReasonsProps = {
  titleId: string;
};

const TEAM = [
  { initials: "АС", tone: "violet" },
  { initials: "МП", tone: "orange" },
  { initials: "ДК", tone: "blue" },
  { initials: "+3", tone: "grey" },
] as const;

const TEAM_ROLES = ["Backend", "Frontend", "QA", "Аналитик"];

export function TransitionReasons({ titleId }: TransitionReasonsProps) {
  const { cards } = transitionReasons;
  const cardClass = styles["transition-reasons__card"];

  return (
    <>
      <TransitionSectionTitle
        id={titleId}
        title={transitionReasons.title}
        lead={transitionReasons.lead}
      />
      <ul className={styles["transition-reasons"]}>
        <TransitionCard title={cards.recommendation} tone="dark" className={cardClass}>
          <div className={styles["transition-reasons__plate"]} aria-hidden>
            <span className={styles["transition-reasons__plate-check"]}>✓</span>
            Опыт подтверждён
          </div>
          <div className={styles["transition-reasons__lines"]} aria-hidden>
            <span />
            <span />
            <span />
          </div>
        </TransitionCard>
        <TransitionCard title={cards.early} className={cardClass}>
          <MockSheet>
            <span className={styles["transition-reasons__label"]}>Статус специалиста</span>
            <MockRow>
              <span className={`${styles["transition-reasons__dot"]} ${styles["transition-reasons__dot--live"]}`} />
              <span>Доступен сейчас</span>
              <MockChip tone="accent">Срок предупреждения</MockChip>
            </MockRow>
            <MockRow>
              <span className={styles["transition-reasons__dot"]} />
              <span>Открытый рынок</span>
              <MockChip tone="muted">Позже</MockChip>
            </MockRow>
          </MockSheet>
        </TransitionCard>
        <TransitionCard title={cards.team} className={cardClass}>
          <MockSheet>
            <div className={styles["transition-reasons__avatars"]}>
              {TEAM.map((member) => (
                <MockAvatar key={member.initials} initials={member.initials} tone={member.tone} />
              ))}
            </div>
            <span className={styles["transition-reasons__team"]}>Команда целиком</span>
            <div className={styles["transition-reasons__roles"]}>
              {TEAM_ROLES.map((role) => (
                <MockChip key={role} tone="violet">
                  {role}
                </MockChip>
              ))}
            </div>
          </MockSheet>
        </TransitionCard>
      </ul>
      <p className={styles["transition-reasons__note"]}>{transitionReasons.note}</p>
    </>
  );
}
