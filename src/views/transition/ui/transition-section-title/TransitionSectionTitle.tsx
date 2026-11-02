import styles from "./TransitionSectionTitle.module.css";

type TransitionSectionTitleProps = {
  id: string;
  title: string;
  lead?: string;
  tone?: "light" | "dark";
  className?: string;
};

export function TransitionSectionTitle({
  id,
  title,
  lead,
  tone = "light",
  className,
}: TransitionSectionTitleProps) {
  const rootClass = [
    styles["transition-section-title"],
    tone === "dark" ? styles["transition-section-title--dark"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={rootClass}>
      <h2 id={id} className={styles["transition-section-title__title"]}>
        {title}
      </h2>
      {lead ? <p className={styles["transition-section-title__lead"]}>{lead}</p> : null}
    </header>
  );
}
