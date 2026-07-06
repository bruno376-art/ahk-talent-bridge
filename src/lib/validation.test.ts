import { describe, it, expect } from "vitest";
import { jobSchema, talentSchema, isHoneypotTripped } from "./validation";

const validJob = {
  companyName: "Grupo Industrial Alemão",
  contactEmail: "rh@empresa.com",
  jobTitle: "Gerente de Engenharia",
  area: "Engenharia",
  seniority: "Sênior",
  languages: "Alemão + Inglês",
  location: "São Paulo, SP — Híbrido",
  description: "Descrição suficientemente longa da vaga.",
  consent: true as const,
  lang: "pt" as const,
};

const validTalent = {
  fullName: "Maria Silva",
  email: "maria@example.com",
  area: "Engenharia",
  seniority: "Sênior",
  languages: "Alemão avançado + Inglês fluente",
  consentData: true as const,
};

describe("jobSchema", () => {
  it("aceita uma vaga válida", () => {
    expect(jobSchema.safeParse(validJob).success).toBe(true);
  });

  it("rejeita e-mail de contato inválido", () => {
    expect(jobSchema.safeParse({ ...validJob, contactEmail: "não-é-email" }).success).toBe(false);
  });

  it("exige o consentimento (associação + termos)", () => {
    expect(jobSchema.safeParse({ ...validJob, consent: false }).success).toBe(false);
  });

  it("rejeita descrição curta demais", () => {
    expect(jobSchema.safeParse({ ...validJob, description: "curta" }).success).toBe(false);
  });
});

describe("talentSchema", () => {
  it("aceita um talento válido e assume defaults", () => {
    const parsed = talentSchema.safeParse(validTalent);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.consentComms).toBe(false);
      expect(parsed.data.lang).toBe("pt");
    }
  });

  it("exige consentimento de dados obrigatório", () => {
    expect(talentSchema.safeParse({ ...validTalent, consentData: false }).success).toBe(false);
  });

  it("rejeita e-mail inválido", () => {
    expect(talentSchema.safeParse({ ...validTalent, email: "x" }).success).toBe(false);
  });
});

describe("isHoneypotTripped", () => {
  it("detecta honeypot preenchido e ignora vazio", () => {
    expect(isHoneypotTripped({ website: "http://spam" })).toBe(true);
    expect(isHoneypotTripped({ website: "   " })).toBe(false);
    expect(isHoneypotTripped({ website: "" })).toBe(false);
    expect(isHoneypotTripped({})).toBe(false);
  });
});
