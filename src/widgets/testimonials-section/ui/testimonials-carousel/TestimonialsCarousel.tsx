"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import {
  EditableCollectionAdd,
  EditableCollectionItem,
} from "@/shared/ui/editable-field";

import { TestimonialCard } from "../testimonial-card";

import styles from "./TestimonialsCarousel.module.css";

type TestimonialItem = {
  company: string;
  role: string;
  date: string;
  quote: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
};

type TestimonialsCarouselProps = {
  items: readonly TestimonialItem[];
};

type ScrollState = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

function getCards(track: HTMLDivElement): HTMLElement[] {
  return Array.from(track.querySelectorAll("[data-testimonial-card]")) as HTMLElement[];
}

function getCardScrollTargets(viewport: HTMLDivElement, cards: HTMLElement[]): number[] {
  const viewportLeft = viewport.getBoundingClientRect().left;

  return cards.map(
    (card) => viewport.scrollLeft + card.getBoundingClientRect().left - viewportLeft,
  );
}

function getActiveCardIndex(scrollLeft: number, targets: number[]): number {
  let index = 0;

  for (let i = 0; i < targets.length; i += 1) {
    if (targets[i] <= scrollLeft + 2) {
      index = i;
    }
  }

  return index;
}

function getScrollState(viewport: HTMLDivElement): ScrollState {
  const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);

  return {
    canScrollPrev: viewport.scrollLeft > 2,
    canScrollNext: viewport.scrollLeft < maxScrollLeft - 2,
  };
}

export function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState<ScrollState>({
    canScrollPrev: false,
    canScrollNext: false,
  });

  const updateScrollState = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    setScrollState(getScrollState(viewport));
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) {
      return;
    }

    updateScrollState();

    viewport.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);

    return () => {
      viewport.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [items, updateScrollState]);

  const scroll = (direction: "prev" | "next") => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) {
      return;
    }

    const cards = getCards(track);
    if (cards.length === 0) {
      return;
    }

    const targets = getCardScrollTargets(viewport, cards);
    const activeIndex = getActiveCardIndex(viewport.scrollLeft, targets);
    const targetIndex =
      direction === "next"
        ? Math.min(activeIndex + 1, cards.length - 1)
        : Math.max(activeIndex - 1, 0);
    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);

    viewport.scrollTo({
      left: Math.min(targets[targetIndex], maxScrollLeft),
      behavior: "smooth",
    });
  };

  return (
    <div className={styles["testimonials-carousel"]}>
      <div ref={viewportRef} className={styles["testimonials-carousel__viewport"]}>
        <div ref={trackRef} className={styles["testimonials-carousel__track"]}>
          {items.map((item, index) => (
            <EditableCollectionItem
              key={`${item.company}-${index}`}
              arrayPath="items"
              index={index}
              variant="carousel-card"
            >
              <div data-testimonial-card className={styles["testimonials-carousel__card"]}>
                <TestimonialCard itemIndex={index} {...item} />
              </div>
            </EditableCollectionItem>
          ))}
          <EditableCollectionAdd
            arrayPath="items"
            collectionKey="testimonials.items"
            addLabel="Отзыв"
            variant="inline"
          />
        </div>
      </div>
      <div className={styles["testimonials-carousel__nav"]}>
        <button
          type="button"
          className={styles["testimonials-carousel__nav-button"]}
          aria-label="Предыдущий отзыв"
          disabled={!scrollState.canScrollPrev}
          onClick={() => scroll("prev")}
        >
          <Image
            src="/landing/testimonials/arrow-icon.svg"
            alt=""
            width={32}
            height={32}
            className={styles["testimonials-carousel__nav-icon"]}
          />
        </button>
        <button
          type="button"
          className={styles["testimonials-carousel__nav-button"]}
          aria-label="Следующий отзыв"
          disabled={!scrollState.canScrollNext}
          onClick={() => scroll("next")}
        >
          <Image
            src="/landing/testimonials/arrow-icon.svg"
            alt=""
            width={32}
            height={32}
            className={`${styles["testimonials-carousel__nav-icon"]} ${styles["testimonials-carousel__nav-icon--next"]}`}
          />
        </button>
      </div>
    </div>
  );
}
