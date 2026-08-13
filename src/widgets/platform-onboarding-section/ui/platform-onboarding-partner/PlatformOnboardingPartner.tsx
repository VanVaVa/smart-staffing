"use client";

import Image from "next/image";

import { EditableMedia, EditableText, useAdminBlockEditOptional } from "@/shared/ui/editable-field";
import { Button } from "@/shared/ui/button";
import { CompanyConnectionButton } from "@/shared/ui/feedback-form";
import { SectionTitle } from "@/shared/ui/section-title";

import styles from "./PlatformOnboardingPartner.module.css";

type PlatformOnboardingPartnerPaths = {
  title: string;
  subtitle: string;
  cardText: string;
  imageSrc: string;
  cta: string;
  buttonHref: string;
};

type PlatformOnboardingPartnerLabels = PlatformOnboardingPartnerPaths;

type PlatformOnboardingPartnerProps = {
  title?: string;
  subtitle?: string;
  cardText: string;
  imageSrc: string;
  imageAlt?: string;
  cta: string;
  ctaHref?: string;
  showTitle?: boolean;
  interactive?: boolean;
  paths?: Partial<PlatformOnboardingPartnerPaths>;
  labels?: Partial<PlatformOnboardingPartnerLabels>;
};

const defaultPaths: PlatformOnboardingPartnerPaths = {
  title: "partner.title",
  subtitle: "partner.subtitle",
  cardText: "partner.cardText",
  imageSrc: "partner.imageSrc",
  cta: "partner.cta",
  buttonHref: "partner.buttonHref",
};

const defaultLabels: PlatformOnboardingPartnerLabels = {
  title: "Partner — заголовок",
  subtitle: "Partner — подзаголовок",
  cardText: "Partner — текст карточки",
  imageSrc: "Partner — изображение",
  cta: "Partner — CTA",
  buttonHref: "Partner — ссылка кнопки",
};

export function PlatformOnboardingPartner({
  title = "",
  subtitle = "",
  cardText,
  imageSrc,
  imageAlt = "",
  cta,
  ctaHref,
  showTitle = true,
  interactive = true,
  paths: pathsOverride,
  labels: labelsOverride,
}: PlatformOnboardingPartnerProps) {
  const paths = { ...defaultPaths, ...pathsOverride };
  const labels = { ...defaultLabels, ...labelsOverride };
  const blockEdit = useAdminBlockEditOptional();
  const inAdminEdit = Boolean(blockEdit);

  const ctaControl = ctaHref ? (
    inAdminEdit ? (
      <div className={styles["platform-onboarding-partner__cta"]}>
        <Button variant="primary" size="lg" withArrow type="button">
          <EditableText path={paths.cta} label={labels.cta}>
            {cta}
          </EditableText>
        </Button>
        <EditableText
          path={paths.buttonHref}
          label={labels.buttonHref}
          className={styles["platform-onboarding-partner__href-edit"]}
        >
          {ctaHref}
        </EditableText>
      </div>
    ) : (
      <Button
        href={ctaHref}
        variant="primary"
        size="lg"
        withArrow
        className={styles["platform-onboarding-partner__cta"]}
      >
        {cta}
      </Button>
    )
  ) : (
    <CompanyConnectionButton
      withArrow
      className={styles["platform-onboarding-partner__cta"]}
      interactive={interactive}
    >
      <EditableText path={paths.cta} label={labels.cta}>
        {cta}
      </EditableText>
    </CompanyConnectionButton>
  );

  return (
    <div className={styles["platform-onboarding-partner"]}>
      {showTitle ? (
        <SectionTitle
          title={
            <EditableText path={paths.title} label={labels.title}>
              {title}
            </EditableText>
          }
          subtitle={
            <EditableText path={paths.subtitle} label={labels.subtitle} multiline>
              {subtitle}
            </EditableText>
          }
          centered
        />
      ) : null}
      <div className={styles["platform-onboarding-partner__card-wrap"]}>
        <div className={styles["platform-onboarding-partner__orb"]} aria-hidden />
        <article className={styles["platform-onboarding-partner__card"]}>
          <EditableMedia
            path={paths.imageSrc}
            label={labels.imageSrc}
            className={styles["platform-onboarding-partner__media"]}
          >
            <Image
              className={styles["platform-onboarding-partner__image"]}
              src={imageSrc}
              alt={imageAlt}
              width={304}
              height={286}
              sizes="(max-width: 576px) 128px, (max-width: 768px) 153px, 152px"
            />
          </EditableMedia>
          <div className={styles["platform-onboarding-partner__content"]}>
            <EditableText
              path={paths.cardText}
              label={labels.cardText}
              as="p"
              className={styles["platform-onboarding-partner__card-text"]}
              multiline
            >
              {cardText}
            </EditableText>
            {ctaControl}
          </div>
        </article>
      </div>
    </div>
  );
}
