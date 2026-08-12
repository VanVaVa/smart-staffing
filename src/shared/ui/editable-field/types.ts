import type { HomeBlock } from "@/entities/landing/model/home-blocks";
import type { HomeCollectionKey } from "@/entities/landing/model/home-blocks";

export type AdminBlockEditContextValue = {
  block: HomeBlock;
  updateField: (path: string, value: unknown) => void;
  addArrayItem: (arrayPath: string, collectionKey: HomeCollectionKey) => void;
  removeArrayItem: (arrayPath: string, index: number) => void;
};
