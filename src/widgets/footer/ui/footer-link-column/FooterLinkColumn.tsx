import { Text } from "@/shared/ui";

import { FooterColumnTitle } from "../footer-column-title";
import styles from "./FooterLinkColumn.module.css";

type FooterLinkItem = {
  label: string;
  href: string;
};

type FooterLinkColumnProps = {
  title: string;
  items: readonly FooterLinkItem[];
};

export function FooterLinkColumn({ title, items }: FooterLinkColumnProps) {
  return (
    <div>
      <FooterColumnTitle>{title}</FooterColumnTitle>
      <ul className={styles["footer-link-column__links"]}>
        {items.map((item) => (
          <li key={item.label}>
            <Text as="a" href={item.href} tone="onDark" className={styles["footer-link-column__link"]} size="xl">
              {item.label}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
