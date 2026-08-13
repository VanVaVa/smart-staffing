import type { ClientsPartnershipCtaContent } from "@/entities/landing";
import { FeedbackFormPanel } from "@/shared/ui/feedback-form-panel";
import { Container } from "@/shared/ui/container";

import styles from "./ClientsPartnershipCtaSection.module.css";

type ClientsPartnershipCtaSectionProps = {
  content: ClientsPartnershipCtaContent;
  sourcePath: string;
  sourceLabel?: string;
};

export function ClientsPartnershipCtaSection({
  content,
  sourcePath,
  sourceLabel,
}: ClientsPartnershipCtaSectionProps) {
  return (
    <section id="contacts" className={styles["clients-partnership-cta-section"]}>
      <Container wide className={styles["clients-partnership-cta-section__container"]}>
        <FeedbackFormPanel
          {...content}
          submissionType="partnership"
          sourcePath={sourcePath}
          sourceLabel={sourceLabel}
        />
      </Container>
    </section>
  );
}
