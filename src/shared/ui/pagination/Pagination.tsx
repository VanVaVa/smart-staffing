import NextLink from "next/link";

import { ArrowIcon } from "@/shared/ui/arrow-icon";

import styles from "./Pagination.module.css";

type PaginationItem = number | "ellipsis";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  pathname: string;
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

function getPageHref(pathname: string, page: number) {
  return page === 1 ? pathname : `${pathname}?page=${page}`;
}

export function Pagination({
  currentPage,
  totalPages,
  pathname,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const items = getPaginationItems(currentPage, totalPages);
  const nextPage = Math.min(currentPage + 1, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Навигация по страницам">
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
              href={getPageHref(pathname, item)}
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
      {currentPage < totalPages ? (
        <NextLink
          href={getPageHref(pathname, nextPage)}
          className={styles.pagination__next}
          aria-label="Следующая страница"
          scroll
        >
          <ArrowIcon
            name="2Right"
            className={styles.pagination__nextIcon}
          />
        </NextLink>
      ) : (
        <span
          className={[
            styles.pagination__next,
            styles["pagination__next--disabled"],
          ].join(" ")}
          aria-hidden
        >
          <ArrowIcon
            name="2Right"
            className={styles.pagination__nextIcon}
          />
        </span>
      )}
    </nav>
  );
}
