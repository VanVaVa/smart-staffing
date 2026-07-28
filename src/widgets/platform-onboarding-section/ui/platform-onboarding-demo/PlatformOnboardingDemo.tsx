import Image from "next/image";
import type { ReactNode } from "react";

import { Button } from "@/shared/ui/button";
import { SectionTitle } from "@/shared/ui/section-title";

import styles from "./PlatformOnboardingDemo.module.css";

type PlatformOnboardingDemoProps = {
  title: string;
  subtitle: string;
  subtitleAccent: string;
  promoText: string;
  promoCta: string;
  mockupSrc: string;
  mockupWidth: number;
  mockupHeight: number;
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
      <span className={styles["platform-onboarding-demo__subtitle-accent"]}>{accent}</span>
      {after}
    </>
  );
}

export function PlatformOnboardingDemo({
  title,
  subtitle,
  subtitleAccent,
  promoText,
  promoCta,
  mockupSrc,
  mockupWidth,
  mockupHeight,
}: PlatformOnboardingDemoProps) {
  return (
    <div className={styles["platform-onboarding-demo"]}>
      <div className={styles["platform-onboarding-demo__stage"]}>
        <figure className={styles["platform-onboarding-demo__mockup"]} aria-hidden>
          <Image
            className={styles["platform-onboarding-demo__mockup-image"]}
            src={mockupSrc}
            alt=""
            width={mockupWidth}
            height={mockupHeight}
            sizes="(max-width: 1024px) 72vw, 812px"
          />
        </figure>
        <div className={styles["platform-onboarding-demo__copy"]}>
          <SectionTitle title={title} subtitle={buildSubtitle(subtitle, subtitleAccent)} />
        </div>
        <div className={styles["platform-onboarding-demo__promo"]}>
          <p className={styles["platform-onboarding-demo__promo-text"]}>{promoText}</p>
          <div className={styles["platform-onboarding-demo__promo-glow"]} aria-hidden />
          <Button
            href="#contacts"
            withArrow
            className={styles["platform-onboarding-demo__promo-cta"]}
          >
            {promoCta}
          </Button>
        </div>
      </div>
    </div>
  );
}
