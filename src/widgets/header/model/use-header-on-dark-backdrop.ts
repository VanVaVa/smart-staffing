"use client";

import { useEffect, useState } from "react";

import { headerBackdropDarkSelector } from "@/shared/config/header-backdrop";

const HEADER_PROBE_Y = 40;

function isDarkBackdropBehindHeader(): boolean {
  const width = document.documentElement.clientWidth;
  if (width === 0) {
    return false;
  }

  const sampleXs = [width * 0.2, width * 0.5, width * 0.8];

  for (const x of sampleXs) {
    const stack = document.elementsFromPoint(x, HEADER_PROBE_Y);
    for (const el of stack) {
      if (!(el instanceof Element)) {
        continue;
      }
      if (el.closest("header")) {
        continue;
      }
      if (el.closest(headerBackdropDarkSelector)) {
        return true;
      }
    }
  }

  return false;
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

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return onDarkBackdrop;
}
