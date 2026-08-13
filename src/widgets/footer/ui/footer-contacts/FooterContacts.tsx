"use client";

import type { FooterBlockProps } from "@/entities/landing/model/footer-blocks";
import {
  EditableCollectionAdd,
  EditableCollectionItem,
  EditableText,
  useAdminBlockEditOptional,
} from "@/shared/ui/editable-field";
import { Text } from "@/shared/ui";

import { FooterColumnTitle } from "../footer-column-title";
import { FooterLinkItem } from "../footer-link-item";
import styles from "./FooterContacts.module.css";

type FooterContactsProps = {
  contactsTitle: string;
  contacts: FooterBlockProps["contacts"];
};

export function FooterContacts({ contactsTitle, contacts }: FooterContactsProps) {
  const blockEdit = useAdminBlockEditOptional();
  const { phone, email, social } = contacts;
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <div>
      <FooterColumnTitle size="sm">
        <EditableText path="contactsTitle" label="Заголовок колонки">
          {contactsTitle}
        </EditableText>
      </FooterColumnTitle>
      <div className={styles["footer-contacts__body"]}>
        <div className={styles["footer-contacts__contacts"]}>
          {blockEdit ? (
            <>
              <EditableText
                path="contacts.phone"
                label="Телефон"
                className={styles["footer-contacts__link"]}
              >
                {phone}
              </EditableText>
              <EditableText
                path="contacts.email"
                label="Email"
                className={styles["footer-contacts__link"]}
              >
                {email}
              </EditableText>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
        <div className={styles["footer-contacts__social-links"]}>
          {social.map((item, index) => (
            <EditableCollectionItem
              key={`${item.label}-${index}`}
              arrayPath="contacts.social"
              index={index}
            >
              {blockEdit ? (
                <div className={styles["footer-contacts__social-edit"]}>
                  <img
                    src={item.iconSrc}
                    alt=""
                    width={item.width}
                    height={item.height}
                    className={styles["footer-contacts__social-icon"]}
                    aria-hidden
                  />
                  <EditableText
                    path={`contacts.social.${index}.label`}
                    label="Название соцсети"
                    className={styles["footer-contacts__social-label"]}
                  >
                    {item.label}
                  </EditableText>
                  <EditableText
                    path={`contacts.social.${index}.href`}
                    label="URL соцсети"
                    className={styles["footer-contacts__social-href"]}
                  >
                    {item.href}
                  </EditableText>
                </div>
              ) : (
                <a
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
              )}
            </EditableCollectionItem>
          ))}
        </div>
        <EditableCollectionAdd
          arrayPath="contacts.social"
          collectionKey="contacts.social"
          addLabel="Добавить соцсеть"
        />
      </div>
    </div>
  );
}
