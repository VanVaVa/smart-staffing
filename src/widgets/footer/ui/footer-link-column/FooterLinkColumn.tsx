"use client";

import type { FooterCollectionKey, FooterLinkItem as FooterLinkItemType } from "@/entities/landing/model/footer-blocks";
import {
  EditableCollectionAdd,
  EditableCollectionItem,
  EditableText,
} from "@/shared/ui/editable-field";

import { FooterColumnTitle } from "../footer-column-title";
import { FooterLinkItem } from "../footer-link-item";
import styles from "./FooterLinkColumn.module.css";

type FooterLinkColumnProps = {
  title: string;
  titlePath: "menuTitle" | "solutionsTitle";
  arrayPath: "menu" | "solutions";
  collectionKey: Extract<FooterCollectionKey, "menu" | "solutions">;
  items: FooterLinkItemType[];
};

export function FooterLinkColumn({
  title,
  titlePath,
  arrayPath,
  collectionKey,
  items,
}: FooterLinkColumnProps) {
  return (
    <div>
      <FooterColumnTitle>
        <EditableText path={titlePath} label="Заголовок колонки">
          {title}
        </EditableText>
      </FooterColumnTitle>
      <ul className={styles["footer-link-column__links"]}>
        {items.map((item, index) => (
          <EditableCollectionItem key={`${item.label}-${index}`} arrayPath={arrayPath} index={index}>
            <li>
              <FooterLinkItem
                label={item.label}
                href={item.href}
                labelPath={`${arrayPath}.${index}.label`}
                hrefPath={`${arrayPath}.${index}.href`}
              />
            </li>
          </EditableCollectionItem>
        ))}
      </ul>
      <EditableCollectionAdd
        arrayPath={arrayPath}
        collectionKey={collectionKey}
        addLabel="Добавить ссылку"
      />
    </div>
  );
}
