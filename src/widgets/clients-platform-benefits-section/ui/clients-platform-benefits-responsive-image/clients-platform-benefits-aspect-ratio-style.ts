import type { CSSProperties } from "react";

import type {
  ClientsPlatformBenefitsImageFields,
  ClientsPlatformBenefitsResponsiveBreakpoint,
} from "@/entities/landing";

const responsiveBreakpoints: readonly ClientsPlatformBenefitsResponsiveBreakpoint[] =
  ["1440", "992", "768", "576", "360"];

export function getClientsPlatformBenefitsAspectRatioStyle(
  images: ClientsPlatformBenefitsImageFields,
): CSSProperties {
  const style: Record<string, string> = {
    "--card-ar": `${images.imageWidth} / ${images.imageHeight}`,
  };

  for (const breakpoint of responsiveBreakpoints) {
    const image = images.responsiveImages?.[breakpoint];
    if (!image) {
      continue;
    }

    style[`--card-ar-${breakpoint}`] = `${image.imageWidth} / ${image.imageHeight}`;
  }

  return style as CSSProperties;
}
