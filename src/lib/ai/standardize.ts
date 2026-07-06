import { structuredCall } from "./anthropic";

export interface StandardizedJob {
  title: string;
  seniority: string;
  languages: string[];
  hardSkills: string[];
  softSkills: string[];
  workModel: string;
  idealProfile: string; // resumo (máx. ~80 palavras)
  tags: string[];
}

/** Cenário 1 (Make): padroniza uma vaga escrita livremente em campos estruturados. */
export async function standardizeJob(input: {
  companyName: string;
  rawTitle: string;
  area: string;
  seniority: string;
  languages: string;
  location: string;
  rawDescription: string;
}): Promise<StandardizedJob> {
  const prompt = `Padronize a vaga abaixo para uma bolsa de empregos do ecossistema Alemanha–Brasil.

Empresa: ${input.companyName}
Cargo informado: ${input.rawTitle}
Área: ${input.area}
Senioridade informada: ${input.seniority}
Idiomas exigidos (informado): ${input.languages}
Local/modelo: ${input.location}

Descrição original:
"""
${input.rawDescription}
"""`;

  return structuredCall<StandardizedJob>({
    system:
      "Você é um especialista em recrutamento internacional para empresas alemãs e multinacionais no Brasil. Padronize vagas de forma objetiva, sem inventar requisitos que não estejam no texto.",
    prompt,
    toolName: "registrar_vaga_padronizada",
    toolDescription: "Registra a vaga padronizada em campos estruturados.",
    schema: {
      type: "object",
      properties: {
        title: { type: "string", description: "Cargo padronizado" },
        seniority: { type: "string", description: "Júnior | Pleno | Sênior | Especialista | Liderança" },
        languages: { type: "array", items: { type: "string" }, description: "Idiomas exigidos com nível (ex.: 'Alemão C1')" },
        hardSkills: { type: "array", items: { type: "string" } },
        softSkills: { type: "array", items: { type: "string" } },
        workModel: { type: "string", description: "Remoto | Híbrido | Presencial (+ local se houver)" },
        idealProfile: { type: "string", description: "Resumo do perfil ideal, máx. 80 palavras" },
        tags: { type: "array", items: { type: "string" }, description: "3 a 4 tags curtas (idioma, área, senioridade)" },
      },
      required: ["title", "seniority", "languages", "hardSkills", "softSkills", "workModel", "idealProfile", "tags"],
    },
    maxTokens: 700,
  });
}

export interface StructuredTalent {
  seniority: string;
  languages: string[];
  internationalExperience: string;
  strengths: string[];
  gaps: string[];
  executiveSummary: string; // máx. ~70 palavras
}

/** Cenário 2 (Make): estrutura o perfil do talento a partir das respostas do formulário. */
export async function structureTalent(input: {
  fullName: string;
  area: string;
  seniority: string;
  languages: string;
  internationalExperience: string;
}): Promise<StructuredTalent> {
  const prompt = `Estruture o perfil do talento abaixo para um talent pool de empresas alemãs.

Área de interesse: ${input.area}
Senioridade (autoavaliação): ${input.seniority}
Idiomas (autoavaliação): ${input.languages}
Experiência internacional: ${input.internationalExperience || "não informada"}`;

  return structuredCall<StructuredTalent>({
    system:
      "Você é um recrutador especializado em empresas alemãs. Crie perfis realistas e objetivos, sem exagerar níveis de idioma ou experiência. Não trate dados sensíveis.",
    prompt,
    toolName: "registrar_perfil_talento",
    toolDescription: "Registra o perfil estruturado do talento.",
    schema: {
      type: "object",
      properties: {
        seniority: { type: "string" },
        languages: { type: "array", items: { type: "string" }, description: "Idiomas com nível realista" },
        internationalExperience: { type: "string" },
        strengths: { type: "array", items: { type: "string" } },
        gaps: { type: "array", items: { type: "string" } },
        executiveSummary: { type: "string", description: "Resumo executivo, máx. 70 palavras" },
      },
      required: ["seniority", "languages", "internationalExperience", "strengths", "gaps", "executiveSummary"],
    },
    maxTokens: 600,
  });
}
