"use client";

import type { ComponentProps } from "react";

import { routes } from "@/shared/config";
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

  return <Button {...props} href={routes.signUp} />;
}
