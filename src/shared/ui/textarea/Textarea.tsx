import type { TextareaHTMLAttributes } from "react";

import styles from "./Textarea.module.css";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export function Textarea({ label, id, className, error, ...rest }: TextareaProps) {
  const fieldId = id ?? rest.name;

  const controlClass = [
    styles.textarea__control,
    error ? styles["textarea__control--error"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={styles.textarea} htmlFor={fieldId}>
      {label ? <span className={styles.textarea__label}>{label}</span> : null}
      <textarea
        id={fieldId}
        className={controlClass}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      {error ? <span className={styles.textarea__error}>{error}</span> : null}
    </label>
  );
}
