export function deriveHeroSegmentThumbSrc(imageSrc: string): string {
  return imageSrc.replace("/hero-segment-", "/thumb-hero-segment-");
}
