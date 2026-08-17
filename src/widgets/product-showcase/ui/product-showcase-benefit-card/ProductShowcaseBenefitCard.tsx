import type { ProductShowcaseCostIcon } from "@/entities/landing/model/home-blocks";

import styles from "./ProductShowcaseBenefitCard.module.css";

type ProductShowcaseBenefitMediaProps = {
  src?: string;
  alt: string;
  className: string;
  width: number;
  height: number;
};

function ProductShowcaseBenefitMedia({
  src,
  alt,
  className,
  width,
  height,
}: ProductShowcaseBenefitMediaProps) {
  return (
    <div>
      {src ? (
        <img className={className} src={src} alt={alt} width={width} height={height} />
      ) : (
        <div
          className={`${className} ${styles["product-showcase-benefit-card__media-placeholder"]}`}
          style={{ aspectRatio: `${width} / ${height}` }}
          aria-hidden
        />
      )}
    </div>
  );
}

type ProductShowcaseBenefitCostIconsProps = {
  icons: ProductShowcaseCostIcon[];
};

function ProductShowcaseBenefitCostIcons({ icons }: ProductShowcaseBenefitCostIconsProps) {
  return (
    <div className={styles["product-showcase-benefit-card__icons"]} aria-hidden>
      {icons.map((icon, index) => (
        <div key={index} className={styles["product-showcase-benefit-card__icon"]}>
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
        </div>
      ))}
    </div>
  );
}

type CostCardProps = {
  title: string;
  text: string;
  costIcons: ProductShowcaseCostIcon[];
};

export function ProductShowcaseBenefitCostCard({
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
        <h3 className={styles["product-showcase-benefit-card__title"]}>
          {title}
        </h3>
        <p className={styles["product-showcase-benefit-card__text"]}>
          {text}
        </p>
      </div>
    </article>
  );
}

type WideMediaCardProps = {
  title: string;
  text: string;
  mediaImageSrc?: string;
};

export function ProductShowcaseBenefitWideMediaCard({
  title,
  text,
  mediaImageSrc,
}: WideMediaCardProps) {
  return (
    <article
      className={`${styles["product-showcase-benefit-card"]} ${styles["product-showcase-benefit-card--wide-media"]}`}
    >
      <div className={styles["product-showcase-benefit-card__copy"]}>
        <h3 className={styles["product-showcase-benefit-card__title"]}>
          {title}
        </h3>
        <p className={styles["product-showcase-benefit-card__text"]}>
          {text}
        </p>
      </div>
      <div className={styles["product-showcase-benefit-card__media-slot"]}>
        <ProductShowcaseBenefitMedia
          src={mediaImageSrc}
          alt=""
          className={styles["product-showcase-benefit-card__media-side"]}
          width={450}
          height={324}
        />
      </div>
    </article>
  );
}

type TallMediaCardProps = {
  title: string;
  text: string;
  mediaImageSrc?: string;
};

export function ProductShowcaseBenefitTallMediaCard({
  title,
  text,
  mediaImageSrc,
}: TallMediaCardProps) {
  return (
    <article
      className={`${styles["product-showcase-benefit-card"]} ${styles["product-showcase-benefit-card--tall-media"]}`}
    >
      <div className={styles["product-showcase-benefit-card__copy"]}>
        <h3 className={styles["product-showcase-benefit-card__title"]}>
          {title}
        </h3>
        <p className={styles["product-showcase-benefit-card__text"]}>
          {text}
        </p>
      </div>
      <ProductShowcaseBenefitMedia
        src={mediaImageSrc}
        alt=""
        className={styles["product-showcase-benefit-card__media-bottom"]}
        width={472}
        height={275}
      />
    </article>
  );
}

type StatCardProps = {
  statValue: string;
  title: string;
  text: string;
  mediaImageSrc?: string;
};

export function ProductShowcaseBenefitStatCard({
  statValue,
  title,
  text,
  mediaImageSrc,
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
        />
        <p className={styles["product-showcase-benefit-card__stat-value"]}>
          {statValue}
        </p>
      </div>
      <div className={styles["product-showcase-benefit-card__copy"]}>
        <h3 className={styles["product-showcase-benefit-card__title"]}>
          {title}
        </h3>
        <p className={styles["product-showcase-benefit-card__text"]}>
          {text}
        </p>
      </div>
    </article>
  );
}
