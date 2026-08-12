import Image from "next/image";

import { EditableMedia, EditableText } from "@/shared/ui/editable-field";

import styles from "./HeroSegment.module.css";

type HeroSegmentProps = {
  label: string;
  imageSrc: string;
  index: number;
  isActive: boolean;
  animate: boolean;
  cycleKey: number;
};

export function HeroSegment({
  label,
  imageSrc,
  index,
  isActive,
  animate,
  cycleKey,
}: HeroSegmentProps) {
  const segmentClass = [
    styles["hero-segment"],
    isActive ? styles["hero-segment--active"] : "",
    animate ? styles["hero-segment--animate"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={segmentClass}>
      <span
        key={isActive ? cycleKey : `idle-${index}`}
        className={styles["hero-segment__active-bg"]}
        aria-hidden
      />
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
    </div>
  );
}
