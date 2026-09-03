"use client";

import type { CSSProperties } from "react";

import { Badge } from "@/shared/ui/badge";
import { AdminInlineImage, AdminInlineText } from "@/shared/ui/admin-inline-field";

import cardStyles from "@/shared/ui/case-study-card/CaseStudyCard.module.css";

import editableStyles from "./EditableCaseStudyCard.module.css";

type EditableCaseStudyCardProps = {
  panelSrc: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  tag: string;
  description: string;
  metric: string;
  metricLabel: string;
  disabled?: boolean;
  onTagChange: (tag: string) => void;
  onDescriptionChange: (description: string) => void;
  onMetricChange: (metric: string) => void;
  onMetricLabelChange: (metricLabel: string) => void;
  onPanelSrcChange: (panelSrc: string) => void;
  onLogoSrcChange: (logoSrc: string) => void;
};

export function EditableCaseStudyCard({
  panelSrc,
  logoSrc,
  logoWidth,
  logoHeight,
  tag,
  description,
  metric,
  metricLabel,
  disabled,
  onTagChange,
  onDescriptionChange,
  onMetricChange,
  onMetricLabelChange,
  onPanelSrcChange,
  onLogoSrcChange,
}: EditableCaseStudyCardProps) {
  const rootClassName = [
    cardStyles["case-study-card"],
    cardStyles["case-study-card--compact-horizontal"],
    editableStyles["editable-case-study-card"],
  ].join(" ");
  const logoStyle = {
    "--case-study-logo-max-width": `${logoWidth}px`,
    "--case-study-logo-max-height": `${logoHeight}px`,
  } as CSSProperties;
  const fieldClassName = editableStyles["editable-case-study-card__field"];

  return (
    <article className={rootClassName}>
      <div
        className={[
          cardStyles["case-study-card__panel"],
          editableStyles["editable-case-study-card__panel"],
        ].join(" ")}
      >
        <div
          className={[
            cardStyles["case-study-card__panel-media"],
            editableStyles["editable-case-study-card__panel-media"],
          ].join(" ")}
        >
          <div
            className={[
              cardStyles["case-study-card__panel-bg"],
              editableStyles["editable-case-study-card__panel-bg"],
            ].join(" ")}
          >
            <AdminInlineImage
              className={editableStyles["editable-case-study-card__panel-bg-image"]}
              imageSrc={panelSrc}
              imageWidth={0}
              imageHeight={0}
              disabled={disabled}
              imageClassName={cardStyles["case-study-card__panel-bg-image"]}
              placeholderLabel="Фон карточки"
              onChange={(patch) => onPanelSrcChange(patch.imageSrc)}
            />
          </div>
          <div
            className={[
              cardStyles["case-study-card__panel-logo"],
              editableStyles["editable-case-study-card__panel-logo"],
            ].join(" ")}
            style={logoStyle}
          >
            <div className={editableStyles["editable-case-study-card__logo-slot"]}>
              <AdminInlineImage
                className={editableStyles["editable-case-study-card__logo-image"]}
                imageSrc={logoSrc}
                imageWidth={logoWidth}
                imageHeight={logoHeight}
                disabled={disabled}
                objectFit="contain"
                imageClassName={cardStyles["case-study-card__panel-logo-image"]}
                placeholderLabel="Логотип"
                onChange={(patch) => onLogoSrcChange(patch.imageSrc)}
              />
            </div>
          </div>
        </div>
        <div
          className={[
            cardStyles["case-study-card__metric-block"],
            editableStyles["editable-case-study-card__metric-block"],
          ].join(" ")}
        >
          <div className={cardStyles["case-study-card__metric-bar"]} aria-hidden />
          <div
            className={[
              cardStyles["case-study-card__metric-copy"],
              editableStyles["editable-case-study-card__metric-copy"],
            ].join(" ")}
          >
            <AdminInlineText
              className={[
                cardStyles["case-study-card__metric"],
                fieldClassName,
              ].join(" ")}
              value={metric}
              disabled={disabled}
              onChange={onMetricChange}
            />
            <AdminInlineText
              className={[
                cardStyles["case-study-card__metric-label"],
                fieldClassName,
              ].join(" ")}
              value={metricLabel}
              disabled={disabled}
              onChange={onMetricLabelChange}
            />
          </div>
        </div>
      </div>
      <div
        className={[
          cardStyles["case-study-card__content"],
          editableStyles["editable-case-study-card__content"],
        ].join(" ")}
      >
        <div
          className={[
            cardStyles["case-study-card__lead"],
            editableStyles["editable-case-study-card__lead"],
          ].join(" ")}
        >
          <Badge variant="tag" className={cardStyles["case-study-card__tag"]}>
            <AdminInlineText
              className={[
                editableStyles["editable-case-study-card__tag-field"],
                fieldClassName,
              ].join(" ")}
              value={tag}
              disabled={disabled}
              onChange={onTagChange}
            />
          </Badge>
          <AdminInlineText
            className={[
              cardStyles["case-study-card__description"],
              editableStyles["editable-case-study-card__description-field"],
              fieldClassName,
            ].join(" ")}
            value={description}
            disabled={disabled}
            multiline
            onChange={onDescriptionChange}
          />
        </div>
      </div>
    </article>
  );
}
