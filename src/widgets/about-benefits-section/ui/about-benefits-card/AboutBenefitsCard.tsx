import styles from "./AboutBenefitsCard.module.css";

type AboutBenefitsCardCopyProps = {
  title: string;
  text: string;
};

function AboutBenefitsCardCopy({ title, text }: AboutBenefitsCardCopyProps) {
  return (
    <div className={styles["about-benefits-card__copy"]}>
      <h3 className={styles["about-benefits-card__title"]}>{title}</h3>
      <p className={styles["about-benefits-card__text"]}>{text}</p>
    </div>
  );
}

type AboutBenefitsFlexCardProps = {
  iconSrc: string;
  title: string;
  text: string;
};

export function AboutBenefitsFlexCard({
  iconSrc,
  title,
  text,
}: AboutBenefitsFlexCardProps) {
  return (
    <article
      className={`${styles["about-benefits-card"]} ${styles["about-benefits-card--flex"]}`}
    >
      <img
        src={iconSrc}
        alt=""
        className={styles["about-benefits-card__icon"]}
        width={52}
        height={52}
      />
      <AboutBenefitsCardCopy title={title} text={text} />
    </article>
  );
}

type AboutBenefitsPlatformCardProps = {
  title: string;
  text: string;
};

export function AboutBenefitsPlatformCard({
  title,
  text,
}: AboutBenefitsPlatformCardProps) {
  return (
    <article
      className={`${styles["about-benefits-card"]} ${styles["about-benefits-card--platform"]}`}
    >
      <AboutBenefitsCardCopy title={title} text={text} />
    </article>
  );
}

type AboutBenefitsSecurityCardProps = {
  imageSrc: string;
  title: string;
  text: string;
};

export function AboutBenefitsSecurityCard({
  imageSrc,
  title,
  text,
}: AboutBenefitsSecurityCardProps) {
  return (
    <article
      className={`${styles["about-benefits-card"]} ${styles["about-benefits-card--security"]}`}
    >
      <AboutBenefitsCardCopy title={title} text={text} />
      <img
        src={imageSrc}
        alt=""
        className={styles["about-benefits-card__security-visual"]}
      />
    </article>
  );
}

type AboutBenefitsExpertiseCardProps = {
  imageSrc: string;
  title: string;
  text: string;
};

export function AboutBenefitsExpertiseCard({
  imageSrc,
  title,
  text,
}: AboutBenefitsExpertiseCardProps) {
  return (
    <article
      className={`${styles["about-benefits-card"]} ${styles["about-benefits-card--expertise"]}`}
    >
      <img
        src={imageSrc}
        alt=""
        className={styles["about-benefits-card__expertise-photo"]}
      />
      <AboutBenefitsCardCopy title={title} text={text} />
    </article>
  );
}
