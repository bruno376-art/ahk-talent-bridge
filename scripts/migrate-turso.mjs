/**
 * Migrações incrementais para um banco Turso JÁ EXISTENTE (adiciona colunas
 * sem recriar tabelas). Idempotente: verifica pragma_table_info antes de alterar.
 *
 * Use este script quando o schema evolui após o banco já ter sido criado.
 * Para um banco vazio, use `npm run db:push:turso` (schema.sql completo).
 *
 * Uso (PowerShell):
 *   $env:DATABASE_URL="libsql://SEU-BANCO.turso.io"
 *   $env:DATABASE_AUTH_TOKEN="SEU-TOKEN"
 *   npm run db:migrate:turso
 */
import { createClient } from "@libsql/client";

const url = process.env.DATABASE_URL ?? "";
const authToken = process.env.DATABASE_AUTH_TOKEN;

if (!url.startsWith("libsql://") && !url.startsWith("https://") && !url.startsWith("file:")) {
  console.error("✖ Defina DATABASE_URL (libsql://...) e DATABASE_AUTH_TOKEN.");
  process.exit(1);
}

const client = createClient({ url, authToken });

/** Colunas adicionadas ao Talent (form de CV). Todas nullable => seguras. */
const COLUMNS = [
  { table: "Talent", column: "phone", type: "TEXT" },
  { table: "Talent", column: "city", type: "TEXT" },
  { table: "Talent", column: "linkedin", type: "TEXT" },
  { table: "Talent", column: "currentRole", type: "TEXT" },
  { table: "Talent", column: "yearsExperience", type: "TEXT" },
  { table: "Talent", column: "germanLevel", type: "TEXT" },
  { table: "Talent", column: "englishLevel", type: "TEXT" },
  { table: "Talent", column: "germanCompanyExperience", type: "TEXT" },
  { table: "Talent", column: "relocation", type: "TEXT" },
  { table: "Talent", column: "workAuthorization", type: "TEXT" },
  { table: "Talent", column: "summary", type: "TEXT" },
  { table: "Talent", column: "cvUrl", type: "TEXT" },
  { table: "Talent", column: "cvFilename", type: "TEXT" },
];

async function columnExists(table, column) {
  const res = await client.execute(
    `SELECT COUNT(*) AS cnt FROM pragma_table_info('${table}') WHERE name = ?`,
    [column],
  );
  return Number(res.rows[0]?.cnt) > 0;
}

let added = 0;
let skipped = 0;

for (const { table, column, type } of COLUMNS) {
  if (await columnExists(table, column)) {
    skipped++;
    console.log(`• já existe: ${table}.${column}`);
    continue;
  }
  await client.execute(`ALTER TABLE "${table}" ADD COLUMN "${column}" ${type}`);
  added++;
  console.log(`✅ adicionada: ${table}.${column}`);
}

console.log(`\n[migrate-turso] concluído — ${added} colunas adicionadas, ${skipped} já existentes.`);
