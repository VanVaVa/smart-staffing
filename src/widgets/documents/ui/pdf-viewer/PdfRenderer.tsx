"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import styles from "./PdfViewer.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const PAGE_GAP = 20;

type PdfPageSize = {
  width: number;
  height: number;
};

type PdfRendererProps = {
  src: string;
  fitToContainer?: boolean;
  boundsRef?: RefObject<HTMLElement | null>;
};

function getRenderWidth(
  containerWidth: number,
  containerHeight: number,
  pageSize: PdfPageSize,
  pageCount: number,
): number {
  if (containerWidth <= 0 || containerHeight <= 0 || pageCount <= 0) {
    return containerWidth;
  }

  const pageAspect = pageSize.height / pageSize.width;
  const totalGap = PAGE_GAP * Math.max(0, pageCount - 1);
  const heightAtFullWidth = pageCount * containerWidth * pageAspect + totalGap;

  if (heightAtFullWidth <= containerHeight) {
    return containerWidth;
  }

  const widthByHeight =
    (containerHeight - totalGap) / (pageCount * pageAspect);

  return Math.min(containerWidth, widthByHeight);
}

export function PdfRenderer({
  src,
  fitToContainer = false,
  boundsRef,
}: PdfRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [pageSize, setPageSize] = useState<PdfPageSize | null>(null);

  useEffect(() => {
    setPageCount(0);
    setPageSize(null);
  }, [src]);

  useEffect(() => {
    const measureElement =
      fitToContainer && boundsRef?.current
        ? boundsRef.current
        : containerRef.current;

    if (!measureElement) {
      return;
    }

    const updateSize = () => {
      setContainerSize({
        width: measureElement.clientWidth,
        height: measureElement.clientHeight,
      });
    };
    const observer = new ResizeObserver(updateSize);

    updateSize();
    observer.observe(measureElement);

    return () => observer.disconnect();
  }, [boundsRef, fitToContainer]);

  const renderWidth = useMemo(() => {
    if (!fitToContainer || !pageSize || pageCount === 0) {
      return containerSize.width;
    }

    return getRenderWidth(
      containerSize.width,
      containerSize.height,
      pageSize,
      pageCount,
    );
  }, [containerSize, fitToContainer, pageCount, pageSize]);

  return (
    <div
      ref={containerRef}
      className={
        fitToContainer ? styles["pdf-viewer__fit-container"] : undefined
      }
    >
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
        {renderWidth > 0 &&
          Array.from({ length: pageCount }, (_, index) => (
            <Page
              key={`${src}-${index + 1}`}
              pageNumber={index + 1}
              width={renderWidth}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              className={styles["pdf-viewer__page"]}
              onLoadSuccess={
                fitToContainer && index === 0
                  ? (page) => {
                      const viewport = page.getViewport({ scale: 1 });

                      setPageSize({
                        width: viewport.width,
                        height: viewport.height,
                      });
                    }
                  : undefined
              }
            />
          ))}
      </Document>
    </div>
  );
}
