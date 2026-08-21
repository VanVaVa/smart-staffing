"use client";

import { useEffect, useState, type RefObject } from "react";

import { isDarkBackdropAtColumn } from "../lib/resolve-backdrop-tone";

function measureNavLinkTones(nav: HTMLElement): Record<string, boolean> {
  const links = nav.querySelectorAll<HTMLElement>("[data-header-nav-link]");
  const next: Record<string, boolean> = {};

  links.forEach((link) => {
    const key = link.dataset.headerNavLink;
    if (!key) {
      return;
    }

    const rect = link.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      return;
    }

    const x = rect.left + rect.width / 2;
    next[key] = isDarkBackdropAtColumn(x);
  });

  return next;
}

export function useNavLinksOnDarkBackdrop(navRef: RefObject<HTMLElement | null>) {
  const [tonesByKey, setTonesByKey] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const nav = navRef.current;
      if (!nav) {
        setTonesByKey({});
        return;
      }

      setTonesByKey(measureNavLinkTones(nav));
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
  }, [navRef]);

  return tonesByKey;
}
