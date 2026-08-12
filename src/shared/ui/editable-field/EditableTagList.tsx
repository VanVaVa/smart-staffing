"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { Badge } from "@/shared/ui/badge";

import { useAdminBlockEditOptional } from "./context";
import styles from "./EditableTagList.module.css";

type EditableTagListProps = {
  path: string;
  tags: string[];
  className?: string;
  itemClassName?: string;
};

function EditableTag({
  value,
  onCommit,
}: {
  value: string;
  onCommit: (next: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) {
      setDraft(value);
    }
  }, [value, isEditing]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  function commit() {
    onCommit(draft.trim() || value);
    setIsEditing(false);
  }

  if (!isEditing) {
    return (
      <span
        className={styles["editable-tag-list__tag-wrap"]}
        role="button"
        tabIndex={0}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setIsEditing(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsEditing(true);
          }
        }}
      >
        <Badge variant="tag" className={styles["editable-tag-list__tag"]}>
          {value}
        </Badge>
      </span>
    );
  }

  return (
    <input
      ref={inputRef}
      type="text"
      className={styles["editable-tag-list__input"]}
      value={draft}
      onChange={(event) => setDraft(event.target.value)}
      onBlur={commit}
      onKeyDown={(event: KeyboardEvent) => {
        if (event.key === "Enter") {
          event.preventDefault();
          commit();
        }
        if (event.key === "Escape") {
          setDraft(value);
          setIsEditing(false);
        }
      }}
    />
  );
}

export function EditableTagList({
  path,
  tags,
  className,
  itemClassName,
}: EditableTagListProps) {
  const blockEdit = useAdminBlockEditOptional();

  if (!blockEdit) {
    return (
      <ul className={className}>
        {tags.map((tag) => (
          <li key={tag} className={itemClassName}>
            <Badge variant="tag">{tag}</Badge>
          </li>
        ))}
      </ul>
    );
  }

  const { updateField } = blockEdit;

  function updateTags(next: string[]) {
    updateField(path, next);
  }

  return (
    <ul className={[className, styles["editable-tag-list"]].filter(Boolean).join(" ")}>
      {tags.map((tag, index) => (
        <li
          key={`${tag}-${index}`}
          className={[itemClassName, styles["editable-tag-list__item"]].filter(Boolean).join(" ")}
        >
          <EditableTag
            value={tag}
            onCommit={(next) => {
              const copy = [...tags];
              copy[index] = next;
              updateTags(copy);
            }}
          />
          <button
            type="button"
            className={styles["editable-tag-list__remove"]}
            aria-label="Удалить тег"
            onClick={() => updateTags(tags.filter((_, i) => i !== index))}
          >
            ✕
          </button>
        </li>
      ))}
      <li className={styles["editable-tag-list__add-wrap"]}>
        <button
          type="button"
          className={styles["editable-tag-list__add"]}
          onClick={() => updateTags([...tags, "Новый тег"])}
        >
          + Тег
        </button>
      </li>
    </ul>
  );
}
