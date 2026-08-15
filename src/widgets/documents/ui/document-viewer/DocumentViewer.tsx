import Link from "next/link";
import Image from "next/image";

import type { DocumentViewBlockProps } from "@/entities/landing/model/document-view-blocks";
import { EditableMedia, EditableText } from "@/shared/ui/editable-field";
import { ArrowIcon, Container } from "@/shared/ui";

import { PdfViewer } from "../pdf-viewer";
import styles from "./DocumentViewer.module.css";

type DocumentViewerProps = {
  content: DocumentViewBlockProps;
};

export function DocumentViewer({ content }: DocumentViewerProps) {
  return (
    <section className={styles["document-viewer"]}>
      <Container wide className={styles["document-viewer__container"]}>
        <header className={styles["document-viewer__header"]}>
          <Link className={styles["document-viewer__back"]} href="/documents">
            <ArrowIcon name="2Left" />
            Документы
          </Link>
          <EditableText
            path="title"
            label="Заголовок документа"
            as="h1"
            className={styles["document-viewer__title"]}
          >
            {content.title}
          </EditableText>
          <EditableMedia path="pdfSrc" label="PDF документа" className={styles["document-viewer__download-wrapper"]}>
            <a
              className={styles["document-viewer__download"]}
              href={content.pdfSrc}
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
          </EditableMedia>
        </header>
        <EditableMedia path="pdfSrc" label="PDF документа">
          <PdfViewer src={content.pdfSrc} title={content.title} />
        </EditableMedia>
      </Container>
    </section>
  );
}
