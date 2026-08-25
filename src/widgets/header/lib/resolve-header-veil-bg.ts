export const DEFAULT_HEADER_VEIL_BG = "#f9f9fb";

export function resolveHeaderVeilBg(
  probeY: number,
  fallback: string = DEFAULT_HEADER_VEIL_BG,
): string {
  const sections = document.querySelectorAll<HTMLElement>("[data-header-veil-bg]");

  let bestSection: HTMLElement | null = null;
  let bestTop = -Infinity;

  for (const section of sections) {
    const rect = section.getBoundingClientRect();

    if (rect.top > probeY || rect.bottom <= probeY) {
      continue;
    }

    if (rect.top > bestTop) {
      bestTop = rect.top;
      bestSection = section;
    }
  }

  return bestSection?.getAttribute("data-header-veil-bg") ?? fallback;
}
