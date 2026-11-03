import { transitionTrack } from "../../model/content";
import { TransitionSectionTitle } from "../transition-section-title";

import styles from "./TransitionTrack.module.css";

type TransitionTrackProps = {
  titleId: string;
};

export function TransitionTrack({ titleId }: TransitionTrackProps) {
  return (
    <>
      <TransitionSectionTitle
        id={titleId}
        title={transitionTrack.title}
        lead={transitionTrack.lead}
        className={styles["transition-track__head"]}
      />
      <ul className={styles["transition-track"]}>
        <li className={styles["transition-track__network"]}>
          <span className={`${styles["transition-track__orb"]} ${styles["transition-track__orb--violet"]}`} aria-hidden />
          <span className={`${styles["transition-track__orb"]} ${styles["transition-track__orb--orange"]}`} aria-hidden />
          <p className={styles["transition-track__network-text"]}>
            {transitionTrack.networkLines.map((line) => (
              <span key={line} className={styles["transition-track__network-line"]}>
                {line}
              </span>
            ))}
          </p>
        </li>
        {transitionTrack.stats.map((stat) => (
          <li key={stat.value} className={styles["transition-track__stat"]}>
            <span className={styles["transition-track__value"]}>{stat.value}</span>
            <span className={styles["transition-track__text"]}>{stat.text}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
