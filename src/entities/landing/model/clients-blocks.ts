import {
  clientsSegments,
  type ClientSegmentSlug,
  type ClientsHeroContent,
  type ClientsPartnersExperienceContent,
  type ClientsPartnershipCtaContent,
  type ClientsPlatformBenefitsContent,
  type ClientsPlatformContent,
} from "./clients-content";
import { cloneProps, isRecord, isString } from "../lib/block-parse-utils";
import type { LandingBlockBase } from "./landing-block-base";

export const CLIENTS_BLOCK_TYPES = [
  "hero",
  "platform",
  "platformBenefits",
  "partnersExperience",
  "partnershipCta",
] as const;

export type ClientsBlockType = (typeof CLIENTS_BLOCK_TYPES)[number];

export type ClientsBlockPropsByType = {
  hero: ClientsHeroContent;
  platform: ClientsPlatformContent;
  platformBenefits: ClientsPlatformBenefitsContent;
  partnersExperience: ClientsPartnersExperienceContent;
  partnershipCta: ClientsPartnershipCtaContent;
};

export type ClientsBlock = {
  [K in ClientsBlockType]: LandingBlockBase<K, ClientsBlockPropsByType[K]>;
}[ClientsBlockType];

export type ClientsPageContent = {
  pageId: string;
  slug: string;
  title: string;
  meta: { title: string; description: string } | null;
  blocks: ClientsBlock[];
};

;

function parseHeroProps(value: unknown): ClientsHeroContent | null {
  if (!isRecord(value) || !isString(value.title) || !isString(value.imageSrc)) {
    return null;
  }
  return cloneProps(value as ClientsHeroContent);
}

function parsePlatformProps(value: unknown): ClientsPlatformContent | null {
  if (!isRecord(value) || !isString(value.title) || !Array.isArray(value.painPoints)) {
    return null;
  }
  return cloneProps(value as ClientsPlatformContent);
}

function parsePlatformBenefitsProps(
  value: unknown,
): ClientsPlatformBenefitsContent | null {
  if (!isRecord(value) || !isString(value.sectionTitle) || !Array.isArray(value.cards)) {
    return null;
  }
  return cloneProps(value as ClientsPlatformBenefitsContent);
}

function parsePartnersExperienceProps(
  value: unknown,
): ClientsPartnersExperienceContent | null {
  if (!isRecord(value) || !isString(value.sectionTitle) || !isRecord(value.caseStudy)) {
    return null;
  }
  return cloneProps(value as ClientsPartnersExperienceContent);
}

function parsePartnershipCtaProps(
  value: unknown,
): ClientsPartnershipCtaContent | null {
  if (!isRecord(value) || !isString(value.title) || !isString(value.subtitle)) {
    return null;
  }
  return cloneProps(value as ClientsPartnershipCtaContent);
}

export function parseClientsBlockProps(
  type: ClientsBlockType,
  props: unknown,
): ClientsBlockPropsByType[ClientsBlockType] | null {
  switch (type) {
    case "hero":
      return parseHeroProps(props);
    case "platform":
      return parsePlatformProps(props);
    case "platformBenefits":
      return parsePlatformBenefitsProps(props);
    case "partnersExperience":
      return parsePartnersExperienceProps(props);
    case "partnershipCta":
      return parsePartnershipCtaProps(props);
  }
}

export function parseClientsBlock(input: {
  id: string;
  order: number;
  type: string;
  props: unknown;
}): ClientsBlock | null {
  if (!isClientsBlockType(input.type)) {
    return null;
  }
  const props = parseClientsBlockProps(input.type, input.props);
  if (!props) {
    return null;
  }
  return {
    id: input.id,
    order: input.order,
    type: input.type,
    props,
  } as ClientsBlock;
}

export function isClientsBlockType(value: string): value is ClientsBlockType {
  return CLIENTS_BLOCK_TYPES.includes(value as ClientsBlockType);
}

export function clientsBlocksFromStaticContent(segment: ClientSegmentSlug): Array<{
  order: number;
  type: ClientsBlockType;
  props: ClientsBlockPropsByType[ClientsBlockType];
}> {
  const content = clientsSegments[segment];
  return [
    { order: 0, type: "hero", props: cloneProps(content.hero) },
    { order: 1, type: "platform", props: cloneProps(content.platform) },
    { order: 2, type: "platformBenefits", props: cloneProps(content.platformBenefits) },
    { order: 3, type: "partnersExperience", props: cloneProps(content.partnersExperience) },
    { order: 4, type: "partnershipCta", props: cloneProps(content.partnershipCta) },
  ];
}

export function clientsMetaFromStaticContent(segment: ClientSegmentSlug): {
  title: string;
  description: string;
} {
  return { ...clientsSegments[segment].meta };
}
