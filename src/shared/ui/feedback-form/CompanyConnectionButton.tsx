"use client";

import type { ComponentProps } from "react";

import { Button } from "@/shared/ui/button";

import { useFeedbackFormSuccessModal } from "./FeedbackFormSuccessModalProvider";

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
  const { openCompanyConnectionModal } = useFeedbackFormSuccessModal();

  if (!interactive) {
    return <Button {...props} type="button" />;
  }

  return <Button {...props} onClick={openCompanyConnectionModal} />;
}
