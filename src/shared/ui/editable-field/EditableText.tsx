"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

import { useAdminBlockEditOptional } from "./context";
import { readHomeBlockField } from "./update-block-field";
import styles from "./EditableField.module.css";

type EditableTextProps = {
  path: string;
  label: string;
  className?: string;
  as?: ElementType;
  multiline?: boolean;
  editValue?: string;
  children: ReactNode;
};

function readDisplayText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  return "";
}

function placeCaretAtEnd(element: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

export function EditableText({
  path,
  label,
  className,
  as: Tag = "span",
  multiline = false,
  editValue,
  children,
}: EditableTextProps) {
  const blockEdit = useAdminBlockEditOptional();
  const editRef = useRef<HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const stored =
    blockEdit && editValue === undefined
      ? readHomeBlockField(blockEdit.block, path)
      : (editValue ?? "");
  const display = stored || readDisplayText(children);

  useEffect(() => {
    if (!isEditing) {
      setDraft(display);
    }
  }, [display, isEditing]);

  useEffect(() => {
    if (!isEditing || !editRef.current) {
      return;
    }
    const node = editRef.current;
    node.textContent = draft;
    node.focus();
    placeCaretAtEnd(node);
  }, [isEditing]);

  if (!blockEdit) {
    return <Tag className={className}>{children}</Tag>;
  }

  const { updateField } = blockEdit;

  function commitFromNode(node: HTMLElement) {
    const text = multiline ? node.innerText : node.innerText.replace(/\n/g, " ").trim();
    updateField(path, text);
    setDraft(text);
    setIsEditing(false);
  }

  function cancel() {
    setDraft(display);
    setIsEditing(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      cancel();
      return;
    }
    if (!multiline && event.key === "Enter") {
      event.preventDefault();
      if (editRef.current) {
        commitFromNode(editRef.current);
      }
    }
  }

  const fieldClass = [className, styles["editable-field"]].filter(Boolean).join(" ");

  if (!isEditing) {
    return (
      <Tag
        className={fieldClass}
        onClick={(event: MouseEvent<HTMLElement>) => {
          event.preventDefault();
          event.stopPropagation();
          setDraft(display);
          setIsEditing(true);
        }}
        role="button"
        tabIndex={0}
        aria-label={label}
        onKeyDown={(event: KeyboardEvent<HTMLElement>) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setDraft(display);
            setIsEditing(true);
          }
        }}
      >
        {display || children}
      </Tag>
    );
  }

  const editingClass = [
    fieldClass,
    styles["editable-field--editing"],
    multiline ? styles["editable-field--multiline"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={editRef as React.RefObject<never>}
      className={editingClass}
      contentEditable
      suppressContentEditableWarning
      aria-label={label}
      onInput={(event: FormEvent<HTMLElement>) => setDraft(event.currentTarget.innerText)}
      onBlur={(event: FormEvent<HTMLElement>) => commitFromNode(event.currentTarget)}
      onKeyDown={handleKeyDown}
    />
  );
}
