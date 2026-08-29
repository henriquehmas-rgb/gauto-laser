import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createHash, randomUUID } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { treatments } from "@/content/treatments";

const interestSlugs = [...treatments.map((t) => t.slug), "outro"] as const;

const leadSchema = z.object({
  name: z.string().min(2).max(80),
  whatsapp: z.string().regex(/^55?\d{10,11}$|^\d{10,11}$/, "WhatsApp inválido"),
  interest: z.enum(interestSlugs),
  source: z.string().min(1).max(40),
  utm: z.record(z.string(), z.string().max(160)).optional().default({}),
  ref: z.string().max(60).optional(),
  consent: z.literal(true),
  company: z.string().max(0).optional(), // honeypot: precisa vir vazio
});

/* Rate limit simples por IP: 10 req / 10 min (memória do processo) */
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= LIMIT) return true;
  list.push(now);
  hits.set(ip, list);
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Muitas tentativas. Aguarde alguns minutos." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos", issues: parsed.error.issues }, { status: 400 });
  }

  // honeypot preenchido → responde 201 sem gravar (não avisar o bot)
  if (parsed.data.company && parsed.data.company.length > 0) {
    return NextResponse.json({ id: randomUUID() }, { status: 201 });
  }

  const lead = {
    id: randomUUID(),
    name: parsed.data.name,
    whatsapp: parsed.data.whatsapp,
    interest: parsed.data.interest,
    source: parsed.data.source,
    utm: parsed.data.utm,
    ref: parsed.data.ref ?? null,
    consent_at: new Date().toISOString(),
    ip_hash: createHash("sha256").update(ip).digest("hex").slice(0, 16),
    created_at: new Date().toISOString(),
  };

  // Persistência: Postgres/Drizzle é fase futura (docs/PENDENCIAS.md) — JSONL por ora.
  try {
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "leads.jsonl"), JSON.stringify(lead) + "\n", "utf-8");
  } catch (err) {
    console.error("lead persist error", err);
    return NextResponse.json({ error: "Erro ao salvar" }, { status: 500 });
  }

  // Webhook opcional (n8n / OpaSuite / CRM) — não bloqueia a resposta
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    }).catch((err) => console.error("lead webhook error", err));
  }

  return NextResponse.json({ id: lead.id }, { status: 201 });
}
