import type { FooterBlockProps } from "@/entities/landing/model/footer-blocks";
import { Text } from "@/shared/ui";

import { FooterColumnTitle } from "../footer-column-title";
import styles from "./FooterContacts.module.css";

type FooterContactsProps = {
  contactsTitle: string;
  contacts: FooterBlockProps["contacts"];
};

export function FooterContacts({ contactsTitle, contacts }: FooterContactsProps) {
  const { phone, email, social } = contacts;
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <div>
      <FooterColumnTitle size="sm">{contactsTitle}</FooterColumnTitle>
      <div className={styles["footer-contacts__body"]}>
        <div className={styles["footer-contacts__contacts"]}>
          <Text
            as="a"
            href={phoneHref}
            tone="onDark"
            className={styles["footer-contacts__link"]}
          >
            {phone}
          </Text>
          <Text
            as="a"
            href={`mailto:${email}`}
            tone="onDark"
            className={styles["footer-contacts__link"]}
          >
            {email}
          </Text>
        </div>
        <div className={styles["footer-contacts__social-links"]}>
          {social.map((item, index) => (
            <a
              key={`${item.label}-${index}`}
              href={item.href}
              className={styles["footer-contacts__social-link"]}
              aria-label={item.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={item.iconSrc}
                alt=""
                width={item.width}
                height={item.height}
                className={styles["footer-contacts__social-icon"]}
                aria-hidden
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
