import Image from "next/image";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

export function FinalCta() {
  return (
    <section className="border-t border-gauto-hairline bg-gauto-champagne">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center md:px-6 md:py-24">
        <Image
          src="/brand/gauto-submark-gold.png"
          alt=""
          aria-hidden="true"
          width={232}
          height={116}
          className="mx-auto h-10 w-auto"
        />
        <h2 className="type-display mt-6 text-2xl text-gauto-graphite md:text-4xl">
          A pele renovada é a assinatura mais elegante
        </h2>
        <p className="mt-4 text-sm text-gauto-graphite/75 md:text-base">
          Agende sua avaliação gratuita e conheça a tecnologia 4D de perto — sem compromisso.
        </p>
        <WhatsAppButton context="final" className="mt-8">
          Agendar pelo WhatsApp
        </WhatsAppButton>
      </div>
    </section>
  );
}
