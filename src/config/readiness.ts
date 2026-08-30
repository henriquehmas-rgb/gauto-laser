import { siteConfig } from "@/config/site.config";
import { testimonials } from "@/content/testimonials";

/**
 * Gate de publicação.
 *
 * Os placeholders `{{...}}` são propositais: sinalizam dado de negócio que ainda não
 * foi fornecido, em vez de inventar telefone, CNPJ ou depoimento. O que NÃO pode
 * acontecer é o site ficar indexável e receber tráfego nesse estado — foi o que
 * ocorreu em 29/08/2026. Enquanto houver pendência, o site se marca como rascunho:
 * `noindex, nofollow` + robots.txt bloqueado.
 *
 * `npm run check:launch` lista o que falta e sai com código 1 (usável em CI).
 */

const PLACEHOLDER = /\{\{.*?\}\}/;

export function isPlaceholder(value: unknown): boolean {
  return typeof value === "string" && PLACEHOLDER.test(value);
}

export interface ReadinessIssue {
  field: string;
  label: string;
  value: string;
}

/** Campos que precisam existir para o site poder receber tráfego. */
export function launchBlockers(): ReadinessIssue[] {
  const { contact, location, proof, legal } = siteConfig;

  const required: [string, string, unknown][] = [
    ["contact.whatsapp", "Número de WhatsApp (todos os CTAs dependem dele)", contact.whatsapp],
    ["location.unit", "Loja/piso no Juba Center", location.unit],
    ["location.address", "Endereço (rua e número)", location.address],
    ["location.zip", "CEP", location.zip],
    ["legal.cnpj", "CNPJ (rodapé)", legal.cnpj],
    ["proof.responsibleProfessional", "Responsável técnico e registro", proof.responsibleProfessional],
  ];

  const issues: ReadinessIssue[] = [];

  for (const [field, label, value] of required) {
    if (isPlaceholder(value) || value === "" || value == null) {
      issues.push({ field, label, value: String(value ?? "") });
    }
  }

  if (siteConfig.referral.enabled && isPlaceholder(siteConfig.referral.reward)) {
    issues.push({
      field: "referral.reward",
      label: "Recompensa do Indique e Ganhe (ou desative referral.enabled)",
      value: siteConfig.referral.reward,
    });
  }

  const fakeTestimonials = testimonials.filter(
    (t) => isPlaceholder(t.text) || isPlaceholder(t.name) || isPlaceholder(t.handle),
  );
  if (fakeTestimonials.length > 0) {
    issues.push({
      field: "content/testimonials.ts",
      label: `${fakeTestimonials.length} depoimento(s) ainda em placeholder — prova social falsa é pior que nenhuma`,
      value: "",
    });
  }

  return issues;
}

/** true enquanto houver pendência: aciona noindex e bloqueia o robots.txt. */
export function isDraft(): boolean {
  return launchBlockers().length > 0;
}
