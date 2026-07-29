import Image from "next/image";
import type { ReactNode } from "react";

import { CompanyConnectionButton } from "@/shared/ui/feedback-form";
import { SectionTitle } from "@/shared/ui/section-title";

import styles from "./PlatformOnboardingPartner.module.css";

type PlatformOnboardingPartnerProps = {
  title: string;
  subtitle: string;
  subtitleAccent: string;
  cardText: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  cta: string;
};

function buildSubtitle(subtitle: string, accent: string): ReactNode {
  const accentIndex = subtitle.indexOf(accent);
  if (accentIndex === -1) {
    return subtitle;
  }

  const before = subtitle.slice(0, accentIndex);
  const after = subtitle.slice(accentIndex + accent.length);

  return (
    <>
      {before}
      <span className={styles["platform-onboarding-partner__subtitle-accent"]}>{accent}</span>
      {after}
    </>
  );
}

export function PlatformOnboardingPartner({
  title,
  subtitle,
  subtitleAccent,
  cardText,
  imageSrc,
  imageWidth,
  imageHeight,
  cta,
}: PlatformOnboardingPartnerProps) {
  return (
    <div className={styles["platform-onboarding-partner"]}>
      <SectionTitle
        title={title}
        subtitle={buildSubtitle(subtitle, subtitleAccent)}
        centered
      />
      <div className={styles["platform-onboarding-partner__card-wrap"]}>
        <div className={styles["platform-onboarding-partner__orb"]} aria-hidden />
        <article className={styles["platform-onboarding-partner__card"]}>
          <div className={styles["platform-onboarding-partner__media"]}>
            <Image
              className={styles["platform-onboarding-partner__image"]}
              src={imageSrc}
              alt=""
              width={imageWidth}
              height={imageHeight}
              sizes="213px"
            />
          </div>
          <p className={styles["platform-onboarding-partner__card-text"]}>{cardText}</p>
          <CompanyConnectionButton
            withArrow
            className={styles["platform-onboarding-partner__cta"]}
          >
            {cta}
          </CompanyConnectionButton>
        </article>
      </div>
    </div>
  );
}
