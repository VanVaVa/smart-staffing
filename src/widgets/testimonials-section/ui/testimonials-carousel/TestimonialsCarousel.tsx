"use client";

import { useRef } from "react";
import Image from "next/image";

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

function getActiveCardIndex(viewport: HTMLDivElement, track: HTMLDivElement): number {
  const cards = Array.from(track.children) as HTMLElement[];
  const scrollLeft = viewport.scrollLeft;
  let index = 0;

  for (let i = 0; i < cards.length; i += 1) {
    if (cards[i].offsetLeft <= scrollLeft + 1) {
      index = i;
    }
  }

  return index;
}

export function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "prev" | "next") => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) {
      return;
    }

    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) {
      return;
    }

    const activeIndex = getActiveCardIndex(viewport, track);
    const targetIndex =
      direction === "next"
        ? Math.min(activeIndex + 1, cards.length - 1)
        : Math.max(activeIndex - 1, 0);

    viewport.scrollTo({
      left: cards[targetIndex].offsetLeft,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles["testimonials-carousel"]}>
      <div ref={viewportRef} className={styles["testimonials-carousel__viewport"]}>
        <div ref={trackRef} className={styles["testimonials-carousel__track"]}>
          {items.map((item) => (
            <TestimonialCard key={item.company} {...item} />
          ))}
        </div>
      </div>
      <div className={styles["testimonials-carousel__nav"]}>
        <button
          type="button"
          className={styles["testimonials-carousel__nav-button"]}
          aria-label="Предыдущий отзыв"
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
