import type { InputHTMLAttributes } from "react";

import styles from "./Input.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, id, className, error, ...rest }: InputProps) {
  const inputId = id ?? rest.name;

  const inputClass = [
    styles.input__control,
    error ? styles["input__control--error"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={styles.input} htmlFor={inputId}>
      {label ? <span className={styles.input__label}>{label}</span> : null}
      <input
        id={inputId}
        className={inputClass}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      {error ? <span className={styles.input__error}>{error}</span> : null}
    </label>
  );
}
