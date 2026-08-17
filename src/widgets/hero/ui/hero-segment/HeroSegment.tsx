"use client";

import Image from "next/image";
import NextLink from "next/link";

import styles from "./HeroSegment.module.css";

type HeroSegmentProps = {
  label: string;
  imageSrc: string;
  href: string;
  isActive: boolean;
  animate: boolean;
  cycleKey: number;
  onHoverStart: () => void;
  onHoverEnd: () => void;
};

export function HeroSegment({
  label,
  imageSrc,
  href,
  isActive,
  animate,
  cycleKey,
  onHoverStart,
  onHoverEnd,
}: HeroSegmentProps) {
  const segmentClass = [
    styles["hero-segment"],
    isActive ? styles["hero-segment--active"] : "",
    animate ? styles["hero-segment--animate"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <NextLink
      href={href}
      className={segmentClass}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <span key={cycleKey} className={styles["hero-segment__active-bg"]} aria-hidden />
      <div>
        <div className={styles["hero-segment__thumb"]}>
          <Image
            src={imageSrc}
            alt=""
            width={68}
            height={68}
            className={styles["hero-segment__thumb-image"]}
          />
        </div>
      </div>
      <span className={styles["hero-segment__label"]}>{label}</span>
    </NextLink>
  );
}
