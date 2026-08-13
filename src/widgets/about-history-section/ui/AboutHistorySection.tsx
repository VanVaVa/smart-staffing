import Image from "next/image";

import type { AboutHistoryBlockProps } from "@/entities/landing/model/about-blocks";
import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { Container } from "@/shared/ui/container";
import {
  EditableCollectionAdd,
  EditableCollectionItem,
  EditableMedia,
  EditableText,
} from "@/shared/ui/editable-field";

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
          <EditableText
            path="title"
            label="Заголовок истории"
            as="h2"
            className={styles["about-history-section__title"]}
            multiline
          >
            {title}
          </EditableText>
          <div className={styles["about-history-section__body"]}>
            <div className={styles["about-history-section__timeline-column"]}>
              <ol className={styles["about-history-section__timeline"]}>
                {timeline.map((item, index) => (
                  <EditableCollectionItem
                    key={`${item.year}-${index}`}
                    arrayPath="timeline"
                    index={index}
                  >
                    <li className={styles["about-history-section__timeline-item"]}>
                      <span className={styles["about-history-section__timeline-arrow"]} aria-hidden>
                        <ArrowIcon name="2Right" className={styles["about-history-section__timeline-arrow-icon"]} />
                      </span>
                      <div className={styles["about-history-section__timeline-copy"]}>
                        <EditableText
                          path={`timeline.${index}.year`}
                          label="История — год"
                          className={styles["about-history-section__timeline-year"]}
                        >
                          {item.year}
                        </EditableText>
                        <EditableText
                          path={`timeline.${index}.text`}
                          label="История — событие"
                          as="p"
                          className={styles["about-history-section__timeline-text"]}
                          multiline
                        >
                          {item.text}
                        </EditableText>
                      </div>
                    </li>
                  </EditableCollectionItem>
                ))}
              </ol>
              <EditableCollectionAdd
                arrayPath="timeline"
                collectionKey="history.timeline"
                addLabel="Событие"
              />
            </div>
            <div className={styles["about-history-section__mission-column"]}>
              <article className={styles["about-history-section__mission"]}>
                <EditableText
                  path="mission.tag"
                  label="Миссия — тег"
                  className={styles["about-history-section__mission-tag"]}
                >
                  {mission.tag}
                </EditableText>
                <ul className={styles["about-history-section__mission-list"]}>
                  {mission.items.map((item, index) => {
                    const marker = mission.markers[index];

                    return (
                      <EditableCollectionItem
                        key={`${item}-${index}`}
                        arrayPath="mission.items"
                        index={index}
                      >
                        <li className={styles["about-history-section__mission-item"]}>
                          {marker ? (
                            <EditableMedia
                              path={`mission.markers.${index}.iconSrc`}
                              label="Миссия — иконка"
                            >
                              <span className={styles["about-history-section__mission-marker"]} aria-hidden>
                                <Image src={marker.iconSrc} alt={marker.alt} width={28} height={28} />
                              </span>
                            </EditableMedia>
                          ) : null}
                          <EditableText
                            path={`mission.items.${index}`}
                            label="Миссия — пункт"
                            as="p"
                            className={styles["about-history-section__mission-item-text"]}
                            multiline
                          >
                            {item}
                          </EditableText>
                        </li>
                      </EditableCollectionItem>
                    );
                  })}
                </ul>
                <EditableCollectionAdd
                  arrayPath="mission.items"
                  collectionKey="history.mission.items"
                  addLabel="Пункт миссии"
                />
              </article>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
