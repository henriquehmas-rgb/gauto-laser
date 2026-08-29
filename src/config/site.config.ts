/**
 * Config central da Gauto Laser — TODO dado de negócio vive aqui.
 * Placeholders {{...}} são visíveis no site de propósito: ver docs/PENDENCIAS.md.
 */

export type PricingMode = "hidden" | "from" | "full";

export const siteConfig = {
  brand: {
    name: "Gauto Laser",
    tagline: "Estética a laser premium",
    domain: "gautolaser.com.br",
  },
  contact: {
    whatsapp: "{{55DDDNUMERO}}", // só dígitos, ex.: 5565999999999
    phone: "", // fixo, opcional
    instagram: "@gautolaser",
    email: "",
  },
  location: {
    venue: "Juba Center",
    unit: "{{loja/piso}}",
    address: "{{rua, nº — bairro}}",
    city: "Cáceres",
    state: "MT",
    zip: "{{CEP}}",
    geo: { lat: -16.0764, lng: -57.6818 }, // centro de Cáceres — refinar com o ponto exato
    hours: [
      { days: "Seg–Sáb", dayRange: [1, 6] as [number, number], open: "10:00", close: "22:00" },
      { days: "Dom", dayRange: [0, 0] as [number, number], open: "14:00", close: "20:00" },
    ],
    mapsUrl: "https://maps.google.com/?q=Juba+Center+Caceres+MT",
    parking: true,
    airConditioned: true,
    nearbyCities: ["Mirassol d'Oeste", "São José dos Quatro Marcos", "Porto Esperidião", "Curvelândia"],
  },
  proof: {
    sessions: 10000,
    yearsActive: 0,
    award: { name: "Diamante Vermelho — Referência Nacional", issuer: "{{quem concede}}", year: 0 },
    google: { rating: 0, reviewCount: 0, url: "" },
    anvisaRegistered: true,
    responsibleProfessional: "{{nome + registro}}",
  },
  pricing: {
    mode: "hidden" as PricingMode, // sem valores confirmados → oculto até definição
    maxInstallments: 12,
    showAnchorPrice: false,
  },
  entryOffer: {
    enabled: true,
    title: "Avaliação gratuita + teste de disparo",
    description:
      "Conheça a tecnologia 4D na prática: avaliação com profissional e teste de disparo sem custo, sem compromisso.",
    eligibility: "novos clientes (1 por CPF)",
    validityDays: 30,
    regulationUrl: "/regulamento",
  },
  referral: {
    enabled: true,
    reward: "{{recompensa por indicação}}",
    minPurchase: "{{condição mínima}}",
  },
  combos: {
    tiers: [
      { areas: 2, discount: 0.1 },
      { areas: 3, discount: 0.15 },
    ],
  },
  campaign: { active: false, label: "", headline: "", deadline: "", cta: "" },
  partners: [] as { name: string; benefit: string }[],
  tracking: {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID,
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  },
  legal: {
    cnpj: "{{CNPJ}}",
    showGroup: false, // "Uma empresa do Grupo SEEG" no rodapé
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Está aberto agora? Retorna janela do dia ou null. */
export function todayHours(now = new Date()) {
  const day = now.getDay();
  for (const h of siteConfig.location.hours) {
    const [start, end] = h.dayRange;
    if (day >= start && day <= end) return h;
  }
  return null;
}
