import type { ClientsPartnershipCtaContent } from "@/entities/landing";
import { FeedbackFormPanel } from "@/shared/ui/feedback-form-panel";
import { Container } from "@/shared/ui/container";

import styles from "./ClientsPartnershipCtaSection.module.css";

type ClientsPartnershipCtaSectionProps = {
  content: ClientsPartnershipCtaContent;
};

export function ClientsPartnershipCtaSection({
  content,
}: ClientsPartnershipCtaSectionProps) {
  return (
    <section id="contacts" className={styles["clients-partnership-cta-section"]}>
      <Container wide className={styles["clients-partnership-cta-section__container"]}>
        <FeedbackFormPanel {...content} />
      </Container>
    </section>
  );
}
