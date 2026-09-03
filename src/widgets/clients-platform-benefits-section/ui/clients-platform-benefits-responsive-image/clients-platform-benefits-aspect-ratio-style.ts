import type { CSSProperties } from "react";

import type {
  ClientsPlatformBenefitsImageFields,
  ClientsPlatformBenefitsResponsiveBreakpoint,
} from "@/entities/landing";

const responsiveBreakpoints: readonly ClientsPlatformBenefitsResponsiveBreakpoint[] =
  ["1440", "992", "768", "576", "360"];

export function getClientsPlatformBenefitsAspectRatioStyle(
  images: ClientsPlatformBenefitsImageFields | undefined,
): CSSProperties {
  const imageWidth = images?.imageWidth || 1;
  const imageHeight = images?.imageHeight || 1;
  const style: Record<string, string> = {
    "--card-ar": `${imageWidth} / ${imageHeight}`,
  };

  for (const breakpoint of responsiveBreakpoints) {
    const image = images?.responsiveImages?.[breakpoint];
    if (!image) {
      continue;
    }

    style[`--card-ar-${breakpoint}`] = `${image.imageWidth || 1} / ${image.imageHeight || 1}`;
  }

  return style as CSSProperties;
}
