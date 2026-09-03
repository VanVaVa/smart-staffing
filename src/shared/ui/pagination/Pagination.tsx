import NextLink from "next/link";

import { ArrowIcon } from "@/shared/ui/arrow-icon";

import styles from "./Pagination.module.css";

type PaginationItem = number | "ellipsis";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  pathname: string;
  query?: Record<string, string | undefined>;
};

function getPaginationItems(
  currentPage: number,
  totalPages: number,
): PaginationItem[] {
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      "ellipsis",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ];
}

function getPageHref(
  pathname: string,
  page: number,
  query?: Record<string, string | undefined>,
) {
  const params = new URLSearchParams();

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value) {
        params.set(key, value);
      }
    }
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const search = params.toString();
  return search ? `${pathname}?${search}` : pathname;
}

export function Pagination({
  currentPage,
  totalPages,
  pathname,
  query,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const items = getPaginationItems(currentPage, totalPages);
  const showPrev = currentPage > 1;
  const showNext = currentPage < totalPages;

  return (
    <nav className={styles.pagination} aria-label="Навигация по страницам">
      {showPrev ? (
        <NextLink
          href={getPageHref(pathname, currentPage - 1, query)}
          className={styles.pagination__arrow}
          aria-label="Предыдущая страница"
          scroll
        >
          <ArrowIcon
            name="2Left"
            className={styles["pagination__arrow-icon"]}
          />
        </NextLink>
      ) : null}
      <div className={styles.pagination__pages}>
        {items.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className={styles.pagination__ellipsis}
              aria-hidden
            >
              ...
            </span>
          ) : (
            <NextLink
              key={item}
              href={getPageHref(pathname, item, query)}
              className={[
                styles.pagination__page,
                item === currentPage
                  ? styles["pagination__page--active"]
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-label={`Страница ${item}`}
              aria-current={item === currentPage ? "page" : undefined}
              scroll
            >
              {item}
            </NextLink>
          ),
        )}
      </div>
      {showNext ? (
        <NextLink
          href={getPageHref(pathname, currentPage + 1, query)}
          className={styles.pagination__arrow}
          aria-label="Следующая страница"
          scroll
        >
          <ArrowIcon
            name="2Right"
            className={styles["pagination__arrow-icon"]}
          />
        </NextLink>
      ) : null}
    </nav>
  );
}
