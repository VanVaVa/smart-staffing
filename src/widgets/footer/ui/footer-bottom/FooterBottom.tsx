"use client";

import type { FooterLinkItem } from "@/entities/landing/model/footer-blocks";
import {
  EditableCollectionAdd,
  EditableCollectionItem,
  EditableText,
} from "@/shared/ui/editable-field";
import { Text } from "@/shared/ui";

import { FooterLinkItem as FooterLinkItemView } from "../footer-link-item";
import styles from "./FooterBottom.module.css";

type FooterBottomProps = {
  legal: FooterLinkItem[];
  copyright: string;
};

export function FooterBottom({ legal, copyright }: FooterBottomProps) {
  return (
    <div className={styles["footer-bottom"]}>
      <nav className={styles["footer-bottom__legal"]} aria-label="Юридическая информация">
        {legal.map((item, index) => (
          <EditableCollectionItem key={`${item.label}-${index}`} arrayPath="legal" index={index}>
            <FooterLinkItemView
              label={item.label}
              href={item.href}
              labelPath={`legal.${index}.label`}
              hrefPath={`legal.${index}.href`}
              linkClassName={`${styles["footer-bottom__muted"]} ${styles["footer-bottom__link"]}`}
            />
          </EditableCollectionItem>
        ))}
        <EditableCollectionAdd
          arrayPath="legal"
          collectionKey="legal"
          addLabel="Добавить ссылку"
        />
      </nav>
      <Text
        as="span"
        size="xl"
        className={`${styles["footer-bottom__muted"]} ${styles["footer-bottom__copyright"]}`}
      >
        <EditableText path="copyright" label="Копирайт">
          {copyright}
        </EditableText>
      </Text>
    </div>
  );
}
