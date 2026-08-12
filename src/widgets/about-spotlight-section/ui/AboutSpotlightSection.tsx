import Image from "next/image";

import { aboutSpotlight } from "@/entities/landing";

import styles from "./AboutSpotlightSection.module.css";

export function AboutSpotlightSection() {
  const { leftTag, collageSrc, collageAlt, bookCoverSrc, bookCoverAlt } = aboutSpotlight;

  return (
    <section className={styles["about-spotlight-section"]}>
      <div className={styles["about-spotlight-section__decor"]} aria-hidden>
        <div className={styles["about-spotlight-section__orb--small"]} />
        <div className={styles["about-spotlight-section__orb--large"]} />
      </div>
      <div className={styles["about-spotlight-section__grid"]}>
        <article className={styles["about-spotlight-section__card"]}>
          <div className={styles["about-spotlight-section__tag"]}>
            <span className={styles["about-spotlight-section__tag-icon"]}>
              <Image src={leftTag.iconSrc} alt="" width={24} height={24} />
            </span>
            <span className={styles["about-spotlight-section__tag-label"]}>{leftTag.label}</span>
          </div>
        </article>
        <figure className={styles["about-spotlight-section__preview"]}>
          <Image
            className={styles["about-spotlight-section__preview-image"]}
            src={bookCoverSrc}
            alt={bookCoverAlt}
            width={124}
            height={90}
            sizes="124px"
          />
        </figure>
        <figure className={styles["about-spotlight-section__collage"]}>
          <Image
            className={styles["about-spotlight-section__collage-image"]}
            src={collageSrc}
            alt={collageAlt}
            width={908}
            height={408}
            sizes="(max-width: 360px) 328px, (max-width: 768px) 720px, (max-width: 992px) 100vw, 679px"
          />
        </figure>
      </div>
    </section>
  );
}
