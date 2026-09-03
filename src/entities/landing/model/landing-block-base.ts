export type LandingPageMeta = {
  title: string;
  description: string;
  hidden?: boolean;
  navLabel?: string;
};

export type LandingBlockBase<TType extends string, TProps> = {
  id: string;
  order: number;
  type: TType;
  props: TProps;
};

export type LandingPageContent<TBlock> = {
  pageId: string;
  slug: string;
  title: string;
  meta: LandingPageMeta | null;
  blocks: TBlock[];
};

export type SaveBlockPayload = {
  id?: string;
  type: string;
  order: number;
  props: unknown;
};

export type LandingPageBlockSchema<TBlockType extends string> = {
  blockTypes: readonly TBlockType[];
  blockTypeLabels: Record<TBlockType, string>;
  isBlockType: (value: string) => value is TBlockType;
  parseBlockProps: (type: TBlockType, props: unknown) => unknown | null;
  parseBlock: (input: {
    id: string;
    order: number;
    type: string;
    props: unknown;
  }) => { id: string; order: number; type: TBlockType; props: unknown } | null;
  defaultBlockProps: (type: TBlockType) => unknown;
  defaultCollectionItem: (collectionKey: string) => unknown;
};
