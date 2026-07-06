# AHK Talent Bridge

Bolsa de empregos oficial da **Câmara Brasil-Alemanha (AHK)** — conecta empresas
associadas a talentos com perfil internacional, com curadoria institucional apoiada
por IA e governança de dados (LGPD/GDPR) desde o dia 1.

Implementado sobre o mesmo stack da plataforma EU-Mercosul:
**Next.js 15 (App Router) · Prisma · Turso (libSQL) · Anthropic · Inngest · Tailwind**.
Interface **bilíngue PT/EN** (toggle instantâneo), fiel ao design da AHK
(Source Sans 3 / Source Serif 4, `#003366` etc.).

---

## Requisitos

- Node 20+
- Uma conta Turso (produção) — em dev usa SQLite local (`prisma/dev.db`)
- Chave Anthropic (para padronização, matching e resumos)
- Opcional: Resend (e-mails), Inngest CLI (rodar o pipeline localmente)

## Setup

```bash
npm install
cp .env.example .env        # preencha as variáveis
npm run db:generate         # gera o Prisma Client
```

### Banco de dados local (SQLite)

> ⚠️ O CLI do Prisma resolve o caminho do SQLite relativo à pasta `prisma/`,
> enquanto o adapter libSQL resolve a partir do diretório do projeto. Por isso,
> para criar/atualizar o schema local, passe o `DATABASE_URL` inline:

```bash
DATABASE_URL="file:./dev.db" npx prisma db push   # cria prisma/dev.db com as tabelas
npm run db:seed                                    # 4 vagas de demonstração (PT/EN)
```

Em produção (Turso), `DATABASE_URL=libsql://...` + `DATABASE_AUTH_TOKEN` — o
descompasso acima não existe.

### Rodar

```bash
npm run dev            # http://localhost:3000 (ou --port 3100)
```

Para o pipeline de IA/automação localmente (opcional):

```bash
npx inngest-cli@latest dev   # painel Inngest em http://localhost:8288
```

## Estrutura

| Caminho | O quê |
|---|---|
| `src/app/page.tsx` | Landing (hero, como funciona, vagas, IA, governança, CTA) |
| `src/app/empresa` · `candidato` | Formulários (vaga / talento) |
| `src/app/vagas/[id]` | Detalhe da vaga + aderência |
| `src/app/privacidade` · `termos` · `uso-de-ia` | Conteúdo jurídico |
| `src/app/admin` | Backoffice (senha) — moderar, rodar matching/shortlist |
| `src/app/actions/submit.ts` | Server actions + Zod + consentimentos + auditoria |
| `src/i18n/` | Dicionário PT/EN + `LanguageProvider` |
| `src/lib/db.ts` | Prisma + adapter libSQL (Turso) |
| `src/lib/ai/` | Anthropic: padronização, matching (score), resumo executivo |
| `src/lib/inngest/functions.ts` | 4 cenários: vaga → talento → matching → shortlist |
| `prisma/schema.prisma` | Company, Job, Talent, **Consent**, Match, AuditLog |

## IA (Anthropic)

Usa `claude-sonnet-4-6` com **saída estruturada via tool_use** (sem prefill de
assistant — modelos 4.5+ rejeitam prefill). Cada `Match` grava o modelo e a
`promptVersion` para rastreabilidade. Sem `ANTHROPIC_API_KEY`, o app funciona
normalmente e apenas pula os passos de IA.

## LGPD / GDPR (by design)

- Consentimentos **separados** por finalidade: `data_processing`, `ai_matching`,
  `communications` (tabela `Consent`).
- Todo cenário de matching filtra por consentimento de IA ativo.
- Trilha de auditoria (`AuditLog`) para criação/exclusão/exportação.
- Sem decisão exclusivamente automatizada; curadoria e decisão final humanas.

## Deploy (Vercel)

1. Projeto Vercel apontando para esta pasta.
2. Env vars: `DATABASE_URL` (Turso), `DATABASE_AUTH_TOKEN`, `ANTHROPIC_API_KEY`,
   `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, (`RESEND_API_KEY`, `EMAIL_FROM`),
   `INNGEST_SIGNING_KEY`, `INNGEST_EVENT_KEY`.
3. `npm run build` já roda `prisma generate`.
4. Registrar o endpoint `/api/inngest` no app Inngest.

## Segurança

Repositório novo — segredos **nunca** vão ao git (`.env` no `.gitignore` desde o
commit 1). Não reaproveitar chaves do histórico de outros repositórios.
