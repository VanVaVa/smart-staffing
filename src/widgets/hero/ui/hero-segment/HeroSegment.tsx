import Image from "next/image";

import styles from "./HeroSegment.module.css";

type HeroSegmentProps = {
  label: string;
  imageSrc: string;
};

export function HeroSegment({ label, imageSrc }: HeroSegmentProps) {
  return (
    <div className={styles["hero-segment"]}>
      <span className={styles["hero-segment__active-bg"]} aria-hidden />
      <div className={styles["hero-segment__thumb"]}>
        <Image src={imageSrc} alt="" width={68} height={68} className={styles["hero-segment__thumb-image"]} />
      </div>
      <span className={styles["hero-segment__label"]}>{label}</span>
    </div>
  );
}
