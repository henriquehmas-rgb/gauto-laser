"use client";

import { useMemo, useState } from "react";
import { Clock, Percent } from "lucide-react";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { siteConfig } from "@/config/site.config";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const comboAreas = [
  { key: "axilas", label: "Axilas", minutes: 15 },
  { key: "virilha", label: "Virilha completa", minutes: 25 },
  { key: "pernas", label: "Pernas inteiras", minutes: 45 },
  { key: "meia-perna", label: "Meia perna", minutes: 25 },
  { key: "bracos", label: "Braços", minutes: 25 },
  { key: "buco", label: "Buço", minutes: 10 },
  { key: "rosto", label: "Rosto completo", minutes: 20 },
  { key: "barba", label: "Barba", minutes: 20 },
  { key: "costas", label: "Costas", minutes: 30 },
  { key: "peito", label: "Peito e abdômen", minutes: 30 },
];

export function ComboBuilder() {
  const [selected, setSelected] = useState<string[]>([]);

  const picked = useMemo(() => comboAreas.filter((a) => selected.includes(a.key)), [selected]);
  const totalMinutes = picked.reduce((acc, a) => acc + a.minutes, 0);
  const tier = [...siteConfig.combos.tiers].reverse().find((t) => picked.length >= t.areas);

  function toggle(key: string) {
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  return (
    <section id="combo" className="scroll-mt-36 border-y border-gauto-hairline bg-gauto-ivory">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <SectionEyebrow>Monte sua combinação</SectionEyebrow>
        <h2 className="type-display mt-3 text-2xl text-gauto-graphite md:text-4xl">
          Escolha as áreas, ganhe no combo
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-gauto-graphite/80 md:text-base">
          Selecione as áreas que quer tratar. Combinando{" "}
          {siteConfig.combos.tiers.map((t) => `${t.areas}+ áreas (${t.discount * 100}% off)`).join(" ou ")},
          o desconto é aplicado no fechamento do plano.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-wrap content-start gap-2">
            {comboAreas.map((a) => (
              <button
                key={a.key}
                type="button"
                aria-pressed={selected.includes(a.key)}
                onClick={() => toggle(a.key)}
                className={cn(
                  "min-h-11 border px-4 py-2.5 text-sm transition-colors",
                  selected.includes(a.key)
                    ? "border-gauto-gold bg-gauto-graphite text-gauto-champagne"
                    : "border-gauto-hairline bg-gauto-champagne text-gauto-graphite hover:border-gauto-gold/60",
                )}
              >
                {a.label}
              </button>
            ))}
          </div>

          <aside className="h-fit border border-gauto-hairline bg-gauto-champagne p-6">
            <p className="type-label text-[10px] text-gauto-gold-deep">Sua combinação</p>
            {picked.length === 0 ? (
              <p className="mt-3 text-sm text-gauto-graphite/80">
                Nenhuma área selecionada ainda.
              </p>
            ) : (
              <>
                <ul className="mt-3 space-y-1 text-sm text-gauto-graphite">
                  {picked.map((a) => (
                    <li key={a.key}>{a.label}</li>
                  ))}
                </ul>
                <div className="mt-4 space-y-2 border-t border-gauto-hairline pt-4 text-sm">
                  <p className="flex items-center gap-2 text-gauto-graphite/80">
                    <Clock className="size-4 text-gauto-gold-deep" aria-hidden="true" />~{totalMinutes} min
                    por sessão
                  </p>
                  {tier && (
                    <p className="flex items-center gap-2 font-semibold text-gauto-gold-deep">
                      <Percent className="size-4" aria-hidden="true" />
                      {tier.discount * 100}% de desconto no combo
                    </p>
                  )}
                </div>
              </>
            )}
            <div
              onClickCapture={() => {
                if (picked.length > 0)
                  track("combo_submit", { areas: picked.map((a) => a.key), count: picked.length });
              }}
            >
              <WhatsAppButton
                context="combo"
                areas={picked.map((a) => a.label)}
                className={cn("mt-5 w-full text-xs", picked.length === 0 && "pointer-events-none opacity-50")}
              >
                Pedir orçamento no WhatsApp
              </WhatsAppButton>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">
              Valor final após avaliação profissional.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
