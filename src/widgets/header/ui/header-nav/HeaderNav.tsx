"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";

import { landingNav } from "@/entities/landing";
import { Badge, Link } from "@/shared/ui";

import { isNavHrefActive } from "../../lib/is-nav-href-active";
import { useNavLinksOnDarkBackdrop } from "../../model/use-nav-links-on-dark-backdrop";
import { HeaderNavDropdown } from "./HeaderNavDropdown";
import styles from "./HeaderNav.module.css";

function getNavLinkClassName(current: boolean, onDarkBackdrop: boolean) {
  return [
    styles["header-nav__link"],
    current ? styles["header-nav__link--current"] : "",
    onDarkBackdrop ? styles["header-nav__link--on-dark-backdrop"] : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function HeaderNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const linkTones = useNavLinksOnDarkBackdrop(navRef);

  return (
    <nav ref={navRef} className={styles["header-nav"]} aria-label="Основная навигация">
      {landingNav.map((item) => {
        if ("children" in item) {
          return (
            <HeaderNavDropdown
              key={item.label}
              label={item.label}
              href={item.href}
              items={item.children}
              onDarkBackdrop={linkTones[item.href] ?? false}
            />
          );
        }

        const current = isNavHrefActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            variant="nav"
            data-header-nav-link={item.href}
            className={getNavLinkClassName(current, linkTones[item.href] ?? false)}
            aria-current={current ? "page" : undefined}
          >
            {item.label}
            {"badge" in item ? (
              <Badge variant="new" className={styles["header-nav__badge"]}>
                {item.badge}
              </Badge>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
