"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";

import type { FooterBlockProps } from "@/entities/landing/model/footer-blocks";
import type { AdminValues } from "@/shared/ui/admin-form";
import { PublicPageShell } from "@/widgets/public-page-shell";
import { saveItemAction } from "@/features/admin-content-editor/model/actions";

import { AdminClientsPageCanvas } from "./AdminClientsPageCanvas";
import { AdminClientsPageToolbar } from "./AdminClientsPageToolbar";

import styles from "./AdminClientsPageEditor.module.css";

type AdminClientsPageEditorProps = {
  itemId: string;
  initialValues: AdminValues;
  footerContent: FooterBlockProps;
};

export function AdminClientsPageEditor({
  itemId,
  initialValues,
  footerContent,
}: AdminClientsPageEditorProps) {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSaved(false);

    startTransition(async () => {
      const result = await saveItemAction("clients-pages", itemId, values);
      if (result.error) {
        setError(result.error);
        return;
      }
      setSaved(true);
      const nextId = "itemId" in result ? result.itemId : null;
      if (nextId !== null && nextId !== itemId) {
        router.replace(`/admin/content/clients-pages/${nextId}`);
      }
    });
  }

  return (
    <div className={styles.root}>
      <form id="admin-clients-page-form" onSubmit={handleSubmit}>
        <AdminClientsPageToolbar
          values={values}
          onChange={setValues}
          onSubmit={handleSubmit}
          pending={pending}
          saved={saved}
          error={error}
          backHref="/admin/content/clients-pages"
        />
      </form>
      <PublicPageShell footerContent={footerContent}>
        <AdminClientsPageCanvas
          values={values}
          disabled={pending}
          onChange={(next) => {
            setValues(next);
            setSaved(false);
          }}
        />
      </PublicPageShell>
    </div>
  );
}
