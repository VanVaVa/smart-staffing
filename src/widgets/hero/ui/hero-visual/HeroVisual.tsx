"use client";

import type { CSSProperties } from "react";
import Image from "next/image";

import type { HeroSegment as HeroSegmentData } from "@/entities/landing/model/home-blocks";

import { useHeroSegmentCarousel } from "../../lib/use-hero-segment-carousel";
import { HeroSegment as HeroSegmentCard } from "../hero-segment";
import styles from "./HeroVisual.module.css";

type HeroVisualProps = {
  segments: HeroSegmentData[];
};

export function HeroVisual({ segments }: HeroVisualProps) {
  const { displayIndex, cycleKey, hoverSegment, animateSegment, animateImage, holdMs } =
    useHeroSegmentCarousel({ segmentCount: segments.length });

  const slideDurationStyle = {
    "--hero-segment-slide-duration": `${holdMs}ms`,
  } as CSSProperties;

  return (
    <div className={styles["hero-visual"]} style={slideDurationStyle}>
      <div className={styles["hero-visual__dashboard-stack"]}>
        {segments.map((segment, index) => {
          const isVisible = index === displayIndex;
          const layerClass = [
            styles["hero-visual__dashboard-layer"],
            isVisible ? styles["hero-visual__dashboard-layer--visible"] : "",
            !animateImage ? styles["hero-visual__dashboard-layer--instant"] : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div
              key={`${segment.label}-${index}`}
              className={layerClass}
              aria-hidden={!isVisible}
            >
              <Image
                className={styles["hero-visual__dashboard-image"]}
                src={segment.imageSrc}
                alt="Интерфейс платформы СмартСтаффинг"
                fill
                quality={90}
                sizes="(max-width: 992px) 100vw, (max-width: 1440px) 802px, 900px"
                priority={index === 0}
              />
            </div>
          );
        })}
      </div>
      <div className={styles["hero-visual__segments"]}>
        {segments.map((segment, index) => (
          <HeroSegmentCard
            key={`${segment.label}-${index}`}
            label={segment.label}
            imageSrc={segment.thumbImageSrc}
            href={segment.href}
            isActive={index === displayIndex}
            animate={animateSegment}
            cycleKey={cycleKey}
            onHoverStart={() => hoverSegment(index)}
            onHoverEnd={() => hoverSegment(null)}
          />
        ))}
      </div>
    </div>
  );
}
