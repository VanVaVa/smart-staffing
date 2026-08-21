import Image from "next/image";

import type { AboutSpotlightBlockProps } from "@/entities/landing/model/about-blocks";

import styles from "./AboutSpotlightSection.module.css";

type AboutSpotlightSectionProps = {
  content: AboutSpotlightBlockProps;
};

export function AboutSpotlightSection({ content }: AboutSpotlightSectionProps) {
  const { leftTag, collageSrc, collageAlt, bookCoverSrc, bookCoverAlt } = content;

  return (
    <section className={styles["about-spotlight-section"]}>
      <div className={styles["about-spotlight-section__decor"]} aria-hidden>
        <div className={styles["about-spotlight-section__orb--small"]} />
        <div className={styles["about-spotlight-section__orb--large"]} />
      </div>
      <div className={styles["about-spotlight-section__grid"]}>
        <article className={styles["about-spotlight-section__card"]}>
          <div className={styles["about-spotlight-section__tag"]}>
            <div>
              <span className={styles["about-spotlight-section__tag-icon"]}>
                <img src={leftTag.iconSrc} alt="" className={styles["about-spotlight-section__tag-icon-image"]} />
              </span>
            </div>
            <span className={styles["about-spotlight-section__tag-label"]}>
              {leftTag.label}
            </span>
          </div>
        </article>
        <figure className={styles["about-spotlight-section__preview"]}>
          <div>
            <Image
              className={styles["about-spotlight-section__preview-image"]}
              src={bookCoverSrc}
              alt={bookCoverAlt}
              width={636}
              height={452}
              sizes="(max-width: 450px) 76px, (max-width: 768px) 124px, (max-width: 1440px) 232px, 318px"
            />
          </div>
        </figure>
        <figure className={styles["about-spotlight-section__collage"]}>
          <div className={styles["about-spotlight-section__collage-media"]}>
            <Image
              className={styles["about-spotlight-section__collage-image"]}
              src={collageSrc}
              alt={collageAlt}
              fill
              sizes="(max-width: 450px) 328px, (max-width: 768px) 720px, (max-width: 992px) 100vw, 679px"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
