import Image from "next/image";

import { Button } from "@/shared/ui/button";

import styles from "./AboutCareerCta.module.css";

type AboutCareerCtaProps = {
  text: string;
  buttonLabel: string;
  buttonHref: string;
  photoSrc: string;
  photoAlt: string;
};

export function AboutCareerCta({
  text,
  buttonLabel,
  buttonHref,
  photoSrc,
  photoAlt,
}: AboutCareerCtaProps) {
  return (
    <article className={styles["about-career-cta"]}>
      <div className={styles["about-career-cta__surface"]} aria-hidden />
      <div className={styles["about-career-cta__media"]}>
        <Image
          className={styles["about-career-cta__photo"]}
          src={photoSrc}
          alt={photoAlt}
          width={152}
          height={203}
          sizes="(max-width: 360px) 52px, (max-width: 576px) 128px, (max-width: 768px) 171px, 190px"
        />
      </div>
      <p className={styles["about-career-cta__text"]}>{text}</p>
      <Button
        href={buttonHref}
        variant="primary"
        size="lg"
        withArrow
        className={styles["about-career-cta__button"]}
      >
        {buttonLabel}
      </Button>
    </article>
  );
}
