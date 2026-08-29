"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { siteConfig } from "@/config/site.config";
import { testimonials } from "@/content/testimonials";
import { faq } from "@/content/faq";
import { track } from "@/lib/analytics";

function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  // começa sempre em 0 (igual no SSR); com reduced-motion, salta direto no observer
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        if (reduced) {
          setValue(target);
          return;
        }
        const start = performance.now();
        const dur = 1200;
        function tick(now: number) {
          const p = Math.min((now - start) / dur, 1);
          setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, reduced]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

export function Proof() {
  const { proof } = siteConfig;

  const stats: { value: React.ReactNode; label: string }[] = [
    { value: <Counter target={proof.sessions} prefix="+" />, label: "sessões realizadas" },
    { value: <Counter target={4} />, label: "comprimentos de onda" },
    { value: "-10 °C", label: "ponteira criogênica" },
    ...(proof.google.rating > 0
      ? [{ value: `★ ${proof.google.rating}`, label: "nota no Google" } satisfies { value: React.ReactNode; label: string }]
      : [{ value: "I–VI", label: "fototipos atendidos" } satisfies { value: React.ReactNode; label: string }]),
  ];

  return (
    <section id="faq" className="scroll-mt-20 bg-gauto-champagne">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <SectionEyebrow>Prova social</SectionEyebrow>
        <h2 className="type-display mt-3 text-2xl text-gauto-graphite md:text-4xl">
          Quem conhece, confia
        </h2>

        <dl className="mt-10 grid grid-cols-2 gap-px border border-gauto-hairline bg-gauto-hairline md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-gauto-ivory p-6 text-center">
              <dd className="type-section text-2xl text-gauto-gold-deep md:text-3xl">{s.value}</dd>
              <dt className="mt-1 text-xs text-gauto-graphite/70">{s.label}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.area} className="border border-gauto-hairline bg-gauto-ivory p-6">
              <div className="flex gap-0.5" aria-label="5 estrelas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-gauto-gold text-gauto-gold" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="type-editorial mt-3 text-base text-gauto-graphite/90">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-4 text-xs text-gauto-graphite/70">
                <span className="font-semibold text-gauto-graphite">{t.name}</span> · {t.handle}
                <br />
                {t.area} · {t.sessions} sessões
              </figcaption>
            </figure>
          ))}
        </div>

        <h3 className="type-section mt-16 text-xl text-gauto-graphite">Perguntas frequentes</h3>
        <Accordion type="single" collapsible className="mt-6">
          {faq.map((f) => (
            <AccordionItem key={f.question} value={f.question}>
              <AccordionTrigger
                onClick={() => track("faq_open", { question: f.question })}
                className="text-left text-sm font-semibold text-gauto-graphite hover:text-gauto-gold-deep hover:no-underline"
              >
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-gauto-graphite/80">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
