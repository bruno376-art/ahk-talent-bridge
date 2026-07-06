/**
 * Seed BASE: recria as 4 vagas de demonstração (PT/EN/DE).
 * ⚠️ Destrutivo para vagas/matches (limpa e recria). Para adicionar sem apagar,
 * use `npm run db:seed:extra`. Dados em prisma/seed-data.ts.
 */
import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { SEED_JOBS } from "./seed-data";

const adapter = new PrismaLibSQL({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding AHK Talent Bridge…");

  // Idempotência simples: limpa e recria as vagas de demonstração.
  await prisma.match.deleteMany({});
  await prisma.job.deleteMany({});

  for (const j of SEED_JOBS) {
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
  }

  const count = await prisma.job.count();
  console.log(`Done. ${count} vagas de demonstração criadas.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
