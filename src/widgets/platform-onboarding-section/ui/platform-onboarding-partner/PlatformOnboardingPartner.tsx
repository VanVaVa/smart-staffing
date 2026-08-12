import Image from "next/image";

import { EditableMedia, EditableText } from "@/shared/ui/editable-field";
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
  interactive?: boolean;
};

export function PlatformOnboardingPartner({
  title,
  subtitle,
  cardText,
  imageSrc,
  imageWidth,
  imageHeight,
  cta,
  interactive = true,
}: PlatformOnboardingPartnerProps) {
  return (
    <div className={styles["platform-onboarding-partner"]}>
      <SectionTitle
        title={
          <EditableText path="partner.title" label="Partner — заголовок">
            {title}
          </EditableText>
        }
        subtitle={
          <EditableText path="partner.subtitle" label="Partner — подзаголовок" multiline>
            {subtitle}
          </EditableText>
        }
        centered
      />
      <div className={styles["platform-onboarding-partner__card-wrap"]}>
        <div className={styles["platform-onboarding-partner__orb"]} aria-hidden />
        <article className={styles["platform-onboarding-partner__card"]}>
          <EditableMedia path="partner.imageSrc" label="Partner — изображение">
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
          </EditableMedia>
          <EditableText
            path="partner.cardText"
            label="Partner — текст карточки"
            as="p"
            className={styles["platform-onboarding-partner__card-text"]}
            multiline
          >
            {cardText}
          </EditableText>
          <CompanyConnectionButton
            withArrow
            className={styles["platform-onboarding-partner__cta"]}
            interactive={interactive}
          >
            <EditableText path="partner.cta" label="Partner — CTA">
              {cta}
            </EditableText>
          </CompanyConnectionButton>
        </article>
      </div>
    </div>
  );
}
