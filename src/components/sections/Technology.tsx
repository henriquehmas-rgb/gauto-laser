"use client";

import { useEffect, useRef } from "react";
import { Waves, Snowflake, Zap, Check, X, Minus } from "lucide-react";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { SpectrumDivider } from "@/components/shared/SpectrumDivider";
import { track } from "@/lib/analytics";

const blocks = [
  {
    icon: Waves,
    title: "4 comprimentos de onda",
    tech: "755 · 808 · 940 · 1064 nm",
    text: "A plataforma Infinity Duos dispara os quatro comprimentos simultaneamente e atende do fototipo I ao VI — inclusive pele bronzeada, sem restrição.",
  },
  {
    icon: Snowflake,
    title: "Ponteira criogênica",
    tech: "-10 °C",
    cryo: true,
    text: "A pele é resfriada no instante de cada disparo. Resultado: sessão praticamente indolor e mais conforto do início ao fim.",
  },
  {
    icon: Zap,
    title: "Q-Switched Nd:YAG",
    tech: "disparos em nanosegundos",
    text: "Pulsos ultracurtos fragmentam pigmentos e tintas preservando a pele ao redor — a base da remoção de tatuagem e despigmentação.",
  },
];

type CompareValue = "sim" | "nao" | "parcial";

const compareRows: { label: string; laser4d: CompareValue | string; diodo: CompareValue | string; ipl: CompareValue | string; cera: CompareValue | string }[] = [
  { label: "Fototipos atendidos", laser4d: "I a VI", diodo: "I a IV", ipl: "I a III", cera: "todos" },
  { label: "Pele bronzeada", laser4d: "sim", diodo: "nao", ipl: "nao", cera: "sim" },
  { label: "Conforto na sessão", laser4d: "praticamente indolor", diodo: "moderado", ipl: "moderado", cera: "dolorosa" },
  { label: "Velocidade por área", laser4d: "alta", diodo: "média", ipl: "média", cera: "baixa" },
  { label: "Remove pigmentos e tatuagem", laser4d: "sim", diodo: "nao", ipl: "nao", cera: "nao" },
  { label: "Resultado progressivo duradouro", laser4d: "sim", diodo: "parcial", ipl: "parcial", cera: "nao" },
];

function CompareCell({ value }: { value: CompareValue | string }) {
  if (value === "sim")
    return <Check className="mx-auto size-4 text-gauto-gold-deep" aria-label="Sim" />;
  if (value === "nao") return <X className="mx-auto size-4 text-gauto-warm-gray" aria-label="Não" />;
  if (value === "parcial")
    return <Minus className="mx-auto size-4 text-gauto-warm-gray" aria-label="Parcial" />;
  return <span>{value}</span>;
}

export function Technology() {
  const tableRef = useRef<HTMLDivElement>(null);
  const tracked = useRef(false);

  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !tracked.current) {
          tracked.current = true;
          track("compare_view");
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="tecnologia" className="dark scroll-mt-24 bg-gauto-graphite text-gauto-champagne">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <SectionEyebrow className="text-gauto-gold">Tecnologia 4D</SectionEyebrow>
        <h2 className="type-display mt-3 text-2xl md:text-4xl">
          Infinity Duos: o laser que respeita a sua pele
        </h2>

        <SpectrumDivider labeled className="mt-8 max-w-md" />

        <div className="mt-10 grid gap-px border border-gauto-gold/25 bg-gauto-gold/25 md:grid-cols-3">
          {blocks.map((b) => (
            <div key={b.title} className="bg-gauto-graphite p-7">
              <b.icon
                className="size-6"
                style={{ color: b.cryo ? "var(--cryo)" : "var(--gauto-gold)" }}
                aria-hidden="true"
              />
              <h3 className="type-section mt-4 text-lg">{b.title}</h3>
              <p
                className="type-label mt-1 text-[11px]"
                style={{ color: b.cryo ? "var(--cryo)" : "var(--gauto-gold)" }}
              >
                {b.tech}
              </p>
              <p className="mt-3 text-sm text-gauto-champagne/80">{b.text}</p>
            </div>
          ))}
        </div>

        <div ref={tableRef} className="mt-14">
          <h3 className="type-section text-xl">Comparativo técnico</h3>
          <p className="mt-2 text-sm text-gauto-champagne/70">
            Como a tecnologia 4D se compara aos métodos tradicionais — sem citar marcas, só técnica.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-gauto-gold/40 text-left">
                  <th scope="col" className="py-3 pr-4 font-normal text-gauto-champagne/60">
                    &nbsp;
                  </th>
                  <th scope="col" className="type-label px-4 py-3 text-center text-[11px] text-gauto-gold">
                    Laser 4D
                  </th>
                  <th scope="col" className="px-4 py-3 text-center font-medium text-gauto-champagne/70">
                    Diodo simples
                  </th>
                  <th scope="col" className="px-4 py-3 text-center font-medium text-gauto-champagne/70">
                    IPL
                  </th>
                  <th scope="col" className="px-4 py-3 text-center font-medium text-gauto-champagne/70">
                    Cera
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.label} className="border-b border-gauto-champagne/10">
                    <th scope="row" className="py-3 pr-4 text-left font-normal text-gauto-champagne/85">
                      {row.label}
                    </th>
                    <td className="bg-gauto-gold/10 px-4 py-3 text-center font-medium">
                      <CompareCell value={row.laser4d} />
                    </td>
                    <td className="px-4 py-3 text-center text-gauto-champagne/70">
                      <CompareCell value={row.diodo} />
                    </td>
                    <td className="px-4 py-3 text-center text-gauto-champagne/70">
                      <CompareCell value={row.ipl} />
                    </td>
                    <td className="px-4 py-3 text-center text-gauto-champagne/70">
                      <CompareCell value={row.cera} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
