"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import type { VacanciesBlockProps } from "@/entities/landing/model/vacancies-blocks";
import {
  EditableCollectionAdd,
  EditableCollectionItem,
} from "@/shared/ui/editable-field";

import { VacanciesListItem } from "../vacancies-list-item";

import styles from "./VacanciesList.module.css";

type VacanciesListProps = {
  vacancies: VacanciesBlockProps["vacancies"];
  selectedId: string;
  onSelect: (id: string) => void;
};

type ScrollMetrics = {
  thumbHeight: number;
  thumbTop: number;
  scrollable: boolean;
};

const MIN_THUMB_HEIGHT = 48;

function measureScroll(viewport: HTMLDivElement): ScrollMetrics {
  const { clientHeight, scrollHeight, scrollTop } = viewport;

  if (scrollHeight <= clientHeight + 1) {
    return {
      thumbHeight: clientHeight,
      thumbTop: 0,
      scrollable: false,
    };
  }

  const thumbHeight = Math.max(
    MIN_THUMB_HEIGHT,
    (clientHeight / scrollHeight) * clientHeight,
  );
  const maxThumbTop = clientHeight - thumbHeight;
  const maxScrollTop = scrollHeight - clientHeight;
  const thumbTop = maxScrollTop > 0 ? (scrollTop / maxScrollTop) * maxThumbTop : 0;

  return { thumbHeight, thumbTop, scrollable: true };
}

export function VacanciesList({ vacancies, selectedId, onSelect }: VacanciesListProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startY: number; startScrollTop: number } | null>(null);
  const [metrics, setMetrics] = useState<ScrollMetrics>({
    thumbHeight: 0,
    thumbTop: 0,
    scrollable: false,
  });

  const syncMetrics = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }
    setMetrics(measureScroll(viewport));
  }, []);

  useLayoutEffect(() => {
    syncMetrics();
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    viewport.addEventListener("scroll", syncMetrics, { passive: true });
    const observer = new ResizeObserver(syncMetrics);
    observer.observe(viewport);

    return () => {
      viewport.removeEventListener("scroll", syncMetrics);
      observer.disconnect();
    };
  }, [syncMetrics, vacancies.length]);

  const scrollFromThumbPosition = useCallback((thumbTop: number) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) {
      return;
    }

    const { clientHeight, scrollHeight } = viewport;
    const thumbHeight = Math.max(
      MIN_THUMB_HEIGHT,
      (clientHeight / scrollHeight) * clientHeight,
    );
    const maxThumbTop = track.clientHeight - thumbHeight;
    const maxScrollTop = scrollHeight - clientHeight;

    if (maxThumbTop <= 0 || maxScrollTop <= 0) {
      return;
    }

    const clampedTop = Math.min(Math.max(thumbTop, 0), maxThumbTop);
    viewport.scrollTop = (clampedTop / maxThumbTop) * maxScrollTop;
  }, []);

  const handleTrackPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.target !== trackRef.current || !metrics.scrollable) {
      return;
    }

    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) {
      return;
    }

    const rect = track.getBoundingClientRect();
    const pointerY = event.clientY - rect.top;
    const thumbHeight = metrics.thumbHeight;
    const nextTop = pointerY - thumbHeight / 2;
    scrollFromThumbPosition(nextTop);
  };

  const handleThumbPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!metrics.scrollable) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    dragRef.current = {
      startY: event.clientY,
      startScrollTop: viewport.scrollTop,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleThumbPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!drag || !viewport || !track || !metrics.scrollable) {
      return;
    }

    const { clientHeight, scrollHeight } = viewport;
    const thumbHeight = metrics.thumbHeight;
    const maxThumbTop = track.clientHeight - thumbHeight;
    const maxScrollTop = scrollHeight - clientHeight;
    const deltaY = event.clientY - drag.startY;
    const scrollDelta = maxThumbTop > 0 ? (deltaY / maxThumbTop) * maxScrollTop : 0;

    viewport.scrollTop = drag.startScrollTop + scrollDelta;
  };

  const handleThumbPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className={styles["vacancies-list-panel"]}>
      <div className={styles["vacancies-list-panel__scroll-row"]}>
        <div
          ref={viewportRef}
          id="vacancies-list-viewport"
          className={styles["vacancies-list-panel__viewport"]}
          tabIndex={0}
        >
          <ul className={styles["vacancies-list-panel__items"]}>
            {vacancies.map((vacancy, index) => (
              <li key={vacancy.id} className={styles["vacancies-list-panel__item"]}>
                <EditableCollectionItem
                  arrayPath="vacancies"
                  index={index}
                  variant="list-entry"
                >
                  <VacanciesListItem
                    title={vacancy.title}
                    employment={vacancy.employment}
                    selected={vacancy.id === selectedId}
                    onSelect={() => onSelect(vacancy.id)}
                    itemIndex={index}
                  />
                </EditableCollectionItem>
              </li>
            ))}
          </ul>
        </div>
        <div
          ref={trackRef}
          className={styles["vacancies-list-panel__scrollbar"]}
          onPointerDown={handleTrackPointerDown}
          role="scrollbar"
          aria-controls="vacancies-list-viewport"
          aria-valuenow={metrics.scrollable ? Math.round(metrics.thumbTop) : 0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-hidden={!metrics.scrollable}
        >
          <div
            className={styles["vacancies-list-panel__scrollbar-thumb"]}
            style={{
              height: metrics.thumbHeight > 0 ? `${metrics.thumbHeight}px` : undefined,
              transform: `translateY(${metrics.thumbTop}px)`,
            }}
            onPointerDown={handleThumbPointerDown}
            onPointerMove={handleThumbPointerMove}
            onPointerUp={handleThumbPointerUp}
            onPointerCancel={handleThumbPointerUp}
          />
        </div>
      </div>
      <EditableCollectionAdd arrayPath="vacancies" collectionKey={"vacancies" as never} addLabel="Вакансия" />
    </div>
  );
}
