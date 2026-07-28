"use client";

import { Container } from "@/shared/ui/container";
import { Logo } from "@/shared/ui/logo";

import { useHeaderOnDarkBackdrop } from "../model/use-header-on-dark-backdrop";

import { HeaderActions } from "./header-actions";
import { HeaderNav } from "./header-nav";
import styles from "./Header.module.css";

export function Header() {
  const onDarkBackdrop = useHeaderOnDarkBackdrop();

  const headerClass = [
    styles.header,
    onDarkBackdrop ? styles["header--on-dark-backdrop"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass}>
      <Container className={styles.header__container}>
        <div className={styles.header__inner}>
          <div className={styles.header__start}>
            <Logo light={onDarkBackdrop} />
            <HeaderNav onDarkBackdrop={onDarkBackdrop} />
          </div>
          <HeaderActions onDarkBackdrop={onDarkBackdrop} />
        </div>
      </Container>
    </header>
  );
}
