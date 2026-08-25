import type { DocumentsBlock } from "@/entities/landing/model/documents-blocks";

import { DocumentsBlockRenderer } from "./DocumentsBlockRenderer";
import styles from "./DocumentsPage.module.css";

type DocumentsPageProps = {
  blocks: DocumentsBlock[];
};

export function DocumentsPage({ blocks }: DocumentsPageProps) {
  return (
    <div className={styles["documents-page"]} data-header-veil-bg="#f9f9fb">
      {blocks.map((block) => (
        <div key={block.id}>
          <DocumentsBlockRenderer block={block} />
        </div>
      ))}
    </div>
  );
}
