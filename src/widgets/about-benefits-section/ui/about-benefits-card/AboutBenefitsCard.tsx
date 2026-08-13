import { EditableMedia, EditableText } from "@/shared/ui/editable-field";

import styles from "./AboutBenefitsCard.module.css";

type AboutBenefitsCardCopyProps = {
  title: string;
  text: string;
  titlePath: string;
  textPath: string;
  titleLabel: string;
  textLabel: string;
};

function AboutBenefitsCardCopy({
  title,
  text,
  titlePath,
  textPath,
  titleLabel,
  textLabel,
}: AboutBenefitsCardCopyProps) {
  return (
    <div className={styles["about-benefits-card__copy"]}>
      <EditableText
        path={titlePath}
        label={titleLabel}
        as="h3"
        className={styles["about-benefits-card__title"]}
      >
        {title}
      </EditableText>
      <EditableText
        path={textPath}
        label={textLabel}
        as="p"
        className={styles["about-benefits-card__text"]}
        multiline
      >
        {text}
      </EditableText>
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
      <EditableMedia path="flex.iconSrc" label="Преимущество — иконка гибкости">
        <img
          src={iconSrc}
          alt=""
          className={styles["about-benefits-card__icon"]}
          width={52}
          height={52}
        />
      </EditableMedia>
      <AboutBenefitsCardCopy
        title={title}
        text={text}
        titlePath="flex.title"
        textPath="flex.text"
        titleLabel="Гибкость — заголовок"
        textLabel="Гибкость — текст"
      />
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
      <AboutBenefitsCardCopy
        title={title}
        text={text}
        titlePath="platform.title"
        textPath="platform.text"
        titleLabel="Платформа — заголовок"
        textLabel="Платформа — текст"
      />
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
      <AboutBenefitsCardCopy
        title={title}
        text={text}
        titlePath="security.title"
        textPath="security.text"
        titleLabel="Безопасность — заголовок"
        textLabel="Безопасность — текст"
      />
      <EditableMedia path="security.imageSrc" label="Преимущество — визуал безопасности">
        <img
          src={imageSrc}
          alt=""
          className={styles["about-benefits-card__security-visual"]}
        />
      </EditableMedia>
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
      <EditableMedia path="expertise.imageSrc" label="Преимущество — фото экспертизы">
        <img
          src={imageSrc}
          alt=""
          className={styles["about-benefits-card__expertise-photo"]}
        />
      </EditableMedia>
      <AboutBenefitsCardCopy
        title={title}
        text={text}
        titlePath="expertise.title"
        textPath="expertise.text"
        titleLabel="Экспертиза — заголовок"
        textLabel="Экспертиза — текст"
      />
    </article>
  );
}
