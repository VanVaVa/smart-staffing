import type { FooterLinkItem as FooterLinkItemType } from "@/entities/landing/model/footer-blocks";

import { FooterColumnTitle } from "../footer-column-title";
import { FooterLinkItem } from "../footer-link-item";
import styles from "./FooterLinkColumn.module.css";

type FooterLinkColumnProps = {
  title: string;
  items: FooterLinkItemType[];
};

export function FooterLinkColumn({ title, items }: FooterLinkColumnProps) {
  return (
    <div>
      <FooterColumnTitle>
        <span>{title}</span>
      </FooterColumnTitle>
      <ul className={styles["footer-link-column__links"]}>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            <FooterLinkItem label={item.label} href={item.href} />
          </li>
        ))}
      </ul>
    </div>
  );
}
