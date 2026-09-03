import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "p",
  "strong",
  "em",
  "a",
  "ul",
  "ol",
  "li",
  "h2",
  "h3",
  "blockquote",
] as const;

function normalizePlainText(value: string): string {
  const trimmed = value.trim();
  if (!trimmed || /<[^>]+>/.test(trimmed)) {
    return trimmed;
  }
  return `<p>${trimmed}</p>`;
}

export function sanitizeArticleHtml(value: string): string {
  const normalized = normalizePlainText(value);
  if (!normalized) {
    return "";
  }

  return sanitizeHtml(normalized, {
    allowedTags: [...ALLOWED_TAGS],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: (_tagName, attribs) => ({
        tagName: "a",
        attribs: {
          href: attribs.href ?? "",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    },
  });
}
