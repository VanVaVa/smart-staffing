import { Fragment } from "react";

import type { TransitionFactsContent } from "../../model/types";
import { TransitionSectionTitle } from "../transition-section-title";

import styles from "./TransitionFacts.module.css";

type TransitionFactsProps = {
  titleId: string;
  content: TransitionFactsContent;
};

export function TransitionFacts({ titleId, content }: TransitionFactsProps) {
  return (
    <>
      <TransitionSectionTitle id={titleId} title={content.title} lead={content.lead} tone="dark" />
      <ul className={styles["transition-facts__list"]}>
        {content.items.map((fact) => (
          <li key={fact.value} className={styles["transition-facts__item"]}>
            <span className={styles["transition-facts__value"]}>{fact.value}</span>
            <span className={styles["transition-facts__label"]}>{fact.label}</span>
            <p className={styles["transition-facts__text"]}>{fact.text}</p>
            <p className={styles["transition-facts__sources"]}>
              Источники:{" "}
              {fact.sources.map((source, index) => (
                <Fragment key={source.href + source.label}>
                  {index > 0 ? ", " : null}
                  <a
                    className={styles["transition-facts__source"]}
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.label}
                  </a>
                </Fragment>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
