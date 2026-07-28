import { contactSection } from "@/entities/landing";
import { Section } from "@/shared/ui/section";

import { ContactForm } from "./contact-form";

import styles from "./ContactSection.module.css";

function ContactSubtitle() {
  const { subtitle, subtitleAccent } = contactSection;
  const accentIndex = subtitle.indexOf(subtitleAccent);

  if (accentIndex === -1) {
    return <p className={styles["contact-section__subtitle"]}>{subtitle}</p>;
  }

  const before = subtitle.slice(0, accentIndex);
  const after = subtitle.slice(accentIndex + subtitleAccent.length);

  return (
    <p className={styles["contact-section__subtitle"]}>
      {before}
      <span className={styles["contact-section__subtitle-accent"]}>{subtitleAccent}</span>
      {after}
    </p>
  );
}

export function ContactSection() {
  return (
    <Section id="contacts" tone="muted" className={styles["contact-section"]}>
      <div className={styles["contact-section__decor"]} aria-hidden>
        <div className={styles["contact-section__orb--purple"]} />
        <div className={styles["contact-section__orb--orange"]} />
      </div>
      <div className={styles["contact-section__panel"]}>
        <div className={styles["contact-section__intro"]}>
          <h2 className={styles["contact-section__title"]}>{contactSection.title}</h2>
          <ContactSubtitle />
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
