"use client";

import dynamic from "next/dynamic";

import styles from "./PdfViewer.module.css";

const PdfRenderer = dynamic(
  () => import("./PdfRenderer").then((module) => module.PdfRenderer),
  {
    ssr: false,
    loading: () => (
      <span className={styles["pdf-viewer__status"]}>
        Загрузка документа…
      </span>
    ),
  },
);

type PdfViewerProps = {
  src: string;
  title: string;
  compact?: boolean;
};

export function PdfViewer({ src, title, compact = false }: PdfViewerProps) {
  const rootClass = [
    styles["pdf-viewer"],
    compact ? styles["pdf-viewer--compact"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass} aria-label={title}>
      <PdfRenderer src={src} />
    </div>
  );
}
