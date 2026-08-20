"use client";

import { useMemo, useState, type KeyboardEvent } from "react";

import styles from "./AdminDatePicker.module.css";

const WEEKDAY_LABELS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] as const;

const MONTH_LABELS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
] as const;

type AdminDatePickerProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

type CalendarDay = {
  iso: string;
  day: number;
  outside: boolean;
};

function parseIsoDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }

  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return year && month && day ? `${day}.${month}.${year}` : "";
}

function buildCalendarDays(year: number, month: number): CalendarDay[] {
  const firstDayOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: CalendarDay[] = [];

  for (let index = 0; index < firstDayOffset; index += 1) {
    cells.push({ iso: "", day: 0, outside: true });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      iso: formatIsoDate(new Date(year, month, day)),
      day,
      outside: false,
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ iso: "", day: 0, outside: true });
  }

  return cells;
}

export function AdminDatePicker({ value, onChange, disabled }: AdminDatePickerProps) {
  const selectedDate = parseIsoDate(value);
  const initialView = selectedDate ?? new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(initialView.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialView.getMonth());

  const days = useMemo(
    () => buildCalendarDays(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  function close() {
    setOpen(false);
  }

  function openPicker() {
    if (disabled) {
      return;
    }

    const nextView = selectedDate ?? new Date();
    setViewYear(nextView.getFullYear());
    setViewMonth(nextView.getMonth());
    setOpen(true);
  }

  function shiftMonth(delta: number) {
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  }

  function selectDay(iso: string) {
    onChange(iso);
    close();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (disabled) {
      return;
    }

    if (!open && (event.key === "Enter" || event.key === " " || event.key === "ArrowDown")) {
      event.preventDefault();
      openPicker();
      return;
    }

    if (open && event.key === "Escape") {
      event.preventDefault();
      close();
    }
  }

  const rootClass = [
    styles["admin-date-picker"],
    open ? styles["admin-date-picker--open"] : "",
    disabled ? styles["admin-date-picker--disabled"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const labelClass = [
    styles["admin-date-picker__label"],
    value ? "" : styles["admin-date-picker__label--placeholder"],
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
        className={styles["admin-date-picker__trigger"]}
        aria-haspopup="dialog"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => (open ? close() : openPicker())}
      >
        <span className={labelClass}>{value ? formatDisplayDate(value) : "Выберите дату"}</span>
        <svg
          className={styles["admin-date-picker__icon"]}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          aria-hidden
        >
          <path
            d="M4.5 2.5v1.5M11.5 2.5v1.5M3 6.5h10M4 3h8a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open ? (
        <div className={styles["admin-date-picker__popover"]} role="dialog" aria-label="Календарь">
          <div className={styles["admin-date-picker__header"]}>
            <button
              type="button"
              className={styles["admin-date-picker__nav"]}
              aria-label="Предыдущий месяц"
              onClick={() => shiftMonth(-1)}
            >
              ‹
            </button>
            <span className={styles["admin-date-picker__title"]}>
              {MONTH_LABELS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              className={styles["admin-date-picker__nav"]}
              aria-label="Следующий месяц"
              onClick={() => shiftMonth(1)}
            >
              ›
            </button>
          </div>
          <div className={styles["admin-date-picker__weekdays"]}>
            {WEEKDAY_LABELS.map((label) => (
              <span key={label} className={styles["admin-date-picker__weekday"]}>
                {label}
              </span>
            ))}
          </div>
          <div className={styles["admin-date-picker__grid"]}>
            {days.map((cell, index) => {
              if (cell.outside) {
                return (
                  <span
                    key={`outside-${index}`}
                    className={[
                      styles["admin-date-picker__day"],
                      styles["admin-date-picker__day--outside"],
                    ].join(" ")}
                    aria-hidden
                  />
                );
              }

              const dayClass = [
                styles["admin-date-picker__day"],
                cell.iso === value ? styles["admin-date-picker__day--selected"] : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <button
                  key={cell.iso}
                  type="button"
                  className={dayClass}
                  aria-label={formatDisplayDate(cell.iso)}
                  aria-pressed={cell.iso === value}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectDay(cell.iso)}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
