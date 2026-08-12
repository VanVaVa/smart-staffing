export const ADMIN_SESSION_COOKIE = "admin_session";

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type SessionPayload = {
  userId: string;
  exp: number;
};

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set");
  }
  return secret;
}

const textEncoder = new TextEncoder();

function toBase64Url(bytes: ArrayBuffer): string {
  const binary = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

async function getSigningKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    textEncoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function encodePayload(payload: SessionPayload): string {
  const json = JSON.stringify(payload);
  const bytes = textEncoder.encode(json);
  const binary = String.fromCharCode(...bytes);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodePayload(encoded: string): SessionPayload | null {
  try {
    const bytes = fromBase64Url(encoded);
    const json = new TextDecoder().decode(bytes);
    const parsed: unknown = JSON.parse(json);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "userId" in parsed &&
      "exp" in parsed &&
      typeof (parsed as SessionPayload).userId === "string" &&
      typeof (parsed as SessionPayload).exp === "number"
    ) {
      return parsed as SessionPayload;
    }
    return null;
  } catch {
    return null;
  }
}

async function signEncodedPayload(encoded: string): Promise<string> {
  const key = await getSigningKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    textEncoder.encode(encoded),
  );
  return toBase64Url(signature);
}

export async function createAdminSessionToken(userId: string): Promise<string> {
  const payload: SessionPayload = {
    userId,
    exp: Date.now() + SESSION_TTL_MS,
  };
  const encoded = encodePayload(payload);
  const signature = await signEncodedPayload(encoded);
  return `${encoded}.${signature}`;
}

export async function verifyAdminSessionToken(
  token: string,
): Promise<SessionPayload | null> {
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) {
    return null;
  }

  const key = await getSigningKey();
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    new Uint8Array(fromBase64Url(signature)),
    textEncoder.encode(encoded),
  );

  if (!valid) {
    return null;
  }

  const payload = decodePayload(encoded);
  if (!payload || payload.exp < Date.now()) {
    return null;
  }

  return payload;
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  };
}
