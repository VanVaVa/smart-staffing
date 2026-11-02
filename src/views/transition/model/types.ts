export type TransitionIconName =
  | "users"
  | "wallet"
  | "check"
  | "shield"
  | "lock"
  | "userCheck"
  | "doc"
  | "clock";

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
};

export type TransitionFactsContent = {
  title: string;
  lead: string;
  items: { value: string; label: string; text: string; sources: { label: string; href: string }[] }[];
};

export type TransitionCycleContent = {
  title: string;
  text: string;
  label: string;
  nodes: { title: string; text: string }[];
  loop: string;
};
