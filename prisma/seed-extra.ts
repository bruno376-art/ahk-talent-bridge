/**
 * Seed ADITIVO: cria 3 vagas fictícias adicionais (PT/EN/DE), sem apagar as
 * existentes. Idempotente por título. Dados em prisma/seed-data.ts.
 *
 * Uso (contra Turso de produção, PowerShell):
 *   $env:DATABASE_URL="libsql://SEU-BANCO.turso.io"
 *   $env:DATABASE_AUTH_TOKEN="SEU-TOKEN"
 *   npm run db:seed:extra
 */
import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { EXTRA_JOBS } from "./seed-data";

const adapter = new PrismaLibSQL({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seed aditivo — 3 vagas fictícias…");
  let created = 0;
  for (const j of EXTRA_JOBS) {
    const exists = await prisma.job.findFirst({ where: { title: j.pt.title } });
    if (exists) {
      console.log(`• já existe: ${j.pt.title}`);
      continue;
    }
    await prisma.job.create({
      data: {
        companyName: j.pt.companyName,
        title: j.pt.title,
        area: j.pt.area,
        seniority: j.seniority,
        languages: j.languages,
        location: j.pt.location,
        model: j.pt.model,
        rawDescription: j.pt.summary,
        summary: j.pt.summary,
        tags: JSON.stringify(j.pt.tags),
        requirements: JSON.stringify(j.pt.requirements),
        matchNote: j.pt.matchNote,
        demoMatch: j.demoMatch,
        translations: JSON.stringify({ pt: j.pt, en: j.en, de: j.de }),
        status: "open",
        submittedLang: "pt",
      },
    });
    created++;
    console.log(`✅ criada: ${j.pt.title}`);
  }
  const total = await prisma.job.count();
  console.log(`\nConcluído — ${created} criadas. Total de vagas: ${total}.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
