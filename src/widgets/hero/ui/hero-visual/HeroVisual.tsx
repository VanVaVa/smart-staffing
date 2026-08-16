"use client";

import type { CSSProperties } from "react";
import Image from "next/image";

import type { HeroSegment as HeroSegmentData } from "@/entities/landing/model/home-blocks";
import {
  EditableCollectionAdd,
  EditableCollectionItem,
  EditableMedia,
} from "@/shared/ui/editable-field";
import { useAdminBlockEditOptional } from "@/shared/ui/editable-field/context";

import { useHeroSegmentCarousel } from "../../lib/use-hero-segment-carousel";
import { HeroSegment as HeroSegmentCard } from "../hero-segment";
import styles from "./HeroVisual.module.css";

type HeroVisualProps = {
  segments: HeroSegmentData[];
};

export function HeroVisual({ segments }: HeroVisualProps) {
  const blockEdit = useAdminBlockEditOptional();
  const { displayIndex, cycleKey, hoverSegment, animateSegment, animateImage, holdMs } =
    useHeroSegmentCarousel({
      segmentCount: segments.length,
      enabled: !blockEdit,
    });

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

          const image = (
            <Image
              className={styles["hero-visual__dashboard-image"]}
              src={segment.imageSrc}
              alt="Интерфейс платформы СмартСтаффинг"
              fill
              sizes="(max-width: 1200px) 100vw, 880px"
              priority={index === 0}
            />
          );

          if (blockEdit && isVisible) {
            return (
              <EditableMedia
                key={`${segment.label}-${index}`}
                path={`segments.${index}.imageSrc`}
                label="Dashboard Hero"
                className={layerClass}
              >
                {image}
              </EditableMedia>
            );
          }

          return (
            <div
              key={`${segment.label}-${index}`}
              className={layerClass}
              aria-hidden={!isVisible}
            >
              {image}
            </div>
          );
        })}
      </div>
      <div className={styles["hero-visual__segments"]}>
        {segments.map((segment, index) => (
          <EditableCollectionItem
            key={`${segment.label}-${index}`}
            arrayPath="segments"
            index={index}
            variant="segment"
          >
            <HeroSegmentCard
              label={segment.label}
              imageSrc={segment.imageSrc}
              href={segment.href}
              index={index}
              isActive={index === displayIndex}
              animate={animateSegment}
              cycleKey={cycleKey}
              onHoverStart={() => hoverSegment(index)}
              onHoverEnd={() => hoverSegment(null)}
            />
          </EditableCollectionItem>
        ))}
        <EditableCollectionAdd arrayPath="segments" collectionKey="segments" addLabel="Сегмент" />
      </div>
    </div>
  );
}
