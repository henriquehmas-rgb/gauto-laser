"use client";

/**
 * Captura first-touch de utm_*, ref e click ids na primeira visita.
 * Persiste em sessionStorage + cookie 30 dias.
 */

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "ref", "fbclid", "gclid"] as const;
const STORE_KEY = "gauto_attribution";
const COOKIE_DAYS = 30;

export type Attribution = Partial<Record<(typeof KEYS)[number], string>>;

function readCookie(): Attribution | null {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${STORE_KEY}=([^;]*)`));
    return m ? (JSON.parse(decodeURIComponent(m[1])) as Attribution) : null;
  } catch {
    return null;
  }
}

export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const existing = sessionStorage.getItem(STORE_KEY);
    if (existing) return JSON.parse(existing) as Attribution;

    const cookie = readCookie();
    const params = new URLSearchParams(window.location.search);
    const fresh: Attribution = {};
    for (const k of KEYS) {
      const v = params.get(k);
      if (v) fresh[k] = v.slice(0, 120);
    }
    // first-touch: cookie antigo vence parâmetros novos ausentes
    const merged: Attribution = { ...fresh, ...(cookie ?? {}) };
    if (Object.keys(fresh).length > 0 && !cookie) {
      const exp = new Date(Date.now() + COOKIE_DAYS * 864e5).toUTCString();
      document.cookie = `${STORE_KEY}=${encodeURIComponent(JSON.stringify(fresh))}; expires=${exp}; path=/; SameSite=Lax`;
    }
    sessionStorage.setItem(STORE_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return {};
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw) as Attribution;
  } catch {
    /* noop */
  }
  return captureAttribution();
}

export function originSuffix(): string {
  const a = getAttribution();
  if (a.utm_source || a.utm_campaign) {
    return ` (origem: ${a.utm_source ?? "site"}/${a.utm_campaign ?? "-"})`;
  }
  return "";
}
