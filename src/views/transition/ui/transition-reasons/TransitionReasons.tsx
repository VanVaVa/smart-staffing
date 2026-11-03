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

const REFERRAL_SKILLS = ["Java", "Spring", "Kafka", "PostgreSQL"];

export function TransitionReasons({ titleId }: TransitionReasonsProps) {
  const { cards } = transitionReasons;

  return (
    <>
      <TransitionSectionTitle id={titleId} title={transitionReasons.title} />
      <div className={styles["transition-reasons"]}>
        <div className={styles["transition-reasons__head"]}>
          <p className={styles["transition-reasons__lead"]}>{transitionReasons.lead}</p>
          <p className={styles["transition-reasons__note"]}>{transitionReasons.note}</p>
        </div>
        <ul className={styles["transition-reasons__list"]}>
          <TransitionCard title={cards.recommendation} tone="dark">
            <div className={styles["transition-reasons__showcase"]}>
              <div className={styles["transition-reasons__plate"]} aria-hidden>
                <span className={styles["transition-reasons__plate-check"]}>✓</span>
                Опыт подтверждён
              </div>
              <div className={styles["transition-reasons__referral"]} aria-hidden>
                <div className={styles["transition-reasons__referee"]}>
                  <MockAvatar initials="ИК" tone="orange" />
                  <span className={styles["transition-reasons__referee-text"]}>
                    <span className={styles["transition-reasons__referee-name"]}>Рекомендует тимлид</span>
                    <span className={styles["transition-reasons__referee-note"]}>3 года в одной команде</span>
                  </span>
                </div>
                <div className={styles["transition-reasons__skills"]}>
                  {REFERRAL_SKILLS.map((skill) => (
                    <span key={skill} className={styles["transition-reasons__skill"]}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </TransitionCard>
          <TransitionCard title={cards.early}>
            <MockSheet className={styles["transition-reasons__sheet"]}>
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
              <div className={styles["transition-reasons__notice"]}>
                <span className={styles["transition-reasons__notice-head"]}>
                  <span>Срок предупреждения</span>
                  <span className={styles["transition-reasons__notice-left"]}>ещё 45 дней</span>
                </span>
                <span className={styles["transition-reasons__progress"]} />
              </div>
              <MockRow>
                <span>Предложения из&nbsp;сети</span>
                <MockChip tone="violet">2 оффера</MockChip>
              </MockRow>
            </MockSheet>
          </TransitionCard>
          <TransitionCard title={cards.team}>
            <MockSheet className={styles["transition-reasons__sheet"]}>
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
              <MockRow>
                <span>Вместе на&nbsp;проектах</span>
                <MockChip tone="muted">3 года</MockChip>
              </MockRow>
              <MockRow>
                <span>Готовы к&nbsp;переходу</span>
                <MockChip tone="success">4 из 6</MockChip>
              </MockRow>
            </MockSheet>
          </TransitionCard>
        </ul>
      </div>
    </>
  );
}
