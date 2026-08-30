import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como a Gauto Laser trata seus dados pessoais, conforme a LGPD.",
};

export default function PoliticaPrivacidade() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <h1 className="type-display text-2xl text-gauto-graphite md:text-3xl">
          Política de privacidade
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-gauto-graphite/85">
          <p>
            A {siteConfig.brand.name} respeita a sua privacidade e trata dados pessoais de acordo
            com a Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018).
          </p>
          <h2 className="type-section text-lg text-gauto-graphite">Quais dados coletamos</h2>
          <p>
            Pelo site, coletamos apenas o que você informa nos formulários: nome, WhatsApp e área
            de interesse. Também registramos, de forma automática, a origem da visita (parâmetros
            de campanha) e um identificador anônimo do endereço IP para prevenção de abuso.
          </p>
          <h2 className="type-section text-lg text-gauto-graphite">Para que usamos</h2>
          <p>
            Exclusivamente para entrar em contato sobre a avaliação solicitada e, com o seu
            consentimento, enviar comunicações sobre nossos serviços. Não vendemos nem
            compartilhamos seus dados com terceiros para fins de marketing.
          </p>
          <h2 className="type-section text-lg text-gauto-graphite">Cookies</h2>
          <p>
            Cookies de medição (Google Tag Manager / Meta Pixel) só são carregados após o seu
            aceite no banner. Você pode recusá-los e continuar navegando normalmente.
          </p>
          <h2 className="type-section text-lg text-gauto-graphite">Seus direitos</h2>
          <p>
            Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento
            pelos canais abaixo. Responderemos em até 15 dias.
          </p>
          <h2 className="type-section text-lg text-gauto-graphite">Contato do encarregado</h2>
          <p>
            {siteConfig.brand.name} · {siteConfig.location.venue}, {siteConfig.location.city} —{" "}
            {siteConfig.location.state}.
          </p>
          <ul className="list-inside space-y-1">
            {siteConfig.contact.email && (
              <li>
                E-mail:{" "}
                <a href={`mailto:${siteConfig.contact.email}`} className="underline">
                  {siteConfig.contact.email}
                </a>
              </li>
            )}
            <li>WhatsApp: canal de atendimento divulgado no site</li>
            <li>Instagram: {siteConfig.contact.instagram}</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
