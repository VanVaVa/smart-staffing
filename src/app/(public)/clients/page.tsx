import { redirect } from "next/navigation";

import { listVisibleClientsPages } from "@/entities/landing/server";

export default async function ClientsPage() {
  const pages = await listVisibleClientsPages();
  if (pages.length === 0) {
    redirect("/");
  }
  redirect(pages[0].href);
}
