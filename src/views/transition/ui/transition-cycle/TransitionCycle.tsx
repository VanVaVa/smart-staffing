import { transitionCycle } from "../../model/content";
import { TransitionSectionTitle } from "../transition-section-title";

import styles from "./TransitionCycle.module.css";

const ARROW_HEADS = [
  "translate(200 50)",
  "translate(350 200) rotate(90)",
  "translate(200 350) rotate(180)",
  "translate(50 200) rotate(270)",
];

type TransitionCycleProps = {
  titleId: string;
};

export function TransitionCycle({ titleId }: TransitionCycleProps) {
  return (
    <>
      <TransitionSectionTitle
        id={titleId}
        title={transitionCycle.title}
        lead={transitionCycle.subtitle}
        align="center"
      />
      <div className={styles["transition-cycle"]}>
        <span className={styles["transition-cycle__orb"]} aria-hidden />
        <figure className={styles["transition-cycle__figure"]} aria-label={transitionCycle.label}>
          <div className={styles["transition-cycle__wheel"]}>
            <svg className={styles["transition-cycle__ring"]} viewBox="0 0 400 400" aria-hidden>
              <circle cx="200" cy="200" r="150" />
              {ARROW_HEADS.map((transform) => (
                <path key={transform} d="M0-7 9 0 0 7" transform={transform} />
              ))}
            </svg>
            <ol className={styles["transition-cycle__nodes"]}>
              {transitionCycle.nodes.map((node) => (
                <li key={node.title} className={styles["transition-cycle__node"]}>
                  <span className={styles["transition-cycle__node-title"]}>{node.title}</span>
                  <span className={styles["transition-cycle__node-text"]}>{node.text}</span>
                </li>
              ))}
            </ol>
          </div>
          <figcaption className={styles["transition-cycle__loop"]}>{transitionCycle.loop}</figcaption>
        </figure>
      </div>
    </>
  );
}
