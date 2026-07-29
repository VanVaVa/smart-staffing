import type { DocumentsPageContent } from "@/entities/landing";
import { Documents } from "@/widgets/documents";

import styles from "./DocumentsPage.module.css";

type DocumentsPageProps = {
  content: DocumentsPageContent;
};

export function DocumentsPage({ content }: DocumentsPageProps) {
  return (
    <div className={styles["documents-page"]}>
      <Documents content={content} />
    </div>
  );
}
