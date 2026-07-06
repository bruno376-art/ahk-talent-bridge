import { structuredCall } from "./anthropic";

export interface MatchResult {
  score: number; // 0-100
  justification: string; // máx. ~40 palavras
  gap?: string;
}

/** Cenário 3 (Make): compara vaga × candidato e retorna score explicável. */
export async function matchJobToTalent(input: {
  jobProfile: string;
  talentProfile: string;
}): Promise<MatchResult> {
  const prompt = `Compare a vaga e o candidato abaixo e avalie a aderência.

VAGA:
"""
${input.jobProfile}
"""

CANDIDATO:
"""
${input.talentProfile}
"""`;

  return structuredCall<MatchResult>({
    system:
      "Você avalia aderência entre vaga e candidato no ecossistema Alemanha–Brasil. Use critérios objetivos: idioma (alemão/inglês), senioridade, experiência internacional e fit cultural DACH. Seja transparente e conservador. Você NÃO toma a decisão final — apenas apoia a curadoria humana.",
    prompt,
    toolName: "registrar_aderencia",
    toolDescription: "Registra a avaliação de aderência vaga × candidato.",
    schema: {
      type: "object",
      properties: {
        score: { type: "integer", minimum: 0, maximum: 100, description: "Score de aderência 0-100" },
        justification: { type: "string", description: "Justificativa curta, máx. 40 palavras" },
        gap: { type: "string", description: "Risco ou gap relevante, se houver" },
      },
      required: ["score", "justification"],
    },
    maxTokens: 300,
  });
}

export interface ShortlistSummary {
  overview: string;
  candidates: { name: string; note: string }[];
}

/** Cenário 4 (Make): resumo executivo para o RH a partir dos top candidatos. */
export async function summarizeShortlist(input: {
  jobTitle: string;
  candidates: { name: string; score: number; profile: string }[];
}): Promise<ShortlistSummary> {
  const lines = input.candidates
    .map((c, i) => `${i + 1}. ${c.name} (score ${c.score}): ${c.profile}`)
    .join("\n");

  const prompt = `Crie um resumo executivo para o RH sobre a shortlist da vaga "${input.jobTitle}".

Candidatos:
${lines}`;

  return structuredCall<ShortlistSummary>({
    system:
      "Você escreve resumos executivos objetivos para RHs de empresas alemãs. 1 parágrafo geral + 1 bullet por candidato. Sem decisão final automatizada.",
    prompt,
    toolName: "registrar_resumo_shortlist",
    toolDescription: "Registra o resumo executivo da shortlist.",
    schema: {
      type: "object",
      properties: {
        overview: { type: "string", description: "Parágrafo geral sobre a shortlist" },
        candidates: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              note: { type: "string", description: "Bullet objetivo sobre o candidato" },
            },
            required: ["name", "note"],
          },
        },
      },
      required: ["overview", "candidates"],
    },
    maxTokens: 800,
  });
}
