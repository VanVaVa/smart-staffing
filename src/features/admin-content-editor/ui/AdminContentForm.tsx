"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";

import { getAdminSection } from "@/entities/landing";
import { AdminFields, type AdminValues } from "@/shared/ui/admin-form";

import { deleteItemAction, saveItemAction, saveSingletonAction } from "../model/actions";

import styles from "./AdminContentForm.module.css";

type AdminContentFormProps = {
  sectionKey: string;
  itemId: string | null;
  isNew: boolean;
  initialValues: AdminValues;
};

export function AdminContentForm({
  sectionKey,
  itemId,
  isNew,
  initialValues,
}: AdminContentFormProps) {
  const router = useRouter();
  const section = getAdminSection(sectionKey);
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  if (!section) {
    return <p className={styles.error}>Раздел не найден</p>;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSaved(false);

    startTransition(async () => {
      const result =
        section?.mode === "singleton"
          ? await saveSingletonAction(sectionKey, values)
          : await saveItemAction(sectionKey, isNew ? null : itemId, values);

      if (result.error) {
        setError(result.error);
        return;
      }

      setSaved(true);
      const nextId = "itemId" in result ? result.itemId : null;
      if (nextId !== null && nextId !== itemId) {
        router.replace(`/admin/content/${sectionKey}/${nextId}`);
      }
    });
  }

  function handleDelete() {
    if (itemId === null || !window.confirm("Удалить эту запись?")) {
      return;
    }
    startTransition(async () => {
      await deleteItemAction(sectionKey, itemId);
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <AdminFields
        fields={section.fields}
        values={values}
        onChange={(next) => {
          setValues(next);
          setSaved(false);
        }}
        disabled={pending}
      />

      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}

      <div className={styles.actions}>
        <button type="submit" className={styles.save} disabled={pending}>
          {pending ? "Сохранение…" : "Сохранить"}
        </button>
        {saved && !pending ? <span className={styles.saved}>Сохранено</span> : null}
        {section.mode === "collection" && !isNew && itemId !== null ? (
          <button
            type="button"
            className={styles.delete}
            disabled={pending}
            onClick={handleDelete}
          >
            Удалить
          </button>
        ) : null}
      </div>
    </form>
  );
}
