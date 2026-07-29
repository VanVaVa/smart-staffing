"use client";

import { useRef, useState } from "react";
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

export function AboutPartnerCarousel({ awards }: AboutPartnerCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeAwardId, setActiveAwardId] = useState<string | null>(null);

  const activeAward = activeAwardId
    ? awards.find((award) => award.id === activeAwardId)
    : undefined;

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
                <AboutPartnerAwardCard
                  key={award.id}
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
            onClick={() => scroll("prev")}
          >
            <Image
              src="/landing/testimonials/arrow-icon.svg"
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
            onClick={() => scroll("next")}
          >
            <Image
              src="/landing/testimonials/arrow-icon.svg"
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
