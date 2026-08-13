import Image from "next/image";

import type { AboutSpotlightBlockProps } from "@/entities/landing/model/about-blocks";
import { EditableMedia, EditableText } from "@/shared/ui/editable-field";

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
            <EditableMedia path="leftTag.iconSrc" label="Spotlight — иконка тега">
              <span className={styles["about-spotlight-section__tag-icon"]}>
                <Image src={leftTag.iconSrc} alt="" width={24} height={24} />
              </span>
            </EditableMedia>
            <EditableText
              path="leftTag.label"
              label="Spotlight — подпись тега"
              className={styles["about-spotlight-section__tag-label"]}
            >
              {leftTag.label}
            </EditableText>
          </div>
        </article>
        <figure className={styles["about-spotlight-section__preview"]}>
          <EditableMedia path="bookCoverSrc" label="Spotlight — обложка книги">
            <Image
              className={styles["about-spotlight-section__preview-image"]}
              src={bookCoverSrc}
              alt={bookCoverAlt}
              width={124}
              height={90}
              sizes="124px"
            />
          </EditableMedia>
        </figure>
        <figure className={styles["about-spotlight-section__collage"]}>
          <EditableMedia
            path="collageSrc"
            label="Spotlight — коллаж"
            className={styles["about-spotlight-section__collage-media"]}
          >
            <Image
              className={styles["about-spotlight-section__collage-image"]}
              src={collageSrc}
              alt={collageAlt}
              fill
              sizes="(max-width: 450px) 328px, (max-width: 768px) 720px, (max-width: 992px) 100vw, 679px"
            />
          </EditableMedia>
        </figure>
      </div>
    </section>
  );
}
