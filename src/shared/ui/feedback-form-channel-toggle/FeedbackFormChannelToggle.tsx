"use client";

import type { CSSProperties } from "react";

import styles from "./FeedbackFormChannelToggle.module.css";

export type FeedbackFormChannel = "telegram" | "phone" | "email";

type FeedbackFormChannelToggleProps = {
  value: FeedbackFormChannel;
  channels: FeedbackFormChannel[];
  onChange: (value: FeedbackFormChannel) => void;
};

const OPTIONS: { value: FeedbackFormChannel; label: string }[] = [
  { value: "telegram", label: "Telegram" },
  { value: "phone", label: "Телефон" },
  { value: "email", label: "Email" },
];

export function FeedbackFormChannelToggle({
  value,
  channels,
  onChange,
}: FeedbackFormChannelToggleProps) {
  const options = OPTIONS.filter((option) => channels.includes(option.value));
  const activeIndex = options.findIndex((option) => option.value === value);
  const index = activeIndex >= 0 ? activeIndex : 0;

  return (
    <div
      className={styles["feedback-form-channel-toggle"]}
      role="radiogroup"
      aria-label="Способ связи"
      style={{ "--active-index": index, "--toggle-segments": options.length } as CSSProperties}
    >
      <span className={styles["feedback-form-channel-toggle__thumb"]} aria-hidden />
      {options.map((option) => {
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
