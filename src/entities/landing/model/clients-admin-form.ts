import type { AdminField, AdminValues } from "@/shared/ui/admin-form";

import {
  CLIENTS_BLOCK_TYPES,
  type ClientsBlock,
  type ClientsBlockType,
} from "./clients-blocks";
import {
  clientsSegments,
  isClientSegmentSlug,
  type ClientSegmentSlug,
  type ClientsPlatformBenefitsImageFields,
} from "./clients-content";

function text(values: AdminValues, key: string): string {
  const value = values[key];
  return typeof value === "string" ? value : "";
}

function numberValue(values: AdminValues, key: string): number {
  const value = values[key];
  return typeof value === "number" ? value : 0;
}

function boolValue(values: AdminValues, key: string): boolean {
  return values[key] === true;
}

export function groupValues(values: AdminValues, key: string): AdminValues {
  const value = values[key];
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as AdminValues)
    : {};
}

function listValues(values: AdminValues, key: string): AdminValues[] {
  return Array.isArray(values[key]) ? (values[key] as AdminValues[]) : [];
}

function mergeGroup(existing: AdminValues, values: AdminValues, key: string): AdminValues {
  return {
    ...groupValues(existing, key),
    ...groupValues(values, key),
  };
}

function mergeStringList(valuesList: unknown, existingList: unknown): string[] {
  const values = Array.isArray(valuesList)
    ? valuesList.filter((item): item is string => typeof item === "string" && item.length > 0)
    : [];
  if (values.length > 0) {
    return values;
  }
  return Array.isArray(existingList)
    ? existingList.filter((item): item is string => typeof item === "string")
    : [];
}

function normalizePlatformBenefitsItem(item: AdminValues): AdminValues {
  const responsiveImages = item.responsiveImages;
  const normalizedResponsiveImages: AdminValues = {};

  if (
    typeof responsiveImages === "object" &&
    responsiveImages !== null &&
    !Array.isArray(responsiveImages)
  ) {
    for (const [breakpoint, image] of Object.entries(responsiveImages as AdminValues)) {
      if (typeof image !== "object" || image === null || Array.isArray(image)) {
        continue;
      }
      const imageRecord = image as AdminValues;
      const imageSrc = text(imageRecord, "imageSrc");
      if (!imageSrc) {
        continue;
      }
      normalizedResponsiveImages[breakpoint] = {
        imageSrc,
        imageWidth: numberValue(imageRecord, "imageWidth") || 1,
        imageHeight: numberValue(imageRecord, "imageHeight") || 1,
      };
    }
  }

  const nextItem: AdminValues = {
    ...item,
    title: text(item, "title"),
    imageSrc: text(item, "imageSrc"),
    imageWidth: numberValue(item, "imageWidth") || 1,
    imageHeight: numberValue(item, "imageHeight") || 1,
  };
  delete nextItem.responsiveImages;

  if (Object.keys(normalizedResponsiveImages).length > 0) {
    nextItem.responsiveImages = normalizedResponsiveImages;
  }

  return nextItem;
}

function resolvePlatformBenefitsTemplateSegment(segment: string): ClientSegmentSlug {
  return isClientSegmentSlug(segment) ? segment : "enterprise";
}

function copyPlatformBenefitsImageLayout(
  template: ClientsPlatformBenefitsImageFields,
): AdminValues {
  const responsiveImages = template.responsiveImages;

  return {
    title: "",
    imageSrc: "",
    imageWidth: template.imageWidth,
    imageHeight: template.imageHeight,
    ...(responsiveImages
      ? {
          responsiveImages: Object.fromEntries(
            Object.entries(responsiveImages).map(([breakpoint, image]) => [
              breakpoint,
              {
                imageSrc: "",
                imageWidth: image.imageWidth,
                imageHeight: image.imageHeight,
              },
            ]),
          ),
        }
      : {}),
  };
}

export function createPlatformBenefitsCardTemplate(
  segment: string,
  index: number,
): AdminValues {
  const templateSegment = resolvePlatformBenefitsTemplateSegment(segment);
  const cards = clientsSegments[templateSegment].platformBenefits.cards;

  return copyPlatformBenefitsImageLayout(cards[index % cards.length]);
}

export function createPlatformBenefitsShowcaseTemplate(
  segment: string,
  index: number,
): AdminValues {
  const templateSegment = resolvePlatformBenefitsTemplateSegment(segment);
  const showcase = clientsSegments[templateSegment].platformBenefits.showcase;

  return copyPlatformBenefitsImageLayout(showcase[index % showcase.length]);
}

export type PlatformBenefitsCardLayout = 3 | 4;

const PLATFORM_BENEFITS_SHOWCASE_COUNT = 3;

export function resolvePlatformBenefitsCardLayout(
  segment: string,
  cards: AdminValues[],
  cardLayout?: unknown,
): PlatformBenefitsCardLayout {
  if (cardLayout === 3 || cardLayout === 4) {
    return cardLayout;
  }
  if (cardLayout === "3") {
    return 3;
  }
  if (cardLayout === "4") {
    return 4;
  }
  if (cards.length === 3) {
    return 3;
  }
  if (resolvePlatformBenefitsTemplateSegment(segment) === "mid-market") {
    return 3;
  }
  return 4;
}

function mergePlatformBenefitsResponsiveLayout(
  layoutTemplate: AdminValues,
  existing: AdminValues | undefined,
): AdminValues | undefined {
  const layoutResponsive = layoutTemplate.responsiveImages;
  if (
    typeof layoutResponsive !== "object" ||
    layoutResponsive === null ||
    Array.isArray(layoutResponsive)
  ) {
    return undefined;
  }

  const existingResponsive = existing?.responsiveImages;
  const mergedResponsive: AdminValues = {};

  for (const [breakpoint, layoutImage] of Object.entries(layoutResponsive as AdminValues)) {
    if (typeof layoutImage !== "object" || layoutImage === null || Array.isArray(layoutImage)) {
      continue;
    }
    const layoutRecord = layoutImage as AdminValues;
    const existingImage =
      typeof existingResponsive === "object" &&
      existingResponsive !== null &&
      !Array.isArray(existingResponsive)
        ? (existingResponsive as AdminValues)[breakpoint]
        : undefined;
    const existingRecord =
      typeof existingImage === "object" && existingImage !== null && !Array.isArray(existingImage)
        ? (existingImage as AdminValues)
        : undefined;

    mergedResponsive[breakpoint] = {
      imageSrc: existingRecord ? text(existingRecord, "imageSrc") : "",
      imageWidth: numberValue(layoutRecord, "imageWidth") || 1,
      imageHeight: numberValue(layoutRecord, "imageHeight") || 1,
    };
  }

  return Object.keys(mergedResponsive).length > 0 ? mergedResponsive : undefined;
}

function mergePlatformBenefitsSlot(
  segment: string,
  existing: AdminValues | undefined,
  index: number,
  kind: "cards" | "showcase",
): AdminValues {
  const layout =
    kind === "cards"
      ? createPlatformBenefitsCardTemplate(segment, index)
      : createPlatformBenefitsShowcaseTemplate(segment, index);
  const merged: AdminValues = {
    ...layout,
    ...(existing ?? {}),
    imageWidth: layout.imageWidth,
    imageHeight: layout.imageHeight,
  };
  const responsiveLayout = mergePlatformBenefitsResponsiveLayout(layout, existing);
  delete merged.responsiveImages;
  if (responsiveLayout) {
    merged.responsiveImages = responsiveLayout;
  }
  return normalizePlatformBenefitsItem(merged);
}

export function normalizePlatformBenefitsLists(
  segment: string,
  platformBenefits: AdminValues,
): AdminValues {
  const cards = listValues(platformBenefits, "cards");
  const showcase = listValues(platformBenefits, "showcase");
  const cardLayout = resolvePlatformBenefitsCardLayout(
    segment,
    cards,
    platformBenefits.cardLayout,
  );

  return {
    ...platformBenefits,
    cardLayout,
    cards: Array.from({ length: cardLayout }, (_, index) =>
      mergePlatformBenefitsSlot(segment, cards[index], index, "cards"),
    ),
    showcase: Array.from({ length: PLATFORM_BENEFITS_SHOWCASE_COUNT }, (_, index) =>
      mergePlatformBenefitsSlot(segment, showcase[index], index, "showcase"),
    ),
  };
}

function mergeObjectList(valuesList: unknown, existingList: unknown): AdminValues[] {
  const values = Array.isArray(valuesList) ? (valuesList as AdminValues[]) : [];
  if (values.length > 0) {
    return values.map(normalizePlatformBenefitsItem);
  }
  return Array.isArray(existingList)
    ? (existingList as AdminValues[]).map(normalizePlatformBenefitsItem)
    : [];
}

export function mergeClientsPageAdminValues(
  existing: AdminValues,
  values: AdminValues,
): AdminValues {
  const platformExisting = groupValues(existing, "platform");
  const platformValues = groupValues(values, "platform");
  const platformBenefitsExisting = groupValues(existing, "platformBenefits");
  const platformBenefitsValues = groupValues(values, "platformBenefits");
  const segment = text(values, "segment") || text(existing, "segment");
  const mergedPlatformBenefits = normalizePlatformBenefitsLists(segment, {
    ...mergeGroup(existing, values, "platformBenefits"),
    cards: mergeObjectList(platformBenefitsValues.cards, platformBenefitsExisting.cards),
    showcase: mergeObjectList(
      platformBenefitsValues.showcase,
      platformBenefitsExisting.showcase,
    ),
  });

  return {
    ...existing,
    segment,
    navLabel: text(values, "navLabel") || text(existing, "navLabel"),
    hidden: values.hidden === true,
    meta: mergeGroup(existing, values, "meta"),
    hero: mergeGroup(existing, values, "hero"),
    platform: {
      ...mergeGroup(existing, values, "platform"),
      painPoints: mergeStringList(platformValues.painPoints, platformExisting.painPoints),
      tags: mergeStringList(platformValues.tags, platformExisting.tags),
    },
    platformBenefits: mergedPlatformBenefits,
    partnersExperience: mergeGroup(existing, values, "partnersExperience"),
    partnershipCta: mergeGroup(existing, values, "partnershipCta"),
  };
}

const imageFields: readonly AdminField[] = [
  { kind: "image", name: "imageSrc", label: "Изображение" },
  { kind: "number", name: "imageWidth", label: "Ширина" },
  { kind: "number", name: "imageHeight", label: "Высота" },
];

const platformBenefitsCardFields: readonly AdminField[] = [
  { kind: "text", name: "title", label: "Заголовок" },
  ...imageFields,
];

export const CLIENTS_PAGE_ADMIN_FIELDS: readonly AdminField[] = [
  {
    kind: "text",
    name: "segment",
    label: "Адрес (slug)",
    hint: "Латиницей, через дефис. Страница будет доступна по /clients/<адрес>.",
  },
  { kind: "text", name: "navLabel", label: "Подпись в меню" },
  { kind: "checkbox", name: "hidden", label: "Скрыта" },
  {
    kind: "group",
    name: "meta",
    label: "SEO",
    fields: [
      { kind: "text", name: "title", label: "Title" },
      { kind: "textarea", name: "description", label: "Description", rows: 3 },
    ],
  },
  {
    kind: "group",
    name: "hero",
    label: "Hero",
    fields: [
      { kind: "text", name: "title", label: "Заголовок" },
      {
        kind: "group",
        name: "subtitle",
        label: "Подзаголовок",
        fields: [
          { kind: "text", name: "before", label: "До акцента" },
          { kind: "text", name: "accent", label: "Акцент" },
          { kind: "text", name: "after", label: "После акцента" },
        ],
      },
      { kind: "text", name: "cta", label: "Кнопка" },
      { kind: "image", name: "imageSrc", label: "Изображение (desktop)" },
      { kind: "number", name: "imageWidth", label: "Ширина" },
      { kind: "number", name: "imageHeight", label: "Высота" },
      { kind: "text", name: "imageAlt", label: "Описание изображения" },
      { kind: "image", name: "imageMobileSrc", label: "Изображение (mobile)" },
      { kind: "number", name: "imageMobileWidth", label: "Ширина mobile" },
      { kind: "number", name: "imageMobileHeight", label: "Высота mobile" },
    ],
  },
  {
    kind: "group",
    name: "platform",
    label: "Platform",
    fields: [
      { kind: "stringList", name: "painPoints", label: "Боли", addLabel: "Пункт" },
      { kind: "text", name: "title", label: "Заголовок" },
      { kind: "textarea", name: "subtitle", label: "Подзаголовок", rows: 3 },
      { kind: "stringList", name: "tags", label: "Теги", addLabel: "Тег" },
      { kind: "image", name: "imageSrc", label: "Изображение" },
      { kind: "number", name: "imageWidth", label: "Ширина" },
      { kind: "number", name: "imageHeight", label: "Высота" },
      { kind: "text", name: "imageAlt", label: "Описание изображения" },
    ],
  },
  {
    kind: "group",
    name: "platformBenefits",
    label: "Platform benefits",
    fields: [
      { kind: "text", name: "sectionTitle", label: "Заголовок секции" },
      { kind: "text", name: "panelTitle", label: "Заголовок панели" },
      { kind: "text", name: "panelSubtitle", label: "Подзаголовок панели" },
      {
        kind: "select",
        name: "cardLayout",
        label: "Карточек в сетке",
        options: [
          { value: "3", label: "3 карточки" },
          { value: "4", label: "4 карточки" },
        ],
      },
      {
        kind: "list",
        name: "cards",
        label: "Карточки",
        addLabel: "Карточка",
        createItem: () => ({
          title: "",
          imageSrc: "",
          imageWidth: 0,
          imageHeight: 0,
        }),
        itemTitle: (item, index) => text(item, "title") || `Карточка ${index + 1}`,
        fields: platformBenefitsCardFields,
      },
      {
        kind: "list",
        name: "showcase",
        label: "Showcase",
        addLabel: "Элемент",
        createItem: () => ({
          title: "",
          imageSrc: "",
          imageWidth: 0,
          imageHeight: 0,
        }),
        itemTitle: (item, index) => text(item, "title") || `Элемент ${index + 1}`,
        fields: platformBenefitsCardFields,
      },
    ],
  },
  {
    kind: "group",
    name: "partnersExperience",
    label: "Partners experience",
    fields: [
      { kind: "text", name: "sectionTitle", label: "Заголовок секции" },
      {
        kind: "group",
        name: "caseStudy",
        label: "Кейс",
        fields: [
          { kind: "text", name: "tag", label: "Тег" },
          { kind: "textarea", name: "description", label: "Описание", rows: 4 },
          { kind: "text", name: "metric", label: "Метрика" },
          { kind: "text", name: "metricLabel", label: "Подпись метрики" },
          { kind: "text", name: "href", label: "Ссылка" },
          { kind: "image", name: "logoSrc", label: "Логотип" },
          { kind: "number", name: "logoWidth", label: "Ширина логотипа" },
          { kind: "number", name: "logoHeight", label: "Высота логотипа" },
          { kind: "image", name: "panelSrc", label: "Фон карточки" },
          { kind: "number", name: "panelWidth", label: "Ширина фона" },
          { kind: "number", name: "panelHeight", label: "Высота фона" },
          { kind: "text", name: "panelAlt", label: "Описание фона" },
        ],
      },
    ],
  },
  {
    kind: "group",
    name: "partnershipCta",
    label: "Partnership CTA",
    fields: [
      { kind: "text", name: "title", label: "Заголовок" },
      { kind: "textarea", name: "subtitle", label: "Подзаголовок", rows: 3 },
      { kind: "text", name: "subtitleAccent", label: "Акцент в подзаголовке" },
      { kind: "text", name: "submitLabel", label: "Подпись кнопки" },
    ],
  },
];

function normalizeSegment(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function blockProps(values: AdminValues, key: string): AdminValues {
  return groupValues(values, key);
}

export function clientsPageToFormValues(input: {
  segment: string;
  meta: AdminValues;
  hero: AdminValues;
  platform: AdminValues;
  platformBenefits: AdminValues;
  partnersExperience: AdminValues;
  partnershipCta: AdminValues;
}): AdminValues {
  const meta = input.meta;
  return {
    segment: input.segment,
    navLabel: typeof meta.navLabel === "string" ? meta.navLabel : "",
    hidden: meta.hidden === true,
    meta: {
      title: text(meta, "title"),
      description: text(meta, "description"),
    },
    hero: input.hero,
    platform: input.platform,
    platformBenefits: input.platformBenefits,
    partnersExperience: input.partnersExperience,
    partnershipCta: input.partnershipCta,
  };
}

export function clientsPageFromFormValues(values: AdminValues): {
  segment: string;
  meta: AdminValues;
  blocks: Record<string, AdminValues>;
} {
  const segment =
    normalizeSegment(text(values, "segment")) ||
    `page-${crypto.randomUUID().slice(0, 8)}`;
  const metaGroup = groupValues(values, "meta");
  const hero = blockProps(values, "hero");
  const platform = blockProps(values, "platform");
  const platformBenefitsRaw = blockProps(values, "platformBenefits");
  const platformBenefits = normalizePlatformBenefitsLists(segment, platformBenefitsRaw);
  const partnersExperience = blockProps(values, "partnersExperience");
  const partnershipCta = blockProps(values, "partnershipCta");

  const navLabel = text(values, "navLabel");
  const metaTitle = text(metaGroup, "title");
  const metaDescription = text(metaGroup, "description");

  return {
    segment,
    meta: {
      title: metaTitle || `Клиенты — СмартСтаффинг`,
      description: metaDescription,
      navLabel: navLabel || metaTitle,
      hidden: boolValue(values, "hidden"),
    },
    blocks: {
      hero: {
        title: text(hero, "title"),
        subtitle: groupValues(hero, "subtitle"),
        cta: text(hero, "cta"),
        imageSrc: text(hero, "imageSrc"),
        imageWidth: numberValue(hero, "imageWidth"),
        imageHeight: numberValue(hero, "imageHeight"),
        imageAlt: text(hero, "imageAlt"),
        ...(text(hero, "imageMobileSrc")
          ? {
              imageMobileSrc: text(hero, "imageMobileSrc"),
              imageMobileWidth: numberValue(hero, "imageMobileWidth"),
              imageMobileHeight: numberValue(hero, "imageMobileHeight"),
            }
          : {}),
      },
      platform: {
        painPoints: listValues(platform, "painPoints"),
        title: text(platform, "title"),
        subtitle: text(platform, "subtitle"),
        tags: listValues(platform, "tags"),
        imageSrc: text(platform, "imageSrc"),
        imageWidth: numberValue(platform, "imageWidth"),
        imageHeight: numberValue(platform, "imageHeight"),
        imageAlt: text(platform, "imageAlt"),
      },
      platformBenefits: {
        sectionTitle: text(platformBenefits, "sectionTitle"),
        panelTitle: text(platformBenefits, "panelTitle"),
        panelSubtitle: text(platformBenefits, "panelSubtitle"),
        cardLayout: resolvePlatformBenefitsCardLayout(
          segment,
          listValues(platformBenefits, "cards"),
          platformBenefits.cardLayout,
        ),
        cards: listValues(platformBenefits, "cards").map(normalizePlatformBenefitsItem),
        showcase: listValues(platformBenefits, "showcase").map(normalizePlatformBenefitsItem),
      },
      partnersExperience: {
        sectionTitle: text(partnersExperience, "sectionTitle"),
        caseStudy: groupValues(partnersExperience, "caseStudy"),
      },
      partnershipCta: {
        title: text(partnershipCta, "title"),
        subtitle: text(partnershipCta, "subtitle"),
        ...(text(partnershipCta, "subtitleAccent")
          ? { subtitleAccent: text(partnershipCta, "subtitleAccent") }
          : {}),
        ...(text(partnershipCta, "submitLabel")
          ? { submitLabel: text(partnershipCta, "submitLabel") }
          : {}),
      },
    },
  };
}

export function createDefaultClientsPageFormValues(): AdminValues {
  return {
    segment: "",
    navLabel: "Новая страница clients",
    hidden: false,
    meta: {
      title: "Новая страница clients — СмартСтаффинг",
      description: "",
    },
    hero: {
      title: "Заголовок страницы",
      subtitle: { before: "", accent: "", after: "" },
      cta: "Подключить компанию",
      imageSrc: "",
      imageWidth: 956,
      imageHeight: 960,
      imageAlt: "",
    },
    platform: {
      painPoints: [""],
      title: "",
      subtitle: "",
      tags: [""],
      imageSrc: "",
      imageWidth: 602,
      imageHeight: 311,
      imageAlt: "",
    },
    platformBenefits: normalizePlatformBenefitsLists("enterprise", {
      sectionTitle: "",
      panelTitle: "",
      panelSubtitle: "",
      cardLayout: 4,
      cards: [],
      showcase: [],
    }),
    partnersExperience: {
      sectionTitle: "Реальный опыт наших партнёров",
      caseStudy: {
        href: "#",
        tag: "",
        panelSrc: "",
        panelWidth: 571,
        panelHeight: 484,
        panelAlt: "",
        logoSrc: "",
        logoWidth: 251,
        logoHeight: 49,
        description: "",
        metric: "",
        metricLabel: "",
      },
    },
    partnershipCta: {
      title: "",
      subtitle: "",
      subtitleAccent: "",
      submitLabel: "",
    },
  };
}

export function clientsPageFormValuesToBlocks(values: AdminValues): ClientsBlock[] {
  const parsed = clientsPageFromFormValues(values);
  return CLIENTS_BLOCK_TYPES.map((type, order) => ({
    id: `admin-${type}`,
    order,
    type,
    props: parsed.blocks[type],
  })) as ClientsBlock[];
}

export function patchClientsPageValues(
  values: AdminValues,
  patch: AdminValues,
): AdminValues {
  return { ...values, ...patch };
}

export function patchClientsPageGroup(
  values: AdminValues,
  key: string,
  patch: AdminValues,
): AdminValues {
  return {
    ...values,
    [key]: {
      ...groupValues(values, key),
      ...patch,
    },
  };
}

export function patchPageMeta(values: AdminValues, patch: AdminValues): AdminValues {
  return patchClientsPageGroup(values, "meta", patch);
}

export function patchClientsNestedGroup(
  values: AdminValues,
  groupKey: string,
  nestedKey: string,
  patch: AdminValues,
): AdminValues {
  const group = groupValues(values, groupKey);
  return patchClientsPageGroup(values, groupKey, {
    [nestedKey]: {
      ...groupValues(group, nestedKey),
      ...patch,
    },
  });
}
