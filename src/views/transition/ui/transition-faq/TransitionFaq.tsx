import type { TransitionQuestion } from "../../model/types";
import { TransitionIcon } from "../transition-icon";
import { TransitionSectionTitle } from "../transition-section-title";

import styles from "./TransitionFaq.module.css";

type TransitionFaqProps = {
  titleId: string;
  title: string;
  items: TransitionQuestion[];
};

export function TransitionFaq({ titleId, title, items }: TransitionFaqProps) {
  return (
    <div className={styles["transition-faq"]}>
      <TransitionSectionTitle id={titleId} title={title} className={styles["transition-faq__title"]} />
      <div className={styles["transition-faq__list"]}>
        {items.map((item, index) => (
          <details
            key={item.question}
            name={titleId}
            className={styles["transition-faq__item"]}
            open={index === 0}
          >
            <summary className={styles["transition-faq__question"]}>
              <TransitionIcon name={item.icon} />
              {item.question}
            </summary>
            <p className={styles["transition-faq__answer"]}>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
