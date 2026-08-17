import "server-only";

import type { AdminValues } from "@/shared/ui/admin-form";

import {
  DOCUMENTS_CATEGORIES_SECTION_KEY,
  type AdminCollectionSection,
  type AdminSingletonSection,
} from "../model/admin-sections";
import {
  getLandingPageContent,
  validateAndSaveLandingPageBlocks,
} from "../lib/get-landing-page-content";
import {
  createMediaArticle,
  deleteMediaArticle,
  getMediaArticleProps,
  listMediaArticleProps,
  saveMediaArticleProps,
} from "../lib/get-media-articles";
import { syncDocumentPages } from "../lib/sync-document-pages";

export type AdminSectionItem = {
  id: string;
  title: string;
  meta: string;
};

type BlockStorage = {
  pageSlug: string;
  blockType: string;
  path: readonly string[];
};

type BlockRecord = {
  id: string;
  order: number;
  type: string;
  props: unknown;
};

function asValues(value: unknown): AdminValues {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as AdminValues)
    : {};
}

function asItems(value: unknown): AdminValues[] {
  return Array.isArray(value) ? value.map(asValues) : [];
}

function readPath(source: unknown, path: readonly string[]): unknown {
  return path.reduce<unknown>(
    (current, key) => (current === undefined ? undefined : asValues(current)[key]),
    source,
  );
}

function writePath(source: unknown, path: readonly string[], value: unknown): unknown {
  if (path.length === 0) {
    return value;
  }
  const [key, ...rest] = path;
  const current = asValues(source);
  return { ...current, [key]: writePath(current[key], rest, value) };
}

async function readBlockPath(storage: BlockStorage): Promise<unknown> {
  const { blocks } = await getLandingPageContent(storage.pageSlug);
  const block = (blocks as BlockRecord[]).find(
    (item) => item.type === storage.blockType,
  );
  if (!block) {
    throw new Error(
      `Блок "${storage.blockType}" не найден на странице "${storage.pageSlug}"`,
    );
  }
  return readPath(block.props, storage.path);
}

async function writeBlockPath(storage: BlockStorage, value: unknown): Promise<void> {
  const { blocks } = await getLandingPageContent(storage.pageSlug);
  const records = blocks as BlockRecord[];
  const block = records.find((item) => item.type === storage.blockType);
  if (!block) {
    throw new Error(
      `Блок "${storage.blockType}" не найден на странице "${storage.pageSlug}"`,
    );
  }

  await validateAndSaveLandingPageBlocks(
    storage.pageSlug,
    records.map((item) =>
      item === block
        ? { ...item, props: writePath(item.props, storage.path, value) }
        : item,
    ),
  );
}

function collectionStorage(section: AdminCollectionSection): BlockStorage {
  if (section.storage.kind !== "blockPath") {
    throw new Error(`Раздел "${section.key}" не хранится в блоке страницы`);
  }
  return section.storage;
}

async function readCollection(section: AdminCollectionSection): Promise<AdminValues[]> {
  if (section.storage.kind === "articles") {
    return listMediaArticleProps() as Promise<AdminValues[]>;
  }
  return asItems(await readBlockPath(section.storage));
}

async function writeCollection(
  section: AdminCollectionSection,
  items: AdminValues[],
): Promise<void> {
  await writeBlockPath(collectionStorage(section), items);
  if (section.key === DOCUMENTS_CATEGORIES_SECTION_KEY) {
    await syncDocumentPages();
  }
}

function toFormValues(section: AdminCollectionSection, item: AdminValues): AdminValues {
  return section.toForm ? section.toForm(item) : item;
}

function toStoredValues(
  section: AdminCollectionSection,
  existing: AdminValues,
  values: AdminValues,
): AdminValues {
  const merged = { ...existing, ...values };
  return section.fromForm ? section.fromForm(merged) : merged;
}

export function isReorderableSection(section: AdminCollectionSection): boolean {
  return section.storage.kind === "blockPath";
}

export async function listAdminSectionItems(
  section: AdminCollectionSection,
): Promise<AdminSectionItem[]> {
  const items = await readCollection(section);
  return items.map((item, index) => {
    const values = toFormValues(section, item);
    return {
      id: section.storage.kind === "articles" ? String(item.slug) : String(index),
      title: section.itemTitle(values, index) || `${section.addLabel} ${index + 1}`,
      meta: section.itemMeta?.(values) ?? "",
    };
  });
}

export async function countAdminSectionItems(
  section: AdminCollectionSection,
): Promise<number> {
  return (await readCollection(section)).length;
}

export async function readAdminSectionItem(
  section: AdminCollectionSection,
  id: string,
): Promise<AdminValues | null> {
  if (section.storage.kind === "articles") {
    const props = await getMediaArticleProps(id);
    return props ? toFormValues(section, props as unknown as AdminValues) : null;
  }

  const items = await readCollection(section);
  const item = items[Number(id)];
  return item ? toFormValues(section, item) : null;
}

export async function createAdminSectionItem(
  section: AdminCollectionSection,
  values: AdminValues,
): Promise<string> {
  if (section.storage.kind === "articles") {
    const draft = await createMediaArticle();
    const existing = await getMediaArticleProps(draft.slug);
    return saveMediaArticleProps(
      draft.slug,
      toStoredValues(section, asValues(existing), values),
    );
  }

  const items = await readCollection(section);
  await writeCollection(section, [
    ...items,
    toStoredValues(section, section.createValues(), values),
  ]);
  return String(items.length);
}

export async function saveAdminSectionItem(
  section: AdminCollectionSection,
  id: string,
  values: AdminValues,
): Promise<string> {
  if (section.storage.kind === "articles") {
    const existing = await getMediaArticleProps(id);
    if (!existing) {
      throw new Error(`Статья "${id}" не найдена`);
    }
    return saveMediaArticleProps(id, toStoredValues(section, asValues(existing), values));
  }

  const items = await readCollection(section);
  const index = Number(id);
  if (!items[index]) {
    throw new Error("Элемент не найден");
  }

  await writeCollection(
    section,
    items.map((item, itemIndex) =>
      itemIndex === index ? toStoredValues(section, item, values) : item,
    ),
  );
  return id;
}

export async function deleteAdminSectionItem(
  section: AdminCollectionSection,
  id: string,
): Promise<void> {
  if (section.storage.kind === "articles") {
    await deleteMediaArticle(id);
    return;
  }

  const items = await readCollection(section);
  await writeCollection(
    section,
    items.filter((_, index) => index !== Number(id)),
  );
}

export async function moveAdminSectionItem(
  section: AdminCollectionSection,
  id: string,
  direction: "up" | "down",
): Promise<void> {
  const items = await readCollection(section);
  const from = Number(id);
  const to = direction === "up" ? from - 1 : from + 1;
  if (!items[from] || !items[to]) {
    return;
  }

  const next = [...items];
  next[from] = items[to];
  next[to] = items[from];
  await writeCollection(section, next);
}

export async function readAdminSectionValues(
  section: AdminSingletonSection,
): Promise<AdminValues> {
  return asValues(await readBlockPath(section.storage));
}

export async function saveAdminSectionValues(
  section: AdminSingletonSection,
  values: AdminValues,
): Promise<void> {
  const existing = await readAdminSectionValues(section);
  await writeBlockPath(section.storage, { ...existing, ...values });
}
