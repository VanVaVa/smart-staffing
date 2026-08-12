import type { ReactNode } from "react";

import { PublicPageShell } from "@/widgets/public-page-shell";

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return <PublicPageShell>{children}</PublicPageShell>;
}
