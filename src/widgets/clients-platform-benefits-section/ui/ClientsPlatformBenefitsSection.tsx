import type { CSSProperties } from "react";

import type { ClientsPlatformBenefitsContent } from "@/entities/landing";
import { Container } from "@/shared/ui/container";

import { ClientsPlatformBenefitsCard } from "./clients-platform-benefits-card";
import { ClientsPlatformBenefitsShowcaseCard } from "./clients-platform-benefits-showcase-card";

import styles from "./ClientsPlatformBenefitsSection.module.css";

type ClientsPlatformBenefitsSectionProps = {
  content: ClientsPlatformBenefitsContent;
};

export function ClientsPlatformBenefitsSection({
  content,
}: ClientsPlatformBenefitsSectionProps) {
  const [showcaseItCosts, showcaseQuality, showcaseScaling] = content.showcase;

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
                "--clients-platform-benefits-card-count": content.cards.length,
              } as CSSProperties
            }
          >
            {content.cards.map((card) => (
              <li
                key={card.title}
                className={styles["clients-platform-benefits-section__card"]}
              >
                <ClientsPlatformBenefitsCard card={card} />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles["clients-platform-benefits-section__showcase"]}>
          <div className={styles["clients-platform-benefits-section__showcase-row"]}>
            <ClientsPlatformBenefitsShowcaseCard item={showcaseItCosts} />
            <ClientsPlatformBenefitsShowcaseCard item={showcaseQuality} />
          </div>
          <ClientsPlatformBenefitsShowcaseCard item={showcaseScaling} />
        </div>
      </Container>
    </section>
  );
}
