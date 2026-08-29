"use client";

import { Share2 } from "lucide-react";
import { buildWaMessage } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

/** Botão de convite: abre o WhatsApp com a mensagem de indicação pronta. */
export function ReferralShare() {
  function handleShare() {
    track("referral_share");
    const msg = buildWaMessage({ context: "referral" });
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="btn-gold mt-8 inline-flex min-h-11 items-center gap-2 px-6 py-3 text-sm"
    >
      <Share2 className="size-4" aria-hidden="true" />
      Convidar pelo WhatsApp
    </button>
  );
}
