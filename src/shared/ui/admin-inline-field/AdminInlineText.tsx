"use client";

import type { TextareaHTMLAttributes } from "react";

import styles from "./AdminInlineText.module.css";

type AdminInlineTextProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  multiline?: boolean;
  variant?: "default" | "heading";
  className?: string;
  placeholder?: string;
};

export function AdminInlineText({
  value,
  onChange,
  disabled,
  multiline,
  variant = "default",
  className,
  placeholder,
}: AdminInlineTextProps) {
  const classNames = [
    styles["admin-inline-text"],
    multiline ? styles["admin-inline-text--multiline"] : "",
    variant === "heading" ? styles["admin-inline-text--heading"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (multiline) {
    return (
      <textarea
        className={classNames}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        rows={1}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  return (
    <input
      className={classNames}
      type="text"
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
