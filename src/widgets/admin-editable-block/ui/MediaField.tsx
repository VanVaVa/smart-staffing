"use client";

import { useRef, useState } from "react";

import { Input } from "@/shared/ui/input";
import { uploadAdminMedia } from "@/shared/lib/upload-admin-media";

import styles from "./MediaField.module.css";

type MediaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function MediaField({ label, value, onChange }: MediaFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange() {
    const file = inputRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const url = await uploadAdminMedia(file);
      onChange(url);
    } catch {
      setError("Не удалось загрузить файл");
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className={styles["media-field"]}>
      <Input label={label} value={value} onChange={(e) => onChange(e.target.value)} />
      <div className={styles["media-field__actions"]}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.pdf,.svg"
          className={styles["media-field__file"]}
          onChange={handleFileChange}
        />
        <button
          type="button"
          className={styles["media-field__upload"]}
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "Загрузка…" : "Загрузить файл"}
        </button>
      </div>
      {error ? <p className={styles["media-field__error"]}>{error}</p> : null}
    </div>
  );
}
