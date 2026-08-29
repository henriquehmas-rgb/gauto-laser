"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { GoogleTagManager } from "@next/third-parties/google";
import { siteConfig } from "@/config/site.config";
import { captureAttribution } from "@/lib/utm";

const CONSENT_KEY = "gauto_cookie_consent";

type Consent = "unknown" | "accepted" | "rejected";

/* Store mínimo: lê do localStorage e notifica quando o usuário decide. */
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getConsent(): Consent {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "rejected") return stored;
  } catch {
    /* storage indisponível: mantém banner */
  }
  return "unknown";
}

function setConsent(value: Exclude<Consent, "unknown">) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* noop */
  }
  listeners.forEach((cb) => cb());
}

/**
 * Banner LGPD: GTM só carrega após aceite. A atribuição (utm) é first-party
 * e necessária ao funcionamento do formulário — capturada sempre.
 */
export function ConsentBanner() {
  const consent = useSyncExternalStore(subscribe, getConsent, () => "unknown" as Consent);

  useEffect(() => {
    captureAttribution();
  }, []);

  const decide = setConsent;

  const gtmId = siteConfig.tracking.gtmId;

  return (
    <>
      {consent === "accepted" && gtmId && <GoogleTagManager gtmId={gtmId} />}
      {consent === "unknown" && (
        <div
          role="region"
          aria-label="Aviso de cookies"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-gauto-hairline bg-gauto-ivory p-4 shadow-lg md:bottom-4 md:left-auto md:right-4 md:max-w-sm md:border"
        >
          <p className="text-xs leading-relaxed text-gauto-graphite/85">
            Usamos cookies para medir o desempenho das nossas campanhas. Você escolhe:{" "}
            <Link href="/politica-de-privacidade" className="underline">
              política de privacidade
            </Link>
            .
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => decide("accepted")}
              className="btn-gold min-h-11 flex-1 px-4 py-2 text-xs"
            >
              Aceitar
            </button>
            <button
              type="button"
              onClick={() => decide("rejected")}
              className="min-h-11 flex-1 border border-gauto-hairline px-4 py-2 text-xs font-semibold text-gauto-graphite"
            >
              Só o essencial
            </button>
          </div>
        </div>
      )}
    </>
  );
}
