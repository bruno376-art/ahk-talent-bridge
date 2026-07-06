/**
 * Aplica o schema (schema.sql) num banco Turso/libSQL.
 *
 * O `prisma db push` NÃO funciona direto contra o Turso quando o provider é
 * `sqlite` (o engine nativo exige `file:`). Então geramos o SQL do schema com
 * `prisma migrate diff` e aplicamos aqui via cliente libSQL — mesma abordagem
 * do projeto EU-Mercosul.
 *
 * Uso (PowerShell):
 *   $env:DATABASE_URL="libsql://SEU-BANCO.turso.io"
 *   $env:DATABASE_AUTH_TOKEN="SEU-TOKEN"
 *   npm run db:push:turso
 *
 * Para regenerar o schema.sql após mudar o schema.prisma:
 *   npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > schema.sql
 */
import { createClient } from "@libsql/client";
import { readFileSync } from "node:fs";

const url = process.env.DATABASE_URL ?? "";
const authToken = process.env.DATABASE_AUTH_TOKEN;

if (!url.startsWith("libsql://") && !url.startsWith("https://")) {
  console.error(
    "✖ Defina DATABASE_URL (libsql://...) e DATABASE_AUTH_TOKEN antes de rodar.\n" +
      "  Ex.: $env:DATABASE_URL=\"libsql://ahk-talent-bridge-xxx.turso.io\"",
  );
  process.exit(1);
}

const client = createClient({ url, authToken });
const sqlText = readFileSync(new URL("../schema.sql", import.meta.url), "utf8");

// Divide em statements no fim de cada ";", removendo linhas de comentário.
const statements = sqlText
  .split(/;\s*(?:\r?\n|$)/)
  .map((s) =>
    s
      .split("\n")
      .filter((l) => !l.trim().startsWith("--"))
      .join("\n")
      .trim(),
  )
  .filter(Boolean);

let created = 0;
let skipped = 0;

for (const stmt of statements) {
  const label = stmt.replace(/\s+/g, " ").slice(0, 60);
  try {
    await client.execute(stmt);
    created++;
    console.log(`✅ ${label}`);
  } catch (e) {
    if (/already exists/i.test(e.message)) {
      skipped++;
      console.log(`• já existe: ${label}`);
    } else {
      console.error(`✖ falhou: ${label}\n   ${e.message}`);
      process.exit(1);
    }
  }
}

console.log(`\n[push-turso] concluído — ${created} aplicados, ${skipped} já existentes.`);
