import type { ContactBlockProps } from "@/entities/landing/model/home-blocks";
import { FeedbackFormPanel } from "@/shared/ui/feedback-form-panel";
import { Section } from "@/shared/ui/section";

import styles from "./ContactSection.module.css";

type ContactSectionProps = {
  content: ContactBlockProps;
  interactive?: boolean;
};

export function ContactSection({
  content,
  interactive = true,
}: ContactSectionProps) {
  return (
    <Section id="contacts" tone="muted" className={styles["contact-section"]}>
      <FeedbackFormPanel {...content} interactive={interactive} />
    </Section>
  );
}
