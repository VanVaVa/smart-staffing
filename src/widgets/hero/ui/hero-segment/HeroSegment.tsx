"use client";

import Image from "next/image";
import NextLink from "next/link";

import {
  EditableMedia,
  EditableText,
  useAdminBlockEditOptional,
} from "@/shared/ui/editable-field";

import styles from "./HeroSegment.module.css";

type HeroSegmentProps = {
  label: string;
  imageSrc: string;
  href: string;
  index: number;
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
  index,
  isActive,
  animate,
  cycleKey,
  onHoverStart,
  onHoverEnd,
}: HeroSegmentProps) {
  const blockEdit = useAdminBlockEditOptional();
  const segmentClass = [
    styles["hero-segment"],
    isActive ? styles["hero-segment--active"] : "",
    animate ? styles["hero-segment--animate"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span key={cycleKey} className={styles["hero-segment__active-bg"]} aria-hidden />
      <EditableMedia path={`segments.${index}.imageSrc`} label="Сегмент Hero — изображение">
        <div className={styles["hero-segment__thumb"]}>
          <Image
            src={imageSrc}
            alt=""
            width={68}
            height={68}
            className={styles["hero-segment__thumb-image"]}
          />
        </div>
      </EditableMedia>
      <EditableText
        path={`segments.${index}.label`}
        label="Сегмент Hero — подпись"
        className={styles["hero-segment__label"]}
      >
        {label}
      </EditableText>
    </>
  );

  if (blockEdit) {
    return (
      <div
        className={segmentClass}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
      >
        {content}
      </div>
    );
  }

  return (
    <NextLink
      href={href}
      className={segmentClass}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      {content}
    </NextLink>
  );
}
