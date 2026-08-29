export interface QuizOption {
  value: string;
  label: string;
  hint?: string;
}

export interface QuizStep {
  key: "goal" | "skin" | "priority" | "who";
  title: string;
  options: QuizOption[];
}

export const quizSteps: QuizStep[] = [
  {
    key: "goal",
    title: "O que você quer tratar?",
    options: [
      { value: "pelos", label: "Pelos indesejados" },
      { value: "manchas", label: "Manchas / clareamento" },
      { value: "tatuagem", label: "Tatuagem" },
      { value: "glow", label: "Glow facial" },
      { value: "sobrancelha", label: "Sobrancelha" },
    ],
  },
  {
    key: "skin",
    title: "Qual seu tom de pele?",
    options: [
      { value: "I", label: "Fototipo I", hint: "Muito clara" },
      { value: "II", label: "Fototipo II", hint: "Clara" },
      { value: "III", label: "Fototipo III", hint: "Morena clara" },
      { value: "IV", label: "Fototipo IV", hint: "Morena" },
      { value: "V", label: "Fototipo V", hint: "Morena escura" },
      { value: "VI", label: "Fototipo VI", hint: "Negra" },
    ],
  },
  {
    key: "priority",
    title: "Sua prioridade?",
    options: [
      { value: "zero-dor", label: "Zero dor" },
      { value: "rapidez", label: "Rapidez" },
      { value: "correcao", label: "Correção definitiva" },
      { value: "custo", label: "Custo-benefício" },
    ],
  },
  {
    key: "who",
    title: "Para quem?",
    options: [
      { value: "feminino", label: "Para mim (feminino)" },
      { value: "masculino", label: "Para mim (masculino)" },
      { value: "presente", label: "Presente" },
    ],
  },
];

/** goal → slug do tratamento recomendado */
export const quizResultMap: Record<string, string> = {
  pelos: "epilacao-4d-prime",
  manchas: "clareamento-a-laser",
  tatuagem: "remocao-de-tatuagem",
  glow: "hollywood-black-peel",
  sobrancelha: "despigmentacao-sobrancelhas",
};

export const priorityArguments: Record<string, string> = {
  "zero-dor":
    "Com a ponteira criogênica a -10 °C, sua sessão é praticamente indolor — a pele é resfriada no instante de cada disparo.",
  rapidez:
    "As sessões são rápidas: a maioria das áreas leva de 20 a 40 minutos, com horário de shopping para caber na sua rotina.",
  correcao:
    "O protocolo é montado para resultado progressivo e duradouro, com acompanhamento profissional sessão a sessão.",
  custo:
    "Na avaliação gratuita você recebe o plano exato de sessões — sem surpresa e com parcelamento facilitado.",
};

export const skinReassurance =
  "A tecnologia 4D atende todos os tons de pele, do fototipo I ao VI — inclusive bronzeados.";
