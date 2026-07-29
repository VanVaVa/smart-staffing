"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

export function useDocumentModal(open: boolean, onClose: () => void) {
  const scrollYRef = useRef(0);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    const { style } = document.body;

    scrollYRef.current = window.scrollY;
    style.position = "fixed";
    style.top = `-${scrollYRef.current}px`;
    style.width = "100%";
    style.overflow = "hidden";

    return () => {
      style.position = "";
      style.top = "";
      style.width = "";
      style.overflow = "";
      window.scrollTo({ top: scrollYRef.current, behavior: "instant" });
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);
}
