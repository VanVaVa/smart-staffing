"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "cookie-consent-accepted";

const listeners = new Set<() => void>();
let acceptedInSession = false;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function readAccepted(): boolean {
  if (acceptedInSession) {
    return true;
  }
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function readServerAccepted(): null {
  return null;
}

export function acceptCookieConsent() {
  acceptedInSession = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, "true");
  } catch {}
  listeners.forEach((listener) => listener());
}

export function useCookieConsentAccepted(): boolean | null {
  return useSyncExternalStore(subscribe, readAccepted, readServerAccepted);
}
