import Image from "next/image";

import { IMAGE_QUALITY } from "@/shared/config/image-quality";

import type { TransitionStep } from "../../model/types";

import styles from "./TransitionSteps.module.css";

type TransitionStepsProps = {
  items: TransitionStep[];
};

export function TransitionSteps({ items }: TransitionStepsProps) {
  return (
    <ol className={styles["transition-steps"]}>
      {items.map((step) => (
        <li key={step.number} className={styles["transition-steps__item"]}>
          <Image
            className={styles["transition-steps__image"]}
            src={step.imageSrc}
            alt=""
            width={640}
            height={480}
            sizes="(max-width: 576px) 100vw, (max-width: 768px) 40vw, 33vw"
            quality={IMAGE_QUALITY.ui}
          />
          <div className={styles["transition-steps__body"]}>
            <div className={styles["transition-steps__top"]}>
              <span className={styles["transition-steps__number"]} aria-hidden>
                {step.number}
              </span>
              <h3 className={styles["transition-steps__title"]}>{step.title}</h3>
            </div>
            <p className={styles["transition-steps__text"]}>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
