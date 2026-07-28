import Image from "next/image";

import { aboutHistory } from "@/entities/landing";
import { headerBackdropProps } from "@/shared/config";
import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { Container } from "@/shared/ui/container";

import styles from "./AboutHistorySection.module.css";

export function AboutHistorySection() {
  const { title, timeline, mission } = aboutHistory;

  return (
    <section
      className={styles["about-history-section"]}
      {...headerBackdropProps("dark")}
    >
      <div className={styles["about-history-section__decor"]} aria-hidden>
        <div className={styles["about-history-section__gradient"]} />
        <div className={styles["about-history-section__orb--purple"]} />
        <div className={styles["about-history-section__orb--orange-top"]} />
        <div className={styles["about-history-section__orb--orange-bottom"]} />
      </div>
      <Container wide>
        <div className={styles["about-history-section__inner"]}>
          <h2 className={styles["about-history-section__title"]}>{title}</h2>
          <div className={styles["about-history-section__body"]}>
            <ol className={styles["about-history-section__timeline"]}>
              {timeline.map((item) => (
                <li key={item.year} className={styles["about-history-section__timeline-item"]}>
                  <span className={styles["about-history-section__timeline-arrow"]} aria-hidden>
                    <ArrowIcon name="2Right" className={styles["about-history-section__timeline-arrow-icon"]} />
                  </span>
                  <div className={styles["about-history-section__timeline-copy"]}>
                    <span className={styles["about-history-section__timeline-year"]}>{item.year}</span>
                    <p className={styles["about-history-section__timeline-text"]}>{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className={styles["about-history-section__mission-column"]}>
              <div className={styles["about-history-section__mission-markers"]} aria-hidden>
                {mission.markers.map((marker, index) => (
                  <span key={marker.iconSrc} className={styles["about-history-section__mission-marker"]}>
                    <Image
                      src={marker.iconSrc}
                      alt={marker.alt}
                      width={index === 1 ? 32 : 28}
                      height={index === 1 ? 32 : 28}
                    />
                  </span>
                ))}
              </div>
              <article className={styles["about-history-section__mission"]}>
                <span className={styles["about-history-section__mission-tag"]}>{mission.tag}</span>
                <ul className={styles["about-history-section__mission-list"]}>
                  {mission.items.map((item) => (
                    <li key={item} className={styles["about-history-section__mission-item"]}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
