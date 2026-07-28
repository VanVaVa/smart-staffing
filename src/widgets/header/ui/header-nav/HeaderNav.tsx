import { landingNav } from "@/entities/landing";
import { Link } from "@/shared/ui";

import { HeaderNavDropdown } from "./HeaderNavDropdown";
import styles from "./HeaderNav.module.css";

type HeaderNavProps = {
  onDarkBackdrop?: boolean;
};

export function HeaderNav({ onDarkBackdrop = false }: HeaderNavProps) {
  const navClass = [
    styles["header-nav"],
    onDarkBackdrop ? styles["header-nav--on-dark-backdrop"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={navClass} aria-label="Основная навигация">
      {landingNav.map((item) =>
        "children" in item ? (
          <HeaderNavDropdown
            key={item.label}
            label={item.label}
            href={item.href}
            items={item.children}
          />
        ) : (
          <Link key={item.href} href={item.href} variant="nav" className={styles["header-nav__link"]}>
            {item.label}
          </Link>
        ),
      )}
    </nav>
  );
}
