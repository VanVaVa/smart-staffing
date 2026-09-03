import {
  cloneProps,
  isRecord,
  isString,
  isStringArray,
} from "../lib/block-parse-utils";
import type { LandingBlockBase } from "./landing-block-base";

export const EMAIL_SETTINGS_BLOCK_TYPES = ["emailSettings"] as const;

export type EmailSettingsBlockType = (typeof EMAIL_SETTINGS_BLOCK_TYPES)[number];

export type EmailSettingsBlockProps = {
  senderEmail: string;
  partnerNotificationEmail: string;
  infoEmail: string;
  supportEmail: string;
  vacancyNotificationEmails: string[];
};

export type EmailSettingsBlock = LandingBlockBase<
  "emailSettings",
  EmailSettingsBlockProps
>;

export type EmailSettingsPageContent = {
  pageId: string;
  slug: string;
  title: string;
  meta: null;
  blocks: EmailSettingsBlock[];
};

const DEFAULT_VACANCY_NOTIFICATION_EMAILS = [
  "group_resource-management@teamforce.ru",
  "o.konyukova@teamforce.ru",
];

export const DEFAULT_EMAIL_SETTINGS: EmailSettingsBlockProps = {
  senderEmail: "noreply@smartstaffing.ru",
  partnerNotificationEmail: "partner@smartstaffing.ru",
  infoEmail: "info@smartstaffing.ru",
  supportEmail: "support@smartstaffing.ru",
  vacancyNotificationEmails: [...DEFAULT_VACANCY_NOTIFICATION_EMAILS],
};

function parseEmailSettingsProps(value: unknown): EmailSettingsBlockProps | null {
  if (!isRecord(value)) {
    return null;
  }

  const vacancyNotificationEmails = isStringArray(value.vacancyNotificationEmails)
    ? value.vacancyNotificationEmails.filter(Boolean)
    : null;

  if (
    !isString(value.senderEmail) ||
    !isString(value.partnerNotificationEmail) ||
    !isString(value.infoEmail) ||
    !isString(value.supportEmail) ||
    !vacancyNotificationEmails
  ) {
    return null;
  }

  return {
    senderEmail: value.senderEmail,
    partnerNotificationEmail: value.partnerNotificationEmail,
    infoEmail: value.infoEmail,
    supportEmail: value.supportEmail,
    vacancyNotificationEmails,
  };
}

export function parseEmailSettingsBlockProps(
  type: EmailSettingsBlockType,
  props: unknown,
): EmailSettingsBlockProps | null {
  if (type !== "emailSettings") {
    return null;
  }
  return parseEmailSettingsProps(props);
}

export function parseEmailSettingsBlock(input: {
  id: string;
  order: number;
  type: string;
  props: unknown;
}): EmailSettingsBlock | null {
  if (!isEmailSettingsBlockType(input.type)) {
    return null;
  }
  const props = parseEmailSettingsBlockProps(input.type, input.props);
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

export function isEmailSettingsBlockType(value: string): value is EmailSettingsBlockType {
  return EMAIL_SETTINGS_BLOCK_TYPES.includes(value as EmailSettingsBlockType);
}

export function defaultEmailSettingsBlockProps(): EmailSettingsBlockProps {
  return cloneProps(DEFAULT_EMAIL_SETTINGS);
}

export function emailSettingsBlocksFromStaticContent(): Array<{
  order: number;
  type: EmailSettingsBlockType;
  props: EmailSettingsBlockProps;
}> {
  return [{ order: 0, type: "emailSettings", props: defaultEmailSettingsBlockProps() }];
}
