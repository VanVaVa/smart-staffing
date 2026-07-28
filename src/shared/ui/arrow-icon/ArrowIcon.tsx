import styles from "./ArrowIcon.module.css";

export type ArrowIconName =
  | "cta"
  | "1Left"
  | "1Right"
  | "2Left"
  | "2Right"
  | "round";

type ArrowIconProps = {
  name: ArrowIconName;
  className?: string;
};

const icons: Record<
  ArrowIconName,
  { viewBox: string; path: string; sizeClass: string; flip?: boolean }
> = {
  cta: {
    viewBox: "0 0 16 16",
    path: "M13.3379 4.5444L1.88235 16L0 14.1177L11.4556 2.66205H1.35874V0H16V14.6413H13.3379V4.5444Z",
    sizeClass: styles["arrow-icon--size-16"],
  },
  "1Right": {
    viewBox: "0 0 32 32",
    path: "M21.736 14.7144L14.3604 7.81816L16.305 6L27 16L16.305 26L14.3604 24.1818L21.736 17.2857H5V14.7144L21.736 14.7144Z",
    sizeClass: styles["arrow-icon--size-32"],
  },
  "1Left": {
    viewBox: "0 0 32 32",
    path: "M10.264 17.2856L17.6396 24.1818L15.695 26L5 16L15.695 6L17.6396 7.81819L10.264 14.7143H27V17.2856H10.264Z",
    sizeClass: styles["arrow-icon--size-32"],
  },
  "2Right": {
    viewBox: "0 0 32 32",
    path: "M17.9999 15.9999L11 23L13 25L22 15.9999L13 7L11 9L17.9999 15.9999Z",
    sizeClass: styles["arrow-icon--size-32"],
  },
  "2Left": {
    viewBox: "0 0 32 32",
    path: "M15.0001 15.9999L22 23L20 25L11 15.9999L20 7L22 9L15.0001 15.9999Z",
    sizeClass: styles["arrow-icon--size-32"],
  },
  round: {
    viewBox: "0 0 18 18",
    path: "M12.8875 2.99481L0 15.8824L2.11763 18L15.0052 5.11244V16.4714H18V0L1.52855 0V2.99481L12.8875 2.99481Z",
    sizeClass: styles["arrow-icon--size-18"],
  },
};

export function ArrowIcon({ name, className }: ArrowIconProps) {
  const icon = icons[name];
  const rootClass = [
    styles["arrow-icon"],
    icon.sizeClass,
    icon.flip ? styles["arrow-icon--flip-x"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      className={rootClass}
      viewBox={icon.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}
