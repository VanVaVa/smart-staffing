"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import styles from "./PdfViewer.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type PdfRendererProps = {
  src: string;
};

export function PdfRenderer({ src }: PdfRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const updateWidth = () => setWidth(container.clientWidth);
    const observer = new ResizeObserver(updateWidth);

    updateWidth();
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      <Document
        file={src}
        loading={
          <span className={styles["pdf-viewer__status"]}>
            Загрузка документа…
          </span>
        }
        error={
          <span className={styles["pdf-viewer__status"]}>
            Не удалось открыть документ
          </span>
        }
        onLoadSuccess={({ numPages }) => setPageCount(numPages)}
      >
        {width > 0 &&
          Array.from({ length: pageCount }, (_, index) => (
            <Page
              key={`${src}-${index + 1}`}
              pageNumber={index + 1}
              width={width}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              className={styles["pdf-viewer__page"]}
            />
          ))}
      </Document>
    </div>
  );
}
