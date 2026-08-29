"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { LeadForm } from "@/components/shared/LeadForm";
import { siteConfig } from "@/config/site.config";
import { track } from "@/lib/analytics";

const SEEN_KEY = "gauto_exit_modal_seen";

/**
 * Exit-intent no desktop / 60% de scroll no mobile — 1x por sessão.
 */
export function ExitIntentModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!siteConfig.entryOffer.enabled) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch {
      return;
    }

    function show() {
      try {
        if (sessionStorage.getItem(SEEN_KEY)) return;
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* noop */
      }
      track("exit_modal_view");
      setOpen(true);
    }

    function onMouseOut(e: MouseEvent) {
      if (e.clientY <= 0 && !e.relatedTarget) show();
    }
    function onScroll() {
      const p = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (p > 0.6 && window.matchMedia("(max-width: 767px)").matches) show();
    }

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md bg-gauto-champagne">
        <DialogTitle className="type-section text-xl text-gauto-graphite">
          Antes de ir: {siteConfig.entryOffer.title.toLowerCase()}
        </DialogTitle>
        <DialogDescription className="text-sm text-gauto-graphite/80">
          {siteConfig.entryOffer.description}
        </DialogDescription>
        <LeadForm source="exit_modal" onSubmitted={() => track("exit_modal_submit")} />
      </DialogContent>
    </Dialog>
  );
}
