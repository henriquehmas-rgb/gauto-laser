"use client";

import { useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { quizSteps, quizResultMap, priorityArguments, skinReassurance } from "@/content/quiz";
import { treatments } from "@/content/treatments";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Answers = Partial<Record<"goal" | "skin" | "priority" | "who", string>>;

/* Tons aproximados da escala de fototipos para a etapa visual */
const skinTones: Record<string, string> = {
  I: "#f5e0d0",
  II: "#eccdb0",
  III: "#d9ab84",
  IV: "#b07e52",
  V: "#7c5231",
  VI: "#4a2f1e",
};

export function Quiz() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [started, setStarted] = useState(false);
  const done = stepIndex >= quizSteps.length;
  const step = quizSteps[stepIndex];

  function pick(value: string) {
    if (!started) {
      setStarted(true);
      track("quiz_start");
    }
    const next = { ...answers, [step.key]: value };
    setAnswers(next);
    track("quiz_step", { step: step.key, value });
    if (stepIndex + 1 >= quizSteps.length) {
      track("quiz_complete", { result: quizResultMap[next.goal ?? "pelos"] });
    }
    setStepIndex(stepIndex + 1);
  }

  function reset() {
    setAnswers({});
    setStepIndex(0);
  }

  const result = done ? treatments.find((t) => t.slug === quizResultMap[answers.goal ?? "pelos"]) : null;

  return (
    <section id="quiz" className="scroll-mt-36 bg-gauto-champagne">
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
        <SectionEyebrow>Quiz</SectionEyebrow>
        <h2 className="type-display mt-3 text-2xl text-gauto-graphite md:text-4xl">
          Descubra seu tratamento ideal
        </h2>
        <p className="mt-3 text-sm text-gauto-graphite/75">
          Quatro perguntas rápidas — sem cadastro, sem compromisso.
        </p>

        <div className="mt-8 border border-gauto-hairline bg-gauto-ivory p-6 md:p-8">
          {/* barra de progresso */}
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={quizSteps.length}
            aria-valuenow={Math.min(stepIndex, quizSteps.length)}
            aria-label="Progresso do quiz"
            className="mb-6 flex gap-1"
          >
            {quizSteps.map((s, i) => (
              <span
                key={s.key}
                className={cn("h-0.5 flex-1", i < stepIndex ? "bg-gauto-gold" : "bg-gauto-hairline")}
              />
            ))}
          </div>

          {!done && step && (
            <fieldset>
              <legend className="type-section text-lg text-gauto-graphite">{step.title}</legend>
              {step.key === "skin" && (
                <p className="mt-2 text-xs text-gauto-graphite/70">{skinReassurance}</p>
              )}
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {step.options.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => pick(o.value)}
                    className="flex min-h-11 items-center gap-3 border border-gauto-hairline bg-gauto-champagne px-4 py-3 text-left text-sm text-gauto-graphite transition-colors hover:border-gauto-gold focus-visible:border-gauto-gold"
                  >
                    {step.key === "skin" && (
                      <span
                        aria-hidden="true"
                        className="size-5 shrink-0 rounded-full border border-gauto-hairline"
                        style={{ background: skinTones[o.value] }}
                      />
                    )}
                    <span>
                      {o.label}
                      {o.hint && <span className="block text-xs text-muted-foreground">{o.hint}</span>}
                    </span>
                  </button>
                ))}
              </div>
              {stepIndex > 0 && (
                <button
                  type="button"
                  onClick={() => setStepIndex(stepIndex - 1)}
                  className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-gauto-graphite/70 hover:text-gauto-gold-deep"
                >
                  <ArrowLeft className="size-3.5" aria-hidden="true" /> Voltar
                </button>
              )}
            </fieldset>
          )}

          {done && result && (
            <div aria-live="polite">
              <p className="type-label text-[10px] text-gauto-gold-deep">Recomendação para você</p>
              <h3 className="type-section mt-2 text-xl text-gauto-graphite">{result.name}</h3>
              <p className="mt-2 text-sm text-gauto-graphite/85">{result.headline}</p>
              <p className="mt-3 text-sm text-gauto-graphite/85">
                {priorityArguments[answers.priority ?? "custo"]}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gauto-graphite/70">
                <span>Sessão de ~{result.sessionMinutes} min</span>
                <span>{result.sessionsEstimate}</span>
                <span>{skinReassurance}</span>
              </div>
              <p className="mt-4 text-[11px] text-muted-foreground">
                Sujeito a avaliação profissional. Consulte contraindicações.
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <WhatsAppButton
                  context="quiz"
                  answers={{ goal: answers.goal, skin: answers.skin, priority: answers.priority }}
                  className="flex-1"
                >
                  Agendar pelo WhatsApp
                </WhatsAppButton>
                <a
                  href="#tratamentos"
                  className="inline-flex min-h-11 flex-1 items-center justify-center border border-gauto-graphite/25 px-6 py-3 text-sm font-semibold text-gauto-graphite transition-colors hover:border-gauto-gold"
                >
                  Ver tratamento
                </a>
              </div>
              <button
                type="button"
                onClick={reset}
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-gauto-graphite/70 hover:text-gauto-gold-deep"
              >
                <RotateCcw className="size-3.5" aria-hidden="true" /> Refazer o quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
