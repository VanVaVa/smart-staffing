"use client";

import Image from "next/image";

import styles from "./TestimonialCard.module.css";
import { useState } from "react";
import cn from "classnames";

type TestimonialCardProps = {
  company: string;
  role: string;
  date: string;
  quote: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  itemIndex?: number;
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
  const [ isOpen, setIsOpen ] = useState(false);
  
  return (
    <article className={cn(styles["testimonial-card"], isOpen && styles["testimonial-card--open"])} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles["testimonial-card__body"]}>
        <header className={styles["testimonial-card__header"]}>
          <div className={styles["testimonial-card__author"]}>
            <div>
              <div className={styles["testimonial-card__logo"]}>
                <Image
                  src={logoSrc}
                  alt=""
                  width={logoWidth}
                  height={logoHeight}
                  className={styles["testimonial-card__logo-image"]}
                />
              </div>
            </div>
            <div className={styles["testimonial-card__meta"]}>
              <span className={styles["testimonial-card__company"]}>
                {company}
              </span>
              <span className={styles["testimonial-card__role"]}>
                {role}
              </span>
            </div>
          </div>
          <time className={styles["testimonial-card__date"]}>
            {date}
          </time>
        </header>
        <p className={styles["testimonial-card__quote"]}>
          {quote}
        </p>
      </div>
    </article>
  );
}
