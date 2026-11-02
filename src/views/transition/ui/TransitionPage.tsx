import { ClientsHeroSection } from "@/widgets/clients-hero-section";

import {
  TRANSITION_SECTION_IDS,
  transitionFacts,
  transitionFaq,
  transitionHero,
  transitionPerks,
  transitionSteps,
} from "../model/content";
import { transitionStructuredData } from "../model/seo";
import { TransitionCycle } from "./transition-cycle";
import { TransitionFacts } from "./transition-facts";
import { TransitionFaq } from "./transition-faq";
import { TransitionGains } from "./transition-gains";
import { TransitionLead } from "./transition-lead";
import { TransitionPerks } from "./transition-perks";
import { TransitionReasons } from "./transition-reasons";
import { TransitionSection } from "./transition-section";
import { TransitionSectionTitle } from "./transition-section-title";
import { TransitionSteps } from "./transition-steps";

import styles from "./TransitionPage.module.css";

const structuredDataJson = JSON.stringify(transitionStructuredData).replace(/</g, "\\u003c");

export function TransitionPage() {
  return (
    <div className={styles["transition-page"]} data-header-veil-bg="#f9f9fb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson }} />
      <ClientsHeroSection content={transitionHero} segment="transition" />
      <TransitionGains />
      <TransitionSection id={TRANSITION_SECTION_IDS.steps} labelledBy="transition-steps-title" tone="soft">
        <TransitionSectionTitle id="transition-steps-title" title={transitionSteps.title} />
        <TransitionSteps items={transitionSteps.items} />
        <TransitionCycle />
      </TransitionSection>
      <TransitionSection labelledBy="transition-reasons-title">
        <TransitionReasons titleId="transition-reasons-title" />
      </TransitionSection>
      <TransitionSection labelledBy="transition-facts-title" tone="dark">
        <TransitionFacts titleId="transition-facts-title" content={transitionFacts} />
      </TransitionSection>
      <TransitionSection id={TRANSITION_SECTION_IDS.perks} labelledBy="transition-perks-title">
        <TransitionSectionTitle id="transition-perks-title" title={transitionPerks.title} />
        <TransitionPerks />
      </TransitionSection>
      <TransitionSection id={TRANSITION_SECTION_IDS.faq} labelledBy="transition-faq-title" tone="soft">
        <TransitionFaq titleId="transition-faq-title" title={transitionFaq.title} items={transitionFaq.items} />
      </TransitionSection>
      <TransitionLead />
    </div>
  );
}
