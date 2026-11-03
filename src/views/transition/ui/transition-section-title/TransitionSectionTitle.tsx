import type { TransitionAccentText } from "../../model/types";

import styles from "./TransitionSectionTitle.module.css";

type TransitionSectionTitleProps = {
  id: string;
  title: string;
  lead?: string | TransitionAccentText;
  tone?: "light" | "dark";
  align?: "start" | "center";
  className?: string;
};

export function TransitionSectionTitle({
  id,
  title,
  lead,
  tone = "light",
  align = "start",
  className,
}: TransitionSectionTitleProps) {
  const rootClass = [
    styles["transition-section-title"],
    tone === "dark" ? styles["transition-section-title--dark"] : "",
    align === "center" ? styles["transition-section-title--center"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={rootClass}>
      <h2 id={id} className={styles["transition-section-title__title"]}>
        {title}
      </h2>
      {lead ? (
        <p className={styles["transition-section-title__lead"]}>
          {typeof lead === "string" ? (
            lead
          ) : (
            <>
              {lead.before}
              <span className={styles["transition-section-title__accent"]}>{lead.accent}</span>
              {lead.after}
            </>
          )}
        </p>
      ) : null}
    </header>
  );
}
