export type TreatmentCategory = "epilacao" | "remocao" | "facial";
export type Gender = "feminino" | "masculino";
export type BodyArea =
  | "rosto"
  | "axilas"
  | "virilha"
  | "pernas"
  | "bracos"
  | "costas-peito"
  | "barba";

export interface Treatment {
  slug: string;
  name: string;
  category: TreatmentCategory;
  genders: Gender[];
  areas: BodyArea[];
  techLabel: string;
  headline: string;
  benefits: [string, string, string];
  painLevel: "Zero a mínimo";
  sessionMinutes: number;
  sessionsEstimate: string;
  intervalDays: number;
  sunExposureDays: number;
  prep: string[];
  priceFrom?: number;
  popular?: boolean;
  pairsWith: string[];
}

export const treatments: Treatment[] = [
  {
    slug: "epilacao-4d-prime",
    name: "Epilação 4D Prime",
    category: "epilacao",
    genders: ["feminino", "masculino"],
    areas: ["rosto", "axilas", "virilha", "pernas", "bracos", "costas-peito", "barba"],
    techLabel: "Infinity Duos · 755/808/940/1064 nm",
    headline: "Redução progressiva dos pelos para todos os tons de pele — inclusive bronzeada.",
    benefits: [
      "4 comprimentos de onda simultâneos: fototipos I a VI",
      "Ponteira criogênica a -10 °C: sessão praticamente indolor",
      "Áreas corporais e faciais, feminino e masculino",
    ],
    painLevel: "Zero a mínimo",
    sessionMinutes: 30,
    sessionsEstimate: "8–12 sessões",
    intervalDays: 30,
    sunExposureDays: 15,
    prep: [
      "Apare os pelos com lâmina 24 h antes (nunca cera ou pinça)",
      "Evite sol e autobronzeador na área por 15 dias",
      "Venha com a pele limpa, sem cremes ou desodorante na área",
    ],
    popular: true,
    pairsWith: ["clareamento-a-laser", "hollywood-black-peel"],
  },
  {
    slug: "hollywood-black-peel",
    name: "Hollywood Black Peel",
    category: "facial",
    genders: ["feminino", "masculino"],
    areas: ["rosto"],
    techLabel: "Laser + carvão ativado",
    headline: "Efeito glow imediato, fechamento de poros e pele renovada em uma sessão.",
    benefits: [
      "Glow imediato: ideal antes de eventos",
      "Fecha poros e uniformiza a textura",
      "Sem cortes, sem agulhas, sem tempo de recuperação",
    ],
    painLevel: "Zero a mínimo",
    sessionMinutes: 40,
    sessionsEstimate: "1–4 sessões",
    intervalDays: 21,
    sunExposureDays: 7,
    prep: [
      "Suspenda ácidos na pele 3 dias antes",
      "Evite sol direto no rosto na véspera",
      "Venha sem maquiagem, se possível",
    ],
    pairsWith: ["epilacao-4d-prime", "despigmentacao-sobrancelhas"],
  },
  {
    slug: "despigmentacao-sobrancelhas",
    name: "Despigmentação de sobrancelhas",
    category: "remocao",
    genders: ["feminino", "masculino"],
    areas: ["rosto"],
    techLabel: "Q-Switched Nd:YAG",
    headline: "Correção segura de micropigmentação antiga sem danificar os fios.",
    benefits: [
      "Disparos em nanosegundos preservam a pele e os fios",
      "Corrige cor e formato de micropigmentações antigas",
      "Libera a pele para um novo procedimento",
    ],
    painLevel: "Zero a mínimo",
    sessionMinutes: 20,
    sessionsEstimate: "2–6 sessões",
    intervalDays: 45,
    sunExposureDays: 15,
    prep: [
      "Evite sol na região por 15 dias",
      "Informe se usou henna ou retoques recentes",
      "Não use ácidos na área na semana da sessão",
    ],
    pairsWith: ["hollywood-black-peel"],
  },
  {
    slug: "remocao-de-tatuagem",
    name: "Remoção de tatuagem",
    category: "remocao",
    genders: ["feminino", "masculino"],
    areas: ["bracos", "pernas", "costas-peito"],
    techLabel: "Q-Switched Nd:YAG",
    headline: "Tintas escuras e coloridas fragmentadas com precisão, sessão a sessão.",
    benefits: [
      "Tecnologia Q-Switched para tintas escuras e coloridas",
      "Disparos em nanosegundos: mais resultado, menos agressão",
      "Plano de sessões definido na avaliação, por tipo de tinta",
    ],
    painLevel: "Zero a mínimo",
    sessionMinutes: 25,
    sessionsEstimate: "6–12 sessões",
    intervalDays: 45,
    sunExposureDays: 30,
    prep: [
      "Evite sol na tatuagem por 30 dias antes e depois",
      "Hidrate bem a região na semana anterior",
      "Traga fotos da tatuagem para a avaliação, se possível",
    ],
    pairsWith: ["clareamento-a-laser"],
  },
  {
    slug: "clareamento-a-laser",
    name: "Clareamento a laser",
    category: "remocao",
    genders: ["feminino", "masculino"],
    areas: ["axilas", "virilha"],
    techLabel: "Q-Switched Nd:YAG",
    headline: "Axilas, virilhas e manchas corporais com tom mais uniforme.",
    benefits: [
      "Clareia axilas, virilhas e manchas localizadas",
      "Seguro para peles morenas e negras",
      "Resultado progressivo e natural",
    ],
    painLevel: "Zero a mínimo",
    sessionMinutes: 25,
    sessionsEstimate: "4–8 sessões",
    intervalDays: 30,
    sunExposureDays: 15,
    prep: [
      "Evite sol e bronzeamento na área por 15 dias",
      "Suspenda desodorantes clareadores 1 semana antes",
      "Não esfolie a região na véspera",
    ],
    pairsWith: ["epilacao-4d-prime"],
  },
];

export const categories: { key: TreatmentCategory | "todos"; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "epilacao", label: "Epilação 4D" },
  { key: "remocao", label: "Remoção & Despigmentação" },
  { key: "facial", label: "Facial & Glow" },
];

export const areaLabels: Record<BodyArea, string> = {
  rosto: "Rosto",
  axilas: "Axilas",
  virilha: "Virilha",
  pernas: "Pernas",
  bracos: "Braços",
  "costas-peito": "Costas/Peito",
  barba: "Barba",
};
