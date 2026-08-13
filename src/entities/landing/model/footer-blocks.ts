import { footerContent } from "./content";
import {
  cloneProps,
  isNumber,
  isRecord,
  isString,
  parseRecordArray,
} from "../lib/block-parse-utils";
import type { LandingBlockBase } from "./landing-block-base";

export const FOOTER_BLOCK_TYPES = ["footer"] as const;

export type FooterBlockType = (typeof FOOTER_BLOCK_TYPES)[number];

export type FooterLinkItem = {
  label: string;
  href: string;
};

export type FooterSocialItem = {
  label: string;
  href: string;
  iconSrc: string;
  width: number;
  height: number;
};

export type FooterBlockProps = {
  menuTitle: string;
  solutionsTitle: string;
  contactsTitle: string;
  menu: FooterLinkItem[];
  solutions: FooterLinkItem[];
  contacts: {
    phone: string;
    email: string;
    social: FooterSocialItem[];
  };
  legal: FooterLinkItem[];
  copyright: string;
};

export type FooterBlock = LandingBlockBase<"footer", FooterBlockProps>;

export type FooterPageContent = {
  pageId: string;
  slug: string;
  title: string;
  meta: null;
  blocks: FooterBlock[];
};

export const FOOTER_BLOCK_TYPE_LABELS: Record<FooterBlockType, string> = {
  footer: "Футер",
};

function parseLinkItem(value: unknown): FooterLinkItem | null {
  if (!isRecord(value) || !isString(value.label) || !isString(value.href)) {
    return null;
  }
  return { label: value.label, href: value.href };
}

function parseLinkItems(value: unknown): FooterLinkItem[] | null {
  const items = parseRecordArray(value);
  if (!items) {
    return null;
  }
  const parsed = items.map(parseLinkItem).filter((item): item is FooterLinkItem => item !== null);
  return parsed.length === items.length ? parsed : null;
}

function parseSocialItem(value: unknown): FooterSocialItem | null {
  if (
    !isRecord(value) ||
    !isString(value.label) ||
    !isString(value.href) ||
    !isString(value.iconSrc) ||
    !isNumber(value.width) ||
    !isNumber(value.height)
  ) {
    return null;
  }
  return {
    label: value.label,
    href: value.href,
    iconSrc: value.iconSrc,
    width: value.width,
    height: value.height,
  };
}

function parseSocialItems(value: unknown): FooterSocialItem[] | null {
  const items = parseRecordArray(value);
  if (!items) {
    return null;
  }
  const parsed = items.map(parseSocialItem).filter((item): item is FooterSocialItem => item !== null);
  return parsed.length === items.length ? parsed : null;
}

function parseFooterProps(value: unknown): FooterBlockProps | null {
  if (!isRecord(value)) {
    return null;
  }

  const menu = parseLinkItems(value.menu);
  const solutions = parseLinkItems(value.solutions);
  const legal = parseLinkItems(value.legal);

  if (
    !isString(value.menuTitle) ||
    !isString(value.solutionsTitle) ||
    !isString(value.contactsTitle) ||
    !menu ||
    !solutions ||
    !legal ||
    !isString(value.copyright) ||
    !isRecord(value.contacts) ||
    !isString(value.contacts.phone) ||
    !isString(value.contacts.email)
  ) {
    return null;
  }

  const social = parseSocialItems(value.contacts.social);
  if (!social) {
    return null;
  }

  return {
    menuTitle: value.menuTitle,
    solutionsTitle: value.solutionsTitle,
    contactsTitle: value.contactsTitle,
    menu,
    solutions,
    contacts: {
      phone: value.contacts.phone,
      email: value.contacts.email,
      social,
    },
    legal,
    copyright: value.copyright,
  };
}

export function parseFooterBlockProps(
  type: FooterBlockType,
  props: unknown,
): FooterBlockProps | null {
  if (type !== "footer") {
    return null;
  }
  return parseFooterProps(props);
}

export function parseFooterBlock(input: {
  id: string;
  order: number;
  type: string;
  props: unknown;
}): FooterBlock | null {
  if (!isFooterBlockType(input.type)) {
    return null;
  }
  const props = parseFooterBlockProps(input.type, input.props);
  if (!props) {
    return null;
  }
  return {
    id: input.id,
    order: input.order,
    type: input.type,
    props,
  };
}

export function isFooterBlockType(value: string): value is FooterBlockType {
  return FOOTER_BLOCK_TYPES.includes(value as FooterBlockType);
}

export function defaultFooterBlockProps(): FooterBlockProps {
  return cloneProps({
    menuTitle: footerContent.menuTitle,
    solutionsTitle: footerContent.solutionsTitle,
    contactsTitle: footerContent.contactsTitle,
    menu: footerContent.menu.map((item) => ({ ...item })),
    solutions: footerContent.solutions.map((item) => ({ ...item })),
    contacts: {
      phone: footerContent.contacts.phone,
      email: footerContent.contacts.email,
      social: footerContent.contacts.social.map((item) => ({ ...item })),
    },
    legal: footerContent.legal.map((item) => ({ ...item })),
    copyright: footerContent.copyright,
  });
}

export function footerBlocksFromStaticContent(): Array<{
  order: number;
  type: FooterBlockType;
  props: FooterBlockProps;
}> {
  return [{ order: 0, type: "footer", props: defaultFooterBlockProps() }];
}

export type FooterCollectionKey = "menu" | "solutions" | "legal" | "contacts.social";

export function defaultFooterCollectionItem(collectionKey: FooterCollectionKey): unknown {
  if (collectionKey === "menu" || collectionKey === "solutions" || collectionKey === "legal") {
    return { label: "Новая ссылка", href: "/" };
  }
  if (collectionKey === "contacts.social") {
    return {
      label: "Соцсеть",
      href: "https://",
      iconSrc: "/icons/social/telegram.svg",
      width: 32,
      height: 28,
    };
  }
  return { label: "Новая ссылка", href: "/" };
}
