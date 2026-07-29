import type { DocumentItem } from "@/entities/landing";
import { DocumentViewer } from "@/widgets/documents";

import styles from "./DocumentViewPage.module.css";

type DocumentViewPageProps = {
  document: DocumentItem;
};

export function DocumentViewPage({ document }: DocumentViewPageProps) {
  return (
    <div className={styles["document-view-page"]}>
      <DocumentViewer document={document} />
    </div>
  );
}
