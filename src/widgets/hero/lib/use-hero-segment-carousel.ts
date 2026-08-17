"use client";

import { useEffect, useState } from "react";

export const HERO_SEGMENT_HOLD_MS = 4000;

type UseHeroSegmentCarouselOptions = {
  segmentCount: number;
};

export function useHeroSegmentCarousel({
  segmentCount,
}: UseHeroSegmentCarouselOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cycleKey, setCycleKey] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    function handleChange(event: MediaQueryListEvent) {
      setReducedMotion(event.matches);
    }

    motionQuery.addEventListener("change", handleChange);
    return () => motionQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (segmentCount === 0) {
      setActiveIndex(0);
      return;
    }
    if (activeIndex >= segmentCount) {
      setActiveIndex(0);
    }
  }, [activeIndex, segmentCount]);

  const carouselEnabled = !reducedMotion && segmentCount > 1;
  const autoplayEnabled = carouselEnabled && hoveredIndex === null;
  const displayIndex =
    hoveredIndex ?? (segmentCount > 0 ? activeIndex % segmentCount : 0);

  useEffect(() => {
    if (!autoplayEnabled) {
      return;
    }

    let cancelled = false;
    let holdTimeoutId = 0;

    const scheduleAdvance = () => {
      holdTimeoutId = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        setActiveIndex((current) => (current + 1) % segmentCount);
        setCycleKey((current) => current + 1);
        scheduleAdvance();
      }, HERO_SEGMENT_HOLD_MS);
    };

    scheduleAdvance();

    return () => {
      cancelled = true;
      window.clearTimeout(holdTimeoutId);
    };
  }, [autoplayEnabled, segmentCount]);

  const hoverSegment = (index: number | null) => {
    if (!carouselEnabled) {
      return;
    }

    setHoveredIndex(index);

    if (index !== null) {
      setActiveIndex(index);
    }
  };

  return {
    displayIndex,
    cycleKey,
    hoverSegment,
    animateSegment: autoplayEnabled,
    animateImage: carouselEnabled,
    holdMs: HERO_SEGMENT_HOLD_MS,
    carouselEnabled,
  };
}
