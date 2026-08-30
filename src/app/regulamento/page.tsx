import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Regulamento das ofertas",
  description: "Regras da oferta de entrada e do programa de indicação da Gauto Laser.",
};

export default function Regulamento() {
  const { entryOffer, referral } = siteConfig;
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <h1 className="type-display text-2xl text-gauto-graphite md:text-3xl">Regulamento</h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-gauto-graphite/85">
          <h2 className="type-section text-lg text-gauto-graphite">{entryOffer.title}</h2>
          <ul className="list-inside space-y-2">
            <li>• Oferta válida para {entryOffer.eligibility}.</li>
            <li>• Agendamento deve ocorrer em até {entryOffer.validityDays} dias após o cadastro.</li>
            <li>• A avaliação inclui análise profissional e teste de disparo, sem custo e sem obrigação de compra.</li>
            <li>• Todos os tratamentos estão sujeitos a avaliação profissional; contraindicações podem impedir a realização.</li>
            <li>• A oferta não é cumulativa com outras promoções e pode ser encerrada a qualquer momento.</li>
          </ul>

          <h2 className="type-section text-lg text-gauto-graphite">Programa Indique e Ganhe</h2>
          <ul className="list-inside space-y-2">
            <li>• Recompensa: {referral.reward}.</li>
            <li>• Condição: {referral.minPurchase}.</li>
            <li>• O benefício é creditado após a primeira sessão paga do indicado.</li>
            <li>• Indicações são identificadas pelo link exclusivo ou pelo nome informado no cadastro.</li>
          </ul>

          <p className="text-xs text-muted-foreground">
            Dúvidas? Fale com a equipe pelo WhatsApp. Resultados variam por pessoa; consulte
            contraindicações.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
