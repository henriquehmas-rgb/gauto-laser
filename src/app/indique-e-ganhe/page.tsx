import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { ReferralShare } from "./ReferralShare";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Indique e ganhe",
  description:
    "Indique amigas para a Gauto Laser e os dois ganham. Conheça o programa de indicação.",
};

export default function IndiqueEGanhe() {
  const { referral } = siteConfig;
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
        <SectionEyebrow>Programa de indicação</SectionEyebrow>
        <h1 className="type-display mt-3 text-2xl text-gauto-graphite md:text-4xl">
          Indique e ganhe
        </h1>
        <p className="mt-4 text-sm text-gauto-graphite/80 md:text-base">
          Boa experiência se divide. Quando você indica alguém e a pessoa inicia o tratamento, os
          dois ganham: {referral.reward}.
        </p>

        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { n: "1", t: "Compartilhe seu link", d: "Envie o convite pelo WhatsApp para quem você quer indicar." },
            { n: "2", t: "Sua amiga agenda", d: "Ela faz a avaliação gratuita e inicia o tratamento." },
            { n: "3", t: "Os dois ganham", d: `Crédito para você e para ela. Condição: ${referral.minPurchase}.` },
          ].map((s) => (
            <li key={s.n} className="border border-gauto-hairline bg-gauto-ivory p-5">
              <span className="type-section text-2xl text-gauto-gold-deep">{s.n}</span>
              <h2 className="mt-2 text-sm font-semibold text-gauto-graphite">{s.t}</h2>
              <p className="mt-1 text-xs text-gauto-graphite/75">{s.d}</p>
            </li>
          ))}
        </ol>

        <ReferralShare />

        <p className="mt-6 text-xs text-gauto-warm-gray">
          Regras completas no{" "}
          <Link href="/regulamento" className="underline">
            regulamento
          </Link>
          .
        </p>
      </main>
      <Footer />
    </>
  );
}
