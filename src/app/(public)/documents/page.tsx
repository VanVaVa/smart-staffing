import type { Metadata } from "next";

import { documentsPage } from "@/entities/landing";
import { DocumentsPage } from "@/views/documents";

export const metadata: Metadata = {
  title: "Документы — СмартСтаффинг",
  description:
    "Юридические документы, сведения о платформе и свидетельства СмартСтаффинг.",
};

export default function Page() {
  return <DocumentsPage content={documentsPage} />;
}
