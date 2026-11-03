import type { ReactNode } from "react";

import styles from "./TransitionMock.module.css";

type ChildrenProps = {
  children: ReactNode;
};

type MockSheetProps = ChildrenProps & {
  compact?: boolean;
  className?: string;
};

export function MockSheet({ compact = false, className, children }: MockSheetProps) {
  const rootClass = [
    styles["transition-mock__sheet"],
    compact ? styles["transition-mock__sheet--compact"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass} aria-hidden>
      {children}
    </div>
  );
}

type MockTabsProps = {
  items: string[];
  active: number;
};

export function MockTabs({ items, active }: MockTabsProps) {
  return (
    <div className={styles["transition-mock__tabs"]}>
      {items.map((item, index) => (
        <span
          key={item}
          className={[
            styles["transition-mock__tab"],
            index === active ? styles["transition-mock__tab--active"] : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function MockRow({ children }: ChildrenProps) {
  return <div className={styles["transition-mock__row"]}>{children}</div>;
}

type MockToggleProps = {
  on: boolean;
};

export function MockToggle({ on }: MockToggleProps) {
  return (
    <span
      className={[styles["transition-mock__toggle"], on ? styles["transition-mock__toggle--on"] : ""]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

type MockChipProps = ChildrenProps & {
  tone: "accent" | "success" | "muted" | "violet";
};

export function MockChip({ tone, children }: MockChipProps) {
  return (
    <span className={`${styles["transition-mock__chip"]} ${styles[`transition-mock__chip--${tone}`]}`}>
      {children}
    </span>
  );
}

type MockAvatarProps = {
  initials: string;
  tone: "violet" | "orange" | "blue" | "grey";
};

export function MockAvatar({ initials, tone }: MockAvatarProps) {
  return (
    <span className={`${styles["transition-mock__avatar"]} ${styles[`transition-mock__avatar--${tone}`]}`}>
      {initials}
    </span>
  );
}
