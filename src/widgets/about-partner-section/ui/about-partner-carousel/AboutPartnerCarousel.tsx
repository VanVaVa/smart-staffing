"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";


import { AboutPartnerAwardModal } from "../about-partner-award-modal";
import { AboutPartnerAwardCard } from "../about-partner-award-card";

import styles from "./AboutPartnerCarousel.module.css";

type AboutPartnerAward = {
  id: string;
  title: string;
  status: string;
  nomination: string;
  project: string;
  document: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

type AboutPartnerCarouselProps = {
  awards: readonly AboutPartnerAward[];
};

type ScrollState = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

function getCards(track: HTMLDivElement): HTMLElement[] {
  return Array.from(track.querySelectorAll("[data-partner-award-card]")) as HTMLElement[];
}

function getScrollLeftForDirection(
  viewport: HTMLDivElement,
  cards: HTMLElement[],
  direction: "prev" | "next",
): number {
  const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
  const viewportRect = viewport.getBoundingClientRect();
  const paddingLeft = parseFloat(getComputedStyle(viewport).paddingLeft) || 0;
  const startEdge = viewportRect.left + paddingLeft;
  const edgeOffset = 4;
  const currentScrollLeft = viewport.scrollLeft;

  if (direction === "next") {
    for (const card of cards) {
      const cardRect = card.getBoundingClientRect();

      if (cardRect.left > startEdge + edgeOffset) {
        const target = Math.min(currentScrollLeft + cardRect.left - startEdge, maxScrollLeft);

        if (target > currentScrollLeft + edgeOffset) {
          return target;
        }
      }
    }

    return maxScrollLeft;
  }

  for (let index = cards.length - 1; index >= 0; index -= 1) {
    const cardRect = cards[index].getBoundingClientRect();

    if (cardRect.left < startEdge - edgeOffset) {
      const target = Math.max(currentScrollLeft + cardRect.left - startEdge, 0);

      if (target < currentScrollLeft - edgeOffset) {
        return target;
      }
    }
  }

  return 0;
}

function getScrollState(viewport: HTMLDivElement): ScrollState {
  const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);

  return {
    canScrollPrev: viewport.scrollLeft > 2,
    canScrollNext: viewport.scrollLeft < maxScrollLeft - 2,
  };
}

export function AboutPartnerCarousel({ awards }: AboutPartnerCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeAwardId, setActiveAwardId] = useState<string | null>(null);
  const [scrollState, setScrollState] = useState<ScrollState>({
    canScrollPrev: false,
    canScrollNext: false,
  });

  const activeAwardIndex = activeAwardId
    ? awards.findIndex((award) => award.id === activeAwardId)
    : -1;
  const activeAward = activeAwardIndex >= 0 ? awards[activeAwardIndex] : undefined;

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
  }, [awards, updateScrollState]);

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

    viewport.scrollTo({
      left: getScrollLeftForDirection(viewport, cards, direction),
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className={styles["about-partner-carousel"]}>
        <div className={styles["about-partner-carousel__scroll-area"]}>
          <div
            className={`${styles["about-partner-carousel__fade"]} ${styles["about-partner-carousel__fade--start"]}`}
            aria-hidden
          />
          <div
            className={`${styles["about-partner-carousel__fade"]} ${styles["about-partner-carousel__fade--end"]}`}
            aria-hidden
          />
          <div ref={viewportRef} className={styles["about-partner-carousel__viewport"]}>
            <div ref={trackRef} className={styles["about-partner-carousel__track"]}>
              {awards.map((award) => (
                <AboutPartnerAwardCard key={award.id}
                  title={award.title}
                  status={award.status}
                  nomination={award.nomination}
                  project={award.project}
                  onClick={() => setActiveAwardId(award.id)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles["about-partner-carousel__nav"]}>
          <button
            type="button"
            className={styles["about-partner-carousel__nav-button"]}
            aria-label="Предыдущая награда"
            disabled={!scrollState.canScrollPrev}
            onClick={() => scroll("prev")}
          >
            <Image
              src="/landing/about/icons/chevron-icon.svg"
              alt=""
              width={32}
              height={32}
              className={styles["about-partner-carousel__nav-icon"]}
            />
          </button>
          <button
            type="button"
            className={styles["about-partner-carousel__nav-button"]}
            aria-label="Следующая награда"
            disabled={!scrollState.canScrollNext}
            onClick={() => scroll("next")}
          >
            <Image
              src="/landing/about/icons/chevron-icon.svg"
              alt=""
              width={32}
              height={32}
              className={`${styles["about-partner-carousel__nav-icon"]} ${styles["about-partner-carousel__nav-icon--next"]}`}
            />
          </button>
        </div>
      </div>
      {activeAward ? (
        <AboutPartnerAwardModal
          open
          onClose={() => setActiveAwardId(null)}
          documentSrc={activeAward.document.src}
          documentAlt={activeAward.document.alt}
          documentWidth={activeAward.document.width}
          documentHeight={activeAward.document.height}
        />
      ) : null}
    </>
  );
}
