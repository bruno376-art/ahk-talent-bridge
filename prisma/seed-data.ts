/**
 * Fonte única dos dados de demonstração (7 vagas), em PT/EN/DE.
 * Consumido por: prisma/seed.ts (4 vagas base), prisma/seed-extra.ts (3 adicionais)
 * e scripts/add-de-translations.ts (atualiza traduções em bancos já existentes).
 */

export interface JobLoc {
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

export interface SeedJob {
  languages: string;
  seniority: string;
  demoMatch: string;
  pt: JobLoc;
  en: JobLoc;
  de: JobLoc;
}

export const SEED_JOBS: SeedJob[] = [
  {
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
    de: {
      title: "Engineering Manager (SAP)",
      companyName: "Multinationaler Automobilkonzern",
      area: "Ingenieurwesen",
      model: "Hybrid · SP",
      location: "São Paulo, SP",
      summary:
        "Technische Führung eines multikulturellen Teams in einer deutschen Niederlassung in Brasilien, mit direkter Schnittstelle zur Zentrale in Deutschland.",
      tags: ["Deutsch C1", "SAP", "Senior"],
      requirements: [
        "Deutsch fortgeschritten (C1) und fließendes Englisch",
        "6+ Jahre in einem Multinational deutscher Herkunft",
        "Fundierte SAP- und Industrieprozess-Kenntnisse",
        "Interkulturelle DACH-Erfahrung",
      ],
      matchNote:
        "Hohe Passung bei Sprache und Seniorität. Leichte technische Lücke in spezifischen SAP-Modulen.",
    },
  },
  {
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
    de: {
      title: "Außenhandelsanalyst:in",
      companyName: "Deutsche Industriegruppe",
      area: "Supply Chain",
      model: "Vor Ort · SP",
      location: "Campinas, SP",
      summary:
        "Steuerung von Import- und Exportprozessen zwischen Brasilien und Deutschland mit Fokus auf Zoll-Compliance.",
      tags: ["Deutsch B2", "Außenhandel", "Mid-Level"],
      requirements: [
        "Deutsch Mittelstufe (B2) und fortgeschrittenes Englisch",
        "Erfahrung in Außenhandel und Incoterms",
        "Kenntnisse der Zollregulierung",
        "Analytisches, strukturiertes Profil",
      ],
      matchNote:
        "Gute Gesamtpassung. Für Senior-Positionen wird eine Vertiefung der Deutschkenntnisse empfohlen.",
    },
  },
  {
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
    de: {
      title: "Spezialist:in für Erneuerbare Energien",
      companyName: "Multinationaler Energiekonzern",
      area: "Nachhaltigkeit",
      model: "Remote",
      location: "Brasilien (remote)",
      summary:
        "Strukturierung von Energiewende-Projekten in der bilateralen Partnerschaft Brasilien–Deutschland.",
      tags: ["Englisch C1", "Energie", "Senior"],
      requirements: [
        "Fortgeschrittenes Englisch; Deutsch von Vorteil",
        "Erfahrung mit erneuerbaren Energien",
        "Strategischer Blick auf die Energiewende",
        "Arbeit im internationalen Umfeld",
      ],
      matchNote:
        "Exzellente fachliche und sprachliche Passung. Profil im Einklang mit dem DACH-Ökosystem.",
    },
  },
  {
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
    de: {
      title: "HR-Koordinator:in (zweisprachig)",
      companyName: "AHK-Mitgliedsunternehmen",
      area: "Personalwesen",
      model: "Hybrid · RJ",
      location: "Rio de Janeiro, RJ",
      summary:
        "Leitung von HR-Prozessen in einem Unternehmen mit deutscher Kultur, Betreuung von Expatriates und Rückkehrern.",
      tags: ["Deutsch B2", "HR", "Mid-Level"],
      requirements: [
        "Deutsch Mittelstufe und fortgeschrittenes Englisch",
        "Erfahrung in HR / internationaler Mobilität",
        "Interkulturelle Sensibilität",
        "Kenntnisse des Arbeitsrechts",
      ],
      matchNote:
        "Gute Profilpassung. Deutschkenntnisse sind das wichtigste Entwicklungsfeld.",
    },
  },
];

export const EXTRA_JOBS: SeedJob[] = [
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
    de: {
      title: "Controller:in",
      companyName: "Deutsche Chemieindustrie",
      area: "Finanzen",
      model: "Hybrid · SP",
      location: "São Paulo, SP",
      summary:
        "Verantwortlich für das Controlling der brasilianischen Tochtergesellschaft, mit Berichtslinie an die deutsche Zentrale und enger Schnittstelle zum globalen Finance-Team.",
      tags: ["Deutsch B2", "Controlling", "Senior"],
      requirements: [
        "Deutsch Mittelstufe (B2) und fortgeschrittenes Englisch",
        "Controlling-/FP&A-Erfahrung im Multinational",
        "IFRS; deutsche Standards (HGB von Vorteil)",
        "Analytisches Profil und interkulturelle Kommunikation",
      ],
      matchNote: "Starke Passung in Finance und Sprache. HGB ist ein Plus, kein Blocker.",
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
    de: {
      title: "Ingenieur:in für Industrieautomatisierung",
      companyName: "Maschinenbauer (DACH)",
      area: "Ingenieurwesen",
      model: "Vor Ort · SC",
      location: "Joinville, SC",
      summary:
        "Automatisierungsprojekte und Inbetriebnahme industrieller Linien in direkter technischer Kooperation mit Ingenieur:innen in Deutschland und Österreich.",
      tags: ["Deutsch B1", "Automatisierung", "Mid-Level"],
      requirements: [
        "Deutsch Grund-/Mittelstufe (B1) und technisches Englisch",
        "Erfahrung mit SPS, SCADA und Industrienetzwerken",
        "Erfahrung im DACH-geprägten Produktionsumfeld",
        "Reisebereitschaft zur Zentrale",
      ],
      matchNote:
        "Gute technische Passung. Besseres Deutsch erweitert den Fit für Projekte mit der Zentrale.",
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
    de: {
      title: "Spezialist:in für internationale Logistik",
      companyName: "Deutscher Logistikdienstleister",
      area: "Außenhandel",
      model: "Remote",
      location: "Brasilien (remote)",
      summary:
        "Aufbau von Logistiklösungen im Korridor Brasilien–Europa mit Fokus auf Zolleffizienz und nachhaltige Lieferketten.",
      tags: ["Englisch C1", "Logistik", "Spezialist:in"],
      requirements: [
        "Fortgeschrittenes Englisch; Deutsch von Vorteil",
        "Erfahrung in internationaler Logistik und Incoterms",
        "Kenntnisse des Handels Brasilien–EU",
        "End-to-End-Blick auf die Lieferkette",
      ],
      matchNote:
        "Exzellente fachliche und sprachliche Passung. Profil passend zum Korridor Brasilien–Europa.",
    },
  },
];

export const ALL_JOBS: SeedJob[] = [...SEED_JOBS, ...EXTRA_JOBS];
