import type { MouseEvent } from "react";

export const contactsHref = "/#contacts";

export function scrollToContactsOnPage(event: MouseEvent<HTMLAnchorElement>) {
  const section = document.getElementById("contacts");
  if (!section) {
    return;
  }

  event.preventDefault();
  section.scrollIntoView();
}
