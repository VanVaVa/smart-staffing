"use client";

import { useEffect, useRef, type RefObject } from "react";

import { AboutTrustedLogoCard } from "../about-trusted-logo-card";

import styles from "./AboutTrustedMarquee.module.css";

type TrustedLogoItem = {
  id: string;
  cellWidth: number;
  src: string;
  logoWidth: number;
  logoHeight: number;
};

type AboutTrustedMarqueeProps = {
  rowIndex: number;
  items: readonly TrustedLogoItem[];
};

const MARQUEE_DURATION_MS = 90_000;

function TrustedSequence({
  items,
  rowIndex,
  copyRef,
  hidden,
}: {
  items: readonly TrustedLogoItem[];
  rowIndex: number;
  copyRef?: RefObject<HTMLDivElement | null>;
  hidden?: boolean;
}) {
  return (
    <div
      ref={copyRef}
      className={styles["about-trusted-marquee__sequence"]}
      aria-hidden={hidden}
    >
      {items.map((item, itemIndex) => (
        <AboutTrustedLogoCard
          key={hidden ? `${item.id}-copy` : item.id}
          cellWidth={item.cellWidth}
          src={item.src}
          logoWidth={item.logoWidth}
          logoHeight={item.logoHeight}
          mediaPath={`rows.${rowIndex}.items.${itemIndex}.src`}
        />
      ))}
    </div>
  );
}

export function AboutTrustedMarquee({ rowIndex, items }: AboutTrustedMarqueeProps) {
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

    const measure = () => {
      const secondCopy = firstCopy.nextElementSibling;
      if (!(secondCopy instanceof HTMLElement)) {
        return false;
      }

      const nextShift = secondCopy.offsetLeft - firstCopy.offsetLeft;
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

    const images = track.querySelectorAll("img");
    images.forEach((image) => {
      image.addEventListener("load", sync);
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
      });
    };
  }, [items]);

  return (
    <div className={styles["about-trusted-marquee"]}>
      <div ref={trackRef} className={styles["about-trusted-marquee__track"]}>
        <TrustedSequence items={items} rowIndex={rowIndex} copyRef={firstCopyRef} />
        <TrustedSequence items={items} rowIndex={rowIndex} hidden />
      </div>
    </div>
  );
}
