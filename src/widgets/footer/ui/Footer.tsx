import type { FooterBlockProps } from "@/entities/landing/model/footer-blocks";

import { FooterAbout } from "./footer-about";
import { FooterBottom } from "./footer-bottom";
import { FooterContacts } from "./footer-contacts";
import { FooterLinkColumn } from "./footer-link-column";
import styles from "./Footer.module.css";

type FooterProps = {
  content: FooterBlockProps;
};

export function Footer({ content }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__inset}>
          <FooterAbout />
          <div className={styles.footer__columns}>
            <FooterLinkColumn
              title={content.menuTitle}
              items={content.menu}
            />
            <FooterLinkColumn
              title={content.solutionsTitle}
              items={content.solutions}
            />
            <FooterContacts contactsTitle={content.contactsTitle} contacts={content.contacts} />
          </div>
        </div>
      </div>
      <div className={styles.footer__inset}>
        <FooterBottom legal={content.legal} copyright={content.copyright} />
      </div>
    </footer>
  );
}
