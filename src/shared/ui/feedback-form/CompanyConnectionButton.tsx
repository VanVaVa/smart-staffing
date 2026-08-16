"use client";

import type { ComponentProps } from "react";
import { useRouter } from "next/navigation";

import { useMediaQuery } from "@/shared/lib/use-media-query";
import { Button } from "@/shared/ui/button";

import { useFeedbackFormSuccessModal } from "./FeedbackFormSuccessModalProvider";

export const COMPANY_CONNECTION_PATH = "/connect";

const COMPACT_VIEWPORT = "(max-width: 992px)";

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
  const router = useRouter();
  const compactViewport = useMediaQuery(COMPACT_VIEWPORT);
  const { openCompanyConnectionModal } = useFeedbackFormSuccessModal();

  if (!interactive) {
    return <Button {...props} type="button" />;
  }

  return (
    <Button
      {...props}
      onClick={() =>
        compactViewport
          ? router.push(COMPANY_CONNECTION_PATH)
          : openCompanyConnectionModal()
      }
    />
  );
}
