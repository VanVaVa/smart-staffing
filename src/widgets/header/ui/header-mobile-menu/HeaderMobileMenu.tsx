"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useCallback, useEffect, useId, useRef, useState } from "react";

import { landingNav } from "@/entities/landing";
import { routes } from "@/shared/config";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Logo } from "@/shared/ui/logo";
import linkStyles from "@/shared/ui/link/Link.module.css";

import { isNavHrefActive } from "../../lib/is-nav-href-active";
import { useElementOnDarkBackdrop } from "../../model/use-element-on-dark-backdrop";
import navStyles from "../header-nav/HeaderNav.module.css";
import styles from "./HeaderMobileMenu.module.css";

type HeaderMobileMenuProps = {
  onOpenChange?: (open: boolean) => void;
};

const menuLinkClassName = `${linkStyles.link} ${linkStyles["link--nav"]} ${navStyles["header-nav__dropdown-item"]}`;

function getMenuItemClassName(current: boolean) {
  return [
    menuLinkClassName,
    current ? navStyles["header-nav__dropdown-item--current"] : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function HeaderMobileMenu({ onOpenChange }: HeaderMobileMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const ghostOnDarkBackdrop = useElementOnDarkBackdrop(ghostRef);
  const actionsOnDarkBackdrop = useElementOnDarkBackdrop(actionsRef);

  const setMenuOpen = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [onOpenChange],
  );

  const close = useCallback(() => {
    setMenuOpen(false);
  }, [setMenuOpen]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || menuRef.current?.contains(target)) {
        return;
      }
      close();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [close, open]);

  const signUpVariant = open ? "dark" : actionsOnDarkBackdrop ? "light" : "dark";
  const topBarTransform = open ? "rotate(45 8 6) translate(0 5)" : undefined;
  const middleBarOpacity = open ? 0 : 1;
  const bottomBarTransform = open ? "rotate(-45 8 6) translate(0 -5)" : undefined;

  return (
    <div
      ref={menuRef}
      className={[
        styles["header-mobile-menu"],
        open ? styles["header-mobile-menu--open"] : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles["header-mobile-menu__bar"]}>
        <span className={styles["header-mobile-menu__logo"]}>
          <Logo />
        </span>
        <div ref={actionsRef} className={styles["header-mobile-menu__actions"]}>
          <span
            ref={ghostRef}
            className={[
              styles["header-mobile-menu__ghost-wrap"],
              !open && ghostOnDarkBackdrop
                ? styles["header-mobile-menu__ghost-wrap--on-dark-backdrop"]
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <Button href={routes.login} variant="ghost" className={styles["header-mobile-menu__ghost"]}>
              Вход
            </Button>
          </span>
          <span className={styles["header-mobile-menu__sign-up-wrap"]}>
            <Button
              href={routes.signUp}
              size="md"
              variant={signUpVariant}
              className={styles["header-mobile-menu__sign-up"]}
            >
              Регистрация
            </Button>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className={[
              styles["header-mobile-menu__toggle"],
              !open && actionsOnDarkBackdrop
                ? styles["header-mobile-menu__toggle--on-dark-backdrop"]
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMenuOpen(!open)}
          >
            <svg
              className={styles["header-mobile-menu__toggle-icon"]}
              width="16"
              height="12"
              viewBox="0 0 16 12"
              aria-hidden
            >
              <g
                className={styles["header-mobile-menu__toggle-bar"]}
                transform={topBarTransform}
              >
                <line x1="0" y1="1" x2="16" y2="1" />
              </g>
              <g className={styles["header-mobile-menu__toggle-bar"]} opacity={middleBarOpacity}>
                <line x1="0" y1="6" x2="16" y2="6" />
              </g>
              <g
                className={styles["header-mobile-menu__toggle-bar"]}
                transform={bottomBarTransform}
              >
                <line x1="0" y1="11" x2="16" y2="11" />
              </g>
            </svg>
          </button>
        </div>
      </div>
      <ul
        id={panelId}
        className={`${navStyles["header-nav__dropdown-menu"]} ${styles["header-mobile-menu__panel"]}`}
        role="menu"
        hidden={!open}
      >
        {landingNav.map((item) => {
          if ("children" in item) {
            return (
              <Fragment key={item.label}>
                <li role="none">
                  <span className={styles["header-mobile-menu__group-title"]}>{item.label}</span>
                </li>
                {item.children.map((child) => {
                  const current = isNavHrefActive(pathname, child.href);

                  return (
                    <li key={child.href} role="none">
                      <NextLink
                        href={child.href}
                        className={getMenuItemClassName(current)}
                        aria-current={current ? "page" : undefined}
                        onClick={close}
                      >
                        {child.label}
                      </NextLink>
                    </li>
                  );
                })}
              </Fragment>
            );
          }

          const current = isNavHrefActive(pathname, item.href);

          return (
            <li key={item.href} role="none">
              <NextLink
                href={item.href}
                className={getMenuItemClassName(current)}
                aria-current={current ? "page" : undefined}
                onClick={close}
              >
                {item.label}
                {"badge" in item ? (
                  <Badge variant="new" className={navStyles["header-nav__badge"]}>
                    {item.badge}
                  </Badge>
                ) : null}
              </NextLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
