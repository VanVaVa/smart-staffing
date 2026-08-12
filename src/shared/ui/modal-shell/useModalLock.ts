"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";

const MODAL_OPEN_CLASS = "modal-open";

export function useModalLock(
  open: boolean,
  onClose: () => void,
  focusRef?: RefObject<HTMLElement | null>,
) {
  const scrollYRef = useRef(0);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    const root = document.documentElement;
    const { style: bodyStyle } = document.body;

    scrollYRef.current = window.scrollY;

    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollYRef.current}px`;
    bodyStyle.width = "100%";
    bodyStyle.overflow = "hidden";
    root.classList.add(MODAL_OPEN_CLASS);
    focusRef?.current?.focus();

    return () => {
      bodyStyle.position = "";
      bodyStyle.top = "";
      bodyStyle.width = "";
      bodyStyle.overflow = "";
      root.classList.remove(MODAL_OPEN_CLASS);
      window.scrollTo({
        top: scrollYRef.current,
        left: 0,
        behavior: "instant",
      });
    };
  }, [open, focusRef]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);
}
