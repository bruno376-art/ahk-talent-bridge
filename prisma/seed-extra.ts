/**
 * Seed ADITIVO: cria 3 vagas fictícias adicionais (PT/EN), sem apagar as
 * existentes. Idempotente por título (não duplica se rodar de novo).
 *
 * Uso (contra Turso de produção, PowerShell):
 *   $env:DATABASE_URL="libsql://SEU-BANCO.turso.io"
 *   $env:DATABASE_AUTH_TOKEN="SEU-TOKEN"
 *   npm run db:seed:extra
 */
import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSQL({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter });

interface Loc {
  title: string;
  companyName: string;
  area: string;
  model: string;
  location: string;
  summary: string;
  tags: string[];
  requirements: string[];
  matchNote: string;
}
interface SeedJob {
  languages: string;
  seniority: string;
  demoMatch: string;
  pt: Loc;
  en: Loc;
}

const JOBS: SeedJob[] = [
  {
    languages: "Alemão + Inglês",
    seniority: "Sênior",
    demoMatch: "90%",
    pt: {
      title: "Controller (Controladoria)",
      companyName: "Indústria Química Alemã",
      area: "Finanças",
      model: "Híbrido · SP",
      location: "São Paulo, SP",
      summary:
        "Responsável pela controladoria da subsidiária brasileira, com reporte à matriz na Alemanha e forte interface com o time financeiro global.",
      tags: ["Alemão B2", "Controladoria", "Sênior"],
      requirements: [
        "Alemão intermediário (B2) e inglês avançado",
        "Experiência em controladoria / FP&A em multinacional",
        "Domínio de IFRS e normas alemãs (HGB desejável)",
        "Perfil analítico e comunicação intercultural",
      ],
      matchNote:
        "Aderência forte em finanças e idioma. HGB é diferencial, não bloqueante.",
    },
    en: {
      title: "Controller",
      companyName: "German Chemical Industry",
      area: "Finance",
      model: "Hybrid · SP",
      location: "São Paulo, SP",
      summary:
        "Responsible for controlling of the Brazilian subsidiary, reporting to the German HQ with strong interface to the global finance team.",
      tags: ["German B2", "Controlling", "Senior"],
      requirements: [
        "Intermediate German (B2) and advanced English",
        "Controlling / FP&A experience in a multinational",
        "IFRS and German standards (HGB a plus)",
        "Analytical profile and intercultural communication",
      ],
      matchNote: "Strong finance and language fit. HGB is a plus, not a blocker.",
    },
  },
  {
    languages: "Alemão + Inglês",
    seniority: "Pleno",
    demoMatch: "87%",
    pt: {
      title: "Engenheiro(a) de Automação Industrial",
      companyName: "Fabricante de Máquinas (DACH)",
      area: "Engenharia",
      model: "Presencial · SC",
      location: "Joinville, SC",
      summary:
        "Projetos de automação e comissionamento de linhas industriais, em cooperação técnica direta com engenheiros na Alemanha e Áustria.",
      tags: ["Alemão B1", "Automação", "Pleno"],
      requirements: [
        "Alemão básico-intermediário (B1) e inglês técnico",
        "Experiência com CLPs, SCADA e redes industriais",
        "Vivência em ambiente fabril de origem DACH",
        "Disponibilidade para viagens à matriz",
      ],
      matchNote:
        "Boa aderência técnica. Reforço de alemão amplia o encaixe em projetos com a matriz.",
    },
    en: {
      title: "Industrial Automation Engineer",
      companyName: "Machinery Manufacturer (DACH)",
      area: "Engineering",
      model: "On-site · SC",
      location: "Joinville, SC",
      summary:
        "Automation projects and commissioning of industrial lines, in direct technical cooperation with engineers in Germany and Austria.",
      tags: ["German B1", "Automation", "Mid-level"],
      requirements: [
        "Basic-intermediate German (B1) and technical English",
        "Experience with PLCs, SCADA and industrial networks",
        "Background in a DACH-origin manufacturing environment",
        "Availability to travel to the HQ",
      ],
      matchNote:
        "Good technical fit. Stronger German widens the fit for HQ projects.",
    },
  },
  {
    languages: "Inglês (avançado)",
    seniority: "Especialista",
    demoMatch: "93%",
    pt: {
      title: "Especialista em Logística Internacional",
      companyName: "Operador Logístico Alemão",
      area: "Comércio Exterior",
      model: "Remoto",
      location: "Brasil (remoto)",
      summary:
        "Estruturação de soluções logísticas no corredor Brasil–Europa, com foco em eficiência aduaneira e sustentabilidade da cadeia.",
      tags: ["Inglês C1", "Logística", "Especialista"],
      requirements: [
        "Inglês avançado; alemão desejável",
        "Experiência em logística internacional e Incoterms",
        "Conhecimento de comércio Brasil–UE",
        "Visão de cadeia ponta a ponta",
      ],
      matchNote:
        "Excelente aderência técnica e de idioma. Perfil alinhado ao corredor Brasil–Europa.",
    },
    en: {
      title: "International Logistics Specialist",
      companyName: "German Logistics Operator",
      area: "Foreign Trade",
      model: "Remote",
      location: "Brazil (remote)",
      summary:
        "Structuring logistics solutions on the Brazil–Europe corridor, focused on customs efficiency and supply-chain sustainability.",
      tags: ["English C1", "Logistics", "Specialist"],
      requirements: [
        "Advanced English; German a plus",
        "International logistics and Incoterms experience",
        "Knowledge of Brazil–EU trade",
        "End-to-end supply-chain view",
      ],
      matchNote:
        "Excellent technical and language fit. Profile aligned with the Brazil–Europe corridor.",
    },
  },
];

async function main() {
  console.log("Seed aditivo — 3 vagas fictícias…");
  let created = 0;
  for (const j of JOBS) {
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
        translations: JSON.stringify({ pt: j.pt, en: j.en }),
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
