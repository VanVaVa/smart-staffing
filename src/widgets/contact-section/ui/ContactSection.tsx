import { contactSection } from "@/entities/landing";
import { FeedbackFormPanel } from "@/shared/ui/feedback-form-panel";
import { Section } from "@/shared/ui/section";

export function ContactSection() {
  return (
    <Section id="contacts" tone="muted">
      <FeedbackFormPanel {...contactSection} />
    </Section>
  );
}
