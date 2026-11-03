import {
  TRANSITION_SECTION_IDS,
  transitionFacts,
  transitionFaq,
  transitionPerks,
  transitionSteps,
} from "../model/content";
import { transitionStructuredData } from "../model/seo";
import { TransitionCycle } from "./transition-cycle";
import { TransitionDemand } from "./transition-demand";
import { TransitionFacts } from "./transition-facts";
import { TransitionFaq } from "./transition-faq";
import { TransitionGains } from "./transition-gains";
import { TransitionGlow } from "./transition-glow";
import { TransitionHero } from "./transition-hero";
import { TransitionLead } from "./transition-lead";
import { TransitionPerks } from "./transition-perks";
import { TransitionReasons } from "./transition-reasons";
import { TransitionSection } from "./transition-section";
import { TransitionSectionTitle } from "./transition-section-title";
import { TransitionSteps } from "./transition-steps";
import { TransitionTrack } from "./transition-track";

import styles from "./TransitionPage.module.css";

const structuredDataJson = JSON.stringify(transitionStructuredData).replace(/</g, "\\u003c");

export function TransitionPage() {
  return (
    <div className={styles["transition-page"]} data-header-veil-bg="#f9f9fb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson }} />
      <TransitionHero />
      <TransitionGains />
      <TransitionSection labelledBy="transition-track-title">
        <TransitionTrack titleId="transition-track-title" />
      </TransitionSection>
      <TransitionSection id={TRANSITION_SECTION_IDS.steps} labelledBy="transition-steps-title">
        <TransitionSectionTitle id="transition-steps-title" title={transitionSteps.title} />
        <TransitionSteps items={transitionSteps.items} />
      </TransitionSection>
      <TransitionSection labelledBy="transition-cycle-title">
        <TransitionCycle titleId="transition-cycle-title" />
      </TransitionSection>
      <TransitionSection labelledBy="transition-reasons-title">
        <TransitionReasons titleId="transition-reasons-title" />
        <TransitionDemand />
      </TransitionSection>
      <TransitionSection labelledBy="transition-facts-title" tone="dark" decor={<TransitionGlow />}>
        <TransitionFacts titleId="transition-facts-title" content={transitionFacts} />
        <section
          id={TRANSITION_SECTION_IDS.perks}
          className={styles["transition-page__perks"]}
          aria-labelledby="transition-perks-title"
        >
          <TransitionSectionTitle id="transition-perks-title" title={transitionPerks.title} tone="dark" />
          <TransitionPerks />
        </section>
      </TransitionSection>
      <TransitionSection id={TRANSITION_SECTION_IDS.faq} labelledBy="transition-faq-title" tone="raised">
        <TransitionFaq titleId="transition-faq-title" title={transitionFaq.title} items={transitionFaq.items} />
      </TransitionSection>
      <TransitionLead />
    </div>
  );
}
