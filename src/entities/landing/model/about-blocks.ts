import {
  aboutBenefits,
  aboutCareerBook,
  aboutHistory,
  aboutIntro,
  aboutLeadership,
  aboutPartner,
  aboutSpotlight,
  aboutTrusted,
} from "./about-content";
import {
  cloneProps,
  isNumber,
  isRecord,
  isString,
  isStringArray,
  parseRecordArray,
} from "../lib/block-parse-utils";
import type { LandingBlockBase } from "./landing-block-base";

export const ABOUT_BLOCK_TYPES = [
  "intro",
  "spotlight",
  "history",
  "partner",
  "trusted",
  "benefits",
  "leadership",
  "careerBook",
] as const;

export type AboutBlockType = (typeof ABOUT_BLOCK_TYPES)[number];

export type AboutIntroBlockProps = typeof aboutIntro;
export type AboutSpotlightBlockProps = typeof aboutSpotlight;
export type AboutHistoryBlockProps = typeof aboutHistory;
export type AboutPartnerBlockProps = typeof aboutPartner;
export type AboutTrustedBlockProps = typeof aboutTrusted;
export type AboutBenefitsBlockProps = typeof aboutBenefits;
export type AboutLeadershipBlockProps = typeof aboutLeadership;
export type AboutCareerBookBlockProps = typeof aboutCareerBook;

export type AboutBlockPropsByType = {
  intro: AboutIntroBlockProps;
  spotlight: AboutSpotlightBlockProps;
  history: AboutHistoryBlockProps;
  partner: AboutPartnerBlockProps;
  trusted: AboutTrustedBlockProps;
  benefits: AboutBenefitsBlockProps;
  leadership: AboutLeadershipBlockProps;
  careerBook: AboutCareerBookBlockProps;
};

export type AboutBlock = {
  [K in AboutBlockType]: LandingBlockBase<K, AboutBlockPropsByType[K]>;
}[AboutBlockType];

export type AboutPageContent = {
  pageId: string;
  slug: string;
  title: string;
  meta: { title: string; description: string } | null;
  blocks: AboutBlock[];
};

export const ABOUT_BLOCK_TYPE_LABELS: Record<AboutBlockType, string> = {
  intro: "Вступление",
  spotlight: "Spotlight",
  history: "История",
  partner: "Партнёрства",
  trusted: "Нам доверяют",
  benefits: "Преимущества",
  leadership: "Руководство",
  careerBook: "Карьера и\u00a0книга",
};

function parseIntroProps(value: unknown): AboutIntroBlockProps | null {
  if (!isRecord(value) || !isString(value.title) || !isRecord(value.subtitle)) {
    return null;
  }
  const subtitle = value.subtitle;
  if (
    !isString(subtitle.lead) ||
    !isString(subtitle.teamsAccent) ||
    !isString(subtitle.middle) ||
    !isString(subtitle.resourcesAccent)
  ) {
    return null;
  }
  return cloneProps(value as AboutIntroBlockProps);
}

function parseSpotlightProps(value: unknown): AboutSpotlightBlockProps | null {
  if (
    !isRecord(value) ||
    !isRecord(value.leftTag) ||
    !isString(value.collageSrc) ||
    !isString(value.bookCoverSrc)
  ) {
    return null;
  }
  return cloneProps(value as AboutSpotlightBlockProps);
}

function parseHistoryProps(value: unknown): AboutHistoryBlockProps | null {
  if (!isRecord(value) || !isString(value.title) || !Array.isArray(value.timeline)) {
    return null;
  }
  return cloneProps(value as AboutHistoryBlockProps);
}

function parsePartnerProps(value: unknown): AboutPartnerBlockProps | null {
  if (!isRecord(value) || !isString(value.title) || !Array.isArray(value.awards)) {
    return null;
  }
  return cloneProps(value as AboutPartnerBlockProps);
}

function parseTrustedProps(value: unknown): AboutTrustedBlockProps | null {
  if (!isRecord(value) || !isString(value.title) || !Array.isArray(value.rows)) {
    return null;
  }
  return cloneProps(value as AboutTrustedBlockProps);
}

function parseBenefitsProps(value: unknown): AboutBenefitsBlockProps | null {
  if (!isRecord(value) || !isString(value.title)) {
    return null;
  }
  return cloneProps(value as AboutBenefitsBlockProps);
}

function parseLeadershipProps(value: unknown): AboutLeadershipBlockProps | null {
  if (!isRecord(value) || !isString(value.title) || !Array.isArray(value.members)) {
    return null;
  }
  return cloneProps(value as AboutLeadershipBlockProps);
}

function parseCareerBookProps(value: unknown): AboutCareerBookBlockProps | null {
  if (!isRecord(value) || !isRecord(value.career) || !isRecord(value.book)) {
    return null;
  }
  return cloneProps(value as AboutCareerBookBlockProps);
}

export function parseAboutBlockProps(
  type: AboutBlockType,
  props: unknown,
): AboutBlockPropsByType[AboutBlockType] | null {
  switch (type) {
    case "intro":
      return parseIntroProps(props);
    case "spotlight":
      return parseSpotlightProps(props);
    case "history":
      return parseHistoryProps(props);
    case "partner":
      return parsePartnerProps(props);
    case "trusted":
      return parseTrustedProps(props);
    case "benefits":
      return parseBenefitsProps(props);
    case "leadership":
      return parseLeadershipProps(props);
    case "careerBook":
      return parseCareerBookProps(props);
  }
}

export function parseAboutBlock(input: {
  id: string;
  order: number;
  type: string;
  props: unknown;
}): AboutBlock | null {
  if (!isAboutBlockType(input.type)) {
    return null;
  }
  const props = parseAboutBlockProps(input.type, input.props);
  if (!props) {
    return null;
  }
  return {
    id: input.id,
    order: input.order,
    type: input.type,
    props,
  } as AboutBlock;
}

export function isAboutBlockType(value: string): value is AboutBlockType {
  return ABOUT_BLOCK_TYPES.includes(value as AboutBlockType);
}

export function defaultAboutBlockProps(
  type: AboutBlockType,
): AboutBlockPropsByType[AboutBlockType] {
  switch (type) {
    case "intro":
      return cloneProps(aboutIntro);
    case "spotlight":
      return cloneProps(aboutSpotlight);
    case "history":
      return cloneProps(aboutHistory);
    case "partner":
      return cloneProps(aboutPartner);
    case "trusted":
      return cloneProps(aboutTrusted);
    case "benefits":
      return cloneProps(aboutBenefits);
    case "leadership":
      return cloneProps(aboutLeadership);
    case "careerBook":
      return cloneProps(aboutCareerBook);
  }
}

export type AboutCollectionKey =
  | "history.timeline"
  | "history.mission.items"
  | "partner.awards"
  | "trusted.rows"
  | "leadership.members";

export function defaultAboutCollectionItem(collectionKey: AboutCollectionKey): unknown {
  switch (collectionKey) {
    case "history.timeline":
      return { year: "2026", text: "Событие" };
    case "history.mission.items":
      return "Новый пункт миссии";
    case "partner.awards":
      return {
        id: crypto.randomUUID(),
        title: "Награда",
        status: "Статус",
        nomination: "Номинация",
        project: "Проект",
        document: {
          src: "/landing/about/partner/documents/digital-leaders-2025.png",
          alt: "",
          width: 684,
          height: 968,
        },
      };
    case "trusted.rows":
      return {
        id: crypto.randomUUID(),
        items: [],
      };
    case "leadership.members":
      return {
        id: crypto.randomUUID(),
        role: "Роль",
        name: "Имя",
        imageSrc: "/landing/about/leadership/ruslan-gaynanov.png",
        layout: "strategy",
      };
  }
}

export function aboutBlocksFromStaticContent(): Array<{
  order: number;
  type: AboutBlockType;
  props: AboutBlockPropsByType[AboutBlockType];
}> {
  return [
    { order: 0, type: "intro", props: cloneProps(aboutIntro) },
    { order: 1, type: "spotlight", props: cloneProps(aboutSpotlight) },
    { order: 2, type: "history", props: cloneProps(aboutHistory) },
    { order: 3, type: "partner", props: cloneProps(aboutPartner) },
    { order: 4, type: "trusted", props: cloneProps(aboutTrusted) },
    { order: 5, type: "benefits", props: cloneProps(aboutBenefits) },
    { order: 6, type: "leadership", props: cloneProps(aboutLeadership) },
    { order: 7, type: "careerBook", props: cloneProps(aboutCareerBook) },
  ];
}
