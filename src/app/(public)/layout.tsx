import type { ReactNode } from "react";

import { getFooterContent } from "@/entities/landing/server";
import { PublicPageShell } from "@/widgets/public-page-shell";

type PublicLayoutProps = {
  children: ReactNode;
};

export default async function PublicLayout({ children }: PublicLayoutProps) {
  const footerContent = await getFooterContent();

  return <PublicPageShell footerContent={footerContent}>{children}</PublicPageShell>;
}
