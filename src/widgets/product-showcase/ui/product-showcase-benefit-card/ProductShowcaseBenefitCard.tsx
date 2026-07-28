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
  if (src) {
    return (
      <img
        className={className}
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    );
  }

  return (
    <div
      className={`${className} ${styles["product-showcase-benefit-card__media-placeholder"]}`}
      style={{ aspectRatio: `${width} / ${height}` }}
      aria-hidden
    />
  );
}

type CostCardProps = {
  title: string;
  text: string;
  iconsImageSrc?: string;
};

export function ProductShowcaseBenefitCostCard({
  title,
  text,
  iconsImageSrc,
}: CostCardProps) {
  return (
    <article
      className={`${styles["product-showcase-benefit-card"]} ${styles["product-showcase-benefit-card--cost"]}`}
    >
      <ProductShowcaseBenefitMedia
        src={iconsImageSrc}
        alt=""
        className={styles["product-showcase-benefit-card__icons"]}
        width={394}
        height={52}
      />
      <div className={styles["product-showcase-benefit-card__copy"]}>
        <h3 className={styles["product-showcase-benefit-card__title"]}>{title}</h3>
        <p className={styles["product-showcase-benefit-card__text"]}>{text}</p>
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
        <h3 className={styles["product-showcase-benefit-card__title"]}>{title}</h3>
        <p className={styles["product-showcase-benefit-card__text"]}>{text}</p>
      </div>
      <ProductShowcaseBenefitMedia
        src={mediaImageSrc}
        alt=""
        className={styles["product-showcase-benefit-card__media-side"]}
        width={450}
        height={324}
      />
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
        <h3 className={styles["product-showcase-benefit-card__title"]}>{title}</h3>
        <p className={styles["product-showcase-benefit-card__text"]}>{text}</p>
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
        <p className={styles["product-showcase-benefit-card__stat-value"]}>{statValue}</p>
      </div>
      <div className={styles["product-showcase-benefit-card__copy"]}>
        <h3 className={styles["product-showcase-benefit-card__title"]}>{title}</h3>
        <p className={styles["product-showcase-benefit-card__text"]}>{text}</p>
      </div>
    </article>
  );
}
