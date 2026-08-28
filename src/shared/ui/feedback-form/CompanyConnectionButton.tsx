"use client";

import type { ComponentProps } from "react";

import { contactsHref, scrollToContactsOnPage } from "@/shared/lib/scroll-to-contacts";
import { Button } from "@/shared/ui/button";

type CompanyConnectionButtonProps = Omit<
  ComponentProps<typeof Button>,
  "href" | "onClick" | "type"
> & {
  interactive?: boolean;
};

export function CompanyConnectionButton({
  interactive = true,
  ...props
}: CompanyConnectionButtonProps) {
  if (!interactive) {
    return <Button {...props} type="button" />;
  }

  return (
    <Button
      {...props}
      href={contactsHref}
      onClick={scrollToContactsOnPage}
    />
  );
}
