import { Suspense } from "react";
import type { Metadata } from "next";

import { AdminLoginPage } from "@/views/admin-login";

export const metadata: Metadata = {
  title: "Вход — админ-панель",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AdminLoginPage />
    </Suspense>
  );
}
