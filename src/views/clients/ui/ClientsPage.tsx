import type { ClientsBlock } from "@/entities/landing/model/clients-blocks";
import type { ClientSegmentSlug } from "@/entities/landing/model/clients-content";

import { ClientsBlockRenderer } from "./ClientsBlockRenderer";
import styles from "./ClientsPage.module.css";

type ClientsPageProps = {
  blocks: ClientsBlock[];
  segment: ClientSegmentSlug;
};

export function ClientsPage({ blocks, segment }: ClientsPageProps) {
  return (
    <div className={styles["clients-page"]}>
      {blocks.map((block) => (
        <div key={block.id}>
          <ClientsBlockRenderer block={block} segment={segment} />
        </div>
      ))}
    </div>
  );
}
