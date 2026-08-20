"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";

import {
  normalizeMarqueeItems,
  type TrustedMarqueeItem,
} from "../../lib/normalize-marquee-items";
import { AboutTrustedLogoCard } from "../about-trusted-logo-card";

import styles from "./AboutTrustedMarquee.module.css";

type AboutTrustedMarqueeProps = {
  items: readonly TrustedMarqueeItem[];
};

const MARQUEE_DURATION_MS = 90_000;

function TrustedSequence({
  items,
  copyRef,
  hidden,
}: {
  items: readonly TrustedMarqueeItem[];
  copyRef?: RefObject<HTMLDivElement | null>;
  hidden?: boolean;
}) {
  return (
    <div
      ref={copyRef}
      className={styles["about-trusted-marquee__sequence"]}
      aria-hidden={hidden}
    >
      {items.map((item) => (
        <AboutTrustedLogoCard
          key={hidden ? `${item.id}-copy` : item.id}
          cellWidth={item.cellWidth}
          src={item.src}
          logoWidth={item.logoWidth}
          logoHeight={item.logoHeight}
        />
      ))}
    </div>
  );
}

export function AboutTrustedMarquee({ items }: AboutTrustedMarqueeProps) {
  const displayItems = useMemo(() => normalizeMarqueeItems(items), [items]);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCopyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const firstCopy = firstCopyRef.current;
    if (!track || !firstCopy) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;
    let offset = 0;
    let lastTime = 0;
    let shift = 0;
    let speed = 0;

    const readSequenceGap = () => {
      const gapValue = getComputedStyle(track).gap;
      const gap = Number.parseFloat(gapValue);
      return Number.isFinite(gap) ? gap : 0;
    };

    const measure = () => {
      const nextShift = firstCopy.offsetWidth + readSequenceGap();
      if (nextShift <= 0) {
        return false;
      }

      shift = nextShift;
      speed = shift / MARQUEE_DURATION_MS;
      return true;
    };

    const tick = (time: number) => {
      if (shift <= 0 && !measure()) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      if (lastTime === 0) {
        lastTime = time;
      }

      const delta = time - lastTime;
      lastTime = time;

      if (!motionQuery.matches && shift > 0) {
        offset -= speed * delta;
        while (offset <= -shift) {
          offset += shift;
        }
        track.style.transform = `translate3d(${offset}px, 0, 0)`;
      } else if (motionQuery.matches) {
        track.style.transform = "";
        offset = 0;
        lastTime = 0;
      }

      frameId = requestAnimationFrame(tick);
    };

    const sync = () => {
      offset = 0;
      lastTime = 0;
      track.style.transform = "";
      measure();
    };

    sync();
    frameId = requestAnimationFrame(tick);

    const resizeObserver = new ResizeObserver(sync);
    resizeObserver.observe(firstCopy);
    resizeObserver.observe(track);

    const images = track.querySelectorAll("img");
    images.forEach((image) => {
      image.addEventListener("load", sync);
      image.addEventListener("error", sync);
    });

    const onMotionChange = () => {
      sync();
    };
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      motionQuery.removeEventListener("change", onMotionChange);
      images.forEach((image) => {
        image.removeEventListener("load", sync);
        image.removeEventListener("error", sync);
      });
    };
  }, [displayItems]);

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <div className={styles["about-trusted-marquee"]}>
      <div ref={trackRef} className={styles["about-trusted-marquee__track"]}>
        <TrustedSequence items={displayItems} copyRef={firstCopyRef} />
        <TrustedSequence items={displayItems} hidden />
      </div>
    </div>
  );
}
