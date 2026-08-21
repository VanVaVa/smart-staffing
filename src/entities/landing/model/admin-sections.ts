import type { AdminField, AdminValues } from "@/shared/ui/admin-form";

import { clientSegmentSlugs } from "./clients-content";
import { LANDING_PAGE_SLUGS } from "./landing-page-slugs";

export const ADMIN_SECTION_GROUPS = [
  { key: "content", title: "Контент сайта" },
  { key: "company", title: "О компании" },
  { key: "documents", title: "Документы" },
  { key: "global", title: "Общее" },
] as const;

export type AdminSectionGroup = (typeof ADMIN_SECTION_GROUPS)[number]["key"];

export type AdminSectionStorage =
  | {
      kind: "blockPath";
      pageSlug: string;
      blockType: string;
      path: readonly string[];
    }
  | { kind: "articles" };

type AdminSectionBase = {
  key: string;
  title: string;
  description: string;
  group: AdminSectionGroup;
  publicPath: string;
  fields: readonly AdminField[];
};

export type AdminCollectionSection = AdminSectionBase & {
  mode: "collection";
  storage: AdminSectionStorage;
  addLabel: string;
  emptyLabel: string;
  itemTitle: (values: AdminValues, index: number) => string;
  itemMeta?: (values: AdminValues) => string;
  createValues: () => AdminValues;
  toForm?: (item: AdminValues) => AdminValues;
  fromForm?: (values: AdminValues) => AdminValues;
};

export type AdminSingletonSection = AdminSectionBase & {
  mode: "singleton";
  storage: Extract<AdminSectionStorage, { kind: "blockPath" }>;
  toForm?: (values: AdminValues) => AdminValues;
  fromForm?: (values: AdminValues) => AdminValues;
};

export type AdminSection = AdminCollectionSection | AdminSingletonSection;

const MEDIA_TAG_LABELS: Record<string, string> = {
  important: "Важное",
  interesting: "Интересное",
  news: "Новость",
};

function text(values: AdminValues, key: string): string {
  const value = values[key];
  return typeof value === "string" ? value : "";
}

function formatPublishedLabel(publishedAt: string): string {
  const [year, month, day] = publishedAt.split("-");
  return year && month && day ? `${day}.${month}.${year}` : publishedAt;
}

function parseDisplayDate(date: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  const [day, month, year] = date.split(".");
  if (!year || !month || !day) {
    return "";
  }

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

const CYRILLIC_TRANSLIT: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[а-яё]/g, (letter) => CYRILLIC_TRANSLIT[letter] ?? "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const MARQUEE_TAIL = 1;

function unwrapMarqueeItems(items: AdminValues[]): AdminValues[] {
  const unique = (items.length - MARQUEE_TAIL) / 2;
  if (!Number.isInteger(unique) || unique < 1) {
    return items;
  }
  const looped = items.every(
    (item, index) => item.src === items[index % unique].src,
  );
  return looped ? items.slice(0, unique) : items;
}

function wrapMarqueeItems(rowId: string, items: AdminValues[]): AdminValues[] {
  return items.map((item, index) => ({
    ...item,
    id: `${rowId}-${String(index + 1).padStart(2, "0")}`,
  }));
}

const articlesSection: AdminCollectionSection = {
  key: "articles",
  title: "Статьи",
  description: "Публикации раздела «Медиа»: анонс, обложка и текст статьи.",
  group: "content",
  publicPath: "/media",
  mode: "collection",
  storage: { kind: "articles" },
  addLabel: "Новая статья",
  emptyLabel: "Статей пока нет",
  itemTitle: (values) => text(values, "title"),
  itemMeta: (values) =>
    `${formatPublishedLabel(text(values, "publishedAt"))} · /media/${text(values, "slug")}`,
  createValues: () => ({
    title: "Новая статья",
    tag: "news",
    lead: "",
    bodyBlocks: [],
  }),
  fromForm: (values) => {
    const slug =
      slugify(text(values, "slug")) ||
      slugify(text(values, "title")) ||
      `article-${crypto.randomUUID().slice(0, 8)}`;
    const publishedAt = text(values, "publishedAt");
    const title = text(values, "title");
    const meta = (values.meta ?? {}) as AdminValues;
    return {
      ...values,
      slug,
      href: `/media/${slug}`,
      tagLabel: MEDIA_TAG_LABELS[text(values, "tag")] ?? "Новость",
      publishedLabel: formatPublishedLabel(publishedAt),
      meta: {
        title: text(meta, "title") || `${title} — СмартСтаффинг`,
        description: text(meta, "description") || text(values, "lead").slice(0, 300),
      },
    };
  },
  fields: [
    { kind: "text", name: "title", label: "Заголовок" },
    {
      kind: "text",
      name: "slug",
      label: "Адрес",
      hint: "Латиницей, через дефис. Статья будет доступна по /media/<адрес>.",
    },
    {
      kind: "select",
      name: "tag",
      label: "Тег",
      options: [
        { value: "important", label: "Важное" },
        { value: "interesting", label: "Интересное" },
        { value: "news", label: "Новость" },
      ],
    },
    { kind: "date", name: "publishedAt", label: "Дата публикации" },
    { kind: "image", name: "imageSrc", label: "Обложка в списке" },
    { kind: "text", name: "imageAlt", label: "Описание обложки" },
    { kind: "image", name: "heroImageSrc", label: "Изображение в шапке статьи" },
    { kind: "text", name: "heroImageAlt", label: "Описание изображения в шапке" },
    { kind: "textarea", name: "lead", label: "Лид", rows: 4 },
    {
      kind: "list",
      name: "bodyBlocks",
      label: "Текст статьи",
      addLabel: "Блок",
      createItem: () => ({ type: "paragraph", text: "" }),
      itemTitle: (item, index) =>
        `${index + 1}. ${item.type === "image" ? "Изображение" : "Абзац"}`,
      fields: [
        {
          kind: "select",
          name: "type",
          label: "Тип блока",
          options: [
            { value: "paragraph", label: "Абзац" },
            { value: "image", label: "Изображение" },
          ],
        },
        {
          kind: "textarea",
          name: "text",
          label: "Текст",
          rows: 6,
          visibleWhen: { field: "type", equals: "paragraph" },
        },
        {
          kind: "image",
          name: "imageSrc",
          label: "Изображение",
          visibleWhen: { field: "type", equals: "image" },
        },
        {
          kind: "text",
          name: "imageAlt",
          label: "Описание изображения",
          visibleWhen: { field: "type", equals: "image" },
        },
      ],
    },
    { kind: "text", name: "sourceHref", label: "Ссылка на источник" },
    { kind: "text", name: "sourceLabel", label: "Подпись источника" },
    {
      kind: "group",
      name: "meta",
      label: "SEO",
      fields: [
        { kind: "text", name: "title", label: "Title" },
        { kind: "textarea", name: "description", label: "Description", rows: 3 },
      ],
    },
  ],
};

const vacanciesSection: AdminCollectionSection = {
  key: "vacancies",
  title: "Вакансии",
  description: "Список открытых позиций на странице «Вакансии».",
  group: "content",
  publicPath: "/vacancies",
  mode: "collection",
  storage: {
    kind: "blockPath",
    pageSlug: LANDING_PAGE_SLUGS.vacancies,
    blockType: "vacancies",
    path: ["vacancies"],
  },
  addLabel: "Новая вакансия",
  emptyLabel: "Открытых вакансий нет",
  itemTitle: (values) => text(values, "title"),
  itemMeta: (values) => text(values, "employment"),
  createValues: () => ({
    id: crypto.randomUUID(),
    title: "Новая вакансия",
    employment: "Полная занятость",
  }),
  fields: [
    { kind: "text", name: "title", label: "Название" },
    { kind: "text", name: "employment", label: "Занятость" },
  ],
};

const caseStudiesSection: AdminCollectionSection = {
  key: "case-studies",
  title: "Кейсы",
  description: "Карусель клиентских кейсов на главной странице.",
  group: "content",
  publicPath: "/",
  mode: "collection",
  storage: {
    kind: "blockPath",
    pageSlug: LANDING_PAGE_SLUGS.home,
    blockType: "caseStudies",
    path: ["items"],
  },
  addLabel: "Новый кейс",
  emptyLabel: "Кейсов пока нет",
  itemTitle: (values, index) => text(values, "panelAlt") || `Кейс ${index + 1}`,
  itemMeta: (values) => `${text(values, "metric")} — ${text(values, "metricLabel")}`,
  createValues: () => ({
    href: "#",
    panelSrc: "",
    panelAlt: "Логотип компании",
    logoSrc: "",
    logoWidth: 249,
    logoHeight: 60,
    description: "",
    metric: "0%",
    metricLabel: "",
  }),
  fields: [
    { kind: "text", name: "panelAlt", label: "Название компании" },
    { kind: "textarea", name: "description", label: "Описание кейса", rows: 5 },
    { kind: "text", name: "metric", label: "Метрика" },
    { kind: "text", name: "metricLabel", label: "Подпись метрики" },
    { kind: "text", name: "href", label: "Ссылка" },
    { kind: "image", name: "logoSrc", label: "Логотип" },
    { kind: "number", name: "logoWidth", label: "Ширина логотипа" },
    { kind: "number", name: "logoHeight", label: "Высота логотипа" },
    { kind: "image", name: "panelSrc", label: "Фон карточки" },
  ],
};

const testimonialsSection: AdminCollectionSection = {
  key: "testimonials",
  title: "Отзывы",
  description: "Карусель отзывов клиентов на главной странице.",
  group: "content",
  publicPath: "/",
  mode: "collection",
  storage: {
    kind: "blockPath",
    pageSlug: LANDING_PAGE_SLUGS.home,
    blockType: "testimonials",
    path: ["items"],
  },
  addLabel: "Новый отзыв",
  emptyLabel: "Отзывов пока нет",
  itemTitle: (values) => text(values, "company"),
  itemMeta: (values) => `${text(values, "role")} · ${text(values, "date")}`,
  createValues: () => ({
    company: "Компания",
    role: "",
    date: new Date().toISOString().slice(0, 10),
    quote: "",
    logoSrc: "",
    logoWidth: 32,
    logoHeight: 32,
  }),
  toForm: (item) => ({
    ...item,
    date: parseDisplayDate(text(item, "date")),
  }),
  fromForm: (values) => ({
    ...values,
    date: formatPublishedLabel(text(values, "date")),
  }),
  fields: [
    { kind: "text", name: "company", label: "Компания" },
    { kind: "text", name: "role", label: "Автор и должность" },
    { kind: "date", name: "date", label: "Дата" },
    { kind: "textarea", name: "quote", label: "Текст отзыва", rows: 8 },
    { kind: "image", name: "logoSrc", label: "Логотип" },
    { kind: "number", name: "logoWidth", label: "Ширина логотипа" },
    { kind: "number", name: "logoHeight", label: "Высота логотипа" },
  ],
};

const heroSegmentsSection: AdminCollectionSection = {
  key: "hero-segments",
  title: "Сегменты в первом экране",
  description: "Переключатель сегментов в hero-блоке главной страницы.",
  group: "content",
  publicPath: "/",
  mode: "collection",
  storage: {
    kind: "blockPath",
    pageSlug: LANDING_PAGE_SLUGS.home,
    blockType: "hero",
    path: ["segments"],
  },
  addLabel: "Новый сегмент",
  emptyLabel: "Сегментов пока нет",
  itemTitle: (values) => text(values, "label"),
  itemMeta: (values) => text(values, "href"),
  createValues: () => ({
    label: "Новый сегмент",
    imageSrc: "",
    thumbImageSrc: "",
    href: `/clients/${clientSegmentSlugs[0]}`,
  }),
  fields: [
    { kind: "text", name: "label", label: "Подпись" },
    { kind: "image", name: "imageSrc", label: "Скриншот (dashboard)" },
    { kind: "image", name: "thumbImageSrc", label: "Миниатюра сегмента" },
    { kind: "text", name: "href", label: "Ссылка" },
  ],
};

const partnersLogosSection: AdminCollectionSection = {
  key: "partners-logos",
  title: "Компании-партнёры",
  description:
    "Логотипы в бегущей строке «Нам доверяют». Каждый ряд зацикливается автоматически.",
  group: "company",
  publicPath: "/about",
  mode: "collection",
  storage: {
    kind: "blockPath",
    pageSlug: LANDING_PAGE_SLUGS.about,
    blockType: "trusted",
    path: ["rows"],
  },
  addLabel: "Новый ряд",
  emptyLabel: "Рядов пока нет",
  itemTitle: (values, index) => `Ряд ${index + 1}`,
  itemMeta: (values) =>
    `${Array.isArray(values.items) ? values.items.length : 0} логотипов`,
  createValues: () => ({ id: crypto.randomUUID(), items: [] }),
  toForm: (item) => ({
    ...item,
    items: unwrapMarqueeItems(Array.isArray(item.items) ? (item.items as AdminValues[]) : []),
  }),
  fromForm: (values) => ({
    ...values,
    items: wrapMarqueeItems(
      text(values, "id") || crypto.randomUUID(),
      Array.isArray(values.items) ? (values.items as AdminValues[]) : [],
    ),
  }),
  fields: [
    {
      kind: "list",
      name: "items",
      label: "Логотипы",
      addLabel: "Логотип",
      createItem: () => ({ cellWidth: 297, src: "", logoWidth: 224, logoHeight: 48 }),
      itemTitle: (item, index) => `Логотип ${index + 1}`,
      fields: [
        { kind: "image", name: "src", label: "Файл" },
        { kind: "number", name: "logoWidth", label: "Ширина логотипа" },
        { kind: "number", name: "logoHeight", label: "Высота логотипа" },
        { kind: "number", name: "cellWidth", label: "Ширина ячейки" },
      ],
    },
  ],
};

const awardsSection: AdminCollectionSection = {
  key: "awards",
  title: "Награды и признание",
  description: "Карусель дипломов и наград на странице «О компании».",
  group: "company",
  publicPath: "/about",
  mode: "collection",
  storage: {
    kind: "blockPath",
    pageSlug: LANDING_PAGE_SLUGS.about,
    blockType: "partner",
    path: ["awards"],
  },
  addLabel: "Новая награда",
  emptyLabel: "Наград пока нет",
  itemTitle: (values) => text(values, "title"),
  itemMeta: (values) => `${text(values, "status")} · ${text(values, "project")}`,
  createValues: () => ({
    id: crypto.randomUUID(),
    title: "Награда",
    status: "Номинант",
    nomination: "",
    project: "",
    document: { src: "", alt: "", width: 684, height: 968 },
  }),
  fields: [
    { kind: "text", name: "title", label: "Название" },
    { kind: "text", name: "status", label: "Статус" },
    { kind: "textarea", name: "nomination", label: "Номинация", rows: 3 },
    { kind: "text", name: "project", label: "Проект" },
    {
      kind: "group",
      name: "document",
      label: "Скан документа",
      fields: [
        { kind: "image", name: "src", label: "Файл" },
        { kind: "text", name: "alt", label: "Описание" },
        { kind: "number", name: "width", label: "Ширина" },
        { kind: "number", name: "height", label: "Высота" },
      ],
    },
  ],
};

const leadershipSection: AdminCollectionSection = {
  key: "leadership",
  title: "Руководство",
  description: "Карточки команды на странице «О компании».",
  group: "company",
  publicPath: "/about",
  mode: "collection",
  storage: {
    kind: "blockPath",
    pageSlug: LANDING_PAGE_SLUGS.about,
    blockType: "leadership",
    path: ["members"],
  },
  addLabel: "Новый участник",
  emptyLabel: "Карточек пока нет",
  itemTitle: (values) => text(values, "name"),
  itemMeta: (values) => text(values, "role"),
  createValues: () => ({
    id: crypto.randomUUID(),
    name: "Имя Фамилия",
    role: "Роль",
    imageSrc: "",
  }),
  fields: [
    { kind: "text", name: "name", label: "Имя" },
    { kind: "text", name: "role", label: "Роль" },
    { kind: "image", name: "imageSrc", label: "Фото" },
  ],
};

const historySection: AdminCollectionSection = {
  key: "history",
  title: "История компании",
  description: "Таймлайн ключевых событий на странице «О компании».",
  group: "company",
  publicPath: "/about",
  mode: "collection",
  storage: {
    kind: "blockPath",
    pageSlug: LANDING_PAGE_SLUGS.about,
    blockType: "history",
    path: ["timeline"],
  },
  addLabel: "Новое событие",
  emptyLabel: "Событий пока нет",
  itemTitle: (values) => text(values, "year"),
  itemMeta: (values) => text(values, "text"),
  createValues: () => ({ year: "", text: "" }),
  fields: [
    { kind: "text", name: "year", label: "Год" },
    { kind: "textarea", name: "text", label: "Событие", rows: 3 },
  ],
};

function missionItemsFromStored(values: AdminValues): AdminValues[] {
  const rawItems = Array.isArray(values.items) ? values.items : [];
  const markers = Array.isArray(values.markers)
    ? values.markers.map((marker) => asValues(marker))
    : [];
  const length = Math.max(rawItems.length, markers.length);

  return Array.from({ length }, (_, index) => {
    const item = rawItems[index];
    const marker = markers[index];

    if (typeof item === "string") {
      return {
        text: item,
        iconSrc: text(marker, "iconSrc"),
        alt: text(marker, "alt"),
      };
    }

    const record = asValues(item);
    return {
      text: text(record, "text"),
      iconSrc: text(record, "iconSrc") || text(marker, "iconSrc"),
      alt: text(record, "alt") || text(marker, "alt"),
    };
  });
}

function asValues(value: unknown): AdminValues {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as AdminValues)
    : {};
}

const missionSection: AdminSingletonSection = {
  key: "mission",
  title: "Миссия",
  description: "Пункты миссии рядом с таймлайном на странице «О компании».",
  group: "company",
  publicPath: "/about",
  mode: "singleton",
  storage: {
    kind: "blockPath",
    pageSlug: LANDING_PAGE_SLUGS.about,
    blockType: "history",
    path: ["mission"],
  },
  toForm: (values) => ({
    tag: text(values, "tag"),
    items: missionItemsFromStored(values),
  }),
  fromForm: (values) => {
    const formItems = Array.isArray(values.items)
      ? (values.items as AdminValues[])
      : [];

    return {
      tag: text(values, "tag"),
      items: formItems.map((item) => text(item, "text")),
      markers: formItems.map((item) => ({
        iconSrc: text(item, "iconSrc"),
        alt: text(item, "alt"),
      })),
    };
  },
  fields: [
    { kind: "text", name: "tag", label: "Подпись блока" },
    {
      kind: "list",
      name: "items",
      label: "Пункты",
      addLabel: "Пункт",
      createItem: () => ({ text: "", iconSrc: "", alt: "" }),
      itemTitle: (item, index) =>
        text(item, "text").trim().slice(0, 60) || `Пункт ${index + 1}`,
      fields: [
        { kind: "textarea", name: "text", label: "Текст", rows: 3 },
        {
          kind: "image",
          name: "iconSrc",
          label: "Маркер (SVG)",
          accept: ".svg,image/svg+xml",
        },
        { kind: "text", name: "alt", label: "Описание маркера" },
      ],
    },
  ],
};

const documentsCompanySection: AdminSingletonSection = {
  key: "documents-company",
  title: "Реквизиты компании",
  description: "Блок со сведениями о юридическом лице на странице «Документы».",
  group: "documents",
  publicPath: "/documents",
  mode: "singleton",
  storage: {
    kind: "blockPath",
    pageSlug: LANDING_PAGE_SLUGS.documents,
    blockType: "documentsPage",
    path: ["company"],
  },
  fields: [
    { kind: "text", name: "name", label: "Название" },
    { kind: "textarea", name: "legalAddress", label: "Юридический адрес", rows: 3 },
    { kind: "textarea", name: "activity", label: "Вид деятельности", rows: 3 },
    { kind: "text", name: "activityCode", label: "Коды деятельности" },
    { kind: "text", name: "inn", label: "ИНН / ОГРН" },
  ],
};

export const DOCUMENTS_CATEGORIES_SECTION_KEY = "documents-categories";

const documentsCategoriesSection: AdminCollectionSection = {
  key: DOCUMENTS_CATEGORIES_SECTION_KEY,
  title: "Категории документов",
  description:
    "Разделы и PDF-файлы на странице «Документы». Для документов на отдельной странице страница создаётся автоматически.",
  group: "documents",
  publicPath: "/documents",
  mode: "collection",
  storage: {
    kind: "blockPath",
    pageSlug: LANDING_PAGE_SLUGS.documents,
    blockType: "documentsPage",
    path: ["categories"],
  },
  addLabel: "Новая категория",
  emptyLabel: "Категорий пока нет",
  itemTitle: (values) => text(values, "title"),
  itemMeta: (values) =>
    `${Array.isArray(values.items) ? values.items.length : 0} документов`,
  createValues: () => ({ id: crypto.randomUUID(), title: "Новая категория", items: [] }),
  fromForm: (values) => ({
    ...values,
    id: text(values, "id") || slugify(text(values, "title")) || crypto.randomUUID(),
    items: (Array.isArray(values.items) ? (values.items as AdminValues[]) : []).map(
      (item) => {
        const slug =
          slugify(text(item, "slug")) ||
          slugify(text(item, "title")) ||
          `document-${crypto.randomUUID().slice(0, 8)}`;
        return { ...item, id: slug, slug, href: `/documents/${slug}` };
      },
    ),
  }),
  fields: [
    { kind: "text", name: "title", label: "Название категории" },
    {
      kind: "list",
      name: "items",
      label: "Документы",
      addLabel: "Документ",
      createItem: () => ({ title: "Новый документ", slug: "", pdfSrc: "", presentation: "page" }),
      itemTitle: (item, index) => text(item, "title") || `Документ ${index + 1}`,
      fields: [
        { kind: "text", name: "title", label: "Название" },
        {
          kind: "text",
          name: "slug",
          label: "Адрес",
          hint: "Латиницей, через дефис.",
        },
        { kind: "file", name: "pdfSrc", label: "PDF-файл", accept: ".pdf" },
        {
          kind: "select",
          name: "presentation",
          label: "Как открывать",
          options: [
            { value: "page", label: "Отдельной страницей" },
            { value: "modal", label: "Во всплывающем окне" },
          ],
        },
      ],
    },
  ],
};

const documentsCertificatesSection: AdminCollectionSection = {
  key: "documents-certificates",
  title: "Свидетельства",
  description: "Галерея свидетельств внизу страницы «Документы».",
  group: "documents",
  publicPath: "/documents",
  mode: "collection",
  storage: {
    kind: "blockPath",
    pageSlug: LANDING_PAGE_SLUGS.documents,
    blockType: "documentsPage",
    path: ["certificates"],
  },
  addLabel: "Новое свидетельство",
  emptyLabel: "Свидетельств пока нет",
  itemTitle: (values) => text(values, "title"),
  createValues: () => ({
    id: crypto.randomUUID(),
    title: "Свидетельство",
    imageSrc: "",
    imageAlt: "",
    imageWidth: 725,
    imageHeight: 1024,
  }),
  fields: [
    { kind: "text", name: "title", label: "Название" },
    { kind: "image", name: "imageSrc", label: "Изображение" },
    { kind: "text", name: "imageAlt", label: "Alt-текст" },
    { kind: "number", name: "imageWidth", label: "Ширина" },
    { kind: "number", name: "imageHeight", label: "Высота" },
  ],
};

const documentsSoftwareRightsSection: AdminSingletonSection = {
  key: "documents-software-rights",
  title: "Права на ПО",
  description: "Номера свидетельств о регистрации ПО и пояснения к правам.",
  group: "documents",
  publicPath: "/documents",
  mode: "singleton",
  storage: {
    kind: "blockPath",
    pageSlug: LANDING_PAGE_SLUGS.documents,
    blockType: "documentsPage",
    path: ["softwareRights"],
  },
  fields: [
    {
      kind: "stringList",
      name: "registrations",
      label: "Регистрации",
      addLabel: "Регистрация",
    },
    {
      kind: "stringList",
      name: "paragraphs",
      label: "Пояснения",
      addLabel: "Абзац",
      multiline: true,
    },
  ],
};

const footerSection: AdminSingletonSection = {
  key: "footer",
  title: "Футер",
  description: "Контакты, соцсети и ссылки в подвале всех страниц.",
  group: "global",
  publicPath: "/",
  mode: "singleton",
  storage: {
    kind: "blockPath",
    pageSlug: LANDING_PAGE_SLUGS.footer,
    blockType: "footer",
    path: [],
  },
  fields: [
    {
      kind: "group",
      name: "contacts",
      label: "Контакты",
      fields: [
        { kind: "text", name: "phone", label: "Телефон" },
        { kind: "text", name: "email", label: "E-mail" },
        {
          kind: "list",
          name: "social",
          label: "Соцсети",
          addLabel: "Соцсеть",
          createItem: () => ({
            label: "Telegram",
            href: "",
            iconSrc: "",
            width: 32,
            height: 28,
          }),
          itemTitle: (item, index) => text(item, "label") || `Соцсеть ${index + 1}`,
          fields: [
            { kind: "text", name: "label", label: "Название" },
            { kind: "text", name: "href", label: "Ссылка" },
            { kind: "image", name: "iconSrc", label: "Иконка" },
            { kind: "number", name: "width", label: "Ширина" },
            { kind: "number", name: "height", label: "Высота" },
          ],
        },
      ],
    },
    { kind: "text", name: "menuTitle", label: "Заголовок колонки «Меню»" },
    {
      kind: "list",
      name: "menu",
      label: "Меню",
      addLabel: "Ссылка",
      createItem: () => ({ label: "", href: "" }),
      itemTitle: (item, index) => text(item, "label") || `Ссылка ${index + 1}`,
      fields: [
        { kind: "text", name: "label", label: "Подпись" },
        { kind: "text", name: "href", label: "Ссылка" },
      ],
    },
    { kind: "text", name: "solutionsTitle", label: "Заголовок колонки «Клиентам»" },
    {
      kind: "list",
      name: "solutions",
      label: "Клиентам",
      addLabel: "Ссылка",
      createItem: () => ({ label: "", href: "" }),
      itemTitle: (item, index) => text(item, "label") || `Ссылка ${index + 1}`,
      fields: [
        { kind: "text", name: "label", label: "Подпись" },
        { kind: "text", name: "href", label: "Ссылка" },
      ],
    },
    { kind: "text", name: "contactsTitle", label: "Заголовок колонки «Контакты»" },
    {
      kind: "list",
      name: "legal",
      label: "Правовые ссылки",
      addLabel: "Ссылка",
      createItem: () => ({ label: "", href: "" }),
      itemTitle: (item, index) => text(item, "label") || `Ссылка ${index + 1}`,
      fields: [
        { kind: "text", name: "label", label: "Подпись" },
        { kind: "text", name: "href", label: "Ссылка" },
      ],
    },
    { kind: "text", name: "copyright", label: "Копирайт" },
  ],
};

export const ADMIN_SECTIONS: readonly AdminSection[] = [
  articlesSection,
  caseStudiesSection,
  testimonialsSection,
  vacanciesSection,
  heroSegmentsSection,
  partnersLogosSection,
  awardsSection,
  leadershipSection,
  historySection,
  missionSection,
  documentsCompanySection,
  documentsCategoriesSection,
  documentsCertificatesSection,
  documentsSoftwareRightsSection,
  footerSection,
];

export function getAdminSection(key: string): AdminSection | null {
  return ADMIN_SECTIONS.find((section) => section.key === key) ?? null;
}

export function adminSectionPath(section: AdminSection): string {
  return `/admin/content/${section.key}`;
}
