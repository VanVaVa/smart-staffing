import type { AboutBenefitsBlockProps } from "@/entities/landing/model/about-blocks";
import { Container } from "@/shared/ui/container";

import {
  AboutBenefitsExpertiseCard,
  AboutBenefitsFlexCard,
  AboutBenefitsPlatformCard,
  AboutBenefitsSecurityCard,
} from "./about-benefits-card";

import styles from "./AboutBenefitsSection.module.css";

type AboutBenefitsSectionProps = {
  content: AboutBenefitsBlockProps;
};

export function AboutBenefitsSection({ content }: AboutBenefitsSectionProps) {
  const { title, flex, security, platform, expertise } = content;

  return (
    <section className={styles["about-benefits-section"]}>
      <Container wide>
        <div className={styles["about-benefits-section__inner"]}>
          <h2 className={styles["about-benefits-section__title"]}>
            {title}
          </h2>
          <div className={styles["about-benefits-section__grid"]}>
            <AboutBenefitsFlexCard
              iconSrc={flex.iconSrc}
              title={flex.title}
              text={flex.text}
            />
            <AboutBenefitsExpertiseCard
              imageSrc={expertise.imageSrc}
              title={expertise.title}
              text={expertise.text}
            />
            <div className={styles["about-benefits-section__stack"]}>
              <AboutBenefitsPlatformCard
                title={platform.title}
                text={platform.text}
              />
              <AboutBenefitsSecurityCard
                imageSrc={security.imageSrc}
                title={security.title}
                text={security.text}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
