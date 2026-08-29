"use client";

import { MessageCircle } from "lucide-react";
import { buildWaLink, type WaContext } from "@/lib/whatsapp";
import { originSuffix } from "@/lib/utm";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  context: WaContext;
  treatment?: string;
  areas?: string[];
  answers?: { goal?: string; skin?: string; priority?: string };
  children: React.ReactNode;
  className?: string;
  variant?: "gold" | "outline" | "graphite";
  slug?: string;
  showIcon?: boolean;
}

const variantClasses = {
  gold: "btn-gold",
  outline:
    "border border-gauto-gold text-current hover:bg-gauto-gold/10 transition-colors",
  graphite: "bg-gauto-graphite text-gauto-champagne hover:bg-gauto-graphite/90 transition-colors",
};

export function WhatsAppButton({
  context,
  treatment,
  areas,
  answers,
  children,
  className,
  variant = "gold",
  slug,
  showIcon = true,
}: WhatsAppButtonProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    track("cta_whatsapp_click", { position: context, ...(slug ? { slug } : {}) });
    // recalcula com a origem no clique (sessionStorage disponível)
    e.currentTarget.href = buildWaLink({ context, treatment, areas, answers, origin: originSuffix() });
  }

  return (
    <a
      href={buildWaLink({ context, treatment, areas, answers })}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold",
        variantClasses[variant],
        className,
      )}
    >
      {showIcon && <MessageCircle className="size-4" aria-hidden="true" />}
      {children}
    </a>
  );
}
