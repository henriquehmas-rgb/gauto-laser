import { siteConfig } from "@/config/site.config";

export type WaContext =
  | "hero"
  | "header"
  | "sticky"
  | "card"
  | "quiz"
  | "combo"
  | "offer"
  | "final"
  | "floating"
  | "referral";

interface WaLinkArgs {
  context: WaContext;
  treatment?: string;
  areas?: string[];
  answers?: { goal?: string; skin?: string; priority?: string };
  origin?: string;
}

const goalLabels: Record<string, string> = {
  pelos: "pelos indesejados",
  manchas: "manchas / clareamento",
  tatuagem: "remoção de tatuagem",
  glow: "glow facial",
  sobrancelha: "despigmentação de sobrancelha",
};

const priorityLabels: Record<string, string> = {
  "zero-dor": "zero dor",
  rapidez: "rapidez",
  correcao: "correção definitiva",
  custo: "custo-benefício",
};

export function buildWaMessage({ context, treatment, areas, answers, origin = "" }: WaLinkArgs): string {
  switch (context) {
    case "card":
      return `Olá! Quero agendar uma avaliação para *${treatment}*.${origin}`;
    case "quiz": {
      const goal = answers?.goal ? goalLabels[answers.goal] ?? answers.goal : "-";
      const prio = answers?.priority ? priorityLabels[answers.priority] ?? answers.priority : "-";
      return `Olá! Fiz o quiz do site: quero tratar *${goal}*, tom de pele fototipo ${answers?.skin ?? "-"}, prioridade ${prio}. Podem me ajudar a agendar?${origin}`;
    }
    case "combo":
      return `Olá! Quero orçamento para: ${(areas ?? []).join(", ")}.${origin}`;
    case "offer":
      return `Olá! Quero aproveitar a ${siteConfig.entryOffer.title.toLowerCase()} do site.${origin}`;
    case "referral":
      return `Olá! Conheça a Gauto Laser — estética a laser premium no Juba Center, em Cáceres. Agende sua avaliação gratuita: https://${siteConfig.brand.domain}`;
    default:
      return `Olá! Vim pelo site da Gauto Laser e quero agendar uma avaliação.${origin}`;
  }
}

export function buildWaLink(args: WaLinkArgs): string {
  const msg = buildWaMessage(args);
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(msg)}`;
}
