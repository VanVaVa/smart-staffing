"use client";

import { routes } from "@/shared/config";
import { EditableText, useAdminBlockEditOptional } from "@/shared/ui/editable-field";
import { useFeedbackFormSuccessModal } from "@/shared/ui/feedback-form/FeedbackFormSuccessModalProvider";
import { Text } from "@/shared/ui";
import textStyles from "@/shared/ui/text/Text.module.css";

import styles from "./FooterLinkItem.module.css";

function isPricingModalHref(href: string) {
  return href === routes.pricingModal || href === "/pricing";
}

type FooterLinkItemProps = {
  label: string;
  href: string;
  labelPath: string;
  hrefPath: string;
  linkClassName?: string;
  hrefEditClassName?: string;
};

export function FooterLinkItem({
  label,
  href,
  labelPath,
  hrefPath,
  linkClassName,
  hrefEditClassName,
}: FooterLinkItemProps) {
  const blockEdit = useAdminBlockEditOptional();
  const { openCompanyConnectionModal } = useFeedbackFormSuccessModal();

  if (blockEdit) {
    return (
      <div className={styles["footer-link-item"]}>
        <EditableText
          path={labelPath}
          label="Текст ссылки"
          as="span"
          className={styles["footer-link-item__label"]}
        >
          {label}
        </EditableText>
        <EditableText
          path={hrefPath}
          label="URL ссылки"
          className={[styles["footer-link-item__href-edit"], hrefEditClassName]
            .filter(Boolean)
            .join(" ")}
        >
          {href}
        </EditableText>
      </div>
    );
  }

  if (isPricingModalHref(href)) {
    return (
      <button
        type="button"
        className={[
          textStyles.text,
          textStyles["text--xl"],
          textStyles["text--on-dark"],
          styles["footer-link-item__link"],
          styles["footer-link-item__button"],
          linkClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={openCompanyConnectionModal}
      >
        {label}
      </button>
    );
  }

  return (
    <Text
      as="a"
      href={href}
      tone="onDark"
      className={[styles["footer-link-item__link"], linkClassName].filter(Boolean).join(" ")}
      size="xl"
    >
      {label}
    </Text>
  );
}
