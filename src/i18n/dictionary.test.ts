import { describe, it, expect } from "vitest";
import { dict } from "./dictionary";

const { pt, en } = dict;

describe("dicionário PT/EN — paridade estrutural", () => {
  it("tem as mesmas chaves de topo", () => {
    expect(Object.keys(pt).sort()).toEqual(Object.keys(en).sort());
  });

  it("os campos dos formulários têm os mesmos names e ordem", () => {
    expect(pt.company.fields.map((f) => f.name)).toEqual(en.company.fields.map((f) => f.name));
    expect(pt.talent.fields.map((f) => f.name)).toEqual(en.talent.fields.map((f) => f.name));
  });

  it("os selects têm o mesmo número de opções em cada idioma", () => {
    for (const group of ["company", "talent"] as const) {
      pt[group].fields.forEach((field, i) => {
        expect(en[group].fields[i].options?.length).toBe(field.options?.length);
        expect(en[group].fields[i].kind).toBe(field.kind);
      });
    }
  });

  it("as listas de conteúdo têm o mesmo tamanho nos dois idiomas", () => {
    expect(en.how.steps.length).toBe(pt.how.steps.length);
    expect(en.diff.items.length).toBe(pt.diff.items.length);
    expect(en.ai.functions.length).toBe(pt.ai.functions.length);
    expect(en.ai.principles.length).toBe(pt.ai.principles.length);
    expect(en.ai.scoreBreakdown.length).toBe(pt.ai.scoreBreakdown.length);
    expect(en.gov.principles.length).toBe(pt.gov.principles.length);
    expect(en.company.benefits.length).toBe(pt.company.benefits.length);
    expect(en.talent.benefits.length).toBe(pt.talent.benefits.length);
    expect(en.legal.privacy.length).toBe(pt.legal.privacy.length);
  });

  it("nenhuma string essencial vazia (hero/CTAs)", () => {
    for (const d of [pt, en]) {
      expect(d.hero.title.length).toBeGreaterThan(0);
      expect(d.hero.ctaCompany.length).toBeGreaterThan(0);
      expect(d.hero.ctaTalent.length).toBeGreaterThan(0);
    }
  });
});
