/**
 * Atualiza vagas JÁ EXISTENTES adicionando/atualizando a tradução alemã (de)
 * no JSON `translations`, casando pelo título PT. Idempotente e não-destrutivo
 * (preserva pt/en existentes e demais campos).
 *
 * Uso (contra Turso de produção, PowerShell):
 *   $env:DATABASE_URL="libsql://SEU-BANCO.turso.io"
 *   $env:DATABASE_AUTH_TOKEN="SEU-TOKEN"
 *   npm run db:translate:de
 */
import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { ALL_JOBS } from "../prisma/seed-data";

const adapter = new PrismaLibSQL({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Adicionando traduções DE às vagas existentes…");
  let updated = 0;
  let missing = 0;

  for (const j of ALL_JOBS) {
    const job = await prisma.job.findFirst({ where: { title: j.pt.title } });
    if (!job) {
      missing++;
      console.log(`• não encontrada (pulando): ${j.pt.title}`);
      continue;
    }
    let translations: Record<string, unknown> = {};
    try {
      translations = job.translations ? JSON.parse(job.translations) : {};
    } catch {
      translations = {};
    }
    translations.pt = translations.pt ?? j.pt;
    translations.en = translations.en ?? j.en;
    translations.de = j.de; // sobrescreve/adiciona a versão alemã

    await prisma.job.update({
      where: { id: job.id },
      data: { translations: JSON.stringify(translations) },
    });
    updated++;
    console.log(`✅ DE adicionado: ${j.pt.title}`);
  }

  console.log(`\nConcluído — ${updated} atualizadas, ${missing} não encontradas.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
