import type { MediaPageContent } from "@/entities/landing";
import { Container, Pagination } from "@/shared/ui";

import { MediaCard } from "./media-card";
import { MediaTagFilter } from "./media-tag-filter";
import styles from "./MediaSection.module.css";

type MediaSectionProps = {
  display: MediaPageContent;
  showPagination?: boolean;
};

export function MediaSection({ display, showPagination = true }: MediaSectionProps) {
  return (
    <section className={styles["media-section"]}>
      <Container className={styles["media-section__container"]}>
        <h1 className={styles["media-section__title"]}>
          {display.title}
        </h1>
        <MediaTagFilter activeTag={display.activeTag} />
        <div
          className={styles["media-section__grid"]}
          data-header-veil-bg="transparent"
        >
          {display.items.map((article) => (
            <MediaCard key={article.id} article={article} />
          ))}
        </div>
        {showPagination && display.totalPages > 1 ? (
          <div className={styles["media-section__pagination"]}>
            <Pagination
              currentPage={display.currentPage}
              totalPages={display.totalPages}
              pathname="/media"
              query={
                display.activeTag ? { tag: display.activeTag } : undefined
              }
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
