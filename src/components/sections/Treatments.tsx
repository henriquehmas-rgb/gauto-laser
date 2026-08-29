"use client";

import { useMemo, useState } from "react";
import { Clock, Sun, CalendarRange, Sparkles } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import {
  treatments,
  categories,
  areaLabels,
  type Treatment,
  type TreatmentCategory,
  type Gender,
  type BodyArea,
} from "@/content/treatments";
import { siteConfig } from "@/config/site.config";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function priceLine(t: Treatment): string | null {
  if (siteConfig.pricing.mode === "hidden" || !t.priceFrom) return null;
  return `a partir de ${siteConfig.pricing.maxInstallments}x R$ ${t.priceFrom.toLocaleString("pt-BR")}`;
}

function TreatmentCard({ treatment }: { treatment: Treatment }) {
  const price = priceLine(treatment);
  return (
    <article className="group flex flex-col border border-gauto-hairline bg-gauto-ivory p-6 transition-all hover:-translate-y-0.5 hover:border-gauto-gold hover:shadow-md motion-reduce:transition-none">
      <div className="flex items-start justify-between gap-3">
        <h3 className="type-section text-lg text-gauto-graphite">{treatment.name}</h3>
        {treatment.popular && (
          <Badge className="shrink-0 border-gauto-gold bg-transparent text-[10px] text-gauto-gold-deep">
            <Sparkles className="size-3" aria-hidden="true" /> mais procurado
          </Badge>
        )}
      </div>
      <p className="type-label mt-1 text-[10px] text-gauto-warm-gray">{treatment.techLabel}</p>
      <p className="mt-3 text-sm text-gauto-graphite/85">{treatment.headline}</p>

      <ul className="mt-4 space-y-2 text-sm text-gauto-graphite/80">
        {treatment.benefits.map((b) => (
          <li key={b} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-gauto-gold" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gauto-graphite/70">
        <span className="flex items-center gap-1.5">
          <Clock className="size-3.5 text-gauto-gold-deep" aria-hidden="true" />
          {treatment.sessionMinutes} min
        </span>
        <span>{treatment.sessionsEstimate}</span>
        <span className="border border-gauto-hairline px-2 py-0.5">Dor: {treatment.painLevel}</span>
      </div>

      {price && <p className="mt-3 text-sm font-semibold text-gauto-graphite">{price}</p>}

      <div className="mt-6 flex flex-col gap-2">
        <WhatsAppButton
          context="card"
          treatment={treatment.name}
          slug={treatment.slug}
          className="w-full text-xs"
        >
          Agendar este tratamento
        </WhatsAppButton>
        <TreatmentDetails treatment={treatment} />
      </div>
      <p className="mt-4 text-[11px] text-gauto-warm-gray">
        Sujeito a avaliação profissional. Consulte contraindicações.
      </p>
    </article>
  );
}

function TreatmentDetails({ treatment }: { treatment: Treatment }) {
  const pairs = treatments.filter((t) => treatment.pairsWith.includes(t.slug));
  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) track("treatment_details_open", { slug: treatment.slug });
      }}
    >
      <DialogTrigger className="inline-flex min-h-11 w-full items-center justify-center border border-gauto-graphite/25 px-6 py-3 text-xs font-semibold text-gauto-graphite transition-colors hover:border-gauto-gold hover:text-gauto-gold-deep">
        Detalhes
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto bg-gauto-champagne">
        <DialogTitle className="type-section text-xl text-gauto-graphite">{treatment.name}</DialogTitle>
        <DialogDescription className="text-sm text-gauto-graphite/80">
          {treatment.headline}
        </DialogDescription>

        <div className="mt-2 grid grid-cols-1 gap-px border border-gauto-hairline bg-gauto-hairline text-sm sm:grid-cols-3">
          <div className="bg-gauto-ivory p-4">
            <Clock className="mb-2 size-4 text-gauto-gold-deep" aria-hidden="true" />
            <p className="font-semibold">{treatment.sessionMinutes} min</p>
            <p className="text-xs text-gauto-graphite/70">duração da sessão</p>
          </div>
          <div className="bg-gauto-ivory p-4">
            <CalendarRange className="mb-2 size-4 text-gauto-gold-deep" aria-hidden="true" />
            <p className="font-semibold">{treatment.intervalDays} dias</p>
            <p className="text-xs text-gauto-graphite/70">intervalo entre sessões</p>
          </div>
          <div className="bg-gauto-ivory p-4">
            <Sun className="mb-2 size-4 text-gauto-gold-deep" aria-hidden="true" />
            <p className="font-semibold">{treatment.sunExposureDays} dias</p>
            <p className="text-xs text-gauto-graphite/70">sem sol na área</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="type-label text-[10px] text-gauto-gold-deep">Como se preparar</p>
          <ul className="mt-2 space-y-1.5 text-sm text-gauto-graphite/85">
            {treatment.prep.map((p) => (
              <li key={p} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-gauto-gold" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {pairs.length > 0 && (
          <div className="mt-4">
            <p className="type-label text-[10px] text-gauto-gold-deep">Combina com</p>
            <p className="mt-2 text-sm text-gauto-graphite/85">
              {pairs.map((p) => p.name).join(" · ")}
            </p>
          </div>
        )}

        <p className="mt-4 text-xs text-gauto-warm-gray">
          Sujeito a avaliação profissional. Consulte contraindicações. Resultados variam por pessoa.
        </p>

        <WhatsAppButton context="card" treatment={treatment.name} slug={treatment.slug} className="mt-2 w-full">
          Agendar avaliação
        </WhatsAppButton>
      </DialogContent>
    </Dialog>
  );
}

export function Treatments() {
  const [category, setCategory] = useState<TreatmentCategory | "todos">("todos");
  const [gender, setGender] = useState<Gender>("feminino");
  const [area, setArea] = useState<BodyArea | null>(null);

  const filtered = useMemo(
    () =>
      treatments.filter(
        (t) =>
          (category === "todos" || t.category === category) &&
          t.genders.includes(gender) &&
          (area === null || t.areas.includes(area)),
      ),
    [category, gender, area],
  );

  return (
    <section id="tratamentos" className="scroll-mt-20 bg-gauto-champagne">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <SectionEyebrow>Tratamentos</SectionEyebrow>
        <h2 className="type-display mt-3 text-2xl text-gauto-graphite md:text-4xl">
          O que cuidamos para você
        </h2>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Tabs
            value={category}
            onValueChange={(v) => setCategory(v as TreatmentCategory | "todos")}
          >
            <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
              {categories.map((c) => (
                <TabsTrigger
                  key={c.key}
                  value={c.key}
                  className="border border-gauto-hairline bg-gauto-ivory px-4 py-2 text-xs data-[state=active]:border-gauto-gold data-[state=active]:bg-gauto-graphite data-[state=active]:text-gauto-champagne"
                >
                  {c.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div
            role="group"
            aria-label="Filtrar por gênero"
            className="flex w-fit border border-gauto-hairline"
          >
            {(["feminino", "masculino"] as const).map((g) => (
              <button
                key={g}
                type="button"
                aria-pressed={gender === g}
                onClick={() => setGender(g)}
                className={cn(
                  "min-h-11 px-5 py-2 text-xs font-semibold capitalize transition-colors",
                  gender === g
                    ? "bg-gauto-graphite text-gauto-champagne"
                    : "bg-gauto-ivory text-gauto-graphite hover:text-gauto-gold-deep",
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar por região do corpo">
          {(Object.keys(areaLabels) as BodyArea[]).map((a) => (
            <button
              key={a}
              type="button"
              aria-pressed={area === a}
              onClick={() => setArea(area === a ? null : a)}
              className={cn(
                "border px-3 py-1.5 text-xs transition-colors",
                area === a
                  ? "border-gauto-gold bg-gauto-gold/15 text-gauto-gold-deep"
                  : "border-gauto-hairline bg-gauto-ivory text-gauto-graphite/75 hover:border-gauto-gold/50",
              )}
            >
              {areaLabels[a]}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <TreatmentCard key={t.slug} treatment={t} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-sm text-gauto-graphite/70">
            Nenhum tratamento com esses filtros — limpe a região selecionada ou fale com a gente no
            WhatsApp para uma indicação personalizada.
          </p>
        )}
      </div>
    </section>
  );
}
