import Image from "next/image";

import { EditableMedia, EditableText } from "@/shared/ui/editable-field";
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

export function PlatformOnboardingDemo({
  title,
  subtitle,
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
        <EditableMedia path="demo.mockupSrc" label="Demo — mockup">
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
        </EditableMedia>
        <div className={styles["platform-onboarding-demo__copy"]}>
          <SectionTitle
            title={
              <EditableText path="demo.title" label="Demo — заголовок">
                {title}
              </EditableText>
            }
            subtitle={
              <EditableText path="demo.subtitle" label="Demo — подзаголовок" multiline>
                {subtitle}
              </EditableText>
            }
          />
        </div>
        <div className={styles["platform-onboarding-demo__promo"]}>
          <EditableText
            path="demo.promoText"
            label="Demo — promo"
            as="p"
            className={styles["platform-onboarding-demo__promo-text"]}
            multiline
          >
            {promoText}
          </EditableText>
          <div className={styles["platform-onboarding-demo__promo-glow"]} aria-hidden />
          <CompanyConnectionButton
            withArrow
            className={styles["platform-onboarding-demo__promo-cta"]}
            interactive={interactive}
          >
            <EditableText path="demo.promoCta" label="Demo — CTA">
              {promoCta}
            </EditableText>
          </CompanyConnectionButton>
        </div>
      </div>
    </div>
  );
}
