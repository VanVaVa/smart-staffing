"use client";

import { useMemo, useRef } from "react";

import type { LandingBlockLike } from "@/shared/ui/editable-field";
import {
  AdminBlockEditProvider,
  addBlockArrayItem,
  removeBlockArrayItem,
  updateBlockField,
} from "@/shared/ui/editable-field";

import styles from "./PageStructureMenu.module.css";

type PageStructureMenuProps<TBlock extends LandingBlockLike, TBlockType extends string> = {
  blocks: TBlock[];
  blockTypeLabels: Record<TBlockType, string>;
  blockTypes: readonly TBlockType[];
  allowAddRemove?: boolean;
  onMoveUp: (blockId: string) => void;
  onMoveDown: (blockId: string) => void;
  onRemove: (blockId: string) => void;
  onAdd: (type: TBlockType, afterIndex: number) => void;
};

export function PageStructureMenu<TBlock extends LandingBlockLike, TBlockType extends string>({
  blocks,
  blockTypeLabels,
  blockTypes,
  allowAddRemove = true,
  onMoveUp,
  onMoveDown,
  onRemove,
  onAdd,
}: PageStructureMenuProps<TBlock, TBlockType>) {
  return (
    <div className={styles["page-structure-menu"]}>
      <details className={styles["page-structure-menu__details"]}>
        <summary className={styles["page-structure-menu__summary"]}>Блоки страницы</summary>
        <div className={styles["page-structure-menu__panel"]}>
          {blocks.map((block, index) => (
            <div key={block.id} className={styles["page-structure-menu__row"]}>
              <span>{blockTypeLabels[block.type as TBlockType] ?? block.type}</span>
              <div className={styles["page-structure-menu__actions"]}>
                <button type="button" disabled={index === 0} onClick={() => onMoveUp(block.id)}>
                  ↑
                </button>
                <button
                  type="button"
                  disabled={index >= blocks.length - 1}
                  onClick={() => onMoveDown(block.id)}
                >
                  ↓
                </button>
                {allowAddRemove ? (
                  <button
                    type="button"
                    onClick={() => {
                      const label =
                        blockTypeLabels[block.type as TBlockType] ?? block.type;
                      if (window.confirm(`Удалить блок «${label}»?`)) {
                        onRemove(block.id);
                      }
                    }}
                  >
                    ✕
                  </button>
                ) : null}
              </div>
            </div>
          ))}
          {allowAddRemove ? (
            <div className={styles["page-structure-menu__add"]}>
              {blockTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => onAdd(type, blocks.length - 1)}
                >
                  + {blockTypeLabels[type]}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </details>
    </div>
  );
}

type AdminInlineEditLayerProps<TBlock extends LandingBlockLike> = {
  block: TBlock;
  onUpdateBlock: (block: TBlock) => void;
  defaultCollectionItem: (collectionKey: string) => unknown;
  prepareCollectionItem?: (
    block: TBlock,
    arrayPath: string,
    collectionKey: string,
    item: unknown,
  ) => unknown;
  children: React.ReactNode;
};

export function AdminInlineEditLayer<TBlock extends LandingBlockLike>({
  block,
  onUpdateBlock,
  defaultCollectionItem,
  prepareCollectionItem,
  children,
}: AdminInlineEditLayerProps<TBlock>) {
  const blockRef = useRef(block);
  blockRef.current = block;

  const blockValue = useMemo(
    () => ({
      block,
      updateField: (path: string, value: unknown) => {
        let nextValue = value;
        if (path.endsWith(".tags") && typeof value === "string") {
          nextValue = value
            .split("\n")
            .map((tag) => tag.trim())
            .filter(Boolean);
        }
        onUpdateBlock(updateBlockField(blockRef.current, path, nextValue));
      },
      addArrayItem: (arrayPath: string, collectionKey: string) => {
        let item = defaultCollectionItem(collectionKey);
        if (prepareCollectionItem) {
          item = prepareCollectionItem(blockRef.current, arrayPath, collectionKey, item);
        }
        onUpdateBlock(addBlockArrayItem(blockRef.current, arrayPath, item));
      },
      removeArrayItem: (arrayPath: string, index: number) => {
        onUpdateBlock(removeBlockArrayItem(blockRef.current, arrayPath, index));
      },
    }),
    [block, defaultCollectionItem, onUpdateBlock, prepareCollectionItem],
  );

  return (
    <AdminBlockEditProvider value={blockValue}>{children}</AdminBlockEditProvider>
  );
}
