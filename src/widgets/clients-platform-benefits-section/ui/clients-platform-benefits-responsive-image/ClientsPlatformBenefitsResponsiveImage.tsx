import type {
  ClientsPlatformBenefitsImageFields,
  ClientsPlatformBenefitsResponsiveBreakpoint,
} from "@/entities/landing";

import styles from "./ClientsPlatformBenefitsResponsiveImage.module.css";

const BREAKPOINT_MEDIA: Record<ClientsPlatformBenefitsResponsiveBreakpoint, string> = {
  "360": "(max-width: 450px)",
  "576": "(max-width: 576px)",
  "768": "(max-width: 768px)",
  "992": "(max-width: 1050px)",
  "1440": "(max-width: 1620px)",
};

const SOURCE_BREAKPOINTS: readonly ClientsPlatformBenefitsResponsiveBreakpoint[] = [
  "360",
  "576",
  "768",
  "992",
  "1440",
];

type ClientsPlatformBenefitsResponsiveImageProps = {
  alt: string;
  images: ClientsPlatformBenefitsImageFields;
  className?: string;
};

export function ClientsPlatformBenefitsResponsiveImage({
  alt,
  images,
  className,
}: ClientsPlatformBenefitsResponsiveImageProps) {
  return (
    <picture className={className}>
      {SOURCE_BREAKPOINTS.map((breakpoint) => {
        const image = images.responsiveImages?.[breakpoint];
        if (!image) {
          return null;
        }

        return (
          <source
            key={breakpoint}
            media={BREAKPOINT_MEDIA[breakpoint]}
            srcSet={image.imageSrc}
            type="image/png"
          />
        );
      })}
      <img
        className={styles["clients-platform-benefits-responsive-image__image"]}
        src={images.imageSrc}
        alt={alt}
        width={images.imageWidth}
        height={images.imageHeight}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}
