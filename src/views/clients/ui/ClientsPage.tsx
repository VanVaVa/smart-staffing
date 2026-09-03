import type { ClientsBlock } from "@/entities/landing/model/clients-blocks";
import type { ClientsPageVariant } from "@/entities/landing/model/clients-content";

import { ClientsBlockRenderer } from "./ClientsBlockRenderer";
import styles from "./ClientsPage.module.css";

type ClientsPageProps = {
  blocks: ClientsBlock[];
  segment: string;
  pageVariant?: ClientsPageVariant;
};

export function ClientsPage({
  blocks,
  segment,
  pageVariant = "clients",
}: ClientsPageProps) {
  return (
    <div className={styles["clients-page"]} data-header-veil-bg="#f9f9fb">
      {blocks.map((block) => (
        <div key={block.id}>
          <ClientsBlockRenderer
            block={block}
            segment={segment}
            pageVariant={pageVariant}
          />
        </div>
      ))}
    </div>
  );
}
