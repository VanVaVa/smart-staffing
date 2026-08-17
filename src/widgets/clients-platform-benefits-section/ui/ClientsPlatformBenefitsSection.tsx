import type { CSSProperties } from "react";

import type {
  ClientSegmentSlug,
  ClientsPlatformBenefitsContent,
} from "@/entities/landing";
import { clientsPlatformBenefitsMobileOrder } from "@/entities/landing";
import { Container } from "@/shared/ui/container";

import { ClientsPlatformBenefitsCard } from "./clients-platform-benefits-card";
import { ClientsPlatformBenefitsShowcaseCard } from "./clients-platform-benefits-showcase-card";

import styles from "./ClientsPlatformBenefitsSection.module.css";

type ClientsPlatformBenefitsSectionProps = {
  content: ClientsPlatformBenefitsContent;
  segment: ClientSegmentSlug;
};

export function ClientsPlatformBenefitsSection({
  content,
  segment,
}: ClientsPlatformBenefitsSectionProps) {
  const [showcaseItCosts, showcaseQuality, showcaseScaling] = content.showcase;
  const cardCount = content.cards.length;
  const mobileOrder = clientsPlatformBenefitsMobileOrder[segment];

  return (
    <section className={styles["clients-platform-benefits-section"]}>
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
            style={
              {
                "--clients-platform-benefits-card-count": cardCount,
              } as CSSProperties
            }
          >
            {content.cards.map((card, index) => {
              const mobilePosition = mobileOrder?.[index] ?? index + 1;
              const isMobileFullWidth =
                cardCount === 3 ||
                mobilePosition === 1 ||
                mobilePosition === cardCount;

              return (
                <li
                  key={`${card.title}-${index}`}
                  className={styles["clients-platform-benefits-section__card"]}
                  data-mobile-full={isMobileFullWidth ? "" : undefined}
                  style={
                    {
                      "--clients-platform-benefits-card-mobile-order":
                        mobilePosition,
                    } as CSSProperties
                  }
                >
                  <ClientsPlatformBenefitsCard
                    card={card}
                    cardIndex={index}
                    cardCount={cardCount}
                    mobileFullWidth={isMobileFullWidth}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles["clients-platform-benefits-section__showcase"]}>
          <div className={styles["clients-platform-benefits-section__showcase-row"]}>
            <ClientsPlatformBenefitsShowcaseCard item={showcaseItCosts} itemIndex={0} />
            <ClientsPlatformBenefitsShowcaseCard item={showcaseQuality} itemIndex={1} />
          </div>
          <ClientsPlatformBenefitsShowcaseCard item={showcaseScaling} itemIndex={2} />
        </div>
      </Container>
    </section>
  );
}
