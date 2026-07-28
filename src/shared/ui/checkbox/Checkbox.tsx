import type { InputHTMLAttributes, ReactNode } from "react";

import styles from "./Checkbox.module.css";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
};

export function Checkbox({ label, id, className, ...rest }: CheckboxProps) {
  const inputId = id ?? rest.name;

  return (
    <label
      className={[styles.checkbox, className].filter(Boolean).join(" ")}
      htmlFor={inputId}
    >
      <input
        id={inputId}
        type="checkbox"
        className={styles.checkbox__input}
        {...rest}
      />
      <span className={styles.checkbox__box} aria-hidden />
      <span className={styles.checkbox__label}>{label}</span>
    </label>
  );
}
