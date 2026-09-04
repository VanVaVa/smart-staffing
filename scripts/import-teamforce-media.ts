import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import type {
  MediaArticleBodyBlock,
  MediaArticleContent,
  MediaArticleTag,
} from "../src/entities/landing/model/media-content";

const LISTING_URL = "https://teamforce.ru/mediatax/smartstaffing/";
const MEDIA_BASE = "https://teamforce.ru/media";
const OUTPUT_TS = path.join(
  process.cwd(),
  "src",
  "entities",
  "landing",
  "model",
  "media-articles-seed.ts",
);
const IMAGES_DIR = path.join(
  process.cwd(),
  "public",
  "landing",
  "media",
  "articles",
);

const DEFAULT_IMAGE = "/landing/media/media-news.png";

type ParsedArticle = {
  slug: string;
  sourceUrl: string;
  title: string;
  lead: string;
  publishedLabel: string;
  publishedAt: string;
  tagLabel: string;
  tag: MediaArticleTag;
  heroImageUrl: string;
  bodyHtml: string;
};

function decodeHtml(value: string): string {
  return value
    .replace(/&nbsp;/g, "\u00a0")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#038;/g, "&")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, "\u201c")
    .replace(/&#8221;/g, "\u201d")
    .replace(/&#8230;/g, "…")
    .replace(/&#(\d+);/g, (_, code) =>
      String.fromCharCode(Number.parseInt(code, 10)),
    );
}

function stripTags(value: string): string {
  return decodeHtml(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function matchOne(html: string, pattern: RegExp): string {
  const match = html.match(pattern);
  return match?.[1] ? decodeHtml(match[1].trim()) : "";
}

function parsePublishedAt(label: string): string {
  const match = label.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) {
    return "1970-01-01";
  }
  const [, day, month, year] = match;
  return `${year}-${month}-${day}`;
}

function mapTag(tagLabel: string): MediaArticleTag {
  const normalized = tagLabel.trim().toLowerCase();
  if (normalized.includes("важн")) {
    return "important";
  }
  if (normalized.includes("новост")) {
    return "news";
  }
  return "interesting";
}

function mapTagLabel(tag: MediaArticleTag): string {
  if (tag === "important") {
    return "Важное";
  }
  if (tag === "news") {
    return "Новость";
  }
  return "Интересное";
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: { "User-Agent": "smart-staffing-import/1.0" },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
  }
  return response.text();
}

function collectListingSlugs(html: string): string[] {
  const slugs = new Set<string>();
  const pattern = /https:\/\/teamforce\.ru\/media\/([a-z0-9-]+)\//g;
  for (const match of html.matchAll(pattern)) {
    slugs.add(match[1]);
  }
  return [...slugs];
}

function parseArticleHtml(slug: string, html: string): ParsedArticle {
  const sourceUrl = `${MEDIA_BASE}/${slug}/`;
  const title = matchOne(html, /<h1 class="blog-state__title">\s*([\s\S]*?)\s*<\/h1>/);
  const lead = matchOne(
    html,
    /<h2 class="blog-state__title _text-medium">\s*([\s\S]*?)\s*<\/h2>/,
  );
  const publishedLabel = matchOne(
    html,
    /<p class="blog-state__top-date">([^<]+)<\/p>/,
  );
  const tagLabel = matchOne(html, /<p class="blog-state__top-type">\s*([\s\S]*?)\s*<\/p>/);
  const heroImageUrl =
    matchOne(html, /<img[^>]*class="blog-state__img"[^>]*src="([^"]+)"/) ||
    matchOne(html, /property="og:image" content="([^"]+)"/);
  const bodyMatch = html.match(
    /<div class="blog-state__info">\s*([\s\S]*?)\s*<\/div>\s*<ul class="blog-state__socials">/,
  );

  if (!title) {
    throw new Error(`Missing title for ${sourceUrl}`);
  }

  return {
    slug,
    sourceUrl,
    title: stripTags(title),
    lead: stripTags(lead),
    publishedLabel: publishedLabel || "01.01.1970",
    publishedAt: parsePublishedAt(publishedLabel || "01.01.1970"),
    tagLabel: tagLabel || "Новости",
    tag: mapTag(tagLabel || "Новости"),
    heroImageUrl,
    bodyHtml: bodyMatch?.[1] ?? "",
  };
}

function getExtensionFromUrl(url: string): string {
  const pathname = new URL(url).pathname;
  const ext = path.extname(pathname).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".webp") {
    return ext;
  }
  return ".jpg";
}

async function downloadImage(
  url: string,
  fileName: string,
): Promise<string | null> {
  if (!url || url.startsWith("data:")) {
    return null;
  }

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "smart-staffing-import/1.0" },
    });
    if (!response.ok) {
      return null;
    }
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.startsWith("image/")) {
      return null;
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    const outputPath = path.join(IMAGES_DIR, fileName);
    await writeFile(outputPath, buffer);
    return `/landing/media/articles/${fileName}`;
  } catch {
    return null;
  }
}

type BodyChunk =
  | { kind: "paragraph"; text: string }
  | { kind: "image"; url: string; alt: string };

function splitBodyHtml(bodyHtml: string): BodyChunk[] {
  const chunks: BodyChunk[] = [];
  const pattern =
    /<p class="blog-state__text">([\s\S]*?)<\/p>|<blockquote>([\s\S]*?)<\/blockquote>|<img\b[^>]*>/g;

  for (const match of bodyHtml.matchAll(pattern)) {
    if (match[1] !== undefined) {
      const text = stripTags(match[1]);
      if (text) {
        chunks.push({ kind: "paragraph", text });
      }
      continue;
    }
    if (match[2] !== undefined) {
      const text = stripTags(match[2]);
      if (text) {
        chunks.push({ kind: "paragraph", text });
      }
      continue;
    }
    if (match[3] !== undefined) {
      const tag = match[3];
      const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
      if (!src || src.startsWith("data:")) {
        continue;
      }
      const alt = tag.match(/\balt="([^"]*)"/)?.[1] ?? "";
      chunks.push({ kind: "image", url: src, alt });
    }
  }

  return chunks;
}

async function buildBodyBlocks(
  slug: string,
  bodyHtml: string,
): Promise<MediaArticleBodyBlock[]> {
  const blocks: MediaArticleBodyBlock[] = [];
  let imageIndex = 0;

  for (const chunk of splitBodyHtml(bodyHtml)) {
    if (chunk.kind === "paragraph") {
      blocks.push({ type: "paragraph", text: chunk.text });
      continue;
    }

    imageIndex += 1;
    const ext = getExtensionFromUrl(chunk.url);
    const localPath = await downloadImage(
      chunk.url,
      `${slug}-inline-${imageIndex}${ext}`,
    );
    if (localPath) {
      blocks.push({
        type: "image",
        imageSrc: localPath,
        imageAlt: chunk.alt,
      });
    }
  }

  return blocks;
}

async function buildArticleContent(parsed: ParsedArticle): Promise<MediaArticleContent> {
  const heroExt = parsed.heroImageUrl
    ? getExtensionFromUrl(parsed.heroImageUrl)
    : ".jpg";
  const heroImageSrc =
    (parsed.heroImageUrl
      ? await downloadImage(
          parsed.heroImageUrl,
          `${parsed.slug}-hero${heroExt}`,
        )
      : null) ?? DEFAULT_IMAGE;

  const bodyBlocks = await buildBodyBlocks(parsed.slug, parsed.bodyHtml);
  const tag = parsed.tag;
  const tagLabel = mapTagLabel(tag);
  const description =
    parsed.lead ||
    (bodyBlocks.find((block) => block.type === "paragraph")?.text ?? parsed.title);

  return {
    id: parsed.slug,
    slug: parsed.slug,
    href: `/media/${parsed.slug}`,
    imageSrc: heroImageSrc,
    imageAlt: parsed.title,
    heroImageSrc,
    heroImageAlt: parsed.title,
    tag,
    tagLabel,
    tagTone: tag === "important" || tag === "interesting" || tag === "news" ? tag : "news",
    publishedAt: parsed.publishedAt,
    publishedLabel: parsed.publishedLabel,
    title: parsed.title,
    lead: parsed.lead || description,
    bodyBlocks:
      bodyBlocks.length > 0
        ? bodyBlocks
        : [{ type: "paragraph", text: description }],
    sourceHref: parsed.sourceUrl,
    sourceLabel: parsed.sourceUrl,
    meta: {
      title: `${parsed.title} — СмартСтаффинг`,
      description,
    },
  };
}

function serializeString(value: string): string {
  return JSON.stringify(value).replace(/\u00a0/g, "\\u00a0");
}

function serializeArticle(article: MediaArticleContent): string {
  const bodyBlocks = article.bodyBlocks
    .map((block) => {
      if (block.type === "paragraph") {
        return `      { type: "paragraph", text: ${serializeString(block.text)} }`;
      }
      return `      { type: "image", imageSrc: ${serializeString(block.imageSrc)}, imageAlt: ${serializeString(block.imageAlt)} }`;
    })
    .join(",\n");

  return `  {
    id: ${serializeString(article.id)},
    slug: ${serializeString(article.slug)},
    href: ${serializeString(article.href)},
    imageSrc: ${serializeString(article.imageSrc)},
    imageAlt: ${serializeString(article.imageAlt)},
    heroImageSrc: ${serializeString(article.heroImageSrc)},
    heroImageAlt: ${serializeString(article.heroImageAlt)},
    tag: ${serializeString(article.tag)},
    tagLabel: ${serializeString(article.tagLabel)},
    tagTone: ${serializeString(article.tagTone)},
    publishedAt: ${serializeString(article.publishedAt)},
    publishedLabel: ${serializeString(article.publishedLabel)},
    title: ${serializeString(article.title)},
    lead: ${serializeString(article.lead)},
    bodyBlocks: [
${bodyBlocks}
    ],
    sourceHref: ${serializeString(article.sourceHref)},
    sourceLabel: ${serializeString(article.sourceLabel)},
    meta: {
      title: ${serializeString(article.meta.title)},
      description: ${serializeString(article.meta.description)},
    },
  }`;
}

function serializeArticles(articles: MediaArticleContent[]): string {
  const items = articles.map(serializeArticle).join(",\n");
  return `import type { MediaArticleContent } from "./media-content";

export const TEAMFORCE_MEDIA_ARTICLES: MediaArticleContent[] = [
${items}
];
`;
}

async function main() {
  await mkdir(IMAGES_DIR, { recursive: true });

  const listingHtml = await fetchText(LISTING_URL);
  const slugs = collectListingSlugs(listingHtml);
  console.log(`Found ${slugs.length} articles on listing`);

  const articles: MediaArticleContent[] = [];

  for (const [index, slug] of slugs.entries()) {
    const url = `${MEDIA_BASE}/${slug}/`;
    process.stdout.write(`[${index + 1}/${slugs.length}] ${slug}... `);
    try {
      const html = await fetchText(url);
      const parsed = parseArticleHtml(slug, html);
      const article = await buildArticleContent(parsed);
      articles.push(article);
      console.log("ok");
    } catch (error) {
      console.log("failed");
      console.error(error);
    }
  }

  articles.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  await writeFile(OUTPUT_TS, serializeArticles(articles), "utf8");
  console.log(`Wrote ${articles.length} articles to ${OUTPUT_TS}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
