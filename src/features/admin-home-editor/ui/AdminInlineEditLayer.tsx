"use client";

import { useMemo, useRef } from "react";

import type { HomeBlock, HomeBlockType } from "@/entities/landing";
import {
  defaultCollectionItem,
  HOME_BLOCK_TYPE_LABELS,
  HOME_BLOCK_TYPES,
} from "@/entities/landing";
import type { HomeCollectionKey } from "@/entities/landing/model/home-blocks";
import {
  AdminBlockEditProvider,
  addHomeBlockArrayItem,
  removeHomeBlockArrayItem,
  updateHomeBlockField,
} from "@/shared/ui/editable-field";

import styles from "./PageStructureMenu.module.css";

type PageStructureMenuProps = {
  blocks: HomeBlock[];
  onMoveUp: (blockId: string) => void;
  onMoveDown: (blockId: string) => void;
  onRemove: (blockId: string) => void;
  onAdd: (type: HomeBlockType, afterIndex: number) => void;
};

export function PageStructureMenu({
  blocks,
  onMoveUp,
  onMoveDown,
  onRemove,
  onAdd,
}: PageStructureMenuProps) {
  return (
    <div className={styles["page-structure-menu"]}>
      <details className={styles["page-structure-menu__details"]}>
        <summary className={styles["page-structure-menu__summary"]}>Блоки страницы</summary>
        <div className={styles["page-structure-menu__panel"]}>
          {blocks.map((block, index) => (
            <div key={block.id} className={styles["page-structure-menu__row"]}>
              <span>{HOME_BLOCK_TYPE_LABELS[block.type]}</span>
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
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Удалить блок «${HOME_BLOCK_TYPE_LABELS[block.type]}»?`)) {
                      onRemove(block.id);
                    }
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          <div className={styles["page-structure-menu__add"]}>
            {HOME_BLOCK_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onAdd(type, blocks.length - 1)}
              >
                + {HOME_BLOCK_TYPE_LABELS[type]}
              </button>
            ))}
          </div>
        </div>
      </details>
    </div>
  );
}

type AdminInlineEditLayerProps = {
  block: HomeBlock;
  onUpdateBlock: (block: HomeBlock) => void;
  children: React.ReactNode;
};

export function AdminInlineEditLayer({
  block,
  onUpdateBlock,
  children,
}: AdminInlineEditLayerProps) {
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
        onUpdateBlock(updateHomeBlockField(blockRef.current, path, nextValue));
      },
      addArrayItem: (arrayPath: string, collectionKey: HomeCollectionKey) => {
        let item = defaultCollectionItem(collectionKey);
        const current = blockRef.current;
        if (collectionKey === "rows" && current.type === "features") {
          const nextIndex = current.props.rows.length;
          item = {
            ...(item as Record<string, unknown>),
            reversed: nextIndex % 2 === 1,
          };
        }
        onUpdateBlock(addHomeBlockArrayItem(current, arrayPath, item));
      },
      removeArrayItem: (arrayPath: string, index: number) => {
        onUpdateBlock(removeHomeBlockArrayItem(blockRef.current, arrayPath, index));
      },
    }),
    [block, onUpdateBlock],
  );

  return (
    <AdminBlockEditProvider value={blockValue}>{children}</AdminBlockEditProvider>
  );
}
