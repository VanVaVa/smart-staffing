"use client";

import type { AdminValues } from "@/shared/ui/admin-form";
import {
  AdminInlineImage,
  AdminInlineText,
} from "@/shared/ui/admin-inline-field";
import { CompanyConnectionButton } from "@/shared/ui/feedback-form";

import {
  getHeroContent,
  patchHero,
  patchHeroSubtitle,
} from "../../lib/patch-form-values";

import heroStyles from "@/widgets/clients-hero-section/ui/ClientsHeroSection.module.css";

type EditableClientsHeroSectionProps = {
  values: AdminValues;
  segment: string;
  onChange: (values: AdminValues) => void;
  disabled?: boolean;
};

export function EditableClientsHeroSection({
  values,
  segment,
  onChange,
  disabled,
}: EditableClientsHeroSectionProps) {
  const content = getHeroContent(values);
  const hero = values.hero as AdminValues;
  const subtitle = (hero.subtitle ?? {}) as AdminValues;

  return (
    <section
      className={heroStyles["clients-hero-section"]}
      data-segment={segment}
      data-header-veil-bg="#f9f9fb"
    >
      <figure className={heroStyles["clients-hero-section__media"]}>
        <div
          className={
            content.imageMobileSrc ? heroStyles["clients-hero-section__slot--desktop"] : undefined
          }
        >
          <AdminInlineImage
            layout="frame"
            className={heroStyles["clients-hero-section__image-frame"]}
            imageClassName={heroStyles["clients-hero-section__image"]}
            imageSrc={content.imageSrc || "/landing/clients/enterprise/hero.png"}
            imageWidth={content.imageWidth}
            imageHeight={content.imageHeight}
            imageAlt={content.imageAlt}
            disabled={disabled}
            sizes="(max-width: 450px) 344px, (max-width: 768px) 744px, (max-width: 1050px) 960px, (max-width: 1620px) 716px, 956px"
            priority
            onChange={(patch) => onChange(patchHero(values, { imageSrc: patch.imageSrc }))}
          />
        </div>
        <div className={heroStyles["clients-hero-section__slot--mobile"]}>
          <AdminInlineImage
            layout="frame"
            className={heroStyles["clients-hero-section__image-frame"]}
            imageClassName={heroStyles["clients-hero-section__image"]}
            imageSrc={content.imageMobileSrc ?? ""}
            imageWidth={content.imageMobileWidth ?? content.imageWidth}
            imageHeight={content.imageMobileHeight ?? content.imageHeight}
            disabled={disabled}
            placeholderLabel="Mobile изображение (опционально)"
            onChange={(patch) =>
              onChange(patchHero(values, { imageMobileSrc: patch.imageSrc }))
            }
          />
        </div>
      </figure>
      <div className={heroStyles["clients-hero-section__inset"]}>
        <div className={heroStyles["clients-hero-section__layout"]}>
          <div className={heroStyles["clients-hero-section__content"]}>
            <div className={heroStyles["clients-hero-section__copy"]}>
              <AdminInlineText
                variant="heading"
                className={heroStyles["clients-hero-section__title"]}
                value={content.title}
                disabled={disabled}
                onChange={(title) => onChange(patchHero(values, { title }))}
              />
              <p className={heroStyles["clients-hero-section__subtitle"]}>
                <AdminInlineText
                  inline
                  value={String(subtitle.before ?? content.subtitle.before)}
                  disabled={disabled}
                  onChange={(before) => onChange(patchHeroSubtitle(values, { before }))}
                />
                <AdminInlineText
                  inline
                  className={heroStyles["clients-hero-section__subtitle-accent"]}
                  value={String(subtitle.accent ?? content.subtitle.accent ?? "")}
                  disabled={disabled}
                  onChange={(accent) => onChange(patchHeroSubtitle(values, { accent }))}
                />
                <AdminInlineText
                  inline
                  value={String(subtitle.after ?? content.subtitle.after ?? "")}
                  disabled={disabled}
                  onChange={(after) => onChange(patchHeroSubtitle(values, { after }))}
                />
              </p>
            </div>
            <CompanyConnectionButton
              variant="primary"
              size="md"
              withArrow
              interactive={false}
              className={heroStyles["clients-hero-section__cta"]}
            >
              <AdminInlineText
                value={content.cta}
                disabled={disabled}
                onChange={(cta) => onChange(patchHero(values, { cta }))}
              />
            </CompanyConnectionButton>
          </div>
        </div>
      </div>
    </section>
  );
}
