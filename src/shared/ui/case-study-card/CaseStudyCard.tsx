import Image from "next/image";
import NextLink from "next/link";
import type { ReactNode } from "react";

import { ArrowIcon } from "@/shared/ui/arrow-icon";

import styles from "./CaseStudyCard.module.css";

type CaseStudyCardProps = {
  href: string;
  panelSrc: string;
  panelAlt: string;
  description: string;
  metric: string;
  metricLabel: string;
  actionLabel?: string;
};

function CaseStudyCardRoot({
  href,
  className,
  ariaLabel,
  children,
}: {
  href: string;
  className: string;
  ariaLabel: string;
  children: ReactNode;
}) {
  if (href.startsWith("#") || href.startsWith("http")) {
    return (
      <a href={href} className={className} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={className} aria-label={ariaLabel}>
      {children}
    </NextLink>
  );
}

export function CaseStudyCard({
  href,
  panelSrc,
  panelAlt,
  description,
  metric,
  metricLabel,
  actionLabel = "Подробнее о кейсе",
}: CaseStudyCardProps) {
  const ariaLabel = `${panelAlt}. ${actionLabel}`;

  return (
    <CaseStudyCardRoot
      href={href}
      className={styles["case-study-card"]}
      ariaLabel={ariaLabel}
    >
      <div className={styles["case-study-card__panel"]}>
        <Image
          src={panelSrc}
          alt=""
          width={571}
          height={484}
          className={styles["case-study-card__panel-image"]}
          aria-hidden
        />
      </div>
      <div className={styles["case-study-card__content"]}>
        <p className={styles["case-study-card__description"]}>{description}</p>
        <div className={styles["case-study-card__metric-block"]}>
          <div className={styles["case-study-card__metric-bar"]} aria-hidden />
          <div className={styles["case-study-card__metric-copy"]}>
            <p className={styles["case-study-card__metric"]}>{metric}</p>
            <p className={styles["case-study-card__metric-label"]}>{metricLabel}</p>
          </div>
        </div>
      </div>
      <span className={styles["case-study-card__action"]} aria-hidden>
        <ArrowIcon name="round" />
      </span>
    </CaseStudyCardRoot>
  );
}
