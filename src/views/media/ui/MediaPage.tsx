import type { MediaPageContent } from "@/entities/landing";
import { MediaSection } from "@/widgets/media-section";

import styles from "./MediaPage.module.css";

type MediaPageProps = {
  content: MediaPageContent;
};

export function MediaPage({ content }: MediaPageProps) {
  return (
    <div className={styles["media-page"]}>
      <MediaSection content={content} />
    </div>
  );
}
