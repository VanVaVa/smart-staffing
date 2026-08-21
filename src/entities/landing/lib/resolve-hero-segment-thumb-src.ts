export function deriveHeroSegmentThumbSrc(imageSrc: string): string {
  return imageSrc.replace("/hero-segment-", "/thumb-hero-segment-");
}

export function resolveHeroSegmentThumbSrc(segment: {
  imageSrc: string;
  thumbImageSrc?: string;
}): string {
  if (segment.thumbImageSrc) {
    return segment.thumbImageSrc;
  }
  return deriveHeroSegmentThumbSrc(segment.imageSrc);
}
