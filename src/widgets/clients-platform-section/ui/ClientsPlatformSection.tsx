import Image from "next/image";

import type { ClientsPlatformContent } from "@/entities/landing";
import { headerBackdropProps } from "@/shared/config";
import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { Badge } from "@/shared/ui/badge";
import { Container } from "@/shared/ui/container";

import styles from "./ClientsPlatformSection.module.css";

type ClientsPlatformSectionProps = {
  content: ClientsPlatformContent;
};

export function ClientsPlatformSection({ content }: ClientsPlatformSectionProps) {
  return (
    <section
      className={styles["clients-platform-section"]}
      {...headerBackdropProps("dark")}
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
          <ul className={styles["clients-platform-section__pain-list"]}>
            {content.painPoints.map((point) => (
              <li
                key={point}
                className={styles["clients-platform-section__pain-item"]}
              >
                <span
                  className={styles["clients-platform-section__pain-marker"]}
                  aria-hidden
                >
                  <ArrowIcon
                    name="cta"
                    className={styles["clients-platform-section__pain-icon"]}
                  />
                </span>
                <span className={styles["clients-platform-section__pain-text"]}>
                  {point}
                </span>
              </li>
            ))}
          </ul>
          <div className={styles["clients-platform-section__main"]}>
            <figure className={styles["clients-platform-section__preview"]}>
              <Image
                className={styles["clients-platform-section__preview-image"]}
                src={content.imageSrc}
                alt={content.imageAlt}
                width={content.imageWidth}
                height={content.imageHeight}
                sizes="(max-width: 960px) 100vw, 602px"
              />
            </figure>
            <div className={styles["clients-platform-section__copy"]}>
              <h2 className={styles["clients-platform-section__title"]}>
                {content.title}
              </h2>
              <p className={styles["clients-platform-section__subtitle"]}>
                {content.subtitle}
              </p>
            </div>
            <div className={styles["clients-platform-section__tags"]}>
              {content.tags.map((tag) => (
                <Badge key={tag} variant="chip">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
