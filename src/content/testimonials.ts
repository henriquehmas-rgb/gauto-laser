export interface Testimonial {
  name: string;
  handle: string; // @instagram
  area: string;
  sessions: number;
  text: string;
  gender: "feminino" | "masculino";
}

/**
 * PLACEHOLDERS — substituir por depoimentos reais autorizados.
 * Ver docs/PENDENCIAS.md. Não publicar sem consentimento por escrito.
 */
export const testimonials: Testimonial[] = [
  {
    name: "{{Nome da cliente}}",
    handle: "{{@instagram}}",
    area: "Axilas + virilha",
    sessions: 6,
    text: "{{Depoimento real autorizado — ex.: experiência com conforto da sessão e resultado em pele morena.}}",
    gender: "feminino",
  },
  {
    name: "{{Nome do cliente}}",
    handle: "{{@instagram}}",
    area: "Barba",
    sessions: 5,
    text: "{{Depoimento real autorizado — ex.: foliculite da barba resolvida, praticidade do horário de shopping.}}",
    gender: "masculino",
  },
  {
    name: "{{Nome da cliente}}",
    handle: "{{@instagram}}",
    area: "Remoção de tatuagem",
    sessions: 8,
    text: "{{Depoimento real autorizado — ex.: clareamento progressivo da tatuagem sem marcas na pele.}}",
    gender: "feminino",
  },
];
