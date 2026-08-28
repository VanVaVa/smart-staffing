"use client";

import { usePathname } from "next/navigation";
import { useEffect, type RefObject } from "react";

import {
  DEFAULT_HEADER_VEIL_BG,
  resolveHeaderVeilBg,
} from "../lib/resolve-header-veil-bg";
import { getHeaderProbeCenterY } from "../lib/resolve-backdrop-tone";

export function useHeaderVeil(
  headerRef: RefObject<HTMLElement | null>,
  veilRef: RefObject<HTMLElement | null>,
) {
  const pathname = usePathname();

  useEffect(() => {
    const header = headerRef.current;
    const veil = veilRef.current;

    if (!header || !veil) {
      return;
    }

    veil.style.setProperty("--header-veil-bg", DEFAULT_HEADER_VEIL_BG);

    let frame = 0;

    const updateVeilColor = () => {
      const height = header.getBoundingClientRect().height;
      header.style.setProperty("--header-veil-height", `${height}px`);

      const probeY = getHeaderProbeCenterY();
      const bg = resolveHeaderVeilBg(probeY);
      veil.style.setProperty("--header-veil-bg", bg);
    };

    const scheduleUpdate = () => {
      if (frame) {
        return;
      }

      frame = requestAnimationFrame(() => {
        frame = 0;
        updateVeilColor();
      });
    };

    scheduleUpdate();
    requestAnimationFrame(scheduleUpdate);

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(header);

    const main = document.querySelector("main");
    const mainObserver = new MutationObserver(scheduleUpdate);

    if (main) {
      mainObserver.observe(main, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["data-header-veil-bg"],
      });
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver.disconnect();
      mainObserver.disconnect();
    };
  }, [headerRef, veilRef, pathname]);
}
