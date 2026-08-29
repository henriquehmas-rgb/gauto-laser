"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { treatments } from "@/content/treatments";
import { getAttribution } from "@/lib/utm";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const leadSchema = z.object({
  name: z.string().min(2, "Informe seu nome").max(80),
  whatsapp: z
    .string()
    .regex(/^\(?\d{2}\)?[\s-]?9?\d{4}[\s-]?\d{4}$/, "Informe um WhatsApp válido com DDD"),
  interest: z.string().min(1, "Escolha uma área de interesse"),
  consent: z.literal(true, { message: "É preciso aceitar a política de privacidade" }),
  company: z.string().max(0).optional(), // honeypot
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadFormProps {
  source: string;
  className?: string;
  dark?: boolean;
  onSubmitted?: () => void;
}

export function LeadForm({ source, className, dark = false, onSubmitted }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({ resolver: zodResolver(leadSchema), defaultValues: { interest: "" } });

  async function onSubmit(data: LeadFormData) {
    setStatus("sending");
    try {
      const attribution = getAttribution();
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          whatsapp: data.whatsapp.replace(/\D/g, ""),
          interest: data.interest,
          source,
          utm: attribution,
          ref: attribution.ref,
          consent: true,
          company: data.company ?? "",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("lead_form_submit", { source });
      setStatus("done");
      onSubmitted?.();
    } catch {
      setStatus("error");
    }
  }

  const inputClass = cn(
    "min-h-11 w-full border bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus-visible:border-gauto-gold",
    dark
      ? "border-gauto-champagne/25 text-gauto-champagne placeholder:text-gauto-champagne/40"
      : "border-gauto-hairline text-gauto-graphite placeholder:text-gauto-warm-gray",
  );
  const labelClass = cn("mb-1.5 block text-xs font-semibold", dark ? "text-gauto-champagne/85" : "text-gauto-graphite");
  const errClass = "mt-1 text-xs text-destructive";

  if (status === "done") {
    return (
      <div className={cn("text-center", className)} aria-live="polite">
        <CheckCircle2 className="mx-auto size-10 text-gauto-gold" aria-hidden="true" />
        <p className={cn("type-section mt-4 text-lg", dark ? "text-gauto-champagne" : "text-gauto-graphite")}>
          Recebemos seu cadastro!
        </p>
        <p className={cn("mt-2 text-sm", dark ? "text-gauto-champagne/75" : "text-gauto-graphite/75")}>
          Vamos confirmar seu horário pelo WhatsApp. Se preferir, adiante a conversa:
        </p>
        <WhatsAppButton context="offer" className="mt-5">
          Chamar no WhatsApp agora
        </WhatsAppButton>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className} noValidate>
      <div className="grid gap-4">
        <div>
          <label htmlFor={`${source}-name`} className={labelClass}>
            Nome
          </label>
          <input
            id={`${source}-name`}
            type="text"
            autoComplete="name"
            placeholder="Seu nome"
            className={inputClass}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && <p className={errClass}>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor={`${source}-whatsapp`} className={labelClass}>
            WhatsApp
          </label>
          <input
            id={`${source}-whatsapp`}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(65) 99999-9999"
            className={inputClass}
            aria-invalid={!!errors.whatsapp}
            {...register("whatsapp")}
          />
          {errors.whatsapp && <p className={errClass}>{errors.whatsapp.message}</p>}
        </div>

        <div>
          <label htmlFor={`${source}-interest`} className={labelClass}>
            Área de interesse
          </label>
          <select
            id={`${source}-interest`}
            className={cn(inputClass, "appearance-none")}
            aria-invalid={!!errors.interest}
            {...register("interest")}
          >
            <option value="" disabled>
              Escolha um tratamento
            </option>
            {treatments.map((t) => (
              <option key={t.slug} value={t.slug} className="text-gauto-graphite">
                {t.name}
              </option>
            ))}
            <option value="outro" className="text-gauto-graphite">
              Ainda não sei — quero orientação
            </option>
          </select>
          {errors.interest && <p className={errClass}>{errors.interest.message}</p>}
        </div>

        {/* honeypot — invisível para humanos */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label htmlFor={`${source}-company`}>Empresa</label>
          <input id={`${source}-company`} type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
        </div>

        <div className="flex items-start gap-2">
          <input
            id={`${source}-consent`}
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 accent-[#806040]"
            aria-invalid={!!errors.consent}
            {...register("consent")}
          />
          <label
            htmlFor={`${source}-consent`}
            className={cn("text-xs", dark ? "text-gauto-champagne/70" : "text-gauto-graphite/70")}
          >
            Autorizo o contato pelo WhatsApp e concordo com a{" "}
            <Link href="/politica-de-privacidade" className="underline hover:text-gauto-gold-deep">
              política de privacidade
            </Link>
            .
          </label>
        </div>
        {errors.consent && <p className={errClass}>{errors.consent.message}</p>}

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-gold inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 text-sm disabled:opacity-60"
        >
          {status === "sending" && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          Quero minha avaliação gratuita
        </button>

        {status === "error" && (
          <p className={errClass} role="alert">
            Não conseguimos enviar agora. Tente de novo ou chame direto no WhatsApp.
          </p>
        )}
      </div>
    </form>
  );
}
