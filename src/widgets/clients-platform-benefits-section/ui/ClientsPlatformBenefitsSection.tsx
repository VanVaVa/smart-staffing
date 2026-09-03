import type { CSSProperties } from "react";

import type {
  ClientsPageVariant,
  ClientsPlatformBenefitsContent,
} from "@/entities/landing";
import {
  getClientsPlatformBenefitsMobileOrder,
  getClientsPlatformBenefitsMobileOrder360,
} from "@/entities/landing";
import { Container } from "@/shared/ui/container";

import { ClientsPlatformBenefitsCard } from "./clients-platform-benefits-card";
import { ClientsPlatformBenefitsShowcaseCard } from "./clients-platform-benefits-showcase-card";

import styles from "./ClientsPlatformBenefitsSection.module.css";

type ClientsPlatformBenefitsSectionProps = {
  content: ClientsPlatformBenefitsContent;
  segment: string;
  pageVariant?: ClientsPageVariant;
};

export function ClientsPlatformBenefitsSection({
  content,
  segment,
  pageVariant = "clients",
}: ClientsPlatformBenefitsSectionProps) {
  const [showcaseItCosts, showcaseQuality, showcaseScaling] = content.showcase;
  const cardCount = content.cards.length;
  const mobileOrder = getClientsPlatformBenefitsMobileOrder(segment, pageVariant);
  const mobileOrder360 = getClientsPlatformBenefitsMobileOrder360(segment, pageVariant);
  const hasPricingEnterpriseTabletOrder =
    pageVariant === "pricing" && segment === "enterprise";

  return (
    <section
      className={styles["clients-platform-benefits-section"]}
      data-header-veil-bg="#f9f9fb"
    >
      <Container wide className={styles["clients-platform-benefits-section__container"]}>
        <h2 className={styles["clients-platform-benefits-section__title"]}>
          {content.sectionTitle}
        </h2>
        <div className={styles["clients-platform-benefits-section__panel"]}>
          <div className={styles["clients-platform-benefits-section__panel-header"]}>
            <p className={styles["clients-platform-benefits-section__panel-title"]}>
              {content.panelTitle}
            </p>
            <p className={styles["clients-platform-benefits-section__panel-subtitle"]}>
              {content.panelSubtitle}
            </p>
          </div>
          <ul
            className={styles["clients-platform-benefits-section__cards"]}
            data-segment={segment}
            data-page-variant={pageVariant}
            data-tablet-results-wide={
              hasPricingEnterpriseTabletOrder ? "" : undefined
            }
            style={
              {
                "--clients-platform-benefits-card-count": cardCount,
              } as CSSProperties
            }
          >
            {content.cards.map((card, index) => {
              const mobilePosition = mobileOrder?.[index] ?? index + 1;
              const mobilePosition360 = mobileOrder360?.[index];
              const isMobileFullWidth =
                cardCount === 3 ||
                mobilePosition === 1 ||
                mobilePosition === cardCount;

              return (
                <li
                  key={`${card.title}-${index}`}
                  className={styles["clients-platform-benefits-section__card"]}
                  data-mobile-full={isMobileFullWidth ? "" : undefined}
                  data-mobile-order={mobilePosition}
                  data-mobile-order-360={mobilePosition360}
                  style={
                    {
                      "--clients-platform-benefits-card-mobile-order":
                        mobilePosition,
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
            {showcaseItCosts ? (
              <ClientsPlatformBenefitsShowcaseCard item={showcaseItCosts} />
            ) : null}
            {showcaseQuality ? (
              <ClientsPlatformBenefitsShowcaseCard item={showcaseQuality} />
            ) : null}
          </div>
          {showcaseScaling ? (
            <ClientsPlatformBenefitsShowcaseCard item={showcaseScaling} />
          ) : null}
        </div>
      </Container>
    </section>
  );
}
