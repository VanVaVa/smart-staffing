import type { TestimonialsBlockProps } from "@/entities/landing/model/home-blocks";
import { Section } from "@/shared/ui/section";
import { SectionTitle } from "@/shared/ui/section-title";

import { TestimonialsCarousel } from "./testimonials-carousel";

import styles from "./TestimonialsSection.module.css";

type TestimonialsSectionProps = {
  content: TestimonialsBlockProps;
};

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
  return (
    <Section tone="muted" className={styles["testimonials-section"]}>
      <SectionTitle
        centered
        className={styles["testimonials-section__title"]}
        title={
          <span>
            {content.title}
          </span>
        }
      />
      <TestimonialsCarousel items={content.items} />
    </Section>
  );
}
