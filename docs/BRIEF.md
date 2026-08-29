# GAUTO LASER — Brief de construção do site (Claude Code)

> Como usar: salve como `docs/BRIEF.md` na raiz do projeto e envie ao Claude Code: **"Leia docs/BRIEF.md e execute as fases na ordem. Não pule o protocolo de verificação final."**
> Tudo marcado com `{{...}}` é variável e deve vir de `src/config/site.config.ts`. Nunca invente telefone, endereço, horário, preço, prêmio ou nota de avaliação: se faltar, use o placeholder visível e registre em `PENDENCIAS.md`.

---

## 0. Papel e objetivo

Você atua como **time de Creative Technologist sênior + especialista em CRO (otimização de conversão) + dev Next.js**, com experiência em landing pages de estética médica de alto padrão.

**Único objetivo do site:** gerar **avaliações agendadas via WhatsApp** (conversão primária) e **leads cadastrados** (conversão secundária). Toda seção existe para empurrar o visitante para uma dessas duas ações, e toda ação é medida.

Tráfego esperado: majoritariamente Instagram/Meta Ads → **mobile-first** (projete para 375 px primeiro, depois 768 e 1440).

---

## 1. O negócio

- **Gauto Laser** — clínica de estética a laser em **Cáceres-MT**, dentro do **Juba Center** (shopping): horário estendido, estacionamento amplo, ambiente climatizado, segurança.
- **Tecnologia:**
  - Plataforma **Infinity Duos** — 4 comprimentos de onda simultâneos (755 nm Alexandrite / 808 nm Diodo / 940 nm / 1064 nm Nd:YAG) → atende **fototipos I a VI, inclusive pele bronzeada**.
  - **Ponteira criogênica (-10 °C)** → sessão praticamente indolor.
  - **Laser Q-Switched Nd:YAG** (disparos em nanosegundos) → remoção de tatuagem, despigmentação, clareamento.
- **Catálogo inicial (5 tratamentos):**
  1. Epilação 4D Prime — áreas corporais e faciais, feminino e masculino.
  2. Hollywood Black Peel — laser + carvão ativado, efeito glow imediato e fechamento de poros.
  3. Despigmentação de sobrancelhas — correção segura sem danificar os fios.
  4. Remoção de tatuagem — Q-Switched para tintas escuras e coloridas.
  5. Clareamento a laser — axilas, virilhas e manchas corporais.
- **Provas:** prêmio **"Diamante Vermelho — Referência Nacional"** (`{{award.name}}` / `{{award.issuer}}` — confirmar nome oficial e quem concede), **+10.000 sessões realizadas**, nota Google `{{google.rating}}` (`{{google.reviewCount}}` avaliações).
- **Diferenciais frente às redes nacionais de depilação** (que usam 1 comprimento de onda): pele negra e bronzeada sem restrição, conforto criogênico, remoção de pigmentos (as redes de depilação não fazem), conveniência de shopping. **Nunca cite marcas concorrentes** — o comparativo é técnico.

---

## 2. Stack e setup (Fase 0)

- **Next.js 15+ (App Router, TypeScript, `src/`)**, **Tailwind CSS v4**, **shadcn/ui** (accordion, dialog, tabs, sheet, badge, button, card, form, tooltip, sonner), **lucide-react**, **motion** (`import { motion, useReducedMotion } from "motion/react"`), `next/font` (Playfair Display, Plus Jakarta Sans, JetBrains Mono), **Zod + react-hook-form**.
- **Backend leve:** route handler `POST /api/leads`. Se `DATABASE_URL` existir → **Drizzle ORM + PostgreSQL** (tabela `leads`); senão → grava em `data/leads.jsonl` (dev). Se `LEAD_WEBHOOK_URL` existir → repassa o lead (n8n / OpaSuite / CRM).
- **Deploy alvo:** VPS Hostinger + **Caddy** (reverse proxy + HTTPS automático). Gerar `Caddyfile` de exemplo, `ecosystem.config.js` (PM2) e `output: "standalone"` no `next.config.ts`.
- **Comandos de bootstrap:**
  ```bash
  npx create-next-app@latest gauto-laser --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
  cd gauto-laser
  npx shadcn@latest init
  npx shadcn@latest add accordion dialog tabs sheet badge button card form tooltip sonner
  npm i lucide-react motion zod react-hook-form @hookform/resolvers drizzle-orm postgres
  npm i -D drizzle-kit @playwright/test
  git init && git add -A && git commit -m "chore: bootstrap"
  ```
- **Estrutura:**
  ```
  src/
    app/
      layout.tsx            # fonts, GTM, JSON-LD global, ConsentBanner
      page.tsx              # landing (seções em ordem)
      tratamentos/[slug]/page.tsx   # 1 página SEO por tratamento (Fase 4)
      masculino/page.tsx    # landing masculina (Fase 4)
      sessao-cortesia/page.tsx      # LP da oferta de entrada (Fase 3)
      indique-e-ganhe/page.tsx      # programa de indicação (Fase 3)
      politica-de-privacidade/page.tsx
      regulamento/page.tsx
      api/leads/route.ts
      sitemap.ts  robots.ts  opengraph-image.tsx  not-found.tsx
    components/
      layout/  (Header, MobileStickyBar, Footer, FloatingWhatsApp)
      sections/ (Hero, TrustStrip, Treatments, ComboBuilder, Quiz, Technology, Compare, HowItWorks, Location, Proof, Testimonials, Faq, EntryOffer, Referral, FinalCta)
      ui/ (shadcn)
      shared/ (LaserBeam, GoldCard, SectionEyebrow, WhatsAppButton)
    config/site.config.ts   # TODAS as variáveis
    content/ (treatments.ts, faq.ts, testimonials.ts, quiz.ts)
    lib/ (whatsapp.ts, analytics.ts, utm.ts, schema.ts, db/)
  docs/BRIEF.md  ASSETS_NEEDED.md  PENDENCIAS.md  .env.example
  ```

---

## 3. Config central — `src/config/site.config.ts`

Tudo que é dado de negócio fica aqui, tipado. Componentes não têm texto de negócio hardcoded.

```ts
export const siteConfig = {
  brand: { name: "Gauto Laser", tagline: "{{tagline}}", domain: "{{dominio}}" },
  contact: {
    whatsapp: "{{55DDDNÚMERO}}",       // só dígitos
    phone: "{{telefone fixo, opcional}}",
    instagram: "{{@handle}}",
    email: "{{email}}",
  },
  location: {
    venue: "Juba Center",
    unit: "{{loja/piso}}",
    address: "{{rua, nº — bairro}}", city: "Cáceres", state: "MT", zip: "{{CEP}}",
    geo: { lat: 0, lng: 0 },            // preencher
    hours: [{ days: "Seg–Sáb", open: "{{10:00}}", close: "{{22:00}}" }, { days: "Dom", open: "{{14:00}}", close: "{{20:00}}" }],
    mapsUrl: "{{link Google Maps}}", parking: true, airConditioned: true,
    nearbyCities: ["{{cidades vizinhas atendidas}}"],
  },
  proof: {
    sessions: 10000, yearsActive: 0,
    award: { name: "Diamante Vermelho", issuer: "{{quem concede}}", year: 0 },
    google: { rating: 0, reviewCount: 0, url: "{{link avaliações}}" },
    anvisaRegistered: true, responsibleProfessional: "{{nome + registro}}",
  },
  pricing: {
    mode: "from" as "hidden" | "from" | "full",   // "from" = "a partir de 12x R$ X"
    maxInstallments: 12, showAnchorPrice: true,  // De/Por
  },
  entryOffer: {   // oferta de entrada (lead magnet) — decidir uma:
    enabled: true,
    title: "{{Avaliação + teste de disparo grátis | 1ª sessão de axilas cortesia}}",
    eligibility: "novos clientes (1 por CPF)", validityDays: 30,
    regulationUrl: "/regulamento",
  },
  referral: { enabled: true, reward: "{{R$ 100 de crédito para quem indica e para o indicado}}", minPurchase: "{{pacote}}" },
  combos: { tiers: [{ areas: 2, discount: 0.10 }, { areas: 3, discount: 0.15 }] },
  campaign: { active: false, label: "", headline: "", deadline: "", cta: "" },   // banner sazonal
  partners: [ /* { name: "Sócio-torcedor Cacerense EC", benefit: "10% off" } */ ],   // clube de vantagens Grupo SEEG (opcional)
  tracking: { gtmId: process.env.NEXT_PUBLIC_GTM_ID, metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID },
};
```

---

## 4. Design system

**Paleta (tokens CSS em `globals.css`, usados via Tailwind):**

| Token | Hex | Uso |
|---|---|---|
| `--obsidian` | `#0D0D11` | fundo base |
| `--obsidian-2` | `#15151B` | cards / superfícies |
| `--gold` | `#D4AF37` | CTA primário, bordas em hover, ícones |
| `--champagne` | `#E5C07B` | highlights, gradiente do botão, números |
| `--alabaster` | `#FAFAFA` | texto principal |
| `--cryo` | `#9BD7E8` | **só** para a narrativa do resfriamento (-10 °C) — uso pontual |

Regras: **nunca texto dourado sobre fundo claro** (contraste reprova); dourado sobre obsidian passa (~9:1). Glassmorphism apenas no header e em 1–2 cards de destaque — não em tudo.

**Tipografia:** Playfair Display (display, peso 500/600, `letter-spacing -0.01em`), Plus Jakarta Sans (corpo/UI), **JetBrains Mono** para dados técnicos (comprimentos de onda, temperaturas, minutos, contadores). Escala: 12 / 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64.

**Elemento-assinatura (o único lugar onde ser ousado):** o **"espectro 4D"** — quatro feixes finos (755 / 808 / 940 / 1064 nm) em tons de dourado/âmbar ligeiramente distintos, que aparecem: (1) no hero, convergindo para o ponto de luz do logo; (2) como divisor de seções (hairline animada no scroll); (3) na seção Tecnologia, cada feixe "acende" ao passar o cursor/tocar. Tudo o mais fica quieto e disciplinado.

**Motion:** `useReducedMotion` respeitado em tudo. Uma sequência de entrada no hero (feixes → headline → badges → CTAs, ~1,2 s). Reveal no scroll com `whileInView` (1 vez, `y: 12, opacity`). Hover em cards: borda dourada + leve elevação. **Pulse no CTA do header: sutil, 1 ciclo a cada 6 s, não contínuo.** Nada de parallax pesado.

**Anti-padrões proibidos:** emojis como ícones (usar lucide-react), stock photos genéricas por URL externa, marcadores 01/02/03 onde não há sequência real, gradientes roxos, textos "genuinamente/revolucionário", 3 colunas de features idênticas sem hierarquia.

**Assets:** você não gera fotos. Use placeholders elegantes (gradiente obsidian + feixe dourado + rótulo discreto) e liste em `ASSETS_NEEDED.md` cada imagem/vídeo necessário com dimensão, orientação e uso.

---

## 5. Arquitetura de conversão — ativações de referência (Espaçolaser) adaptadas

Referência analisada: espacolaser.com.br (home, catálogo feminino, página de produto e landing de indicação). Abaixo, o que eles fazem e como **adaptar** para a Gauto — nunca copiar texto.

| # | Ativação de referência | O que eles fazem | Implementação Gauto | Prior. |
|---|---|---|---|---|
| 1 | **Oferta de entrada (lead magnet)** | LP dedicada "3 sessões grátis" (axilas ou faixa de barba) só para CPF novo; fluxo cadastro → escolher unidade → indicar amigos → obrigado | Página `/sessao-cortesia` com `{{entryOffer}}`; formulário 4 campos (nome, WhatsApp, área de interesse, consentimento LGPD) → obrigado com botão WhatsApp pré-preenchido + convite para indicar | P0 |
| 2 | **Indique e Ganhe** | Programa de pontos; amigo indicado e quem indica ganham até R$ 100; compartilhamento por WhatsApp/link | Página `/indique-e-ganhe`: explica `{{referral.reward}}`, gera link `?ref=` (código do indicador salvo no lead) + botão "Convidar pelo WhatsApp" com mensagem pronta | P1 |
| 3 | **Preço âncora + parcelamento** | "De R$ X / Por 12x R$ Y", "desconto de até 70% no fechamento", cartão vs recorrência | `pricing.mode`: exibir "a partir de 12x R$ Y" nos cards (De/Por opcional). Nunca exibir preço sem o aviso "valor final após avaliação" | P0 |
| 4 | **Catálogo segmentado** | Nav Feminina / Masculina; filtros por região (Cabeça, Tronco, Pernas e Pés, Braços e Mãos) com contagem; ordenação por preço | Tabs por categoria + **toggle Feminino/Masculino** + chips por região corporal; badge "mais procurado" | P0 |
| 5 | **Carrinho / pacote** | Compra online de pacotes por área, "Adicionar" | **"Monte sua combinação"**: seleciona áreas → mostra tempo estimado de sessão, desconto por `combos.tiers` e botão WhatsApp com a lista pronta (carrinho sem checkout). Checkout online = Fase futura | P1 |
| 6 | **Ficha do procedimento** | Tabela (duração da sessão, intervalo, exposição ao sol), instruções de preparo, avaliações, "você também pode se interessar" | Dialog "Detalhes" em cada card com a mesma estrutura + bloco "Combina com" (cross-sell) | P0 |
| 7 | **Validação após avaliação** | Aviso de que o pacote é validado por especialista | Frase padrão em cards, quiz e oferta: "Sujeito a avaliação profissional. Consulte contraindicações." | P0 |
| 8 | **WhatsApp com origem identificada** | Link `wa.me` com texto "vim do site..." | `lib/whatsapp.ts`: gera mensagem por contexto (hero, card, quiz, combo, sticky, oferta) + UTM de origem. Ver §8 | P0 |
| 9 | **Localização / Onde estamos** | Busca de unidade | Seção Juba Center: endereço, horário do dia (aberto agora / fecha às…), "Como chegar", estacionamento, climatização; JSON-LD com geo | P0 |
| 10 | **Números + selos** | +20 anos, +850 unidades, +5 mi clientes, +80 mi procedimentos, selo Reclame Aqui 1000 | Contadores animados com dados de `proof` (+10.000 sessões, 4 comprimentos de onda, -10 °C, nota Google) + prêmio + "equipamento registrado na ANVISA" | P0 |
| 11 | **Comparativo de eficácia** | "3x mais eficaz que diodo" | Tabela **4D vs diodo simples vs IPL vs cera**: fototipos atendidos, pele bronzeada, dor, velocidade, indicação. Sem marcas | P0 |
| 12 | **Depoimentos com @** | Cards com foto, 5 estrelas, texto e @instagram; masculino e feminino | Mesmo formato + área tratada + nº de sessões; 1 vídeo (youtube-nocookie, lazy) | P0 |
| 13 | **"Veja como é simples" (3 passos)** | Cadastro → agende → vá à loja | "Como funciona": Avaliação gratuita (15 min) → Sessão (X min) → Resultado progressivo | P0 |
| 14 | **FAQ orientado a objeções** | Dói? Quem pode? Precisa comprar? Prazo? Preparo? | 10 perguntas (§6.11), com `FAQPage` JSON-LD | P0 |
| 15 | **Agenda do cliente** | Confirmar presença / reagendar / não irei | Fase 1: estado "Obrigado" com próximos passos + "Adicionar ao calendário" (.ics) após confirmação no WhatsApp. Área do cliente = Fase futura | P2 |
| 16 | **Regulamento + consentimento** | Checkbox LGPD, regulamento em PDF, política de privacidade | `/regulamento`, `/politica-de-privacidade`, checkbox obrigatório nos formulários, banner de cookies | P0 |
| 17 | **Blog (SEO)** | "Blog da Mel" | Fase futura: `/guia` com artigos locais ("depilação a laser em Cáceres", "laser em pele negra") | P2 |
| 18 | **Co-branding / parcerias** | Banner de campanha com app de relacionamento | `partners[]`: clube de vantagens (sócio-torcedor Cacerense EC, clientes SEEG). Off por padrão | P2 |
| 19 | **Campanha sazonal** | Banners de promoção na home | `campaign`: faixa acima do hero com countdown até `deadline` (Verão, Dia das Mães, Black Friday, aniversário) | P1 |
| 20 | **Conta / cadastro** | Login e cadastro de cliente | Substituído por captura de lead (`/api/leads`) — sem fricção de senha | P0 |

**Extras de CRO não vistos na referência (incluir):** exit-intent no desktop / modal ao atingir 60 % de scroll no mobile (1x por sessão) oferecendo `{{entryOffer}}`; barra sticky mobile com 2 botões; quiz de tratamento ideal (§7); vale-presente (P2).

---

## 6. Estrutura da landing (`/`) — seções em ordem

Cada seção lista: conteúdo, componente, CTA e evento de tracking.

### 6.1 Faixa de campanha (condicional)
`campaign.active` → faixa fina acima do header: label + headline + countdown + CTA. Evento `campaign_click`.

### 6.2 Header glass
Logo "GAUTO LASER" (Playfair, com o ponto de luz dourado do espectro). Links: Tratamentos · Tecnologia 4D · Benefícios · Localização · FAQ. Botão **"Agendar avaliação"** (gradiente gold → champagne). Mobile: sheet lateral. Evento `cta_whatsapp_click {position:"header"}`.

### 6.3 Hero
- H1: **"Sua melhor versão com a tecnologia a laser mais avançada."**
- Sub: "Epilação 4D praticamente indolor para todos os tons de pele e remoção avançada de pigmentos. Com exclusividade no Juba Center, em Cáceres."
- 3 badges (lucide, não emoji): `Award` Premiada Diamante Vermelho · `Snowflake` Tecnologia 4D ultra-resfriada · `Building2` Juba Center — horário de shopping.
- CTAs: **[Agendar pelo WhatsApp]** (primário) · **[Ver tratamentos]** (ghost, scroll suave).
- Microprova sob os CTAs: "★ {{google.rating}} no Google · +10.000 sessões".
- Fundo: espectro 4D animado + placeholder de foto (retrato, mobile 4:5).
- Eventos: `cta_whatsapp_click {position:"hero"}`, `scroll_to_treatments`.

### 6.4 Trust strip
Linha com prêmio · nota Google · "Registro ANVISA" · "-10 °C" · "Fototipos I–VI". Sem animação.

### 6.5 Tratamentos (portfólio interativo)
Tabs: **Todos · Epilação 4D · Remoção & Despigmentação · Facial & Glow** + toggle **Feminino / Masculino** + chips por região (Rosto, Axilas, Virilha, Pernas, Braços, Costas/Peito, Barba).
Card (`GoldCard`): nome, benefícios (3), badge de dor **"Zero a mínimo"**, `Clock` duração, nº estimado de sessões, `pricing` ("a partir de 12x R$ {{}}"), badge "mais procurado" quando aplicável, botões **"Agendar este tratamento"** (WhatsApp com nome do tratamento) e **"Detalhes"** (dialog: ficha técnica — duração, intervalo, exposição ao sol; preparo; contraindicações resumidas; "Combina com").
Dados em `content/treatments.ts` (tipo `Treatment` com `slug, category, genders, areas, techLabel, painLevel, sessionMinutes, sessionsEstimate, intervalDays, sunExposureDays, prep[], priceFrom?, pairsWith[]`).
Eventos: `treatment_view {slug}`, `treatment_details_open {slug}`, `cta_whatsapp_click {position:"card", slug}`.

### 6.6 Monte sua combinação
Seleção múltipla de áreas (chips) → painel: áreas escolhidas, tempo total estimado, desconto por `combos.tiers`, "a partir de 12x R$ {{}}" (se `pricing.mode !== "hidden"`), botão **"Pedir orçamento no WhatsApp"** com a lista. Evento `combo_submit {areas, count}`.

### 6.7 Quiz "Descubra seu tratamento ideal" — ver §7

### 6.8 Tecnologia 4D (Infinity Duos)
3 blocos com o espectro como assinatura: **4 comprimentos de onda** (755/808/940/1064 em JetBrains Mono; "do fototipo I ao VI, inclusive pele bronzeada") · **Ponteira criogênica -10 °C** (conforto + biossegurança; único uso do token `--cryo`) · **Q-Switched em nanosegundos** (preserva a pele; pigmentos e tatuagens).
Abaixo: **tabela comparativa** (ativação #11). Evento `compare_view`.

### 6.9 Como funciona (3 passos reais)
Avaliação gratuita (15 min, teste de disparo se `entryOffer`) → Sessão ({{min}} min, intervalo {{dias}} dias) → Resultado progressivo. CTA "Agendar avaliação gratuita".

### 6.10 Juba Center — localização e experiência
Card visual: endereço `{{location}}`, **status "Aberto agora · fecha às HH:MM"** calculado por `hours`, horário estendido, estacionamento, climatização, segurança. Botões **"Como chegar"** (Google Maps) e **"Ligar"** (se `phone`). Mapa estático leve (sem iframe pesado acima da dobra). Eventos `maps_click`, `phone_click`.

### 6.11 Prova social + FAQ
Contadores (`proof`) + depoimentos (ativação #12) + accordion com 10 perguntas:
1. Dói? 2. Quantas sessões preciso? 3. Funciona em pele negra ou bronzeada? 4. Como funciona a remoção de tatuagem/pigmento? 5. Como me preparo para a sessão (aparar com lâmina, nunca cera/pinça; sem sol)? 6. Qual o intervalo entre sessões? 7. Quem não pode fazer? 8. Formas de pagamento e parcelamento? 9. Já fiz laser em outra clínica e não funcionou — posso fazer? 10. Preciso comprar pacote na avaliação?
Respostas em `content/faq.ts`; `FAQPage` JSON-LD. Evento `faq_open {question}`.

### 6.12 Oferta de entrada + Indique e Ganhe
Bloco duplo: `{{entryOffer}}` com formulário curto (ativação #1) e teaser do programa de indicação (ativação #2) linkando para `/indique-e-ganhe`. Eventos `lead_form_submit {source:"entry_offer"}`, `referral_click`.

### 6.13 CTA final + Footer
Headline curta + botão WhatsApp. Footer: NAP (nome, endereço, telefone) idêntico ao Google Business Profile, horário, `{{responsibleProfessional}}`, CNPJ `{{}}`, Instagram, políticas, regulamento. Linha "Uma empresa do Grupo SEEG" só se `{{showGroup}}` = true.

### 6.14 Elementos persistentes
- **FloatingWhatsApp** (desktop, canto inferior direito, tooltip "Agende sua avaliação").
- **MobileStickyBar**: **[WhatsApp]** + **[Avaliação grátis]** (abre o formulário da oferta). Aparece após 30 % de scroll; esconde quando um dialog está aberto.
- **Exit-intent / scroll 60 %** (1x por sessão, `sessionStorage`), modal da oferta de entrada. Eventos `exit_modal_view`, `exit_modal_submit`.

---

## 7. Quiz "Descubra seu tratamento ideal"

Widget inline (não modal) em 4 passos, com barra de progresso e navegação por teclado:

1. **O que você quer tratar?** Pelos indesejados · Manchas / clareamento · Tatuagem · Glow facial · Sobrancelha
2. **Qual seu tom de pele?** Escala visual de 6 tons (fototipos I–VI) — resposta sempre reforça: "A tecnologia 4D atende todos os tons, inclusive bronzeados."
3. **Sua prioridade?** Zero dor · Rapidez · Correção definitiva · Custo-benefício
4. **Para quem?** Para mim (feminino) · Para mim (masculino) · Presente

**Resultado (card):** protocolo recomendado (mapeamento em `content/quiz.ts`), por que ele, duração e nº estimado de sessões, `pricing` se habilitado, aviso "sujeito a avaliação", botão **"Agendar pelo WhatsApp"** com mensagem pré-preenchida contendo as 4 respostas, e botão secundário "Ver tratamento". Eventos `quiz_start`, `quiz_step {step}`, `quiz_complete {result}`, `cta_whatsapp_click {position:"quiz"}`.

Mapeamento mínimo: Pelos → Epilação 4D Prime · Manchas → Clareamento a laser · Tatuagem → Remoção Q-Switched · Glow → Hollywood Black Peel · Sobrancelha → Despigmentação. Prioridade "Zero dor" adiciona o argumento -10 °C; "Rapidez" adiciona o tempo de sessão; "Presente" adiciona vale-presente (se ativo).

---

## 8. Leads, WhatsApp e rastreamento

**`lib/whatsapp.ts`** — `buildWaLink({ context, treatment?, answers?, areas? })` → `https://wa.me/{{whatsapp}}?text=` + `encodeURIComponent(msg)`. Modelos:
- hero/header/sticky: "Olá! Vim pelo site da Gauto Laser e quero agendar uma avaliação. {origem}"
- card: "Olá! Quero agendar uma avaliação para *{tratamento}*. {origem}"
- quiz: "Olá! Fiz o quiz do site: quero tratar *{objetivo}*, tom de pele {fototipo}, prioridade {prioridade}. Podem me ajudar a agendar? {origem}"
- combo: "Olá! Quero orçamento para: {áreas}. {origem}"
`{origem}` = "(origem: {utm_source}/{utm_campaign})" quando existir.

**`lib/utm.ts`** — captura `utm_*`, `ref` e `fbclid/gclid` na primeira visita, persiste em `sessionStorage` + cookie 30 dias (first-touch), injeta em campos ocultos do formulário e na mensagem do WhatsApp.

**`POST /api/leads`** — Zod: `name (2–80)`, `whatsapp (E.164 BR)`, `interest (enum slugs)`, `source`, `utm{}`, `ref?`, `consent (true)`, honeypot `company` (vazio). Rate limit por IP (10/10 min). Resposta 201 `{ id }`. Tabela `leads` (Drizzle): `id uuid, name, whatsapp, interest, source, utm jsonb, ref, consent_at, ip_hash, created_at`. Depois de salvar, repassa para `LEAD_WEBHOOK_URL` se definido (não bloqueia a resposta).

**`lib/analytics.ts`** — `track(event, params)` → `window.dataLayer.push`. GTM via `@next/third-parties/google` (`GoogleTagManager`), carregado **após consentimento**. Meta Pixel configurado no GTM; mapear `lead_form_submit → Lead`, `cta_whatsapp_click → Contact`, `quiz_complete → CompleteRegistration`. Lista completa de eventos: `campaign_click, cta_whatsapp_click{position,slug?}, scroll_to_treatments, treatment_view, treatment_details_open, combo_submit, quiz_start, quiz_step, quiz_complete, compare_view, maps_click, phone_click, faq_open, lead_form_submit{source}, referral_click, referral_share, exit_modal_view, exit_modal_submit`.

`.env.example`: `NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_GTM_ID, NEXT_PUBLIC_META_PIXEL_ID, DATABASE_URL, LEAD_WEBHOOK_URL`.

---

## 9. SEO local

- Título: "Depilação a Laser em Cáceres-MT | Gauto Laser — Juba Center". Description ≤ 155 caracteres com "epilação 4D", "todos os tons de pele", "Juba Center".
- Usar "**depilação a laser**" nas meta tags, H1/H2 e FAQ (termo buscado); "Epilação 4D" como nome do produto no corpo.
- Mencionar Cáceres, Mato Grosso e `nearbyCities` de forma natural (hero, localização, FAQ).
- JSON-LD: `HealthAndBeautyBusiness` (name, image, address, geo, openingHoursSpecification, telephone, sameAs Instagram/Google, priceRange), `FAQPage`, `Service` por tratamento (Fase 4 nas páginas `/tratamentos/[slug]`), `BreadcrumbList`.
- `opengraph-image.tsx` gerada (obsidian + espectro + headline), `sitemap.ts`, `robots.ts`, canonical, `lang="pt-BR"`.
- NAP idêntico ao Google Business Profile; link para as avaliações Google.

---

## 10. Conformidade e conteúdo

- **LGPD:** banner de cookies (GTM só após aceite), checkbox de consentimento nos formulários com link para a política, minimização de dados, `ip_hash` em vez de IP.
- **Publicidade em saúde/estética:** nunca "100 % indolor", "resultado garantido", "definitivo para sempre" → usar "praticamente indolor", "redução progressiva dos pelos", "resultados variam por pessoa", "sujeito a avaliação profissional", "consulte contraindicações". Antes/depois apenas com consentimento e sem promessa de resultado. Comparativos técnicos sem citar marcas.
- **Copy:** português do Brasil, "você", frases curtas, voz ativa, sentence case nos botões, o botão diz o que acontece ("Agendar pelo WhatsApp", não "Enviar"). Sem preencher com adjetivos vazios.
- **Métricas verificáveis:** trocar "100 % de biossegurança" por algo mensurável ("ponteira higienizada e descartável a cada sessão"); "5★" vira a nota real do Google.

---

## 11. Piso de qualidade

- **Performance:** LCP < 2,5 s no mobile (throttling 4G), `next/image` (AVIF/WebP, `priority` só no hero), fontes com `display: swap`, vídeo e mapa lazy, sem embeds acima da dobra. Lighthouse ≥ 90 em Performance, A11y, Best Practices e SEO (mobile e desktop).
- **Acessibilidade:** foco visível, navegação por teclado em tabs/accordion/quiz/dialog, `aria-*` corretos, contraste AA, `prefers-reduced-motion`, alt em todas as imagens, tamanho de toque ≥ 44 px.
- **Responsivo:** 375 / 768 / 1440 sem overflow horizontal.

---

## 12. Fases de execução

Commit ao final de cada fase (conventional commits). Não avance com erro de lint, tipo ou build.

| Fase | Entrega |
|---|---|
| 0 | Bootstrap, config, tokens, fontes, layout base, Header/Footer/Sticky, `PENDENCIAS.md` e `ASSETS_NEEDED.md` criados |
| 1 | Hero + Trust strip + Tratamentos (cards, tabs, toggle, dialog) + Tecnologia + Comparativo + Como funciona + Localização + Prova/FAQ + CTA final |
| 2 | Quiz + Monte sua combinação + WhatsApp builder + UTM + analytics + exit-intent |
| 3 | `/api/leads` + Drizzle + formulário da oferta + `/sessao-cortesia` + `/indique-e-ganhe` + políticas/regulamento + ConsentBanner |
| 4 | SEO (JSON-LD, OG, sitemap, robots) + `/tratamentos/[slug]` + `/masculino` + deploy files (Caddyfile, PM2, standalone) |
| 5 | **Protocolo de verificação final (obrigatório)** |

### Protocolo de verificação final (Fase 5)
Execute tudo, corrija o que falhar e **só então** encerre. Entregue um relatório "Erros encontrados e corrigidos" com item por item.

```bash
npm run lint
npx tsc --noEmit
npm run build && npm run start &
npx playwright test          # screenshots em 375/768/1440 + console sem erros + todos os links/CTAs respondem
npx lighthouse http://localhost:3000 --preset=desktop --output=json --output-path=./reports/lh-desktop.json
npx lighthouse http://localhost:3000 --form-factor=mobile --output=json --output-path=./reports/lh-mobile.json
```

Checar manualmente e registrar no relatório:
1. Todo `wa.me` usa `{{whatsapp}}` do config e a mensagem chega decodificada corretamente (testar acentos).
2. Quiz: todas as combinações (5 × 6 × 4 × 3) resolvem para um resultado válido — testar por script.
3. Formulário: caminhos válido, inválido, honeypot e rate limit; lead gravado (JSONL ou Postgres); webhook disparado se configurado.
4. JSON-LD válido (sem warnings críticos), `sitemap.xml` e `robots.txt` acessíveis, OG image renderiza.
5. `prefers-reduced-motion` desliga as animações; navegação por teclado completa em tabs, accordion, quiz e dialogs.
6. Sem overflow horizontal em 375 px; sticky bar não cobre conteúdo nem sobrepõe dialogs.
7. Nenhum `{{placeholder}}` fora de `PENDENCIAS.md` foi esquecido sem registro.
8. Zero erros e zero warnings no console do navegador.

---

## 13. Definition of Done

- [ ] Lint, typecheck e build limpos; Lighthouse ≥ 90 nas 4 categorias (mobile e desktop)
- [ ] Todos os 14 itens P0 da tabela de ativações implementados; P1 implementados ou listados em `PENDENCIAS.md` com motivo
- [ ] Todos os eventos do §8 disparando no `dataLayer` (verificado no Playwright)
- [ ] Nenhum dado de negócio hardcoded fora de `site.config.ts` / `content/`
- [ ] `ASSETS_NEEDED.md`, `PENDENCIAS.md`, `.env.example`, `Caddyfile`, `ecosystem.config.js` e `README.md` (como rodar, deploy, como trocar oferta/campanha) entregues
- [ ] Relatório "Erros encontrados e corrigidos" entregue

---

## 14. Perguntas a fazer antes de começar (só se não estiverem no config)

1. Número do WhatsApp comercial e @ do Instagram.
2. Endereço completo no Juba Center (loja/piso), horário real e link do Google Maps / Google Business Profile.
3. Qual oferta de entrada usar (avaliação + teste de disparo grátis, ou 1ª sessão cortesia em qual área) e regras.
4. Exibir preços? Em qual modo (`hidden` / `from` / `full`) e valores "a partir de" por tratamento.
5. Nome oficial do prêmio "Diamante Vermelho", quem concede e ano.
6. Responsável técnico e registro; equipamento registrado na ANVISA (nº).
7. Nota e quantidade de avaliações no Google.
8. Programa de indicação: recompensa e condições.
9. Domínio final e IDs de GTM / Meta Pixel.
10. Mostrar vínculo com o Grupo SEEG no rodapé?

Se alguma resposta não vier, **não bloqueie**: use placeholder visível `{{...}}`, registre em `PENDENCIAS.md` e siga.
