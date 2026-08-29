# Gauto Laser — site institucional

Landing page de conversão da **Gauto Laser** (estética a laser premium · Juba Center, Cáceres-MT).
Next.js 16 (App Router, TypeScript, Tailwind v4, shadcn/ui) seguindo o **Manual de Identidade
Visual v1.0** (champagne/grafite/dourado, Cinzel/Montserrat/Cormorant, cantos retos).

- **Produção:** https://gautolaser.com.br (VPS · Docker · Traefik/Let's Encrypt)
- **Brief completo:** [docs/BRIEF.md](docs/BRIEF.md)
- **Dados pendentes de negócio:** [docs/PENDENCIAS.md](docs/PENDENCIAS.md)
- **Fotos/vídeos necessários:** [docs/ASSETS_NEEDED.md](docs/ASSETS_NEEDED.md)

## Rodar localmente

```bash
npm install
npm run dev   # http://localhost:3000
```

## Deploy

```bash
git push  # (token: ver skill /conexoes)
ssh vps "cd /docker/gauto-laser && bash infra/deploy.sh"
```

## Onde editar o quê

| O quê | Onde |
|---|---|
| Telefone, endereço, horários, oferta, preços | `src/config/site.config.ts` |
| Tratamentos (textos, duração, preços) | `src/content/treatments.ts` |
| FAQ | `src/content/faq.ts` |
| Depoimentos | `src/content/testimonials.ts` |
| Quiz (perguntas/mapeamento) | `src/content/quiz.ts` |
| Tokens de design (cores/fontes do manual) | `src/app/globals.css` |
| Logos e submarks | `public/brand/` |

## Leads

`POST /api/leads` valida com Zod (honeypot + rate limit 10/10min por IP) e grava em
`data/leads.jsonl` no container. Se `LEAD_WEBHOOK_URL` estiver no ambiente, o lead é repassado
(n8n/OpaSuite/CRM). Postgres/Drizzle: fase futura.

Ver leads em produção:

```bash
ssh vps "docker exec gauto-laser-web-1 cat data/leads.jsonl"
```

## Analytics

Eventos empurrados para `window.dataLayer` (GTM carrega só após aceite de cookies — LGPD).
Preencher `NEXT_PUBLIC_GTM_ID` no `.env` da VPS quando o contêiner GTM existir.
