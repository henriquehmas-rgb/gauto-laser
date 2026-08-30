import { ClipboardCheck, Sparkle, TrendingUp } from "lucide-react";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Avaliação gratuita",
    text: "15 minutos com profissional: análise da pele, plano de sessões e teste de disparo sem custo.",
  },
  {
    icon: Sparkle,
    title: "Sessão",
    text: "De 20 a 45 minutos por área, com a ponteira criogênica a -10 °C — praticamente indolor.",
  },
  {
    icon: TrendingUp,
    title: "Resultado progressivo",
    text: "A cada sessão, menos pelos e pigmentos. O intervalo médio é de 30 a 45 dias, conforme o protocolo.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-36 bg-gauto-champagne">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <SectionEyebrow>Como funciona</SectionEyebrow>
        <h2 className="type-display mt-3 text-2xl text-gauto-graphite md:text-4xl">
          Três passos até a pele renovada
        </h2>

        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="border border-gauto-hairline bg-gauto-ivory p-7">
              <div className="flex items-center justify-between">
                <s.icon className="size-6 text-gauto-gold-deep" aria-hidden="true" />
                <span className="type-label text-[10px] text-muted-foreground">Passo {i + 1}</span>
              </div>
              <h3 className="type-section mt-4 text-lg text-gauto-graphite">{s.title}</h3>
              <p className="mt-2 text-sm text-gauto-graphite/80">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <WhatsAppButton context="final">Agendar avaliação gratuita</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
