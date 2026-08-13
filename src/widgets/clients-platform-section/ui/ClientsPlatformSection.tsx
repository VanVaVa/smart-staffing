import Image from "next/image";

import type { ClientsPlatformContent } from "@/entities/landing";
import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { Badge } from "@/shared/ui/badge";
import { Container } from "@/shared/ui/container";
import {
  EditableCollectionAdd,
  EditableCollectionItem,
  EditableMedia,
  EditableText,
} from "@/shared/ui/editable-field";

import styles from "./ClientsPlatformSection.module.css";

type ClientsPlatformSectionProps = {
  content: ClientsPlatformContent;
};

export function ClientsPlatformSection({ content }: ClientsPlatformSectionProps) {
  return (
    <section
      className={styles["clients-platform-section"]}
    >
      <div className={styles["clients-platform-section__decor"]} aria-hidden>
        <div className={styles["clients-platform-section__gradient"]} />
        <div
          className={`${styles["clients-platform-section__orb"]} ${styles["clients-platform-section__orb--orange"]}`}
        />
        <div
          className={`${styles["clients-platform-section__orb"]} ${styles["clients-platform-section__orb--purple-large"]}`}
        />
        <div
          className={`${styles["clients-platform-section__orb"]} ${styles["clients-platform-section__orb--purple-small"]}`}
        />
      </div>
      <Container className={styles["clients-platform-section__container"]}>
        <div className={styles["clients-platform-section__layout"]}>
          <div className={styles["clients-platform-section__pain-column"]}>
            <ul className={styles["clients-platform-section__pain-list"]}>
              {content.painPoints.map((point, index) => (
                <EditableCollectionItem
                  key={`${point}-${index}`}
                  arrayPath="painPoints"
                  index={index}
                >
                  <li className={styles["clients-platform-section__pain-item"]}>
                    <span
                      className={styles["clients-platform-section__pain-marker"]}
                      aria-hidden
                    >
                      <ArrowIcon
                        name="cta"
                        className={styles["clients-platform-section__pain-icon"]}
                      />
                    </span>
                    <EditableText
                      path={`painPoints.${index}`}
                      label="Платформа — pain point"
                      className={styles["clients-platform-section__pain-text"]}
                      multiline
                    >
                      {point}
                    </EditableText>
                  </li>
                </EditableCollectionItem>
              ))}
            </ul>
            <EditableCollectionAdd
              arrayPath="painPoints"
              collectionKey="platform.painPoints"
              addLabel="Pain point"
            />
          </div>
          <div className={styles["clients-platform-section__main"]}>
            <figure className={styles["clients-platform-section__preview"]}>
              <EditableMedia path="imageSrc" label="Платформа — превью">
                <Image
                  className={styles["clients-platform-section__preview-image"]}
                  src={content.imageSrc}
                  alt={content.imageAlt}
                  width={content.imageWidth}
                  height={content.imageHeight}
                  sizes="(max-width: 450px) 328px, (max-width: 768px) 359px, (max-width: 992px) 540px, (max-width: 1440px) 680px, 602px"
                />
              </EditableMedia>
            </figure>
            <div className={styles["clients-platform-section__copy"]}>
              <EditableText
                path="title"
                label="Платформа — заголовок"
                as="h2"
                className={styles["clients-platform-section__title"]}
                multiline
              >
                {content.title}
              </EditableText>
              <EditableText
                path="subtitle"
                label="Платформа — подзаголовок"
                as="p"
                className={styles["clients-platform-section__subtitle"]}
                multiline
              >
                {content.subtitle}
              </EditableText>
            </div>
            <div className={styles["clients-platform-section__tags"]}>
              {content.tags.map((tag, index) => (
                <EditableCollectionItem
                  key={`${tag}-${index}`}
                  arrayPath="tags"
                  index={index}
                >
                  <Badge variant="chip">
                    <EditableText path={`tags.${index}`} label="Платформа — тег">
                      {tag}
                    </EditableText>
                  </Badge>
                </EditableCollectionItem>
              ))}
              <EditableCollectionAdd
                arrayPath="tags"
                collectionKey="platform.tags"
                addLabel="Тег"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
