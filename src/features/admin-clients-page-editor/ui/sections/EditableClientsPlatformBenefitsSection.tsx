"use client";

import type { CSSProperties } from "react";

import type { AdminValues } from "@/shared/ui/admin-form";
import {
  getClientsPlatformBenefitsMobileOrder,
  getClientsPlatformBenefitsMobileOrder360,
} from "@/entities/landing";
import { Container } from "@/shared/ui/container";
import { AdminInlineText } from "@/shared/ui/admin-inline-field";
import { ClientsPlatformBenefitsCard } from "@/widgets/clients-platform-benefits-section/ui/clients-platform-benefits-card";
import { ClientsPlatformBenefitsShowcaseCard } from "@/widgets/clients-platform-benefits-section/ui/clients-platform-benefits-showcase-card";

import {
  getPlatformBenefitsContent,
  patchPlatformBenefits,
} from "../../lib/patch-form-values";

import styles from "@/widgets/clients-platform-benefits-section/ui/ClientsPlatformBenefitsSection.module.css";

type EditableClientsPlatformBenefitsSectionProps = {
  values: AdminValues;
  segment: string;
  onChange: (values: AdminValues) => void;
  disabled?: boolean;
};

export function EditableClientsPlatformBenefitsSection({
  values,
  segment,
  onChange,
  disabled,
}: EditableClientsPlatformBenefitsSectionProps) {
  const content = getPlatformBenefitsContent(values);
  const cardLayout = content.cards.length === 3 ? 3 : 4;
  const mobileOrder = getClientsPlatformBenefitsMobileOrder(segment);
  const mobileOrder360 = getClientsPlatformBenefitsMobileOrder360(segment);

  return (
    <section
      className={styles["clients-platform-benefits-section"]}
      data-header-veil-bg="#f9f9fb"
    >
      <Container wide className={styles["clients-platform-benefits-section__container"]}>
        <AdminInlineText
          variant="heading"
          className={styles["clients-platform-benefits-section__title"]}
          value={content.sectionTitle}
          disabled={disabled}
          onChange={(sectionTitle) => onChange(patchPlatformBenefits(values, { sectionTitle }))}
        />
        <div className={styles["clients-platform-benefits-section__panel"]}>
          <div className={styles["clients-platform-benefits-section__panel-header"]}>
            <AdminInlineText
              className={styles["clients-platform-benefits-section__panel-title"]}
              value={content.panelTitle}
              disabled={disabled}
              onChange={(panelTitle) => onChange(patchPlatformBenefits(values, { panelTitle }))}
            />
            <AdminInlineText
              className={styles["clients-platform-benefits-section__panel-subtitle"]}
              value={content.panelSubtitle}
              disabled={disabled}
              onChange={(panelSubtitle) =>
                onChange(patchPlatformBenefits(values, { panelSubtitle }))
              }
            />
          </div>
          <ul
            className={styles["clients-platform-benefits-section__cards"]}
            data-segment={segment}
            data-page-variant="clients"
            style={
              {
                "--clients-platform-benefits-card-count": cardLayout,
              } as CSSProperties
            }
          >
            {content.cards.map((card, index) => {
              const mobilePosition = mobileOrder?.[index] ?? index + 1;
              const mobilePosition360 = mobileOrder360?.[index];
              const isMobileFullWidth =
                cardLayout === 3 || mobilePosition === 1 || mobilePosition === cardLayout;

              return (
                <li
                  key={`card-${index}`}
                  className={styles["clients-platform-benefits-section__card"]}
                  data-mobile-full={isMobileFullWidth ? "" : undefined}
                  data-mobile-order={mobilePosition}
                  data-mobile-order-360={mobilePosition360}
                  style={
                    {
                      "--clients-platform-benefits-card-mobile-order": mobilePosition,
                      ...(mobilePosition360 !== undefined
                        ? {
                            "--clients-platform-benefits-card-mobile-order-360":
                              mobilePosition360,
                          }
                        : {}),
                    } as CSSProperties
                  }
                >
                  <ClientsPlatformBenefitsCard card={card} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles["clients-platform-benefits-section__showcase"]}>
          <div className={styles["clients-platform-benefits-section__showcase-row"]}>
            {content.showcase.slice(0, 2).map((item, index) => (
              <ClientsPlatformBenefitsShowcaseCard key={`showcase-${index}`} item={item} />
            ))}
          </div>
          {content.showcase[2] ? (
            <ClientsPlatformBenefitsShowcaseCard item={content.showcase[2]} />
          ) : null}
        </div>
      </Container>
    </section>
  );
}
