"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import NextLink from "next/link";
import type { ReactNode } from "react";

import { EditableMedia, EditableText, useAdminBlockEditOptional } from "@/shared/ui/editable-field";
import { ArrowIcon } from "@/shared/ui/arrow-icon";
import { Badge } from "@/shared/ui/badge";

import styles from "./CaseStudyCard.module.css";

type CaseStudyCardLayout = "default" | "compact-horizontal";

type CaseStudyCardProps = {
  href: string;
  panelSrc: string;
  panelAlt: string;
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  description: string;
  metric: string;
  metricLabel: string;
  tag?: string;
  actionLabel?: string;
  itemIndex?: number;
  editPrefix?: string;
  layout?: CaseStudyCardLayout;
};

function CaseStudyCardRoot({
  href,
  className,
  ariaLabel,
  children,
  editable,
}: {
  href: string;
  className: string;
  ariaLabel: string;
  children: ReactNode;
  editable: boolean;
}) {
  if (editable) {
    return (
      <div className={className} aria-label={ariaLabel}>
        {children}
      </div>
    );
  }

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
  logoSrc,
  logoWidth = 280,
  logoHeight = 60,
  description,
  metric,
  metricLabel,
  tag,
  actionLabel = "Читать дальше",
  itemIndex,
  editPrefix,
  layout = "default",
}: CaseStudyCardProps) {
  const edit = useAdminBlockEditOptional();
  const prefix =
    editPrefix ?? (itemIndex !== undefined ? `items.${itemIndex}.` : "");
  const editable = edit !== null && prefix !== "";
  const rootClassName = [
    styles["case-study-card"],
    layout === "compact-horizontal" && styles["case-study-card--compact-horizontal"],
  ]
    .filter(Boolean)
    .join(" ");
  const ariaLabel = `${panelAlt}. ${actionLabel}`;
  const logoStyle = {
    "--case-study-logo-max-width": `${logoWidth}px`,
    "--case-study-logo-max-height": `${logoHeight}px`,
  } as CSSProperties;

  const panelBackground = editable ? (
    <EditableMedia path={`${prefix}panelSrc`} label="Кейс — фон панели">
      <Image
        src={panelSrc}
        alt=""
        width={571}
        height={484}
        className={styles["case-study-card__panel-bg-image"]}
        aria-hidden
      />
    </EditableMedia>
  ) : (
    <Image
      src={panelSrc}
      alt=""
      width={571}
      height={484}
      className={styles["case-study-card__panel-bg-image"]}
      aria-hidden
    />
  );

  const panelLogo =
    logoSrc !== undefined ? (
      editable ? (
        <EditableMedia path={`${prefix}logoSrc`} label="Кейс — логотип">
          <Image
            src={logoSrc}
            alt={panelAlt}
            width={logoWidth}
            height={logoHeight}
            className={styles["case-study-card__panel-logo-image"]}
          />
        </EditableMedia>
      ) : (
        <Image
          src={logoSrc}
          alt={panelAlt}
          width={logoWidth}
          height={logoHeight}
          className={styles["case-study-card__panel-logo-image"]}
        />
      )
    ) : null;

  return (
    <CaseStudyCardRoot
      href={href}
      className={rootClassName}
      ariaLabel={ariaLabel}
      editable={editable}
    >
      <div className={styles["case-study-card__panel"]}>
        <div className={styles["case-study-card__panel-media"]}>
          <div className={styles["case-study-card__panel-bg"]}>{panelBackground}</div>
          {panelLogo ? (
            <div className={styles["case-study-card__panel-logo"]} style={logoStyle}>
              {panelLogo}
            </div>
          ) : null}
        </div>
        {layout === "compact-horizontal" && tag ? (
          <div className={styles["case-study-card__panel-header"]}>
            {editable ? (
              <EditableText path={`${prefix}tag`} label="Кейс — тег">
                <Badge variant="tag" className={styles["case-study-card__panel-tag"]}>
                  {tag}
                </Badge>
              </EditableText>
            ) : (
              <Badge variant="tag" className={styles["case-study-card__panel-tag"]}>
                {tag}
              </Badge>
            )}
          </div>
        ) : null}
        <div className={styles["case-study-card__metric-block"]}>
          <div className={styles["case-study-card__metric-bar"]} aria-hidden />
          <div className={styles["case-study-card__metric-copy"]}>
            {editable ? (
              <>
                <EditableText
                  path={`${prefix}metric`}
                  label="Кейс — метрика"
                  as="p"
                  className={styles["case-study-card__metric"]}
                >
                  {metric}
                </EditableText>
                <EditableText
                  path={`${prefix}metricLabel`}
                  label="Кейс — подпись метрики"
                  as="p"
                  className={styles["case-study-card__metric-label"]}
                >
                  {metricLabel}
                </EditableText>
              </>
            ) : (
              <>
                <p className={styles["case-study-card__metric"]}>{metric}</p>
                <p className={styles["case-study-card__metric-label"]}>{metricLabel}</p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles["case-study-card__content"]}>
        <div className={styles["case-study-card__lead"]}>
          {tag ? (
            editable ? (
              <EditableText path={`${prefix}tag`} label="Кейс — тег">
                <Badge variant="tag" className={styles["case-study-card__tag"]}>
                  {tag}
                </Badge>
              </EditableText>
            ) : (
              <Badge variant="tag" className={styles["case-study-card__tag"]}>
                {tag}
              </Badge>
            )
          ) : null}
          {editable ? (
            <EditableText
              path={`${prefix}description`}
              label="Кейс — описание"
              as="p"
              className={styles["case-study-card__description"]}
              multiline
            >
              {description}
            </EditableText>
          ) : (
            <p className={styles["case-study-card__description"]}>{description}</p>
          )}
        </div>
      </div>
      <div className={styles["case-study-card__footer"]}>
        <span className={styles["case-study-card__read-more"]}>
          {actionLabel}
          <ArrowIcon name="cta" className={styles["case-study-card__read-more-icon"]} />
        </span>
        <span className={styles["case-study-card__action"]} aria-hidden>
          <ArrowIcon name="round" />
        </span>
      </div>
    </CaseStudyCardRoot>
  );
}
