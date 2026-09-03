"use client";

import type { Editor } from "@tiptap/core";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

import styles from "./AdminRichTextEditor.module.css";

type AdminRichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  minHeight?: number;
};

type ToolbarButtonProps = {
  label: string;
  tooltip: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

function ToolbarButton({ label, tooltip, active, disabled, onClick }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      className={`${styles["admin-rich-text__button"]} ${
        active ? styles["admin-rich-text__button--active"] : ""
      }`}
      aria-label={tooltip}
      title={tooltip}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function normalizeEditorHtml(html: string): string {
  return html === "<p></p>" ? "" : html;
}

function toEditorContent(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }
  if (/<[^>]+>/.test(trimmed)) {
    return trimmed;
  }
  return `<p>${trimmed}</p>`;
}

type AdminRichTextToolbarProps = {
  editor: Editor | null;
  disabled?: boolean;
};

function AdminRichTextToolbar({ editor, disabled }: AdminRichTextToolbarProps) {
  const activeState = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => {
      if (!currentEditor) {
        return {
          bold: false,
          italic: false,
          heading2: false,
          heading3: false,
          bulletList: false,
          orderedList: false,
          blockquote: false,
          link: false,
        };
      }

      return {
        bold: currentEditor.isActive("bold"),
        italic: currentEditor.isActive("italic"),
        heading2: currentEditor.isActive("heading", { level: 2 }),
        heading3: currentEditor.isActive("heading", { level: 3 }),
        bulletList: currentEditor.isActive("bulletList"),
        orderedList: currentEditor.isActive("orderedList"),
        blockquote: currentEditor.isActive("blockquote"),
        link: currentEditor.isActive("link"),
      };
    },
  });

  function setLink() {
    if (!editor) {
      return;
    }

    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", previousUrl ?? "https://");
    if (url === null) {
      return;
    }

    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  }

  return (
    <div className={styles["admin-rich-text__toolbar"]}>
      <ToolbarButton
        label="B"
        tooltip="Жирный"
        active={activeState.bold}
        disabled={disabled || !editor}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      />
      <ToolbarButton
        label="I"
        tooltip="Курсив"
        active={activeState.italic}
        disabled={disabled || !editor}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      />
      <ToolbarButton
        label="H2"
        tooltip="Заголовок 2"
        active={activeState.heading2}
        disabled={disabled || !editor}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
      />
      <ToolbarButton
        label="H3"
        tooltip="Заголовок 3"
        active={activeState.heading3}
        disabled={disabled || !editor}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
      />
      <ToolbarButton
        label="•"
        tooltip="Маркированный список"
        active={activeState.bulletList}
        disabled={disabled || !editor}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      />
      <ToolbarButton
        label="1."
        tooltip="Нумерованный список"
        active={activeState.orderedList}
        disabled={disabled || !editor}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      />
      <ToolbarButton
        label="“"
        tooltip="Цитата"
        active={activeState.blockquote}
        disabled={disabled || !editor}
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
      />
      <ToolbarButton
        label="Link"
        tooltip="Ссылка"
        active={activeState.link}
        disabled={disabled || !editor}
        onClick={setLink}
      />
    </div>
  );
}

export function AdminRichTextEditor({
  value,
  onChange,
  disabled,
  minHeight = 120,
}: AdminRichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: false,
      }),
      Link.configure({
        autolink: true,
        defaultProtocol: "https",
        openOnClick: false,
      }),
    ],
    content: toEditorContent(value),
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: ({ editor: nextEditor }) => {
      onChange(normalizeEditorHtml(nextEditor.getHTML()));
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }
    editor.setEditable(!disabled);
  }, [disabled, editor]);

  useEffect(() => {
    if (!editor) {
      return;
    }
    const nextContent = toEditorContent(value);
    const currentContent = normalizeEditorHtml(editor.getHTML());
    if (nextContent === currentContent) {
      return;
    }
    editor.commands.setContent(nextContent, { emitUpdate: false });
  }, [editor, value]);

  return (
    <div
      className={`${styles["admin-rich-text"]} ${
        disabled ? styles["admin-rich-text--disabled"] : ""
      }`}
    >
      <AdminRichTextToolbar editor={editor} disabled={disabled} />
      <div
        className={styles["admin-rich-text__editor"]}
        style={{ minHeight }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
