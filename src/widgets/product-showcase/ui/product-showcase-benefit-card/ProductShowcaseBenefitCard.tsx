import type { ProductShowcaseCostIcon } from "@/entities/landing/model/home-blocks";
import { EditableMedia, EditableText } from "@/shared/ui/editable-field";

import styles from "./ProductShowcaseBenefitCard.module.css";

type ProductShowcaseBenefitMediaProps = {
  src?: string;
  alt: string;
  className: string;
  width: number;
  height: number;
  mediaPath?: string;
  mediaLabel?: string;
};

function ProductShowcaseBenefitMedia({
  src,
  alt,
  className,
  width,
  height,
  mediaPath,
  mediaLabel,
}: ProductShowcaseBenefitMediaProps) {
  const image = src ? (
    <img className={className} src={src} alt={alt} width={width} height={height} />
  ) : (
    <div
      className={`${className} ${styles["product-showcase-benefit-card__media-placeholder"]}`}
      style={{ aspectRatio: `${width} / ${height}` }}
      aria-hidden
    />
  );

  if (!mediaPath || !mediaLabel) {
    return image;
  }

  return (
    <EditableMedia path={mediaPath} label={mediaLabel}>
      {image}
    </EditableMedia>
  );
}

type ProductShowcaseBenefitCostIconsProps = {
  icons: ProductShowcaseCostIcon[];
};

function ProductShowcaseBenefitCostIcons({ icons }: ProductShowcaseBenefitCostIconsProps) {
  return (
    <div className={styles["product-showcase-benefit-card__icons"]} aria-hidden>
      {icons.map((icon, index) => (
        <EditableMedia
          key={index}
          path={`benefitMedia.costIcons.${index}.imageSrc`}
          label={`Cost icon ${index + 1}`}
          className={styles["product-showcase-benefit-card__icon"]}
        >
          {icon.imageSrc ? (
            <img
              className={styles["product-showcase-benefit-card__icon-image"]}
              src={icon.imageSrc}
              alt=""
              width={48}
              height={48}
            />
          ) : (
            <span className={styles["product-showcase-benefit-card__icon-placeholder"]} />
          )}
        </EditableMedia>
      ))}
    </div>
  );
}

type CostCardProps = {
  benefitIndex: number;
  title: string;
  text: string;
  costIcons: ProductShowcaseCostIcon[];
};

export function ProductShowcaseBenefitCostCard({
  benefitIndex,
  title,
  text,
  costIcons,
}: CostCardProps) {
  return (
    <article
      className={`${styles["product-showcase-benefit-card"]} ${styles["product-showcase-benefit-card--cost"]}`}
    >
      <ProductShowcaseBenefitCostIcons icons={costIcons} />
      <div className={styles["product-showcase-benefit-card__copy"]}>
        <EditableText
          path={`benefits.${benefitIndex}.title`}
          label="Benefit — заголовок"
          as="h3"
          className={styles["product-showcase-benefit-card__title"]}
        >
          {title}
        </EditableText>
        <EditableText
          path={`benefits.${benefitIndex}.text`}
          label="Benefit — текст"
          as="p"
          className={styles["product-showcase-benefit-card__text"]}
          multiline
        >
          {text}
        </EditableText>
      </div>
    </article>
  );
}

type WideMediaCardProps = {
  benefitIndex: number;
  title: string;
  text: string;
  mediaImageSrc?: string;
  mediaPath: string;
};

export function ProductShowcaseBenefitWideMediaCard({
  benefitIndex,
  title,
  text,
  mediaImageSrc,
  mediaPath,
}: WideMediaCardProps) {
  return (
    <article
      className={`${styles["product-showcase-benefit-card"]} ${styles["product-showcase-benefit-card--wide-media"]}`}
    >
      <div className={styles["product-showcase-benefit-card__copy"]}>
        <EditableText
          path={`benefits.${benefitIndex}.title`}
          label="Benefit — заголовок"
          as="h3"
          className={styles["product-showcase-benefit-card__title"]}
        >
          {title}
        </EditableText>
        <EditableText
          path={`benefits.${benefitIndex}.text`}
          label="Benefit — текст"
          as="p"
          className={styles["product-showcase-benefit-card__text"]}
          multiline
        >
          {text}
        </EditableText>
      </div>
      <div className={styles["product-showcase-benefit-card__media-slot"]}>
        <ProductShowcaseBenefitMedia
          src={mediaImageSrc}
          alt=""
          className={styles["product-showcase-benefit-card__media-side"]}
          width={450}
          height={324}
          mediaPath={mediaPath}
          mediaLabel="Benefit — медиа"
        />
      </div>
    </article>
  );
}

type TallMediaCardProps = {
  benefitIndex: number;
  title: string;
  text: string;
  mediaImageSrc?: string;
  mediaPath: string;
};

export function ProductShowcaseBenefitTallMediaCard({
  benefitIndex,
  title,
  text,
  mediaImageSrc,
  mediaPath,
}: TallMediaCardProps) {
  return (
    <article
      className={`${styles["product-showcase-benefit-card"]} ${styles["product-showcase-benefit-card--tall-media"]}`}
    >
      <div className={styles["product-showcase-benefit-card__copy"]}>
        <EditableText
          path={`benefits.${benefitIndex}.title`}
          label="Benefit — заголовок"
          as="h3"
          className={styles["product-showcase-benefit-card__title"]}
        >
          {title}
        </EditableText>
        <EditableText
          path={`benefits.${benefitIndex}.text`}
          label="Benefit — текст"
          as="p"
          className={styles["product-showcase-benefit-card__text"]}
          multiline
        >
          {text}
        </EditableText>
      </div>
      <ProductShowcaseBenefitMedia
        src={mediaImageSrc}
        alt=""
        className={styles["product-showcase-benefit-card__media-bottom"]}
        width={472}
        height={275}
        mediaPath={mediaPath}
        mediaLabel="Benefit — медиа"
      />
    </article>
  );
}

type StatCardProps = {
  benefitIndex: number;
  statValue: string;
  title: string;
  text: string;
  mediaImageSrc?: string;
  mediaPath: string;
};

export function ProductShowcaseBenefitStatCard({
  benefitIndex,
  statValue,
  title,
  text,
  mediaImageSrc,
  mediaPath,
}: StatCardProps) {
  return (
    <article
      className={`${styles["product-showcase-benefit-card"]} ${styles["product-showcase-benefit-card--stat"]}`}
    >
      <div className={styles["product-showcase-benefit-card__stat-panel"]}>
        <ProductShowcaseBenefitMedia
          src={mediaImageSrc}
          alt=""
          className={styles["product-showcase-benefit-card__stat-bg"]}
          width={447}
          height={202}
          mediaPath={mediaPath}
          mediaLabel="Benefit stat — медиа"
        />
        <EditableText
          path={`benefits.${benefitIndex}.statValue`}
          label="Benefit — stat"
          as="p"
          className={styles["product-showcase-benefit-card__stat-value"]}
        >
          {statValue}
        </EditableText>
      </div>
      <div className={styles["product-showcase-benefit-card__copy"]}>
        <EditableText
          path={`benefits.${benefitIndex}.title`}
          label="Benefit — заголовок"
          as="h3"
          className={styles["product-showcase-benefit-card__title"]}
        >
          {title}
        </EditableText>
        <EditableText
          path={`benefits.${benefitIndex}.text`}
          label="Benefit — текст"
          as="p"
          className={styles["product-showcase-benefit-card__text"]}
          multiline
        >
          {text}
        </EditableText>
      </div>
    </article>
  );
}
