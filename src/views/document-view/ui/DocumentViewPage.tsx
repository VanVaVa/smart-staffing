import type { DocumentViewBlock } from "@/entities/landing/model/document-view-blocks";

import { DocumentViewBlockRenderer } from "./DocumentViewBlockRenderer";
import styles from "./DocumentViewPage.module.css";

type DocumentViewPageProps = {
  blocks: DocumentViewBlock[];
};

export function DocumentViewPage({ blocks }: DocumentViewPageProps) {
  const block = blocks[0];

  if (!block || block.type !== "documentView") {
    return null;
  }

  return (
    <div className={styles["document-view-page"]}>
      <DocumentViewBlockRenderer block={block} />
    </div>
  );
}
