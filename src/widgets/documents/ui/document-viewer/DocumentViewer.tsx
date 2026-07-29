import Link from "next/link";
import Image from "next/image";

import type { DocumentItem } from "@/entities/landing";
import { ArrowIcon, Container } from "@/shared/ui";

import { PdfViewer } from "../pdf-viewer";
import styles from "./DocumentViewer.module.css";

type DocumentViewerProps = {
  document: DocumentItem;
};

export function DocumentViewer({ document }: DocumentViewerProps) {
  return (
    <section className={styles["document-viewer"]}>
      <Container wide className={styles["document-viewer__container"]}>
        <header className={styles["document-viewer__header"]}>
          <Link className={styles["document-viewer__back"]} href="/documents">
            <ArrowIcon name="2Left" />
            Документы
          </Link>
          <h1 className={styles["document-viewer__title"]}>{document.title}</h1>
          <a
            className={styles["document-viewer__download"]}
            href={document.pdfSrc}
            download
            aria-label="Скачать PDF"
          >
            <Image
              src="/icons/download.svg"
              alt=""
              width={24}
              height={26}
            />
          </a>
        </header>
        <PdfViewer src={document.pdfSrc} title={document.title} />
      </Container>
    </section>
  );
}
