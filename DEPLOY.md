# Deploy — AHK Talent Bridge (Vercel + Turso + Inngest)

Este app vive numa **subpasta** do repo `EU-ME SaaS` (ao lado de `plataforma/`).
Deve ser um **projeto Vercel próprio**, separado do EU-Mercosul.

## 1. Banco de dados (Turso)

```bash
# criar o banco de produção
turso db create ahk-talent-bridge
turso db show ahk-talent-bridge --url          # -> DATABASE_URL (libsql://...)
turso db tokens create ahk-talent-bridge       # -> DATABASE_AUTH_TOKEN

# aplicar o schema no banco de produção
DATABASE_URL="libsql://...turso.io" DATABASE_AUTH_TOKEN="..." npx prisma db push
# (opcional) semear as 4 vagas de demonstração:
DATABASE_URL="libsql://...turso.io" DATABASE_AUTH_TOKEN="..." npm run db:seed
```

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

## Notas

- Segredos só na Vercel — `.env` está no `.gitignore`.
- Se quiser custom domain (ex.: `talentbridge.ahkbrasilien.com.br`), configurar em
  Vercel → Domains e atualizar `NEXT_PUBLIC_APP_URL`.
