"use client";

import { useCallback, useMemo, useState } from "react";

import type { LandingBlockLike } from "@/shared/ui/editable-field";

function cloneBlocks<TBlock extends LandingBlockLike>(blocks: TBlock[]): TBlock[] {
  return structuredClone(blocks) as TBlock[];
}

function normalizeOrder<TBlock extends LandingBlockLike>(blocks: TBlock[]): TBlock[] {
  return blocks.map((block, index) => ({ ...block, order: index }));
}

export type LandingPageDraftConfig<TBlock extends LandingBlockLike, TBlockType extends string> = {
  slug: string;
  blockTypes: readonly TBlockType[];
  defaultBlockProps: (type: TBlockType) => TBlock["props"];
};

export function useLandingPageDraft<
  TBlock extends LandingBlockLike,
  TBlockType extends string,
>(
  initialBlocks: TBlock[],
  config: LandingPageDraftConfig<TBlock, TBlockType>,
) {
  const [savedBlocks, setSavedBlocks] = useState(initialBlocks);
  const [blocks, setBlocks] = useState(initialBlocks);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const isDirty = useMemo(
    () => JSON.stringify(blocks) !== JSON.stringify(savedBlocks),
    [blocks, savedBlocks],
  );

  const updateBlock = useCallback((blockId: string, next: TBlock) => {
    setBlocks((current) =>
      current.map((block) => (block.id === blockId ? next : block)),
    );
  }, []);

  const moveBlock = useCallback((blockId: string, direction: "up" | "down") => {
    setBlocks((current) => {
      const index = current.findIndex((block) => block.id === blockId);
      if (index === -1) return current;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= current.length) return current;
      const next = cloneBlocks(current);
      const [item] = next.splice(index, 1);
      next.splice(targetIndex, 0, item);
      return normalizeOrder(next);
    });
  }, []);

  const removeBlock = useCallback((blockId: string) => {
    setBlocks((current) =>
      normalizeOrder(current.filter((block) => block.id !== blockId)),
    );
  }, []);

  const addBlock = useCallback(
    (type: TBlockType, afterIndex: number) => {
      const id = crypto.randomUUID();
      const props = config.defaultBlockProps(type);
      setBlocks((current) => {
        const next = cloneBlocks(current);
        const insertAt = Math.min(afterIndex + 1, next.length);
        const block = {
          id,
          order: insertAt,
          type,
          props,
        } as unknown as TBlock;
        next.splice(insertAt, 0, block);
        return normalizeOrder(next);
      });
      return id;
    },
    [config],
  );

  const save = useCallback(async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const payload = blocks.map((block, order) => ({
        id: block.id,
        type: block.type,
        order,
        props: block.props,
      }));

      const response = await fetch(`/api/admin/pages/${config.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocks: payload }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Save failed");
      }

      const data = (await response.json()) as { blocks: TBlock[] };
      setSavedBlocks(data.blocks);
      setBlocks(data.blocks);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }, [blocks, config.slug]);

  return {
    blocks,
    isDirty,
    saving,
    saveError,
    updateBlock,
    moveBlock,
    removeBlock,
    addBlock,
    save,
  };
}

export function useHomePageDraft<TBlock extends LandingBlockLike>(
  initialBlocks: TBlock[],
  config: LandingPageDraftConfig<TBlock, string>,
) {
  return useLandingPageDraft(initialBlocks, config);
}
