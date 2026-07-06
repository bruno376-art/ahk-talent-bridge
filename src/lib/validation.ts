import { z } from "zod";

/**
 * Schemas de validação das submissões públicas. Extraídos para permitir
 * reuso e testes unitários. Inclui um campo honeypot anti-spam (`website`):
 * humanos deixam vazio; bots tendem a preencher.
 */

export const jobSchema = z.object({
  companyName: z.string().min(2),
  contactEmail: z.string().email(),
  jobTitle: z.string().min(2),
  area: z.string().min(1),
  seniority: z.string().min(1),
  languages: z.string().min(1),
  location: z.string().min(2),
  description: z.string().min(10),
  consent: z.literal(true), // confirma associação + termos
  website: z.string().optional(), // honeypot — deve vir vazio
  lang: z.enum(["pt", "en", "de"]).default("pt"),
});

export type JobInput = z.infer<typeof jobSchema>;

export const talentSchema = z.object({
  // Dados pessoais
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  city: z.string().optional().default(""),
  linkedin: z.string().optional().default(""),
  // Perfil profissional
  area: z.string().min(1),
  currentRole: z.string().optional().default(""),
  seniority: z.string().min(1),
  yearsExperience: z.string().optional().default(""),
  // Idiomas (CEFR)
  germanLevel: z.string().min(1),
  englishLevel: z.string().min(1),
  // Perfil internacional
  germanCompanyExperience: z.string().optional().default(""),
  internationalExperience: z.string().optional().default(""),
  relocation: z.string().optional().default(""),
  workAuthorization: z.string().optional().default(""),
  // CV
  summary: z.string().optional().default(""),
  cvUrl: z.string().url().optional().or(z.literal("")).default(""),
  cvFilename: z.string().optional().default(""),
  // Consentimentos + honeypot
  consentData: z.literal(true), // obrigatório (dados + matching IA)
  consentComms: z.boolean().default(false),
  website: z.string().optional(), // honeypot — deve vir vazio
  lang: z.enum(["pt", "en", "de"]).default("pt"),
});

/** Valores de "sem idioma" nas três línguas da interface. */
const NO_LEVEL = new Set(["Nenhum", "None", "Keine"]);

/** Compõe o campo legado `languages` a partir dos níveis CEFR (p/ matching/exibição). */
export function composeLanguages(germanLevel: string, englishLevel: string): string {
  const parts: string[] = [];
  if (germanLevel && !NO_LEVEL.has(germanLevel)) parts.push(`Alemão ${germanLevel}`);
  if (englishLevel && !NO_LEVEL.has(englishLevel)) parts.push(`Inglês ${englishLevel}`);
  return parts.join(", ");
}

export type TalentInput = z.infer<typeof talentSchema>;

/** Retorna true se o honeypot foi preenchido (provável bot). */
export function isHoneypotTripped(input: { website?: string }): boolean {
  return Boolean(input.website && input.website.trim().length > 0);
}
