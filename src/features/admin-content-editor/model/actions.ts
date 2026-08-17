"use server";

import { refresh } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getAdminSection } from "@/entities/landing";
import {
  createAdminSectionItem,
  deleteAdminSectionItem,
  moveAdminSectionItem,
  saveAdminSectionItem,
  saveAdminSectionValues,
} from "@/entities/landing/server";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/shared/lib/admin-session";
import type { AdminValues } from "@/shared/ui/admin-form";

export type AdminActionState = {
  error: string | null;
  savedAt: number | null;
};

async function requireAdminSession(): Promise<void> {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  const session = token ? await verifyAdminSessionToken(token) : null;
  if (!session) {
    redirect("/admin/login");
  }
}

async function requireCollectionSection(sectionKey: string) {
  await requireAdminSession();
  const section = getAdminSection(sectionKey);
  if (!section || section.mode !== "collection") {
    throw new Error(`Раздел "${sectionKey}" не найден`);
  }
  return section;
}

function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Не удалось сохранить изменения";
}

export async function saveSingletonAction(
  sectionKey: string,
  values: AdminValues,
): Promise<AdminActionState> {
  await requireAdminSession();
  const section = getAdminSection(sectionKey);
  if (!section || section.mode !== "singleton") {
    return { error: `Раздел "${sectionKey}" не найден`, savedAt: null };
  }

  try {
    await saveAdminSectionValues(section, values);
    refresh();
    return { error: null, savedAt: Date.now() };
  } catch (error) {
    return { error: toErrorMessage(error), savedAt: null };
  }
}

export async function saveItemAction(
  sectionKey: string,
  itemId: string | null,
  values: AdminValues,
): Promise<AdminActionState & { itemId: string | null }> {
  const section = await requireCollectionSection(sectionKey);

  try {
    const nextId =
      itemId === null
        ? await createAdminSectionItem(section, values)
        : await saveAdminSectionItem(section, itemId, values);
    refresh();
    return { error: null, savedAt: Date.now(), itemId: nextId };
  } catch (error) {
    return { error: toErrorMessage(error), savedAt: null, itemId };
  }
}

export async function deleteItemAction(
  sectionKey: string,
  itemId: string,
): Promise<void> {
  const section = await requireCollectionSection(sectionKey);
  await deleteAdminSectionItem(section, itemId);
  redirect(`/admin/content/${sectionKey}`);
}

export async function moveItemAction(
  sectionKey: string,
  itemId: string,
  direction: "up" | "down",
): Promise<void> {
  const section = await requireCollectionSection(sectionKey);
  await moveAdminSectionItem(section, itemId, direction);
  refresh();
}
