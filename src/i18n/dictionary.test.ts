import { describe, it, expect } from "vitest";
import { dict, LANGS } from "./dictionary";

const { pt } = dict;
const OTHERS = LANGS.filter((l) => l !== "pt");

describe("dicionário PT/EN/DE — paridade estrutural", () => {
  it("tem as mesmas chaves de topo em todos os idiomas", () => {
    for (const l of OTHERS) {
      expect(Object.keys(dict[l]).sort(), `idioma ${l}`).toEqual(Object.keys(pt).sort());
    }
  });

  it("os campos dos formulários têm os mesmos names e ordem", () => {
    for (const l of OTHERS) {
      expect(dict[l].company.fields.map((f) => f.name), `company ${l}`).toEqual(
        pt.company.fields.map((f) => f.name),
      );
      expect(dict[l].talent.fields.map((f) => f.name), `talent ${l}`).toEqual(
        pt.talent.fields.map((f) => f.name),
      );
    }
  });

  it("os selects têm o mesmo número de opções em cada idioma", () => {
    for (const l of OTHERS) {
      for (const group of ["company", "talent"] as const) {
        pt[group].fields.forEach((field, i) => {
          expect(dict[l][group].fields[i].options?.length, `${group}.${field.name} ${l}`).toBe(
            field.options?.length,
          );
          expect(dict[l][group].fields[i].kind).toBe(field.kind);
        });
      }
    }
  });

  it("as listas de conteúdo têm o mesmo tamanho em todos os idiomas", () => {
    for (const l of OTHERS) {
      const d = dict[l];
      expect(d.how.steps.length).toBe(pt.how.steps.length);
      expect(d.diff.items.length).toBe(pt.diff.items.length);
      expect(d.ai.functions.length).toBe(pt.ai.functions.length);
      expect(d.ai.principles.length).toBe(pt.ai.principles.length);
      expect(d.ai.scoreBreakdown.length).toBe(pt.ai.scoreBreakdown.length);
      expect(d.gov.principles.length).toBe(pt.gov.principles.length);
      expect(d.company.benefits.length).toBe(pt.company.benefits.length);
      expect(d.talent.benefits.length).toBe(pt.talent.benefits.length);
      expect(d.legal.privacy.length).toBe(pt.legal.privacy.length);
      expect(d.legal.terms.length).toBe(pt.legal.terms.length);
      expect(d.legal.aiUse.length).toBe(pt.legal.aiUse.length);
    }
  });

  it("nenhuma string essencial vazia (hero/CTAs) em nenhum idioma", () => {
    for (const l of LANGS) {
      const d = dict[l];
      expect(d.hero.title.length).toBeGreaterThan(0);
      expect(d.hero.ctaCompany.length).toBeGreaterThan(0);
      expect(d.hero.ctaTalent.length).toBeGreaterThan(0);
    }
  });

  it("as seções do formulário de talento existem em todos os idiomas", () => {
    for (const l of LANGS) {
      const sections = new Set(dict[l].talent.fields.map((f) => f.section).filter(Boolean));
      expect(sections.size, `idioma ${l}`).toBe(5); // pessoais, perfil, idiomas, internacional, currículo
    }
  });
});
