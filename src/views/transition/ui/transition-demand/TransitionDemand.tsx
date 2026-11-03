import { Button } from "@/shared/ui/button";

import { TRANSITION_SECTION_IDS, transitionDemand } from "../../model/content";

import styles from "./TransitionDemand.module.css";

export function TransitionDemand() {
  return (
    <div className={styles["transition-demand"]}>
      <span className={`${styles["transition-demand__orb"]} ${styles["transition-demand__orb--orange"]}`} aria-hidden />
      <span className={`${styles["transition-demand__orb"]} ${styles["transition-demand__orb--violet"]}`} aria-hidden />
      <p className={styles["transition-demand__text"]}>{transitionDemand.text}</p>
      <Button
        variant="primary"
        size="md"
        withArrow
        href={`#${TRANSITION_SECTION_IDS.lead}`}
        className={styles["transition-demand__cta"]}
      >
        <span>{transitionDemand.cta}</span>
      </Button>
    </div>
  );
}
