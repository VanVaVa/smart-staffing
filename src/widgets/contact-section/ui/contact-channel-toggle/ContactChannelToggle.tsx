"use client";

import type { CSSProperties } from "react";

import styles from "./ContactChannelToggle.module.css";

export type ContactChannel = "telegram" | "phone" | "email";

type ContactChannelToggleProps = {
  value: ContactChannel;
  onChange: (value: ContactChannel) => void;
};

const OPTIONS: { value: ContactChannel; label: string }[] = [
  { value: "telegram", label: "Telegram" },
  { value: "phone", label: "Телефон" },
  { value: "email", label: "Email" },
];

export function ContactChannelToggle({ value, onChange }: ContactChannelToggleProps) {
  const activeIndex = OPTIONS.findIndex((option) => option.value === value);
  const index = activeIndex >= 0 ? activeIndex : 0;

  return (
    <div
      className={styles["contact-channel-toggle"]}
      role="radiogroup"
      aria-label="Способ связи"
      style={{ "--active-index": index } as CSSProperties}
    >
      <span className={styles["contact-channel-toggle__thumb"]} aria-hidden />
      {OPTIONS.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={[
              styles["contact-channel-toggle__option"],
              isActive ? styles["contact-channel-toggle__option--active"] : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
