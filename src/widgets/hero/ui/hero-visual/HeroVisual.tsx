import Image from "next/image";

import { heroContent } from "@/entities/landing";

import { HeroSegment } from "../hero-segment";
import styles from "./HeroVisual.module.css";

export function HeroVisual() {
  return (
    <div className={styles["hero-visual"]}>
      <Image
        className={styles["hero-visual__dashboard"]}
        src="/landing/hero-dashboard.png"
        alt="Интерфейс платформы СмартСтаффинг"
        width={880}
        height={450}
        priority
      />
      <div className={styles["hero-visual__segments"]}>
        {heroContent.segments.map((segment) => (
          <HeroSegment
            key={segment.label}
            label={segment.label}
            imageSrc={segment.imageSrc}
          />
        ))}
      </div>
    </div>
  );
}
