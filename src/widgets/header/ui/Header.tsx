"use client";

import { useState } from "react";

import { Container } from "@/shared/ui/container";
import { Logo } from "@/shared/ui/logo";

import { HeaderActions } from "./header-actions";
import { HeaderMobileMenu } from "./header-mobile-menu";
import { HeaderNav } from "./header-nav";
import styles from "./Header.module.css";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerClass = [
    styles.header,
    mobileMenuOpen ? styles["header--menu-open"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass}>
      <Container className={styles.header__container}>
        <div className={styles.header__inner}>
          <div className={styles.header__start}>
            <div className={styles.header__chrome}>
              <div className={styles.header__logo}>
                <Logo />
              </div>
              <div className={styles["header__desktop-nav"]}>
                <HeaderNav />
              </div>
            </div>
            <HeaderMobileMenu onOpenChange={setMobileMenuOpen} />
          </div>
          <div className={styles["header__desktop-actions"]}>
            <HeaderActions />
          </div>
        </div>
      </Container>
    </header>
  );
}
