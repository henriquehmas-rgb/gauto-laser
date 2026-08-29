"use client";

import { MessageCircle } from "lucide-react";
import { buildWaLink } from "@/lib/whatsapp";
import { originSuffix } from "@/lib/utm";
import { track } from "@/lib/analytics";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/** Botão flutuante de WhatsApp — desktop apenas (mobile tem a sticky bar). */
export function FloatingWhatsApp() {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    track("cta_whatsapp_click", { position: "floating" });
    e.currentTarget.href = buildWaLink({ context: "floating", origin: originSuffix() });
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={buildWaLink({ context: "floating" })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            aria-label="Agendar avaliação pelo WhatsApp"
            className="btn-gold fixed bottom-6 right-6 z-40 hidden size-14 items-center justify-center shadow-lg md:flex"
          >
            <MessageCircle className="size-6" aria-hidden="true" />
          </a>
        </TooltipTrigger>
        <TooltipContent side="left">Agende sua avaliação</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
