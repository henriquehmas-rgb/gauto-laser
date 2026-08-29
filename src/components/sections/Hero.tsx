"use client";

import Image from "next/image";
import { Award, Snowflake, Building2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { SpectrumDivider } from "@/components/shared/SpectrumDivider";
import { siteConfig } from "@/config/site.config";
import { track } from "@/lib/analytics";

const badges = [
  { icon: Award, label: "Premiada Diamante Vermelho" },
  { icon: Snowflake, label: "Tecnologia 4D ultra-resfriada" },
  { icon: Building2, label: "Juba Center — horário de shopping" },
];

export function Hero() {
  const reduced = useReducedMotion();
  const { proof } = siteConfig;

  // initial/animate constantes entre SSR e cliente (evita mismatch de hidratação);
  // com prefers-reduced-motion, a transição é instantânea.
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: reduced ? { duration: 0 } : { duration: 0.5, delay },
  });

  return (
    <section className="dark relative overflow-hidden bg-gauto-graphite text-gauto-champagne">
      {/* halo dourado suave atrás do logo, como na fachada do manual */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 size-[480px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #c8a070 0%, transparent 65%)" }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-16 pt-14 text-center md:px-6 md:pb-24 md:pt-20">
        <motion.div {...fade(0)}>
          <Image
            src="/brand/gauto-logo-negative.png"
            alt=""
            aria-hidden="true"
            width={920}
            height={566}
            className="mx-auto h-32 w-auto md:h-44"
            priority
          />
        </motion.div>

        <motion.div {...fade(0.15)} className="w-full max-w-md">
          <SpectrumDivider className="my-6" />
        </motion.div>

        <motion.h1
          {...fade(0.3)}
          className="type-display max-w-3xl text-3xl text-gauto-champagne md:text-5xl"
        >
          Sua melhor versão com a tecnologia a laser mais avançada
        </motion.h1>

        <motion.p {...fade(0.45)} className="mt-5 max-w-xl text-base text-gauto-champagne/80 md:text-lg">
          Epilação 4D praticamente indolor para todos os tons de pele e remoção avançada de
          pigmentos. Com exclusividade no Juba Center, em Cáceres.
        </motion.p>

        <motion.ul {...fade(0.6)} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {badges.map((b) => (
            <li key={b.label} className="flex items-center gap-2 text-xs text-gauto-champagne/85 md:text-sm">
              <b.icon className="size-4 text-gauto-gold" aria-hidden="true" />
              {b.label}
            </li>
          ))}
        </motion.ul>

        <motion.div {...fade(0.75)} className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <WhatsAppButton context="hero" className="w-full sm:w-auto">
            Agendar pelo WhatsApp
          </WhatsAppButton>
          <a
            href="#tratamentos"
            onClick={() => track("scroll_to_treatments")}
            className="inline-flex min-h-11 w-full items-center justify-center border border-gauto-champagne/30 px-6 py-3 text-sm font-semibold text-gauto-champagne transition-colors hover:border-gauto-gold hover:text-gauto-gold sm:w-auto"
          >
            Ver tratamentos
          </a>
        </motion.div>

        <motion.p {...fade(0.9)} className="mt-6 text-xs text-gauto-champagne/60">
          {proof.google.rating > 0
            ? `★ ${proof.google.rating} no Google · +${proof.sessions.toLocaleString("pt-BR")} sessões realizadas`
            : `+${proof.sessions.toLocaleString("pt-BR")} sessões realizadas`}
        </motion.p>
      </div>
    </section>
  );
}
