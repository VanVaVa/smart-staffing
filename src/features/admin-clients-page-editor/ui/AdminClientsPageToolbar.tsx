"use client";

import Link from "next/link";
import type { FormEvent } from "react";

import type { AdminValues } from "@/shared/ui/admin-form";
import { groupValues, patchClientsPageValues, patchPageMeta } from "@/entities/landing/model/clients-admin-form";

import styles from "./AdminClientsPageToolbar.module.css";

type AdminClientsPageToolbarProps = {
  values: AdminValues;
  onChange: (values: AdminValues) => void;
  onSubmit: (event: FormEvent) => void;
  pending: boolean;
  saved: boolean;
  error: string | null;
  backHref: string;
};

function text(values: AdminValues, key: string): string {
  return typeof values[key] === "string" ? values[key] : "";
}

export function AdminClientsPageToolbar({
  values,
  onChange,
  onSubmit,
  pending,
  saved,
  error,
  backHref,
}: AdminClientsPageToolbarProps) {
  const segment = text(values, "segment");
  const meta = groupValues(values, "meta");
  const publicHref = segment ? `/clients/${segment}` : "/clients";

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__row}>
        <Link className={styles.toolbar__back} href={backHref}>
          ← Страницы clients
        </Link>
        <label className={styles.toolbar__field}>
          <span className={styles.toolbar__label}>Slug</span>
          <input
            className={styles.toolbar__input}
            value={segment}
            disabled={pending}
            onChange={(event) => onChange(patchClientsPageValues(values, { segment: event.target.value }))}
          />
        </label>
        <label className={styles.toolbar__field}>
          <span className={styles.toolbar__label}>Подпись в меню</span>
          <input
            className={styles.toolbar__input}
            value={text(values, "navLabel")}
            disabled={pending}
            onChange={(event) =>
              onChange(patchClientsPageValues(values, { navLabel: event.target.value }))
            }
          />
        </label>
        <label className={styles.toolbar__checkbox}>
          <input
            type="checkbox"
            checked={values.hidden === true}
            disabled={pending}
            onChange={(event) =>
              onChange(patchClientsPageValues(values, { hidden: event.target.checked }))
            }
          />
          <span>Скрыта</span>
        </label>
        <div className={styles.toolbar__actions}>
          <a className={styles.toolbar__link} href={publicHref} target="_blank" rel="noreferrer">
            Открыть на сайте
          </a>
          <button
            type="submit"
            form="admin-clients-page-form"
            className={styles.toolbar__save}
            disabled={pending}
          >
            {pending ? "Сохранение…" : "Сохранить"}
          </button>
          {saved && !pending ? <span className={styles.toolbar__saved}>Сохранено</span> : null}
        </div>
      </div>
      <details className={styles.toolbar__details}>
        <summary className={styles.toolbar__summary}>SEO</summary>
        <div className={styles.toolbar__seo}>
          <label className={styles.toolbar__field}>
            <span className={styles.toolbar__label}>Title</span>
            <input
              className={styles.toolbar__input}
              value={text(meta, "title")}
              disabled={pending}
              onChange={(event) =>
                onChange(patchPageMeta(values, { title: event.target.value }))
              }
            />
          </label>
          <label className={styles.toolbar__field}>
            <span className={styles.toolbar__label}>Description</span>
            <textarea
              className={styles.toolbar__textarea}
              value={text(meta, "description")}
              disabled={pending}
              onChange={(event) =>
                onChange(patchPageMeta(values, { description: event.target.value }))
              }
            />
          </label>
        </div>
      </details>
      {error ? (
        <p className={styles.toolbar__error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
