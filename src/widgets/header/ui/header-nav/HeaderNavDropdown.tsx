"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { Link } from "@/shared/ui";

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

  const setOpen = (nextOpen: boolean) => {
    setOpenedOnPathname(nextOpen ? pathname : null);
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
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <Link
        href={href}
        variant="nav"
        className={styles["header-nav__link"]}
        aria-haspopup="menu"
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
      </Link>
      <ul className={styles["header-nav__dropdown-menu"]} role="menu">
        {items.map((child) => (
          <li key={child.href} role="none">
            <Link href={child.href} variant="nav" className={styles["header-nav__dropdown-item"]}>
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
