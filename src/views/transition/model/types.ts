export type TransitionIconName =
  | "users"
  | "wallet"
  | "check"
  | "shield"
  | "lock"
  | "userCheck"
  | "doc"
  | "clock"
  | "info";

export type TransitionAccentText = {
  before?: string;
  accent: string;
  after?: string;
};

export type TransitionHeroContent = {
  title: string;
  subtitle: TransitionAccentText;
  cta: string;
};

export type TransitionTrackContent = {
  title: string;
  lead: TransitionAccentText;
  stats: { value: string; text: string }[];
  networkLines: string[];
};

export type TransitionStep = {
  number: string;
  title: string;
  text: string;
  imageSrc: string;
};

export type TransitionQuestion = {
  icon: TransitionIconName;
  question: string;
  answer: string;
  open?: boolean;
};

export type TransitionFactsContent = {
  title: string;
  lead: string;
  items: { value: string; label: string; text: string; sources: { label: string; href: string }[] }[];
};

export type TransitionCycleContent = {
  title: string;
  subtitle: TransitionAccentText;
  label: string;
  nodes: { title: string; text: string }[];
  loop: string;
};

export type TransitionPerk = {
  title: string;
  text: string;
};
