import type { ClientsPartnershipCtaContent } from "@/entities/landing";
import { FeedbackFormPanel } from "@/shared/ui/feedback-form-panel";
import { Container } from "@/shared/ui/container";

import styles from "./ClientsPartnershipCtaSection.module.css";

type ClientsPartnershipCtaSectionProps = {
  content: ClientsPartnershipCtaContent;
  sourcePath: string;
  sourceLabel?: string;
  interactive?: boolean;
};

export function ClientsPartnershipCtaSection({
  content,
  sourcePath,
  sourceLabel,
  interactive = true,
}: ClientsPartnershipCtaSectionProps) {
  return (
    <section id="contacts" className={styles["clients-partnership-cta-section"]}>
      <Container wide className={styles["clients-partnership-cta-section__container"]}>
        <FeedbackFormPanel
          {...content}
          interactive={interactive}
          submissionType="partnership"
          sourcePath={sourcePath}
          sourceLabel={sourceLabel}
        />
      </Container>
    </section>
  );
}
