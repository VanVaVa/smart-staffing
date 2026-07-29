"use client";

import type { CSSProperties } from "react";

import styles from "./FeedbackFormChannelToggle.module.css";

export type FeedbackFormChannel = "telegram" | "phone" | "email";

type FeedbackFormChannelToggleProps = {
  value: FeedbackFormChannel;
  onChange: (value: FeedbackFormChannel) => void;
};

const OPTIONS: { value: FeedbackFormChannel; label: string }[] = [
  { value: "telegram", label: "Telegram" },
  { value: "phone", label: "Телефон" },
  { value: "email", label: "Email" },
];

export function FeedbackFormChannelToggle({
  value,
  onChange,
}: FeedbackFormChannelToggleProps) {
  const activeIndex = OPTIONS.findIndex((option) => option.value === value);
  const index = activeIndex >= 0 ? activeIndex : 0;

  return (
    <div
      className={styles["feedback-form-channel-toggle"]}
      role="radiogroup"
      aria-label="Способ связи"
      style={{ "--active-index": index } as CSSProperties}
    >
      <span className={styles["feedback-form-channel-toggle__thumb"]} aria-hidden />
      {OPTIONS.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={[
              styles["feedback-form-channel-toggle__option"],
              isActive ? styles["feedback-form-channel-toggle__option--active"] : "",
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
