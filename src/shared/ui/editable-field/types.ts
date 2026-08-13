export type LandingBlockLike = {
  id: string;
  order: number;
  type: string;
  props: unknown;
};

export type AdminBlockEditContextValue<TBlock extends LandingBlockLike = LandingBlockLike> = {
  block: TBlock;
  updateField: (path: string, value: unknown) => void;
  addArrayItem: (arrayPath: string, collectionKey: string) => void;
  removeArrayItem: (arrayPath: string, index: number) => void;
};
