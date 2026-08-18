"use client";

import { usePathname } from "next/navigation";

import { landingNav } from "@/entities/landing";
import { Link } from "@/shared/ui";

import { isNavHrefActive } from "../../lib/is-nav-href-active";
import { HeaderNavDropdown } from "./HeaderNavDropdown";
import styles from "./HeaderNav.module.css";

type HeaderNavProps = {
  onDarkBackdrop?: boolean;
};

export function HeaderNav({ onDarkBackdrop = false }: HeaderNavProps) {
  const pathname = usePathname();
  const navClass = [
    styles["header-nav"],
    onDarkBackdrop ? styles["header-nav--on-dark-backdrop"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={navClass} aria-label="Основная навигация">
      {landingNav.map((item) => {
        if ("children" in item) {
          return (
            <HeaderNavDropdown
              key={item.label}
              label={item.label}
              href={item.href}
              items={item.children}
            />
          );
        }

        const current = isNavHrefActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            variant="nav"
            className={[
              styles["header-nav__link"],
              current ? styles["header-nav__link--current"] : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-current={current ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
