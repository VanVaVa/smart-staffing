import Image from "next/image";

import { CompanyConnectionButton } from "@/shared/ui/feedback-form";
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
  interactive?: boolean;
};

function PlatformOnboardingDemoSubtitle({
  subtitle,
  subtitleAccent,
}: {
  subtitle: string;
  subtitleAccent?: string;
}) {
  if (!subtitleAccent) {
    return (
      <span>
        {subtitle}
      </span>
    );
  }

  const accentIndex = subtitle.indexOf(subtitleAccent);

  if (accentIndex === -1) {
    return (
      <span>
        {subtitle}
      </span>
    );
  }

  const before = subtitle.slice(0, accentIndex);
  const after = subtitle.slice(accentIndex + subtitleAccent.length);

  return (
    <>
      {before}
      <span>
        <span className={styles["platform-onboarding-demo__subtitle-accent"]}>
          {subtitleAccent}
        </span>
      </span>
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
  interactive = true,
}: PlatformOnboardingDemoProps) {
  return (
    <div className={styles["platform-onboarding-demo"]}>
      <div className={styles["platform-onboarding-demo__stage"]}>
        <div>
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
        </div>
        <div className={styles["platform-onboarding-demo__copy"]}>
          <SectionTitle
            title={
              <span>
                {title}
              </span>
            }
            subtitle={
              <PlatformOnboardingDemoSubtitle
                subtitle={subtitle}
                subtitleAccent={subtitleAccent}
              />
            }
          />
        </div>
        <div className={styles["platform-onboarding-demo__promo"]}>
          <p className={styles["platform-onboarding-demo__promo-text"]}>
            {promoText}
          </p>
          <div className={styles["platform-onboarding-demo__promo-glow"]} aria-hidden />
          <CompanyConnectionButton
            withArrow
            className={styles["platform-onboarding-demo__promo-cta"]}
            interactive={interactive}
          >
            <span>
              {promoCta}
            </span>
          </CompanyConnectionButton>
        </div>
      </div>
    </div>
  );
}
