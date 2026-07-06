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
  lang: z.enum(["pt", "en"]).default("pt"),
});

export type JobInput = z.infer<typeof jobSchema>;

export const talentSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  area: z.string().min(1),
  seniority: z.string().min(1),
  languages: z.string().min(1),
  internationalExperience: z.string().optional().default(""),
  consentData: z.literal(true), // obrigatório (dados + matching IA)
  consentComms: z.boolean().default(false),
  website: z.string().optional(), // honeypot — deve vir vazio
  lang: z.enum(["pt", "en"]).default("pt"),
});

export type TalentInput = z.infer<typeof talentSchema>;

/** Retorna true se o honeypot foi preenchido (provável bot). */
export function isHoneypotTripped(input: { website?: string }): boolean {
  return Boolean(input.website && input.website.trim().length > 0);
}
