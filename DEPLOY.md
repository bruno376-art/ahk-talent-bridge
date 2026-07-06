# Deploy — AHK Talent Bridge (Vercel + Turso + Inngest)

Este app vive numa **subpasta** do repo `EU-ME SaaS` (ao lado de `plataforma/`).
Deve ser um **projeto Vercel próprio**, separado do EU-Mercosul.

## 1. Banco de dados (Turso)

Crie o banco no painel [turso.tech](https://turso.tech) (ou via CLI) e copie a
**URL** (`libsql://...`) e um **token**.

> ⚠️ **Não use `prisma db push` contra o Turso.** O provider é `sqlite` e o engine
> nativo do Prisma exige `file:` — daí o erro *"the URL must start with the protocol
> `file:`"*. Aplique o schema via cliente libSQL, com o script incluído:

No **PowerShell**, dentro da pasta do projeto (substitua pelos valores reais):

```powershell
$env:DATABASE_URL="libsql://ahk-talent-bridge-xxx.turso.io"
$env:DATABASE_AUTH_TOKEN="SEU-TOKEN"
npm run db:push:turso   # cria as tabelas no Turso (idempotente)
npm run db:seed         # opcional: 4 vagas de demonstração
```

O `schema.sql` já está versionado. Se mudar o `prisma/schema.prisma`, regenere com
`npm run db:sql > schema.sql` e rode `db:push:turso` de novo.

## 2. Projeto na Vercel

- **New Project** → importar o repo → **Root Directory = `ahk-talent-bridge`** (crítico).
- Framework: Next.js (auto). Build: `prisma generate && next build` (já no `vercel.json`).
- Região: `gru1` (São Paulo) — já configurada.

### Environment Variables (Production)

| Variável | Origem |
|---|---|
| `DATABASE_URL` | Turso (passo 1) |
| `DATABASE_AUTH_TOKEN` | Turso (passo 1) |
| `ANTHROPIC_API_KEY` | Console Anthropic (usar chave nova — **não** reaproveitar do histórico) |
| `ADMIN_PASSWORD` | definir senha forte do backoffice |
| `ADMIN_SESSION_SECRET` | `openssl rand -hex 32` |
| `RESEND_API_KEY` | (opcional) Resend — sem isso, e-mails só são logados |
| `EMAIL_FROM` | (opcional) remetente verificado no Resend |
| `INNGEST_SIGNING_KEY` | Inngest (passo 3) |
| `INNGEST_EVENT_KEY` | Inngest (passo 3) |
| `NEXT_PUBLIC_APP_URL` | URL final do deploy |

> Não definir `INNGEST_DEV` em produção (é só para dev local).

## 3. Inngest (pipeline de IA)

1. Criar app no [Inngest](https://app.inngest.com) e pegar `INNGEST_SIGNING_KEY` + `INNGEST_EVENT_KEY`.
2. Após o deploy, registrar o endpoint: `https://<seu-dominio>/api/inngest` (Sync).
3. As 4 funções (job-created, talent-created, matching-run, shortlist-generate)
   aparecem automaticamente. O cron de matching roda toda segunda 06:00.

## 4. Pós-deploy (smoke test)

- `/` carrega com as vagas · toggle PT/EN
- `/empresa` e `/candidato` enviam (checar linha criada no Turso)
- `/admin/login` → dashboard
- `/api/inngest` responde 200 e o app Inngest sincroniza

## Atualizar produção após mudanças de schema (form de CV)

Quando o app já está no ar e o schema evolui (ex.: novos campos do CV), **não**
recrie o banco — rode a migração incremental e, se quiser, o upload de PDF:

```powershell
$env:DATABASE_URL="libsql://ahk-talent-bridge-xxx.turso.io"
$env:DATABASE_AUTH_TOKEN="SEU-TOKEN"
npm run db:migrate:turso   # adiciona as novas colunas do Talent (idempotente)
npm run db:seed:extra      # opcional: +3 vagas fictícias (não duplica)
```

### Upload de CV em PDF (Vercel Blob — store PRIVADO)
1. Vercel → projeto → **Storage → Create → Blob** → acesso **Private** → conecte ao projeto.
2. Isso injeta `BLOB_STORE_ID` (e usa OIDC automático da Vercel para autenticar) → **Redeploy**.
3. Sem o store, o formulário funciona normalmente e apenas pula o anexo (CV é opcional).

> **LGPD:** os CVs são **blobs privados** — não acessíveis por URL pública. O PDF só é
> lido pela rota autenticada do backoffice (`/admin/talentos/[id]/cv`), com registro em
> `AuditLog` (`accessed`). Em dev local, defina `BLOB_READ_WRITE_TOKEN` (via `vercel env pull`)
> para testar o upload.

## Notas

- Segredos só na Vercel — `.env` está no `.gitignore`.
- Se quiser custom domain (ex.: `talentbridge.ahkbrasilien.com.br`), configurar em
  Vercel → Domains e atualizar `NEXT_PUBLIC_APP_URL`.
