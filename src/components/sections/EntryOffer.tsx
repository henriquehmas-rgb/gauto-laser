import Link from "next/link";
import Image from "next/image";
import { Gift, Users2 } from "lucide-react";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { LeadForm } from "@/components/shared/LeadForm";
import { siteConfig } from "@/config/site.config";

export function EntryOffer() {
  const { entryOffer, referral } = siteConfig;
  if (!entryOffer.enabled) return null;

  return (
    <section id="oferta" className="dark scroll-mt-36 bg-gauto-graphite text-gauto-champagne">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
        <div>
          <SectionEyebrow className="text-gauto-gold">Oferta de entrada</SectionEyebrow>
          <h2 className="type-display mt-3 text-2xl md:text-4xl">{entryOffer.title}</h2>
          <p className="mt-4 text-sm text-gauto-champagne/80 md:text-base">{entryOffer.description}</p>
          <ul className="mt-5 space-y-2 text-sm text-gauto-champagne/75">
            <li className="flex gap-2">
              <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-gauto-gold" />
              Válida para {entryOffer.eligibility}
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-gauto-gold" />
              Agendamento em até {entryOffer.validityDays} dias ·{" "}
              <Link href={entryOffer.regulationUrl} className="underline hover:text-gauto-gold">
                regulamento
              </Link>
            </li>
          </ul>

          {referral.enabled && (
            <div className="mt-10 border border-gauto-gold/30 p-6">
              <div className="flex items-center gap-3">
                <Users2 className="size-5 text-gauto-gold" aria-hidden="true" />
                <h3 className="type-section text-lg">Indique e ganhe</h3>
              </div>
              <p className="mt-2 text-sm text-gauto-champagne/75">
                Indicou uma amiga? Os dois ganham. Conheça o programa de indicação da Gauto.
              </p>
              <Link
                href="/indique-e-ganhe"
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gauto-gold transition-colors hover:text-gauto-champagne"
              >
                <Gift className="size-4" aria-hidden="true" />
                Como funciona
              </Link>
            </div>
          )}
        </div>

        <div className="relative border border-gauto-gold/30 bg-gauto-graphite-deep p-7 md:p-9" style={{ backgroundColor: "#2b2b2b" }}>
          <Image
            src="/brand/gauto-submark-gold.png"
            alt=""
            aria-hidden="true"
            width={232}
            height={116}
            className="mx-auto mb-5 h-10 w-auto"
          />
          <LeadForm source="entry_offer" dark />
        </div>
      </div>
    </section>
  );
}
