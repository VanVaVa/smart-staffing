"use client";

import { useId, useState, type KeyboardEvent } from "react";

import styles from "./AdminSelect.module.css";

export type AdminSelectOption = {
  value: string;
  label: string;
};

type AdminSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: readonly AdminSelectOption[];
  disabled?: boolean;
};

export function AdminSelect({ value, onChange, options, disabled }: AdminSelectProps) {
  const listboxId = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : options[0];
  const displayLabel = selectedOption?.label ?? "";

  function close() {
    setOpen(false);
    setActiveIndex(null);
  }

  function openMenu() {
    if (disabled) return;
    setOpen(true);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }

  function selectIndex(index: number) {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    close();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (disabled) return;

    if (!open) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openMenu();
      }
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => {
        const start = current ?? selectedIndex;
        return start < options.length - 1 ? start + 1 : 0;
      });
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => {
        const start = current ?? selectedIndex;
        return start > 0 ? start - 1 : options.length - 1;
      });
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (activeIndex !== null) {
        selectIndex(activeIndex);
      }
    }
  }

  const rootClass = [
    styles["admin-select"],
    open ? styles["admin-select--open"] : "",
    disabled ? styles["admin-select--disabled"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={rootClass}
      onKeyDown={handleKeyDown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          close();
        }
      }}
    >
      <button
        type="button"
        className={styles["admin-select__trigger"]}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        disabled={disabled}
        onClick={() => (open ? close() : openMenu())}
      >
        <span className={styles["admin-select__label"]}>{displayLabel}</span>
        <svg
          className={styles["admin-select__chevron"]}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          aria-hidden
        >
          <path
            d="M3 4.5 6 7.5 9 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open ? (
        <ul id={listboxId} className={styles["admin-select__menu"]} role="listbox">
          {options.map((option, index) => {
            const optionClass = [
              styles["admin-select__option"],
              option.value === value ? styles["admin-select__option--selected"] : "",
              activeIndex === index ? styles["admin-select__option--active"] : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <li
                key={option.value}
                className={optionClass}
                role="option"
                aria-selected={option.value === value}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectIndex(index)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
