import { routes } from "@/shared/config";
import { Container } from "@/shared/ui/container";
import { FeedbackFormPanel } from "@/shared/ui/feedback-form-panel";

import { TRANSITION_SECTION_IDS, transitionLeadForm } from "../../model/content";

import styles from "./TransitionLead.module.css";

export function TransitionLead() {
  return (
    <section id={TRANSITION_SECTION_IDS.lead} className={styles["transition-lead"]}>
      <Container>
        <FeedbackFormPanel
          {...transitionLeadForm}
          submissionType="contact"
          sourcePath={routes.smartplacement}
          sourceLabel="Аутплейсмент"
          channels={["phone", "email"]}
        />
      </Container>
    </section>
  );
}
