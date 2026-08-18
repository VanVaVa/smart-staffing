"use client";

import { useState, type PointerEvent } from "react";
import { usePathname } from "next/navigation";

import { Link } from "@/shared/ui";

import { isNavHrefActive } from "../../lib/is-nav-href-active";
import styles from "./HeaderNav.module.css";

type HeaderNavDropdownChild = {
  label: string;
  href: string;
};

type HeaderNavDropdownProps = {
  label: string;
  href: string;
  items: readonly HeaderNavDropdownChild[];
};

export function HeaderNavDropdown({ label, href, items }: HeaderNavDropdownProps) {
  const pathname = usePathname();
  const [openedOnPathname, setOpenedOnPathname] = useState<string | null>(null);
  const open = openedOnPathname === pathname;
  const current = isNavHrefActive(pathname, href);

  const setOpen = (nextOpen: boolean) => {
    setOpenedOnPathname(nextOpen ? pathname : null);
  };

  const hoverOpen = (nextOpen: boolean) => (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") {
      setOpen(nextOpen);
    }
  };

  const dropdownClass = [
    styles["header-nav__dropdown"],
    open ? styles["header-nav__dropdown--open"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={dropdownClass}
      onPointerEnter={hoverOpen(true)}
      onPointerLeave={hoverOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        className={[
          styles["header-nav__link"],
          styles["header-nav__trigger"],
          current ? styles["header-nav__link--current"] : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {label}
        <svg
          className={styles["header-nav__chevron"]}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          aria-hidden
        >
          <path
            d="M3 4.5 6 7.5 9 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <ul className={styles["header-nav__dropdown-menu"]} role="menu">
        {items.map((child) => {
          const childCurrent = isNavHrefActive(pathname, child.href);

          return (
            <li key={child.href} role="none">
              <Link
                href={child.href}
                variant="nav"
                className={[
                  styles["header-nav__dropdown-item"],
                  childCurrent ? styles["header-nav__dropdown-item--current"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={childCurrent ? "page" : undefined}
              >
                {child.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
