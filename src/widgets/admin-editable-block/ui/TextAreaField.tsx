import styles from "./TextAreaField.module.css";

type TextAreaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
};

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 4,
}: TextAreaFieldProps) {
  const id = label.replace(/\s+/g, "-").toLowerCase();

  return (
    <label className={styles["text-area-field"]} htmlFor={id}>
      <span className={styles["text-area-field__label"]}>{label}</span>
      <textarea
        id={id}
        className={styles["text-area-field__control"]}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
