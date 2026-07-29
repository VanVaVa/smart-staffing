import type { MediaPageContent } from "@/entities/landing";
import { Container, Pagination } from "@/shared/ui";

import { MediaCard } from "./media-card";
import styles from "./MediaSection.module.css";

type MediaSectionProps = {
  content: MediaPageContent;
};

export function MediaSection({ content }: MediaSectionProps) {
  return (
    <section className={styles["media-section"]}>
      <Container className={styles["media-section__container"]}>
        <h1 className={styles["media-section__title"]}>{content.title}</h1>
        <div className={styles["media-section__grid"]}>
          {content.items.map((article) => (
            <MediaCard key={article.id} article={article} />
          ))}
        </div>
        <div className={styles["media-section__pagination"]}>
          <Pagination
            currentPage={content.currentPage}
            totalPages={content.totalPages}
            pathname="/media"
          />
        </div>
      </Container>
    </section>
  );
}
