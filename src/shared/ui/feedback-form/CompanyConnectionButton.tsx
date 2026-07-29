"use client";

import type { ComponentProps } from "react";

import { Button } from "@/shared/ui/button";

import { useFeedbackFormSuccessModal } from "./FeedbackFormSuccessModalProvider";

type CompanyConnectionButtonProps = Omit<
  ComponentProps<typeof Button>,
  "href" | "onClick" | "type"
>;

export function CompanyConnectionButton(
  props: CompanyConnectionButtonProps,
) {
  const { openCompanyConnectionModal } = useFeedbackFormSuccessModal();

  return <Button {...props} onClick={openCompanyConnectionModal} />;
}
