import Image from "next/image";

import { IMAGE_QUALITY } from "@/shared/config/image-quality";
import { Button } from "@/shared/ui/button";
import { CompanyConnectionButton } from "@/shared/ui/feedback-form";
import { SectionTitle } from "@/shared/ui/section-title";

import styles from "./PlatformOnboardingPartner.module.css";

type PlatformOnboardingPartnerProps = {
  title?: string;
  subtitle?: string;
  subtitleAccent?: string;
  cardText: string;
  imageSrc: string;
  imageAlt?: string;
  cta: string;
  ctaHref?: string;
  showTitle?: boolean;
  interactive?: boolean;
};

function PlatformOnboardingPartnerSubtitle({
  subtitle,
  subtitleAccent,
}: {
  subtitle: string;
  subtitleAccent?: string;
}) {
  const accentIndex = subtitleAccent ? subtitle.indexOf(subtitleAccent) : -1;

  if (!subtitleAccent || accentIndex === -1) {
    return <span>{subtitle}</span>;
  }

  return (
    <>
      {subtitle.slice(0, accentIndex)}
      <span>
        <span className={styles["platform-onboarding-partner__subtitle-accent"]}>
          {subtitleAccent}
        </span>
      </span>
      {subtitle.slice(accentIndex + subtitleAccent.length)}
    </>
  );
}

export function PlatformOnboardingPartner({
  title = "",
  subtitle = "",
  subtitleAccent,
  cardText,
  imageSrc,
  imageAlt = "",
  cta,
  ctaHref,
  showTitle = true,
  interactive = true,
}: PlatformOnboardingPartnerProps) {
  const ctaControl = ctaHref ? (
    <Button
      href={ctaHref}
      variant="primary"
      size="lg"
      withArrow
      className={styles["platform-onboarding-partner__cta"]}
    >
      {cta}
    </Button>
  ) : (
    <CompanyConnectionButton
      withArrow
      className={styles["platform-onboarding-partner__cta"]}
      interactive={interactive}
    >
      <span>
        {cta}
      </span>
    </CompanyConnectionButton>
  );

  return (
    <div className={styles["platform-onboarding-partner"]}>
      {showTitle ? (
        <SectionTitle
          title={
            <span>
              {title}
            </span>
          }
          subtitle={
            <PlatformOnboardingPartnerSubtitle
              subtitle={subtitle}
              subtitleAccent={subtitleAccent}
            />
          }
          centered
        />
      ) : null}
      <div className={styles["platform-onboarding-partner__card-wrap"]}>
        <article className={styles["platform-onboarding-partner__card"]}>
          <div className={styles["platform-onboarding-partner__orb"]} aria-hidden />
          <div className={styles["platform-onboarding-partner__media"]}>
            <Image
              className={styles["platform-onboarding-partner__image"]}
              src={imageSrc}
              alt={imageAlt}
              width={304}
              height={286}
              sizes="(max-width: 576px) 128px, (max-width: 768px) 153px, 152px"
              quality={IMAGE_QUALITY.ui}
            />
          </div>
          <div className={styles["platform-onboarding-partner__content"]}>
            <p className={styles["platform-onboarding-partner__card-text"]}>
              {cardText}
            </p>
            {ctaControl}
          </div>
        </article>
      </div>
    </div>
  );
}
