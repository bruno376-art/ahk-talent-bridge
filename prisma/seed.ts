/**
 * Seed: reproduz as 4 vagas de demonstração do design "AHK Talent Bridge".
 * Campos-base em PT; traduções EN em `translations.en`.
 */
import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSQL({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter });

interface SeedJob {
  slug: string;
  pt: {
    title: string;
    companyName: string;
    area: string;
    model: string;
    location: string;
    summary: string;
    tags: string[];
    requirements: string[];
    matchNote: string;
  };
  en: {
    title: string;
    companyName: string;
    area: string;
    model: string;
    location: string;
    summary: string;
    tags: string[];
    requirements: string[];
    matchNote: string;
  };
  languages: string;
  seniority: string;
  demoMatch: string;
}

const JOBS: SeedJob[] = [
  {
    slug: "gerente-engenharia-sap",
    languages: "Alemão + Inglês",
    seniority: "Sênior",
    demoMatch: "94%",
    pt: {
      title: "Gerente de Engenharia (SAP)",
      companyName: "Multinacional Automotiva",
      area: "Engenharia",
      model: "Híbrido · SP",
      location: "São Paulo, SP",
      summary:
        "Liderança técnica de time multicultural em operação alemã no Brasil, com interface direta com a matriz na Alemanha.",
      tags: ["Alemão C1", "SAP", "Sênior"],
      requirements: [
        "Alemão avançado (C1) e inglês fluente",
        "6+ anos em multinacional de origem alemã",
        "Domínio de SAP e processos industriais",
        "Experiência intercultural DACH",
      ],
      matchNote:
        "Alta aderência de idioma e senioridade. Gap técnico leve em módulos específicos de SAP.",
    },
    en: {
      title: "Engineering Manager (SAP)",
      companyName: "Automotive Multinational",
      area: "Engineering",
      model: "Hybrid · SP",
      location: "São Paulo, SP",
      summary:
        "Technical leadership of a multicultural team in a German operation in Brazil, with direct interface to the German headquarters.",
      tags: ["German C1", "SAP", "Senior"],
      requirements: [
        "Advanced German (C1) and fluent English",
        "6+ years in a German-origin multinational",
        "Strong SAP and industrial-process knowledge",
        "DACH intercultural experience",
      ],
      matchNote: "High language and seniority fit. Minor technical gap in specific SAP modules.",
    },
  },
  {
    slug: "analista-comex",
    languages: "Alemão + Inglês",
    seniority: "Pleno",
    demoMatch: "88%",
    pt: {
      title: "Analista de Comércio Exterior",
      companyName: "Grupo Industrial Alemão",
      area: "Supply Chain",
      model: "Presencial · SP",
      location: "Campinas, SP",
      summary:
        "Gestão de processos de importação e exportação entre Brasil e Alemanha, com foco em conformidade aduaneira.",
      tags: ["Alemão B2", "Comex", "Pleno"],
      requirements: [
        "Alemão intermediário (B2) e inglês avançado",
        "Experiência em Comex e Incoterms",
        "Conhecimento de regulação aduaneira",
        "Perfil analítico e organizado",
      ],
      matchNote:
        "Boa aderência geral. Recomenda-se reforço no idioma alemão para posições sênior.",
    },
    en: {
      title: "Foreign Trade Analyst",
      companyName: "German Industrial Group",
      area: "Supply Chain",
      model: "On-site · SP",
      location: "Campinas, SP",
      summary:
        "Management of import and export processes between Brazil and Germany, focused on customs compliance.",
      tags: ["German B2", "Foreign Trade", "Mid-level"],
      requirements: [
        "Intermediate German (B2) and advanced English",
        "Experience in foreign trade and Incoterms",
        "Knowledge of customs regulation",
        "Analytical, organized profile",
      ],
      matchNote: "Good overall fit. German language reinforcement recommended for senior roles.",
    },
  },
  {
    slug: "especialista-energia-renovavel",
    languages: "Inglês (avançado)",
    seniority: "Sênior",
    demoMatch: "91%",
    pt: {
      title: "Especialista em Energia Renovável",
      companyName: "Multinacional de Energia",
      area: "Sustentabilidade",
      model: "Remoto",
      location: "Brasil (remoto)",
      summary:
        "Estruturação de projetos de transição energética em parceria bilateral Brasil–Alemanha.",
      tags: ["Inglês C1", "Energia", "Sênior"],
      requirements: [
        "Inglês avançado; alemão desejável",
        "Experiência em energias renováveis",
        "Visão estratégica de transição energética",
        "Trabalho em ambiente internacional",
      ],
      matchNote:
        "Excelente aderência técnica e de idioma. Perfil alinhado ao ecossistema DACH.",
    },
    en: {
      title: "Renewable Energy Specialist",
      companyName: "Energy Multinational",
      area: "Sustainability",
      model: "Remote",
      location: "Brazil (remote)",
      summary:
        "Structuring energy-transition projects within the bilateral Brazil–Germany partnership.",
      tags: ["English C1", "Energy", "Senior"],
      requirements: [
        "Advanced English; German a plus",
        "Experience in renewable energy",
        "Strategic view of energy transition",
        "Comfort in international environments",
      ],
      matchNote:
        "Excellent technical and language fit. Profile aligned with the DACH ecosystem.",
    },
  },
  {
    slug: "coordenador-rh-bilingue",
    languages: "Alemão + Inglês",
    seniority: "Pleno",
    demoMatch: "85%",
    pt: {
      title: "Coordenador(a) de RH Bilíngue",
      companyName: "Empresa Associada AHK",
      area: "Recursos Humanos",
      model: "Híbrido · RJ",
      location: "Rio de Janeiro, RJ",
      summary:
        "Condução de processos de RH em empresa de cultura alemã, apoiando expatriados e repatriados.",
      tags: ["Alemão B2", "RH", "Pleno"],
      requirements: [
        "Alemão intermediário e inglês avançado",
        "Experiência em RH / mobilidade internacional",
        "Sensibilidade intercultural",
        "Conhecimento de legislação trabalhista",
      ],
      matchNote:
        "Boa aderência de perfil. Idioma alemão é o principal ponto de desenvolvimento.",
    },
    en: {
      title: "Bilingual HR Coordinator",
      companyName: "AHK Member Company",
      area: "Human Resources",
      model: "Hybrid · RJ",
      location: "Rio de Janeiro, RJ",
      summary:
        "Leading HR processes in a company with German culture, supporting expatriates and returnees.",
      tags: ["German B2", "HR", "Mid-level"],
      requirements: [
        "Intermediate German and advanced English",
        "HR / international mobility experience",
        "Intercultural sensitivity",
        "Knowledge of labor legislation",
      ],
      matchNote: "Good profile fit. German language is the main development point.",
    },
  },
];

async function main() {
  console.log("Seeding AHK Talent Bridge…");

  // Idempotência simples: limpa e recria as vagas de demonstração.
  await prisma.match.deleteMany({});
  await prisma.job.deleteMany({});

  for (const j of JOBS) {
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
