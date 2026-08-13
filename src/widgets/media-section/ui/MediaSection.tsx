import type { ReactNode } from "react";

import type { MediaPageContent } from "@/entities/landing";
import { EditableText } from "@/shared/ui/editable-field";
import { Container, Pagination } from "@/shared/ui";

import { MediaCard } from "./media-card";
import styles from "./MediaSection.module.css";

type MediaSectionProps = {
  display: MediaPageContent;
  showPagination?: boolean;
  renderArticleCard?: (article: MediaPageContent["items"][number]) => ReactNode;
  gridFooter?: ReactNode;
};

export function MediaSection({
  display,
  showPagination = true,
  renderArticleCard,
  gridFooter,
}: MediaSectionProps) {
  return (
    <section className={styles["media-section"]}>
      <Container className={styles["media-section__container"]}>
        <EditableText
          path="title"
          label="Заголовок"
          as="h1"
          className={styles["media-section__title"]}
        >
          {display.title}
        </EditableText>
        <div className={styles["media-section__grid"]}>
          {display.items.map((article) =>
            renderArticleCard ? (
              <div key={article.id} className={styles["media-section__grid-item"]}>
                {renderArticleCard(article)}
              </div>
            ) : (
              <MediaCard key={article.id} article={article} />
            ),
          )}
          {gridFooter}
        </div>
        {showPagination && display.totalPages > 1 ? (
          <div className={styles["media-section__pagination"]}>
            <Pagination
              currentPage={display.currentPage}
              totalPages={display.totalPages}
              pathname="/media"
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
