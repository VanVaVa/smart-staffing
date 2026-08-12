"use client";

import { useEffect, useState } from "react";

export const HERO_SEGMENT_HOLD_MS = 4000;

type UseHeroSegmentCarouselOptions = {
  segmentCount: number;
  enabled: boolean;
};

export function useHeroSegmentCarousel({
  segmentCount,
  enabled,
}: UseHeroSegmentCarouselOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
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

  const carouselEnabled = enabled && !reducedMotion && segmentCount > 1;
  const displayIndex = !enabled ? 0 : segmentCount > 0 ? activeIndex % segmentCount : 0;

  useEffect(() => {
    if (!carouselEnabled) {
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
  }, [carouselEnabled, segmentCount]);

  return {
    displayIndex,
    cycleKey,
    animateSegment: carouselEnabled,
    animateImage: carouselEnabled,
    holdMs: HERO_SEGMENT_HOLD_MS,
    carouselEnabled,
  };
}
