"use client";

import { useEffect, useState } from "react";
import { CalendarCheck } from "lucide-react";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

/**
 * Barra fixa mobile: aparece após 30% de scroll.
 * Esconde quando um dialog do Radix está aberto (evita sobreposição).
 */
export function MobileStickyBar() {
  const [visible, setVisible] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setVisible(scrolled > 0.3);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const observer = new MutationObserver(() => {
      setDialogOpen(document.body.hasAttribute("data-scroll-locked"));
    });
    observer.observe(document.body, { attributes: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  if (!visible || dialogOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-px border-t border-gauto-hairline bg-gauto-champagne md:hidden">
      <WhatsAppButton context="sticky" className="flex-1 text-xs" showIcon>
        WhatsApp
      </WhatsAppButton>
      <a
        href="#oferta"
        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 bg-gauto-graphite px-4 py-3 text-xs font-semibold text-gauto-champagne"
      >
        <CalendarCheck className="size-4" aria-hidden="true" />
        Avaliação grátis
      </a>
    </div>
  );
}
