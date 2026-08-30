import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeadForm } from "@/components/shared/LeadForm";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Avaliação gratuita + teste de disparo",
  description:
    "Agende sua avaliação gratuita na Gauto Laser: análise profissional e teste de disparo da tecnologia 4D, sem custo. Juba Center, Cáceres-MT.",
};

export default function SessaoCortesia() {
  const { entryOffer } = siteConfig;
  return (
    <>
      <Header />
      <main className="mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
        <div>
          <SectionEyebrow>Oferta de entrada</SectionEyebrow>
          <h1 className="type-display mt-3 text-2xl text-gauto-graphite md:text-4xl">
            {entryOffer.title}
          </h1>
          <p className="mt-4 text-sm text-gauto-graphite/80 md:text-base">{entryOffer.description}</p>
          <ul className="mt-6 space-y-2 text-sm text-gauto-graphite/80">
            <li className="flex gap-2">
              <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-gauto-gold" />
              15 minutos com profissional habilitado
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-gauto-gold" />
              Teste de disparo com a ponteira criogênica -10 °C
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-gauto-gold" />
              Plano de sessões personalizado, sem obrigação de compra
            </li>
          </ul>
          <p className="mt-6 text-xs text-muted-foreground">
            Válida para {entryOffer.eligibility}. Veja o{" "}
            <Link href="/regulamento" className="underline">
              regulamento
            </Link>
            .
          </p>
          <Image
            src="/brand/gauto-submark-gold.png"
            alt=""
            aria-hidden="true"
            width={232}
            height={116}
            className="mt-10 h-9 w-auto"
          />
        </div>
        <div className="h-fit border border-gauto-hairline bg-gauto-ivory p-7 md:p-9">
          <LeadForm source="sessao_cortesia" />
        </div>
      </main>
      <Footer />
    </>
  );
}
