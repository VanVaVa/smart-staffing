export const HEADER_BACKDROP = {
  dark: "dark",
} as const;

export type HeaderBackdrop = (typeof HEADER_BACKDROP)[keyof typeof HEADER_BACKDROP];

export function headerBackdropProps(tone: HeaderBackdrop) {
  return { "data-header-backdrop": tone } as const;
}

export const headerBackdropDarkSelector = `[data-header-backdrop="${HEADER_BACKDROP.dark}"]`;
