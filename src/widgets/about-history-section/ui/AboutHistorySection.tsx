import Image from "next/image";

import type { AboutHistoryBlockProps } from "@/entities/landing/model/about-blocks";
import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { Container } from "@/shared/ui/container";

import styles from "./AboutHistorySection.module.css";

type AboutHistorySectionProps = {
  content: AboutHistoryBlockProps;
};

export function AboutHistorySection({ content }: AboutHistorySectionProps) {
  const { title, timeline, mission } = content;

  return (
    <section
      className={styles["about-history-section"]}
    >
      <div className={styles["about-history-section__decor"]} aria-hidden>
        <div className={styles["about-history-section__gradient"]} />
        <div className={styles["about-history-section__orb--purple"]} />
        <div className={styles["about-history-section__orb--orange-top"]} />
        <div className={styles["about-history-section__orb--orange-bottom"]} />
      </div>
      <Container wide>
        <div className={styles["about-history-section__inner"]}>
          <h2 className={styles["about-history-section__title"]}>
            {title}
          </h2>
          <div className={styles["about-history-section__body"]}>
            <div className={styles["about-history-section__timeline-column"]}>
              <ol className={styles["about-history-section__timeline"]}>
                {timeline.map((item, index) => (
                  <li key={`${item.year}-${index}`} className={styles["about-history-section__timeline-item"]}>
                    <span className={styles["about-history-section__timeline-arrow"]} aria-hidden>
                      <ArrowIcon name="2Right" className={styles["about-history-section__timeline-arrow-icon"]} />
                    </span>
                    <div className={styles["about-history-section__timeline-copy"]}>
                      <span className={styles["about-history-section__timeline-year"]}>
                        {item.year}
                      </span>
                      <p className={styles["about-history-section__timeline-text"]}>
                        {item.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className={styles["about-history-section__mission-column"]}>
              <article className={styles["about-history-section__mission"]}>
                <span className={styles["about-history-section__mission-tag"]}>
                  {mission.tag}
                </span>
                <ul className={styles["about-history-section__mission-list"]}>
                  {mission.items.map((item, index) => {
                    const marker = mission.markers[index];

                    return (
                      <li key={`${item}-${index}`} className={styles["about-history-section__mission-item"]}>
                        {marker ? (
                          <div>
                            <span className={styles["about-history-section__mission-marker"]} aria-hidden>
                              <Image src={marker.iconSrc} alt={marker.alt} width={28} height={28} />
                            </span>
                          </div>
                        ) : null}
                        <p className={styles["about-history-section__mission-item-text"]}>
                          {item}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
