# PENDÊNCIAS — dados de negócio a confirmar

Tudo listado aqui usa placeholder visível `{{...}}` em `src/config/site.config.ts` ou conteúdo
provisório em `src/content/`. Preencher e fazer redeploy.

## ⚠️ O site está em MODO RASCUNHO

Enquanto houver qualquer item P0 aberto, o site se serve automaticamente com
`noindex, nofollow` e `robots.txt` bloqueando tudo — não entra no Google e não deve
receber tráfego pago. Isso é automático, ver `src/config/readiness.ts`.

Para ver o que falta:

```bash
npm run check:launch
```

Sai com código 1 enquanto houver pendência (serve para travar CI/deploy). Quando sair 0,
o `noindex` some sozinho no próximo build e o site fica liberado para indexação e campanha.

**Contexto:** em 29/08/2026 o site foi publicado no domínio real ainda com placeholders e
sem esse gate — ficou exposto e indexável por algumas horas. O gate existe para que isso
não se repita.

## Bloqueiam o lançamento (P0)
- [ ] **WhatsApp comercial** — `contact.whatsapp` (só dígitos, ex.: `5565…`). Sem ele, todos os CTAs apontam para número placeholder.
- [ ] **Endereço completo no Juba Center** — `location.unit`, `location.address`, `location.zip`, `location.geo` (lat/lng exatos) e `location.mapsUrl` (link real do Google Maps/Business Profile).
- [ ] **Horário real de funcionamento** — `location.hours` (assumido: Seg–Sáb 10–22, Dom 14–20 — horário típico de shopping).
- [ ] **Depoimentos reais autorizados** — `src/content/testimonials.ts` (nome, @, texto, consentimento por escrito).
- [ ] **CNPJ** — `legal.cnpj` (rodapé).
- [ ] **Responsável técnico + registro** — `proof.responsibleProfessional`.
- [ ] **E-mail de contato** — `contact.email`. Exigido pela LGPD como canal para o titular
      pedir acesso/exclusão de dados; WhatsApp sozinho não basta. Sugestão:
      `contato@gautolaser.com.br`. Enquanto vazio, o e-mail simplesmente não aparece
      (rodapé e política se adaptam), mas o canal continua faltando legalmente.
- [ ] **Validar o claim "+10.000 sessões"** — é número comprovável? Publicidade em saúde
      exige sustentação. O mesmo vale para o prêmio "Diamante Vermelho". Se não houver
      como comprovar, trocar por algo verificável (ex.: anos de atuação).

## Importantes (P1)
- [ ] **Prêmio Diamante Vermelho** — nome oficial, quem concede e ano (`proof.award`).
- [ ] **Nota e nº de avaliações no Google** — `proof.google` (rating, reviewCount, url). Enquanto rating = 0, o site esconde a nota automaticamente.
- [ ] **Preços** — `pricing.mode` está `hidden`. Definir modo (`from`/`full`) e valores `priceFrom` por tratamento em `src/content/treatments.ts`.
- [ ] **Recompensa do Indique e Ganhe** — `referral.reward` e `referral.minPurchase`.
- [ ] **Instagram** — confirmar handle `@gautolaser`.
- [ ] **GTM / Meta Pixel** — criar contêiner e preencher `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_META_PIXEL_ID` no `.env` da VPS.
- [ ] **Oferta de entrada** — confirmar formato ("Avaliação + teste de disparo grátis" assumido) e regras.

## Fase futura (P2)
- [ ] Persistência Postgres + Drizzle para leads (hoje: `data/leads.jsonl` + webhook opcional via `LEAD_WEBHOOK_URL`).
- [ ] Páginas SEO por tratamento (`/tratamentos/[slug]`) e landing masculina (`/masculino`).
- [ ] Vídeo de depoimento (youtube-nocookie, lazy).
- [ ] Vale-presente.
- [ ] Blog local (`/guia`).
- [ ] Mostrar vínculo com Grupo SEEG no rodapé? (`legal.showGroup`).
- [ ] Renovação automática do domínio gautolaser.com.br está DESATIVADA (expira 2027-07-02).
- [ ] Testes Playwright + auditoria Lighthouse automatizada (protocolo §12 do brief).

## Decisões tomadas (registro)
- **Manual de identidade prevalece sobre o brief** na paleta e tipografia: champagne dominante
  (#F6F1E8), grafite #383838, dourado #C8A070/#806040 (máx. 10% da peça), Cinzel/Montserrat/
  Cormorant Garamond, cantos sempre retos. O brief pedia obsidian/Playfair — substituído.
- Fundo grafite usado apenas em Hero, Tecnologia, Oferta e rodapé (versão negativa do logo,
  conforme manual), alternando com champagne (nunca dois grafites consecutivos).
