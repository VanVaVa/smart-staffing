"use client";

import { useEffect, useState, type RefObject } from "react";

import { isDarkBackdropAtColumn } from "../lib/resolve-backdrop-tone";

function isDarkBackdropBehindElement(element: Element | null): boolean {
  if (!element) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) {
    return false;
  }

  const sampleXs = [
    rect.left + rect.width * 0.2,
    rect.left + rect.width * 0.5,
    rect.left + rect.width * 0.8,
  ];

  return sampleXs.some((x) => isDarkBackdropAtColumn(x));
}

export function useElementOnDarkBackdrop(ref: RefObject<Element | null>) {
  const [onDarkBackdrop, setOnDarkBackdrop] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      setOnDarkBackdrop(isDarkBackdropBehindElement(ref.current));
    };

    const scheduleUpdate = () => {
      if (frame) {
        return;
      }

      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const overlayObserver = new MutationObserver(scheduleUpdate);
    overlayObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const main = document.querySelector("main");
    const mainObserver = new MutationObserver(scheduleUpdate);

    if (main) {
      mainObserver.observe(main, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      overlayObserver.disconnect();
      mainObserver.disconnect();
    };
  }, [ref]);

  return onDarkBackdrop;
}
