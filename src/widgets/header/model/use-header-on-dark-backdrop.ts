"use client";

import { useEffect, useState } from "react";

import { isDarkBackdropAt } from "../lib/resolve-backdrop-tone";

const HEADER_PROBE_YS = [24, 40, 56];

function isDarkBackdropBehindHeader(): boolean {
  const width = document.documentElement.clientWidth;
  if (width === 0) {
    return false;
  }

  const sampleXs = [width * 0.2, width * 0.5, width * 0.8];

  return sampleXs.some((x) => HEADER_PROBE_YS.some((y) => isDarkBackdropAt(x, y)));
}

export function useHeaderOnDarkBackdrop() {
  const [onDarkBackdrop, setOnDarkBackdrop] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      setOnDarkBackdrop(isDarkBackdropBehindHeader());
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const overlayObserver = new MutationObserver(scheduleUpdate);
    overlayObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      overlayObserver.disconnect();
    };
  }, []);

  return onDarkBackdrop;
}
