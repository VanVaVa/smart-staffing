import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { Container } from "@/shared/ui/container";

import { transitionGains } from "../../model/content";

import styles from "./TransitionGains.module.css";

export function TransitionGains() {
  return (
    <section className={styles["transition-gains"]} aria-label={transitionGains.label}>
      <Container>
        <ul className={styles["transition-gains__list"]}>
          {transitionGains.items.map((gain) => (
            <li key={gain} className={styles["transition-gains__item"]}>
              <span className={styles["transition-gains__marker"]} aria-hidden>
                <ArrowIcon name="cta" className={styles["transition-gains__marker-icon"]} />
              </span>
              <span className={styles["transition-gains__text"]}>{gain}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
