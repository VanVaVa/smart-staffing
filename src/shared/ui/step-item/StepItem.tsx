import styles from "./StepItem.module.css";

type StepItemProps = {
  step: number;
  title: string;
  text: string;
};

export function StepItem({ step, title, text }: StepItemProps) {
  return (
    <article className={styles["step-item"]}>
      <span className={styles["step-item__number"]}>{step}</span>
      <h3 className={styles["step-item__title"]}>{title}</h3>
      <p className={styles["step-item__text"]}>{text}</p>
    </article>
  );
}
