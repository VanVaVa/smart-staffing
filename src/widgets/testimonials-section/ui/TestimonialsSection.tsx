import { testimonials } from "@/entities/landing";
import { Section } from "@/shared/ui/section";
import { SectionTitle } from "@/shared/ui/section-title";

import { TestimonialsCarousel } from "./testimonials-carousel";

import styles from "./TestimonialsSection.module.css";

export function TestimonialsSection() {
  return (
    <Section tone="muted">
      <SectionTitle
        title={testimonials.title}
        centered
        className={styles["testimonials-section__title"]}
      />
      <TestimonialsCarousel items={testimonials.items} />
    </Section>
  );
}
