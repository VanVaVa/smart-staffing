import Image from "next/image";

import styles from "./TestimonialCard.module.css";

type TestimonialCardProps = {
  company: string;
  role: string;
  date: string;
  quote: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
};

export function TestimonialCard({
  company,
  role,
  date,
  quote,
  logoSrc,
  logoWidth,
  logoHeight,
}: TestimonialCardProps) {
  return (
    <article className={styles["testimonial-card"]}>
      <div className={styles["testimonial-card__body"]}>
        <header className={styles["testimonial-card__header"]}>
          <div className={styles["testimonial-card__author"]}>
            <div className={styles["testimonial-card__logo"]}>
              <Image
                src={logoSrc}
                alt=""
                width={logoWidth}
                height={logoHeight}
                className={styles["testimonial-card__logo-image"]}
              />
            </div>
            <div className={styles["testimonial-card__meta"]}>
              <span className={styles["testimonial-card__company"]}>{company}</span>
              <span className={styles["testimonial-card__role"]}>{role}</span>
            </div>
          </div>
          <time className={styles["testimonial-card__date"]} dateTime="2026-01-23">
            {date}
          </time>
        </header>
        <p className={styles["testimonial-card__quote"]}>{quote}</p>
      </div>
    </article>
  );
}
