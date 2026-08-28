import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const B2B_DOCS_BASE = "https://ru.b2bcloud.com/docs";

const DOCUMENTS = [
  {
    slug: "service-agreement",
    sourceFile: "Договор_услуг_В2ВС_оферта_v_24_06_2026.pdf",
  },
  {
    slug: "license-agreement",
    sourceFile: "Лицензионное_соглашение_В2ВС_v_29_06_2026.pdf",
  },
  {
    slug: "terms-of-use",
    sourceFile: "Пользовательское_соглашение_В2ВС_v_24_06_2026.pdf",
  },
  {
    slug: "platform-privacy-policy",
    sourceFile: "Политика_конфиденциальности_В2ВС_v_24_06_2026.pdf",
  },
  {
    slug: "platform-features",
    sourceFile: "Функциональные характеристики B2BCloud.pdf",
  },
  {
    slug: "lifecycle-maintenance",
    sourceFile: "Инструкция по поддержанию.pdf",
  },
  {
    slug: "installation-guide",
    sourceFile: "Инструкция по установке.pdf",
  },
  {
    slug: "user-guide",
    sourceFile: "Руководство пользователя B2BCloud.pdf",
  },
] as const;

const OUTPUT_DIR = path.join(
  process.cwd(),
  "public",
  "landing",
  "documents",
);

async function downloadPdf(sourceFile: string, outputPath: string) {
  const url = `${B2B_DOCS_BASE}/${encodeURIComponent(sourceFile)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: HTTP ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/pdf")) {
    throw new Error(
      `Expected PDF from ${url}, got content-type: ${contentType}`,
    );
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(outputPath, buffer);
  return buffer.length;
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  for (const document of DOCUMENTS) {
    const outputPath = path.join(OUTPUT_DIR, `${document.slug}.pdf`);
    const size = await downloadPdf(document.sourceFile, outputPath);
    console.log(`Saved ${document.slug}.pdf (${size} bytes)`);
  }

  console.log(`Synced ${DOCUMENTS.length} documents to ${OUTPUT_DIR}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
