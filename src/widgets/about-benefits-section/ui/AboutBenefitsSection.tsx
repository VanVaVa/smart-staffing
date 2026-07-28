import { aboutBenefits } from "@/entities/landing";
import { Container } from "@/shared/ui/container";

import {
  AboutBenefitsExpertiseCard,
  AboutBenefitsFlexCard,
  AboutBenefitsPlatformCard,
  AboutBenefitsSecurityCard,
} from "./about-benefits-card";

import styles from "./AboutBenefitsSection.module.css";

export function AboutBenefitsSection() {
  const { title, flex, security, platform, expertise } = aboutBenefits;

  return (
    <section className={styles["about-benefits-section"]}>
      <Container wide>
        <div className={styles["about-benefits-section__inner"]}>
          <h2 className={styles["about-benefits-section__title"]}>{title}</h2>
          <div className={styles["about-benefits-section__grid"]}>
            <AboutBenefitsFlexCard
              iconSrc={flex.iconSrc}
              title={flex.title}
              text={flex.text}
            />
            <AboutBenefitsSecurityCard
              imageSrc={security.imageSrc}
              title={security.title}
              text={security.text}
            />
            <AboutBenefitsPlatformCard
              title={platform.title}
              text={platform.text}
            />
            <AboutBenefitsExpertiseCard
              imageSrc={expertise.imageSrc}
              title={expertise.title}
              text={expertise.text}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
