"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { Button } from "@/shared/ui/button";
import { uploadAdminMedia } from "@/shared/lib/upload-admin-media";

import { useAdminBlockEditOptional } from "./context";
import { readHomeBlockField } from "./update-block-field";
import styles from "./EditableField.module.css";

type EditableMediaProps = {
  path: string;
  label: string;
  className?: string;
  children: ReactNode;
};

export function EditableMedia({
  path,
  label,
  className,
  children,
}: EditableMediaProps) {
  const blockEdit = useAdminBlockEditOptional();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const url = blockEdit ? readHomeBlockField(blockEdit.block, path) : "";

  useEffect(() => {
    if (!isEditing) {
      setDraft(url);
      setError(null);
    }
  }, [url, isEditing]);

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (wrapRef.current && !wrapRef.current.contains(target)) {
        setIsEditing(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isEditing]);

  if (!blockEdit) {
    return <div className={className}>{children}</div>;
  }

  const { updateField } = blockEdit;

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const nextUrl = await uploadAdminMedia(file);
      setDraft(nextUrl);
      updateField(path, nextUrl);
      setIsEditing(false);
    } catch {
      setError("Не удалось загрузить файл");
    } finally {
      setUploading(false);
    }
  }

  function commit() {
    updateField(path, draft.trim());
    setIsEditing(false);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      setDraft(url);
      setIsEditing(false);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      commit();
    }
  }

  const wrapClass = [
    className,
    styles["editable-media"],
    isEditing ? styles["editable-media--editing"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={wrapRef}
      className={wrapClass}
      onClick={(event) => {
        if (isEditing) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        setDraft(url);
        setIsEditing(true);
      }}
      onKeyDown={(event) => {
        if (!isEditing && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          setDraft(url);
          setIsEditing(true);
        }
      }}
      role={isEditing ? undefined : "button"}
      tabIndex={isEditing ? undefined : 0}
      aria-label={label}
    >
      {children}
      {isEditing ? (
        <div
          className={styles["editable-media__bar"]}
          onClick={(event) => event.stopPropagation()}
        >
          <input
            type="text"
            className={styles["editable-media__url"]}
            value={draft}
            aria-label={`${label} — URL`}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={commit}
          />
          <label className={styles["editable-media__upload"]}>
            <input
              type="file"
              accept="image/*,.pdf,.svg"
              className={styles["editable-media__file"]}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  void handleUpload(file);
                }
              }}
            />
            {uploading ? "…" : "Файл"}
          </label>
          <Button variant="primary" size="sm" type="button" onClick={commit}>
            OK
          </Button>
          {error ? <span className={styles["editable-media__error"]}>{error}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
