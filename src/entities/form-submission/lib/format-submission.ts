const CHANNEL_LABELS: Record<string, string> = {
  telegram: "Telegram",
  phone: "Телефон",
  email: "Email",
};

export function formatSubmissionChannel(channel: string | null): string {
  if (!channel) {
    return "—";
  }
  return CHANNEL_LABELS[channel] ?? channel;
}

export function formatSubmissionDate(date: Date): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatSubmissionSource(
  sourcePath: string,
  sourceLabel: string | null,
): string {
  if (sourceLabel) {
    return `${sourceLabel} (${sourcePath})`;
  }
  return sourcePath;
}
