"use client";

import styles from "./TestimonialCard.module.css";
import { useState } from "react";
import cn from "classnames";

type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
};

export function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  
  return (
      <article className={styles["testimonial-card"]}>
        <p className={styles["testimonial-card__quote"]}>{quote}</p>
        <footer className={styles["testimonial-card__footer"]}>
          <div className={styles["testimonial-card__avatar"]} aria-hidden />
          <div className={styles["testimonial-card__meta"]}>
            <span className={styles["testimonial-card__name"]}>{name}</span>
            <span className={styles["testimonial-card__role"]}>{role}</span>
          </div>
        </footer>
      </article>
  );
}
