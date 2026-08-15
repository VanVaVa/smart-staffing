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
  fitToContainer?: boolean;
  boundsRef?: React.RefObject<HTMLElement | null>;
};

export function PdfViewer({
  src,
  title,
  compact = false,
  fitToContainer = false,
  boundsRef,
}: PdfViewerProps) {
  const rootClass = [
    styles["pdf-viewer"],
    compact ? styles["pdf-viewer--compact"] : "",
    fitToContainer ? styles["pdf-viewer--fit"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass} aria-label={title}>
      <PdfRenderer
        src={src}
        fitToContainer={fitToContainer}
        boundsRef={boundsRef}
      />
    </div>
  );
}
