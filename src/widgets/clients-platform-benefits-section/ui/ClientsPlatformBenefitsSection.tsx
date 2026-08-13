import type { CSSProperties } from "react";

import type { ClientsPlatformBenefitsContent } from "@/entities/landing";
import { Container } from "@/shared/ui/container";
import {
  EditableCollectionAdd,
  EditableCollectionItem,
  EditableText,
} from "@/shared/ui/editable-field";

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
        <EditableText
          path="sectionTitle"
          label="Преимущества — заголовок секции"
          as="h2"
          className={styles["clients-platform-benefits-section__title"]}
        >
          {content.sectionTitle}
        </EditableText>
        <div className={styles["clients-platform-benefits-section__panel"]}>
          <div className={styles["clients-platform-benefits-section__panel-header"]}>
            <EditableText
              path="panelTitle"
              label="Преимущества — заголовок панели"
              as="p"
              className={styles["clients-platform-benefits-section__panel-title"]}
            >
              {content.panelTitle}
            </EditableText>
            <EditableText
              path="panelSubtitle"
              label="Преимущества — подзаголовок панели"
              as="p"
              className={styles["clients-platform-benefits-section__panel-subtitle"]}
              multiline
            >
              {content.panelSubtitle}
            </EditableText>
          </div>
          <ul
            className={styles["clients-platform-benefits-section__cards"]}
            style={
              {
                "--clients-platform-benefits-card-count": content.cards.length,
              } as CSSProperties
            }
          >
            {content.cards.map((card, index) => (
              <EditableCollectionItem
                key={`${card.title}-${index}`}
                arrayPath="cards"
                index={index}
                variant="benefit"
              >
                <li className={styles["clients-platform-benefits-section__card"]}>
                  <ClientsPlatformBenefitsCard card={card} cardIndex={index} />
                </li>
              </EditableCollectionItem>
            ))}
          </ul>
          <EditableCollectionAdd
            arrayPath="cards"
            collectionKey="platformBenefits.cards"
            addLabel="Карточка"
          />
        </div>
        <div className={styles["clients-platform-benefits-section__showcase"]}>
          <div className={styles["clients-platform-benefits-section__showcase-row"]}>
            <EditableCollectionItem arrayPath="showcase" index={0} variant="benefit">
              <ClientsPlatformBenefitsShowcaseCard item={showcaseItCosts} itemIndex={0} />
            </EditableCollectionItem>
            <EditableCollectionItem arrayPath="showcase" index={1} variant="benefit">
              <ClientsPlatformBenefitsShowcaseCard item={showcaseQuality} itemIndex={1} />
            </EditableCollectionItem>
          </div>
          <EditableCollectionItem arrayPath="showcase" index={2} variant="benefit">
            <ClientsPlatformBenefitsShowcaseCard item={showcaseScaling} itemIndex={2} />
          </EditableCollectionItem>
        </div>
      </Container>
    </section>
  );
}
