import Image from "next/image";

import type { ClientsPlatformBenefitsShowcaseItem } from "@/entities/landing";
import { EditableMedia, EditableText } from "@/shared/ui/editable-field";

import styles from "./ClientsPlatformBenefitsShowcaseCard.module.css";

type ClientsPlatformBenefitsShowcaseCardProps = {
  item: ClientsPlatformBenefitsShowcaseItem;
  itemIndex: number;
};

export function ClientsPlatformBenefitsShowcaseCard({
  item,
  itemIndex,
}: ClientsPlatformBenefitsShowcaseCardProps) {
  const prefix = `showcase.${itemIndex}.`;

  if (item.variant === "it-costs") {
    return (
      <article
        className={`${styles["clients-platform-benefits-showcase-card"]} ${styles["clients-platform-benefits-showcase-card--it-costs"]}`}
      >
        <div className={styles["clients-platform-benefits-showcase-card__copy"]}>
          <EditableText
            path={`${prefix}title`}
            label="Showcase — заголовок"
            as="h3"
            className={styles["clients-platform-benefits-showcase-card__title"]}
          >
            {item.title}
          </EditableText>
          <EditableText
            path={`${prefix}subtitle`}
            label="Showcase — подзаголовок"
            as="p"
            className={styles["clients-platform-benefits-showcase-card__subtitle"]}
            multiline
          >
            {item.subtitle}
          </EditableText>
        </div>
        <EditableMedia path={`${prefix}visual.imageSrc`} label="Showcase — изображение">
          <Image
            className={styles["clients-platform-benefits-showcase-card__it-visual"]}
            src={item.visual.imageSrc}
            alt={item.visual.imageAlt}
            width={item.visual.imageWidth}
            height={item.visual.imageHeight}
            sizes="(max-width: 768px) 100vw, (max-width: 992px) 460px, 31vw"
          />
        </EditableMedia>
      </article>
    );
  }

  if (item.variant === "quality") {
    return (
      <article
        className={`${styles["clients-platform-benefits-showcase-card"]} ${styles["clients-platform-benefits-showcase-card--quality"]}`}
      >
        <div className={styles["clients-platform-benefits-showcase-card__quality-top"]}>
          <div className={styles["clients-platform-benefits-showcase-card__copy"]}>
            <EditableText
              path={`${prefix}title`}
              label="Showcase — заголовок"
              as="h3"
              className={`${styles["clients-platform-benefits-showcase-card__title"]} ${styles["clients-platform-benefits-showcase-card__title--dark"]}`}
            >
              {item.title}
            </EditableText>
            <EditableText
              path={`${prefix}subtitle`}
              label="Showcase — подзаголовок"
              as="p"
              className={`${styles["clients-platform-benefits-showcase-card__subtitle"]} ${styles["clients-platform-benefits-showcase-card__subtitle--dark"]}`}
              multiline
            >
              {item.subtitle}
            </EditableText>
          </div>
          {item.stat ? (
            <div className={styles["clients-platform-benefits-showcase-card__stat"]}>
              <span
                className={styles["clients-platform-benefits-showcase-card__stat-bar"]}
                aria-hidden
              />
              <EditableText
                path={`${prefix}stat.value`}
                label="Showcase — значение метрики"
                as="p"
                className={styles["clients-platform-benefits-showcase-card__stat-value"]}
              >
                {item.stat.value}
              </EditableText>
              <EditableText
                path={`${prefix}stat.description`}
                label="Showcase — описание метрики"
                as="p"
                className={styles["clients-platform-benefits-showcase-card__stat-text"]}
                multiline
              >
                {item.stat.description}
              </EditableText>
            </div>
          ) : null}
        </div>
        <div className={styles["clients-platform-benefits-showcase-card__quality-visual"]}>
          <EditableMedia path={`${prefix}visual.imageSrc`} label="Showcase — изображение">
            <Image
              className={styles["clients-platform-benefits-showcase-card__quality-image"]}
              src={item.visual.imageSrc}
              alt={item.visual.imageAlt}
              width={item.visual.imageWidth}
              height={item.visual.imageHeight}
              sizes="(max-width: 768px) 100vw, (max-width: 992px) 460px, 66vw"
            />
          </EditableMedia>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`${styles["clients-platform-benefits-showcase-card"]} ${styles["clients-platform-benefits-showcase-card--scaling"]}`}
    >
      <EditableMedia path={`${prefix}visual.imageSrc`} label="Showcase — изображение">
        <Image
          className={styles["clients-platform-benefits-showcase-card__scaling-photo"]}
          src={item.visual.imageSrc}
          alt={item.visual.imageAlt}
          width={item.visual.imageWidth}
          height={item.visual.imageHeight}
          sizes="(max-width: 992px) 928px, 100vw"
        />
      </EditableMedia>
      <div className={styles["clients-platform-benefits-showcase-card__copy"]}>
        <EditableText
          path={`${prefix}title`}
          label="Showcase — заголовок"
          as="h3"
          className={`${styles["clients-platform-benefits-showcase-card__title"]} ${styles["clients-platform-benefits-showcase-card__title--dark"]}`}
        >
          {item.title}
        </EditableText>
        <EditableText
          path={`${prefix}subtitle`}
          label="Showcase — подзаголовок"
          as="p"
          className={`${styles["clients-platform-benefits-showcase-card__subtitle"]} ${styles["clients-platform-benefits-showcase-card__subtitle--dark"]}`}
          multiline
        >
          {item.subtitle}
        </EditableText>
      </div>
    </article>
  );
}
