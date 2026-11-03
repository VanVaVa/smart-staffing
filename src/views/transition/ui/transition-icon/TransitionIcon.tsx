import type { ReactNode } from "react";

import type { TransitionIconName } from "../../model/types";

import styles from "./TransitionIcon.module.css";

const ICON_SHAPES = {
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20v-1a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5v1" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M21.5 20v-1a5 5 0 0 0-3.5-4.8" />
    </>
  ),
  wallet: (
    <>
      <path d="M19 7V5.5A1.5 1.5 0 0 0 17.5 4H5a2 2 0 0 0 0 4h14.5A1.5 1.5 0 0 1 21 9.5v9a1.5 1.5 0 0 1-1.5 1.5H5a2 2 0 0 1-2-2V6" />
      <path d="M17 14h.01" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.8 2.8L16.5 9" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3M12 14.5v2" />
    </>
  ),
  userCheck: (
    <>
      <circle cx="9" cy="8" r="4" />
      <path d="M2.5 20v-1a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5v1" />
      <path d="m16 11 2 2 4-4" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.5h.01" />
    </>
  ),
} satisfies Record<TransitionIconName, ReactNode>;

type TransitionIconProps = {
  name: TransitionIconName;
  className?: string;
};

export function TransitionIcon({ name, className }: TransitionIconProps) {
  const rootClass = [styles["transition-icon"], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={rootClass} aria-hidden>
      <svg viewBox="0 0 24 24" className={styles["transition-icon__glyph"]}>
        {ICON_SHAPES[name]}
      </svg>
    </span>
  );
}
