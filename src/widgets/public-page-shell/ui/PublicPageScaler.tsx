"use client";

import { useLayoutEffect } from "react";

const REFERENCE_VIEWPORT_WIDTH = 1920;
const VIEWPORT_WIDTH_PROPERTY = "--public-page-viewport-width";

export function PublicPageScaler() {
  useLayoutEffect(() => {
    const body = document.body;
    const initialZoom = body.style.getPropertyValue("zoom");
    const initialViewportWidth = body.style.getPropertyValue(VIEWPORT_WIDTH_PROPERTY);

    const updateZoom = () => {
      const zoom = Math.max(1, window.innerWidth / REFERENCE_VIEWPORT_WIDTH);
      const viewportWidth = window.innerWidth / zoom;

      body.style.setProperty("zoom", String(zoom));
      body.style.setProperty(VIEWPORT_WIDTH_PROPERTY, `${viewportWidth}px`);
    };

    updateZoom();
    window.addEventListener("resize", updateZoom);

    return () => {
      window.removeEventListener("resize", updateZoom);

      if (initialZoom) {
        body.style.setProperty("zoom", initialZoom);
      } else {
        body.style.removeProperty("zoom");
      }

      if (initialViewportWidth) {
        body.style.setProperty(VIEWPORT_WIDTH_PROPERTY, initialViewportWidth);
      } else {
        body.style.removeProperty(VIEWPORT_WIDTH_PROPERTY);
      }
    };
  }, []);

  return null;
}
